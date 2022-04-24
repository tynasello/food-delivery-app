import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  createHttpLink,
  from,
  InMemoryCache,
  Observable,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { ThemeProvider } from '@mui/material'
import { onError } from 'apollo-link-error'
import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import AppRouter from './AppRouter'
import reportWebVitals from './reportWebVitals'
import GlobalStyle, { theme } from './theme/GlobalStyle'

const refreshTokens = async () => {
  let refreshedAt = ''

  const rt = localStorage.getItem('rt')
  if (!rt) return ''

  // must use fetch to avoid invalid hook call
  await fetch(`${process.env.REACT_APP_GRAPHQL_ENDPOINT}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${rt}`,
    },
    body: JSON.stringify({
      query: `
      mutation RefreshTokens {
        refreshTokens {
          at
        }
      }      
      `,
    }),
  })
    .then((res) => res.json())
    .then((result) => {
      if (result.errors) {
        console.error(`Error refreshing tokens: ${result.errors[0]?.message}`)
      }
      refreshedAt = result?.data?.refreshTokens?.at
      localStorage.setItem('at', refreshedAt)
    })

  return refreshedAt
}

const httpLink = createHttpLink({
  uri: `${process.env.REACT_APP_GRAPHQL_ENDPOINT}`,
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('at')
  return {
    headers: {
      authorization: `Bearer ${token}`,
      ...headers,
    },
  }
})

const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  if (graphQLErrors) {
    if (graphQLErrors[0].message === 'Unauthorized') {
      return new Observable((observer) => {
        refreshTokens()
          .then((refreshedAt) => {
            const oldHeaders = operation.getContext().headers
            operation.setContext({
              headers: {
                ...oldHeaders,
                authorization: `Bearer ${refreshedAt}`,
              },
            })
          })
          .then(() => {
            // this logic found at https://github.com/apollographql/apollo-link/issues/538
            const subscriber = {
              next: observer.next.bind(observer),
              error: observer.error.bind(observer),
              complete: observer.complete.bind(observer),
            }
            // Retry last failed request
            forward(operation).subscribe(subscriber)
          })
          .catch((error) => {
            console.log(`'Error refreshing tokens: ${error}`)
          })
      })
    }
  }
})

const client = new ApolloClient({
  link: from([errorLink as unknown as ApolloLink, authLink, httpLink]),
  cache: new InMemoryCache(),
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <HashRouter>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <AppRouter />
        </ThemeProvider>
      </HashRouter>
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

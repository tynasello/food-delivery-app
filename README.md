# Readme

<br>

## Food Delivery App

<br>

### server

`npm run start` or `docker-compose up —build` to start server. Go to [localhost:3001/graphql](http://localhost:3001/graphql) to query Apollo playground.

<br>

**.env** contains DATABASE_URL, AT_SECRET, RT_SECRET, POSTGRES_USER, POSTGRES_PASSWORD, and POSTGRES_DB.

<br>

Gql schema can be found at **server > src > schema.gql**

Prisma schema can be found at **server > prisma > schema.prisma**

<br>

Server is hosted on Heroku and running at [https://tnasello-fda-api.herokuapp.com/graphql](https://tnasello-fda-api.herokuapp.com/graphql).

<br>

NestJS-GraphQL API using code first approach.

Prism ORM used to connect to and interact with PostgreSQL database hosted on ElephantSQL.

JWT authentication to protect auth/user endpoints using passport-jwt strategy.

- User is given an access token and refresh token when they sign in. Refresh token is hashed (with bcrypt) and stored in database.
- JWT access token expires after 600 seconds. refreshTokens endpoint exists to refresh user’s access token via the user’s refresh token.

Docker setup for local development.

DTO validation with class-validator package.

Unit tests done on nest resolvers and services using Jest.

E2E tests done using Jest and supertest.

<br>
<br>

### client

`npm run start` or `docker-compose up —build` to start react app at [localhost:3000](http://localhost:3000).

<br>

**.env** contains REACT_APP_GRAPHQL_ENDPOINT.

<br>

Create an account and sign in, or use the following user credentials: username: Kevin, password: 87654321.

<br>

Frontend server hosted on GitHub pages and running at [https://github.com/Tynasello/food-delivery-app](https://github.com/Tynasello/food-delivery-app)

<br>

TypeScript React frontend using Apollo GraphQL to interact with backend.

Docker setup for local development

MUI v5 used for some styling.

GraphQL Code Gen. used to generate code from backend schema to add TS support and TS interfaces and hooks.

Formik with Yup validation used for the application’s forms.

Apollo client links implemented to seamlessly refresh user’s access token when it expires.

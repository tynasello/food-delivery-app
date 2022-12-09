# Food Delivery App

- A food delivery app clone, allowing users to login, browse, and check out desired items.
- GraphQL API written in TypeScript using NestJS framework, and Prisma ORM.
- Application data stored in PostgreSQL database.
- React TypeScript frontend using Apollo GraphQL.
- JWT authentication protecting user/auth endpoints.
- Unit and end-to-end tests written for backend using Jest and Supertest

### Server

`npm run start` or `docker-compose up —build` to start server. Go to [localhost:3001/graphql](http://localhost:3001/graphql) to query Apollo playground.

- NestJS-GraphQL API using code first approach.
- Prism ORM used to connect to and interact with PostgreSQL database hosted on ElephantSQL.
- JWT authentication to protect auth/user endpoints using passport-jwt strategy.
    - User is given an access token and refresh token when they sign in. Refresh token is hashed (with bcrypt) and stored in database.
    - JWT access token expires after 600 seconds. refreshTokens endpoint exists to refresh user’s access token via the user’s refresh token.
- Docker setup for local development.
- DTO validation with class-validator package.
- Unit tests done on nest resolvers and services using Jest.
- E2E tests done using Jest and supertest.
- .env contains DATABASE_URL, AT_SECRET, RT_SECRET, POSTGRES_USER, POSTGRES_PASSWORD, and POSTGRES_DB.
- Gql schema can be found at **server > src > schema.gql**
- Prisma schema can be found at **server > prisma > schema.prisma**
- Server was once hosted on Heroku and ran at [https://tnasello-fda-api.herokuapp.com/graphql](https://tnasello-fda-api.herokuapp.com/graphql). As of December 2022 Heroku has ended the free tier that I was using.
- Server hosting moved to Render.com and API URI is [https://fda-api-rg3c.onrender.com/graphql](https://fda-api-rg3c.onrender.com/graphql).

### Client

`npm run start` or `docker-compose up —build` to start react app at [localhost:3000](http://localhost:3000).

Create an account and sign in, or use the following user credentials: username: Kevin, password: 87654321. When first logging in, the server will take a second to boot up. This is a limitation of Heroku's free tier. See [here](https://stackoverflow.com/questions/2606190/why-are-my-basic-heroku-apps-taking-two-seconds-to-load#:~:text=Therefore%2C%20Heroku%20cuts%20down%20on,it%20takes%20time%20to%20reload.).

- Frontend server hosted on GitHub pages and running at [https://tynasello.github.io/food-delivery-app/](https://tynasello.github.io/food-delivery-app/)
- TypeScript React frontend using Apollo GraphQL to interact with backend.
- Docker setup for local development
- MUI v5 used for some styling.
- GraphQL Code Gen. used to generate code from backend schema to add TS support and TS interfaces and hooks.
- Formik with Yup validation used for the application’s forms.
- Apollo client links implemented to seamlessly refresh user’s access token when it expires.

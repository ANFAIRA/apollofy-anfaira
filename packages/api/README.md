# Apollofy API

Server App for the Apollofy music project.


## Getting Started

Create .env file in the root directory. See more in [Environment variables](#environment-variables)

To start the `api` package run yarn dev:api.

The `api` package will be run by default in the following url:
`http://localhost:4000`.

### Folder structure

- `packages/api/src/config`: the config needed by the app
- `packages/api/src/controllers`: the controllers used in the Routes of the app
- `packages/api/src/db`: the logic to connect to the database
- `packages/api/src/models`: the mongoose models used in the app
- `packages/api/src/repositories`: the repositories that perform the DB
  operations
- `packages/api/src/routes`: the routers used in the app
- `packages/api/src/services`: the services used in the app, auth, logging, etc
- `packages/api/src/utils`: helper functions

### Firebase

This app uses Firebase Auth as the auth provider, so you will need to configure
it first.


### Config

Open the `packages/api/src/config/app-config.js` file to see what configuration
the app needs to set it up.

### Environment variables

These are the required environment variables for the config of the app. The ones
that start with `FB_` are needed for the Firebase Admin config.

```bash
# .env
MONGO_DB_URL_PRODUCTION=mongodb://localhost/apollofy
MONGO_DB_URL_DEVELOPMENT=mongodb://localhost/apollofy
MONGO_DB_URL_TEST=mongodb://localhost/apollofy
PORT=4000
FB_CERT_TYPE=...
FB_CERT_PROJECT_ID=...
FB_CERT_PRIVATE_KEY_ID=...
FB_CERT_PRIVATE_KEY=...
FB_CERT_CLIENT_EMAIL=...
FB_CERT_CLIENT_ID=...
FB_CERT_AUTH_URI=...
FB_CERT_TOKEN_URI=...
FB_CERT_AUTH_PROVIDER_X_509_CERT_URL=...
FB_CERT_CLIENT_X_509_CERT_URL=...
```

## License

Licensed under the [MIT License](./LICENSE).

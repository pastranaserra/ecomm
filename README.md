# Project setup

## Prerequisites

- [Node.js](https://nodejs.org/en/) 14.15.1 or higher
- [Npm](https://www.npmjs.com/) 6.14.8 or higher

## Setup

### Install dependencies:

Run the following command in the project root:

```sh
npm i
```

### Define the project environment variables:

1. Duplicate the `.env.sample` file and rename it to `.env`.

2. Edit the `.env` file and set the listed environment variables.

   If any sample value is empty, it means that the value is optional.

## Formatting and linting

To format the project, run the following command:

```sh
npm run format
```

To analyze the project, run the following command:

```sh
npm run lint
```

### IDE integration

If you are using Visual Studio Code, you can also install the following recommended extensions:

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

With these extensions, your code will be formatted and linted automatically when you save any change.

## Launch the project

Depending on the environment, the project can be launched in one of the following ways:

```sh
# Development
npm run dev

# Production
npm start
```

The application will be available at `http://localhost:<PORT>`, where `<PORT>` is the server port defined in the `.env` file.

## Documentation

When the project is up and running, you can access the API documentation at `http://localhost:<PORT>/api/docs`, where `<PORT>` is the server port defined in the `.env` file.

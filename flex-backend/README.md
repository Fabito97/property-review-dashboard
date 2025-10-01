
# Flex Backend API

This is the backend service for the Flex Living assessment project. It is a Node.js application built with Express and TypeScript.

## Features

- **Data Normalization**: Parses and normalizes data from a mocked Hostaway JSON file.
- **RESTful API**: Exposes a simple RESTful API to be consumed by the frontend.

## Getting Started

### Prerequisites

- Node.js (v18 or later)

### Installation

1.  Navigate to the `flex-backend` directory:
    ```bash
    cd flex-backend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

### Running the Application

To run the backend server in development mode (with hot-reloading):

```bash
npm run dev
```

The server will start on the port specified in your `.env.development.local` file (defaults to `5000`).

## API Endpoints

The following endpoints are available:

- **`GET /api/properties`**: Fetches all properties.
- **`GET /api/reviews`**: Fetches all reviews.

## Environment Variables

The backend uses the following environment variables, which can be set in a `.env.development.local` file:

- `PORT`: The port for the server to listen on.
- `HOSTAWAY_API_URL`: The URL for the Hostaway API.
- `HOSTAWAY_API_KEY`: The API key for the Hostaway API.
- `HOSTAWAY_SECRET`: The secret for the Hostaway API.

## Project Structure

```
flex-backend/
├── src/
│   ├── app.ts               # Express app setup
│   ├── env.ts               # Environment variable management
│   ├── controllers/         # Route handlers
│   ├── models/              # Data models
│   ├── routes/              # API routes
│   ├── services/            # Business logic
│   └── utils/               # Utility functions
├── package.json
└── tsconfig.json
```

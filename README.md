
# 🏡 Flex Living - Developer Assessment

This project is a full-stack application built for the Flex Living developer assessment. It features a manager dashboard for property and review management and a public-facing page to display approved reviews.

## Architecture

This project uses a monorepo architecture, containing three separate projects:

- **`flex-backend`**: A Node.js/Express backend that serves as the API.
- **`flex-frontend`**: A Next.js application for the manager dashboard and public pages.
- **`flex-frontend-react`**: A React/Vite application, also for the manager dashboard.

For detailed information on each project, please refer to their individual `README.md` files:

- [`flex-backend/README.md`](./flex-backend/README.md)
- [`flex-frontend/README.md`](./flex-frontend/README.md)
- [`flex-frontend-react/README.md`](./flex-frontend-react/README.md)

## Features

- **Manager Dashboard**: An intuitive interface to view per-property performance, filter/sort reviews by rating, category, and channel, and select reviews for public display.
- **Review Display Page**: A replica of the Flex Living website to display approved reviews.

## Getting Started

### Prerequisites

- Node.js (v18 or later)

### Installation

To get the project running locally, clone the repository and install the dependencies for each project:

```bash
git clone <your-repo-url>
cd flex-living-assessment

# Install backend dependencies
cd flex-backend
npm install

# Install Next.js frontend dependencies
cd ../flex-frontend
npm install

# Install React/Vite frontend dependencies
cd ../flex-frontend-react
npm install
```

### Running the Applications

Each project can be run individually from its respective directory:

- **Backend** (`flex-backend`):
  ```bash
  npm run dev
  ```

- **Frontend (Next.js)** (`flex-frontend`):
  ```bash
  npm run dev
  ```

- **Frontend (React/Vite)** (`flex-frontend-react`):
  ```bash
  npm run dev
  ```

## Key Design and Logic Decisions

1.  **Data Normalization**: The mocked Hostaway JSON data is parsed and normalized in the backend. This creates a consistent data structure that the frontend can easily consume, decoupling it from the raw external API structure.

2.  **State Management**: The frontend applications use modern state management solutions (Zustand for Next.js and React Context for the Vite app) for a lightweight and efficient way to handle global state.

3.  **API Behavior**: The backend exposes a simple RESTful API. The "selected for public display" state is managed on the frontend.

4.  **UI/UX Design**: The dashboard is designed for clarity and actionable insights, with at-a-glance metrics and intuitive filtering.

## Google Reviews Integration Findings

- **Feasibility**: Integration with Google Reviews is technically feasible using the Google Places API.
- **Implementation Details**: This would require a Google Places API key, associating properties with Google Place IDs, and creating a new backend endpoint to fetch and normalize the review data.
- **Decision**: Due to the sandboxed nature of this assessment, a basic implementation was not completed. However, the path to integration is clear and would be a straightforward next step.

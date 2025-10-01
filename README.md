# Flex Living — Developer Assessment (Reviews Dashboard)

## Introduction

This project implements a Reviews Dashboard for Flex Living, designed to help managers assess property performance based on guest feedback. The solution integrates with Hostaway’s Reviews API (using mocks when no reviews are returned) and provides a manager-facing dashboard where reviews can be filtered, grouped, and approved for display on property pages.

## Scope of Work

1. **Hostaway Integration (Mocked)**

   * Integrated with Hostaway’s Reviews API, with fallback to dynamically generated mock reviews since the API is sandboxed and returns no reviews.
   * Reviews are normalized into a consistent schema with grouped outputs (by listing, type, channel, date).
   * Mock data uses randomized values for fields like approval (`isApproved` can be true or false) to simulate real-world variety.

2. **Manager Dashboard**

   * User-friendly dashboard displaying property-level performance.
   * Supports filtering and sorting by rating, category, channel, or time.
   * Managers can approve reviews for public display.

3. **Review Display Page**

   * Replicates Flex Living property details layout.
   * Displays reviews that managers have approved.
   * Ensures style consistency with the property page.

4. **Exploration of Google Review Integration**

   * As part of the project, I explored the feasibility of adding Google Reviews through the **Google Places API** using `place_id` identifiers.
   * **Findings:**

     * It is technically possible to fetch reviews in a read-only manner.
     * API quotas are restrictive, and the availability of reviews is inconsistent across properties.
     * Implementing this feature would require additional time for setup, testing, and validation, which could not be justified within the assessment’s time constraints.
   * **Decision:** The integration was excluded from the final build. However, the exploration is documented here to show awareness of potential enhancements and to highlight trade-offs made due to limited time and project scope.


## Tech Stack Used

- **Frontend**: React, React Router (Data APIs), Tailwind CSS  
- **Backend**: Node.js, Express, TypeScript  
- **State Management**: React Context (`AppContext`)  
- **API Layer**: Axios  
- **Deployment**: Render (frontend + backend services)  
- **Utilities**: Mock data generator for reviews, grouping/normalization helpers


## Setup Instructions

Each stack includes its own setup guide in its root folder.

* **Backend** (`flex-backend`): Express + TypeScript service exposing `/api/reviews/hostaway`.
* **Frontend** (`flex-frontend`): React-based dashboard consuming the backend API.

Run each independently following their respective setup instructions.

## API Behavior

* Route: `GET /api/reviews/hostaway`
* Fetches reviews from Hostaway or generates mock reviews if none are available.
* Normalized response includes:

  * Individual reviews (consistent schema)
  * Grouped reviews (by listing, type, channel, date)
  * Listing stats (reviewCount, averageRating, flaggedCount, etc.)
  * Global summary (total reviews, rating distribution, averages)

## Normalization Rules

* Fields standardized across raw sources.
* Ratings mapped to a 1–10 scale.
* Approval (`isApproved`) defaults randomly in mock data to simulate real-world conditions.
* Grouping utilities provided for listing, type, channel, and date.

## Testing the API

1. Start the backend service:

   ```bash
   cd flex-backend
   npm install
   npm run dev
   ```
2. Call the API:

   ```bash
   curl http://localhost:3001/api/reviews/hostaway
   ```
3. Confirm that the response includes `reviews`, `groups`, `listingStats`, and `summary`.

## Deployment & GitHub

- **Backend (Render)**: [https://flex-backend.onrender.com](https://flex-backend.onrender.com)  
- **Frontend (Render)**: [https://flex-frontend.onrender.com](https://flex-frontend.onrender.com)  

- **GitHub Repository**: [https://github.com/Fabito97/property-review-dashboard](https://github.com/Fabito97/property-review-dashboard)


## Further Improvements

* Add contract tests (supertest) to validate response schema.
* Implement end-to-end test flow (backend + frontend).
* Extend normalization for richer Hostaway metadata.
* Revisit Google Reviews integration with expanded time and scope.

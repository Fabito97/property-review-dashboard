import { Property } from "../models/property";
import Review from "../models/review";
import {
  channels,
  guestNames,
  listingPool,
  mockLocations,
  PropertyImages,
  publicReviews,
  types,
} from "./mockData";

// global review store
export const mockReviews: Review[] = generateMockReviews(50);

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomDate(start: Date, end: Date) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

export function generateMockReviews(count: number): Review[] {
  const reviews: Review[] = [];

  for (let i = 1; i <= count; i++) {
    const listing = randomFrom(listingPool);
    const type = randomFrom(types);
    const channel = randomFrom(channels);
    const rating =
      Math.random() > 0.2 ? Math.floor(Math.random() * 3) + 8 : null; // mostly 8–10, sometimes null
    const date = randomDate(new Date(2024, 5, 1), new Date(2024, 8, 30)); // between June–Sept 2024

    reviews.push({
      id: i,
      listingId: listing.id,
      listingName: listing.name,
      type,
      status: "published",
      rating,
      channel,
      publicReview: randomFrom(publicReviews),
      categories: [
        { category: "cleanliness", rating: rating ?? 8 },
        { category: "communication", rating: rating ?? 8 },
      ],
      submittedAt: date.toISOString(),
      submittedAtIso: date.toISOString(),
      guestName:
        type === "guest-to-host" ? randomFrom(guestNames) : "Host Feedback",
      isApproved: Math.random() > 0.5,
      location: mockLocations[Math.floor(Math.random() * mockLocations.length)],
    });
  }

  return reviews;
}

// then properties just pull from here
export function generateMockProperty(listingId: string): Property {
  const listing = listingPool.find((l) => l.id === listingId);

  if (!listing) {
    throw new Error(`Listing with id ${listingId} not found in mock pool`);
  }

  const reviews = mockReviews.filter((r) => r.listingId === listingId);

  const overallRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + (r.rating ?? 0), 0) / reviews.length
      : null;

  return {
    id: listing.id,
    name: listing.name,
    description: `${listing.name} – cozy, modern and well-located.`,
    overallRating,
    reviewCount: reviews.length,
    ratingPercentage: overallRating ? `${(overallRating / 10) * 100}%` : "N/A",
    createdAt: new Date().toISOString(),
    reviews,
    location: mockLocations[Math.floor(Math.random() * mockLocations.length)],
    images: PropertyImages,
  };
}

export function generateMockProperties(count: number = 5): Property[] {
  return listingPool.slice(0, count).map((l) => generateMockProperty(l.id));
}

// for all reviews
export function fetchAllMockReviews(): Review[] {
  return mockReviews;
}

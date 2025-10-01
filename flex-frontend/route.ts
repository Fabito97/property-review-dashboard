import { mockReviews } from "@/types/review";
import { NextResponse } from "next/server";

/**
 * Fetches and normalizes reviews from the (mocked) Hostaway source.
 * In a real-world scenario, this would involve:
 * 1. Calling the Hostaway API with the provided credentials.
 * 2. Normalizing the raw API response into our application's `Review` format.
 * 3. Handling potential errors, caching, and pagination.
 *
 * For this task, we are returning the mock data directly.
 */
export async function GET() {
  // TODO: Implement actual API call to Hostaway and normalize the data.
  // For now, we return the mock data.

  return NextResponse.json({ reviews: mockReviews });
}

import axios from "axios";
import qs from "qs";
import { ACCOUNT_ID, API_KEY } from "../env";
import {
  normalizeHostawayProperty,
  normalizeReview,
} from "../utils/normailizationUtils";
import { NormalizedReview } from "../types";
import { generateMockReviews } from "../mocks/mockDataGenerator";
import Review from "../models/review";
import { generateMockProperty } from "../mocks/mockDataGenerator";
import { Property } from "../models/property";

const HOSTAWAY_BASE = "https://api.hostaway.com/v1";
let cachedToken: string | null = null;

/**
 * Get an access token from Hostaway (cached after first request).
 */
export async function getAccessToken(): Promise<string | null> {
  if (cachedToken) {
    console.log("Using cached Hostaway token");
    return cachedToken;
  }

  try {
    const response = await axios.post(
      `${HOSTAWAY_BASE}/accessTokens`,
      qs.stringify({
        grant_type: "client_credentials",
        client_id: ACCOUNT_ID,
        client_secret: API_KEY,
        scope: "general",
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const { access_token } = response.data;
    if (!access_token)
      throw new Error("No access_token returned from Hostaway");

    cachedToken = access_token;
    console.log(
      "AccessToken received:",
      cachedToken?.slice(0, 10) + "********"
    );
    return cachedToken;
  } catch (err: any) {
    console.error(
      "Failed to get Hostaway token:",
      err.response?.data || err.message
    );
    throw new Error("Failed to get Hostaway token");
  }
}

/**
 * Fetch reviews for a single property.
 * Falls back to mock reviews if Hostaway returns empty.
 */
export async function fetchPropertyReviews(
  propertyId: string
): Promise<Review[]> {
  try {
    const token = await getAccessToken();
    const url = `${HOSTAWAY_BASE}/properties/${encodeURIComponent(
      propertyId
    )}/reviews`;

    const resp = await axios.get(url, {
      headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
    });

    const reviews = resp.data?.result ?? [];
    if (!reviews.length) {
      console.log(
        `No reviews from Hostaway, falling back to mocks for property ${propertyId}`
      );
      return generateMockReviews(10).filter((r) => r.listingId === propertyId);
    }

    return reviews.map((r: any) => normalizeReview(r, "hostaway"));
  } catch (err) {
    console.error(`Failed to fetch reviews for property ${propertyId}:`, err);
    // Always fall back to mock data
    return generateMockReviews(10).filter((r) => r.listingId === propertyId);
  }
}

/**
 * Fetch all reviews across properties.
 * Falls back to a generated mock dataset if Hostaway is empty.
 */
export async function fetchAllReviews(): Promise<Review[]> {
  try {
    const token = await getAccessToken();
    const url = `${HOSTAWAY_BASE}/reviews`;

    const resp = await axios.get(url, {
      headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
    });

    const reviews = resp.data?.result ?? [];
    if (!reviews.length) {
      console.log("No Hostaway reviews, using mocked dataset instead");
      return generateMockReviews(50);
    }

    return reviews.map((r: any) => normalizeReview(r, "hostaway"));
  } catch (err) {
    console.error("Failed to fetch all reviews:", err);
    return generateMockReviews(50); // Always fallback
  }
}

/**
 * Fetch single property from hostaway.
 * Falls back to a generated mock property doesn't have a property with the provided id.
 */
export async function getProperty(listingId: string): Promise<Property> {
  const token = await getAccessToken();

  try {
    const response = await fetch(`${HOSTAWAY_BASE}/listings/${listingId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.warn(`Hostaway error ${response.status}`);
    }

    const data = await response.json();

    // Normalize Hostaway response into our Property type
    return normalizeHostawayProperty(data.result);
  } catch (err) {
    console.warn("Falling back to mock property:", err);
    return generateMockProperty(listingId);
  }
}

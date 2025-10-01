// utils/normalize.ts

import { Property } from "../models/property";
import Review from "../models/review";
import { NormalizedReview } from "../types";

export const normalizeHostawayProperty = (data: any): Property => {
  return {
    id: String(data.id),
    name: data.name,
    description: data.description ?? null,
    overallRating: data.averageReviewRating ?? null,
    reviewCount: data.reviewCount ?? 0,

    ratingPercentage: data.averageReviewRating
      ? `${(data.averageReviewRating / 10) * 100}%`
      : "N/A",

    createdAt: new Date().toISOString(),
    reviews: [],
    location:
      `${data.state ?? ""}, ${data.country ?? ""}`.trim(),

    channel: "hostaway",
    amenities: data.listingAmenities.map((a: any) => a.amenityName),

    images: (data.listingImages ?? []).map((img: any) => ({
      url: img.url,
      caption: img.caption,
      sortOrder: img.sortOrder,
      id: img.id,
    })),
  };
};

export function normalizeReview(
  raw: any,
  channel = "hostaway"
): NormalizedReview {
  const iso = raw.submittedAt ? new Date(raw.submittedAt).toISOString() : null;

  return {
    id: String(raw.id ?? raw.reviewId ?? Math.random()),
    listingId: raw.propertyId ?? raw.listingId ?? "unknown",
    listingName: raw.listingName ?? raw.propertyName ?? "Unknown Listing",
    type: raw.type ?? "unknown",
    status: raw.status ?? "published",
    rating: raw.rating ?? null,
    channel,
    publicReview: raw.publicReview ?? raw.comment ?? raw.text ?? "",
    categories: raw.reviewCategory ?? [], // keep as array for consistency
    submittedAt: raw.submittedAt ?? null,
    submittedAtIso: iso || "",
    guestName: raw.guestName ?? raw.reviewerName ?? "Anonymous",
    isApproved: false, // default for dashboard override
  };
}

export function normalizeReviews(rawReviews: any[], channel = "hostaway") {
  return rawReviews.map((r) => normalizeReview(r, channel));
}

export function groupByListing(reviews: Review[]) {
  return reviews.reduce<Record<string, Review[]>>((acc, r) => {
    const key = r.listingId ?? "unknown";
    if (!acc[key]) acc[key] = [];
    acc[key].push(r);
    return acc;
  }, {});
}

export function groupByType(reviews: Review[]) {
  return reviews.reduce<Record<string, Review[]>>((acc, r) => {
    const key = r.type ?? "unknown";
    if (!acc[key]) acc[key] = [];
    acc[key].push(r);
    return acc;
  }, {});
}

export function groupByChannel(reviews: Review[]) {
  return reviews.reduce<Record<string, Review[]>>((acc, r) => {
    const key = r.channel ?? "unknown";
    if (!acc[key]) acc[key] = [];
    acc[key].push(r);
    return acc;
  }, {});
}

export function groupByDate(reviews: Review[]) {
  return reviews.reduce<Record<string, Review[]>>((acc, r) => {
    const key = r.submittedAtIso
      ? r.submittedAtIso.split("T")[0] // YYYY-MM-DD
      : "unknown";
    if (!acc[key]) acc[key] = [];
    acc[key].push(r);
    return acc;
  }, {});
}

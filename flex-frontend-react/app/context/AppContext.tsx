import { createContext, useContext, useEffect, useState } from "react";
import { apiRequest } from "../lib/api/axios"; // adjust path to your axios file
import type { Property } from "~/types/property";
import type { Review } from "~/types/review";
import type { ReviewApiResponse } from "~/types";

type AppContextType = {
  reviewData: ReviewApiResponse | null;
  properties: Property[];
  loadingProperties: boolean;
  loadingReviews: boolean;
  fetchProperties: () => Promise<void>;
  fetchReviews: () => Promise<void>;
  toggleReviewApproval: (review: Review) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppDataProvider({ children }: { children: React.ReactNode }) {
  const [reviewData, setReviewData] = useState<ReviewApiResponse | null>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loadingProperties, setLoadingProperties] = useState(false);
  const [loadingReviews, setLoadingReviews] = useState(false);

  console.log("Properties:", properties);
  console.log("Reviews:", reviewData?.reviews);

  // Utility to derive properties from reviews
  function extractPropertiesFromReviews(reviews: Review[]): Property[] {
    const map = new Map<string, Property>();

    for (const review of reviews) {
      if (!review.listingId) continue;

      const listingId = review.listingId.toString();

      const existing = map.get(listingId);

      if (!existing) {
        map.set(listingId, {
          id: listingId,
          name: review.listingName ?? "",
          location: review.location ?? undefined,
          overallRating: review.rating ?? null,
          reviewCount: 1,
          ratingPercentage: review.rating
            ? `${Math.round(review.rating * 10)}%`
            : "N/A",
          createdAt: review.submittedAtIso ?? undefined,
          reviews: [review],
          type: review.type,
        });
      } else {
        existing.reviews.push(review);
        const rated = existing.reviews.filter((rev) => rev.rating != null);
        const avg =
          rated.length > 0
            ? rated.reduce((sum, rev) => sum + (rev.rating ?? 0), 0) /
              rated.length
            : null;

        existing.reviewCount = existing.reviews.length;
        existing.overallRating = avg;
        existing.ratingPercentage =
          avg != null ? `${Math.round(avg * 10)}%` : "N/A";
      }
    }
    console.log("Map:", map);
    return Array.from(map.values());
  }

  const fetchReviews = async () => {
    setLoadingReviews(true);
    try {
      const res = await apiRequest<any>("get", "/reviews/hostaway");
      const data = res.data as ReviewApiResponse;
      setReviewData(data);

      const derived = extractPropertiesFromReviews(data.reviews);
      setProperties(derived);
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
    } finally {
      setLoadingReviews(false);
    }
  };

  // Toggle review approval (updates reviewData and regenerates properties)
  const toggleReviewApproval = (    
    review: Review
  ) => {
  if (!reviewData) return;
    const updated = {
      ...reviewData,
      reviews: reviewData.reviews.map((r) =>
        r.id === review.id ? { ...r, isApproved: !r.isApproved } : r
      ),
    };
    setReviewData(updated); 
  };

  const fetchProperties = async () => {    
    setLoadingProperties(true);
    try {
      // Placeholder for future property fetch
      setProperties([]);
    } finally {
      setLoadingProperties(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  useEffect(() => {
    if (reviewData) {
      setProperties(extractPropertiesFromReviews(reviewData.reviews));
    } else {
      setProperties([]);
    }
  }, [reviewData]);

  return (
    <AppContext.Provider
      value={{
        properties,
        reviewData,
        loadingProperties,
        loadingReviews,
        fetchProperties,
        fetchReviews,
        toggleReviewApproval,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useAppData = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppData must be used inside AppDataProvider");
  return ctx;
};

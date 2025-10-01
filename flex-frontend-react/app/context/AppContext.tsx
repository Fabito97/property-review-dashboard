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
  toggleReviewApproval: (reviewId: string | number, approved: boolean) => void;
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
  function derivePropertiesFromReviews(reviews: Review[]): Property[] {
    const map = new Map<string, Property>();

    for (const r of reviews) {
      if (!r.listingId) continue;

      const listingId = r.listingId.toString();

      const existing = map.get(listingId);

      if (!existing) {
        map.set(listingId, {
          id: listingId,
          name: r.listingName ?? "",
          location: r.location ?? undefined,
          overallRating: r.rating ?? null,
          reviewCount: 1,
          ratingPercentage: r.rating ? `${Math.round(r.rating * 10)}%` : "N/A",
          createdAt: r.submittedAtIso ?? undefined,
          reviews: [r],
          type: r.type,
        });
      } else {
        existing.reviews.push(r);
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

    return Array.from(map.values());
  }

  const fetchReviews = async () => {
    setLoadingReviews(true);
    try {
      const res = await apiRequest<any>("get", "/reviews/hostaway");
      const data = res.data as ReviewApiResponse;
      setReviewData(data);

      const derived = derivePropertiesFromReviews(data.reviews);
      setProperties(derived);
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
    } finally {
      setLoadingReviews(false);
    }
  };

  // Toggle review approval (updates reviewData and regenerates properties)
  const toggleReviewApproval = (
    reviewId: string | number,
    approved: boolean
  ) => {
    if (!reviewData) return;
    const updated = {
      ...reviewData,
      reviews: reviewData.reviews.map((r) =>
        r.id === reviewId ? { ...r, isApproved: approved } : r
      ),
    };

    setReviewData(updated);
    const derived = derivePropertiesFromReviews(updated.reviews);
    setProperties(derived);
  };

  const fetchProperties = async () => {
    // Optional: if you later want to fetch properties separately
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

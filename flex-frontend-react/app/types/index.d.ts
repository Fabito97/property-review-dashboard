// export type ReviewApiResponse = {
//   count: number;
//   reviews: Review[];
//   groups: {
//     byListing: Record<string, Review[]>;
//     byType: Record<string, Review[]>;
//     byChannel: Record<string, Review[]>;
//     byDate: Record<string, Review[]>;
//   };
//   listingStats: Record<string, {
//     reviewCount: number;
//     averageRating: number | null;
//     ratingPercentage: string;
//     flaggedCount: number;
//   }>;
//   summary: {
//     totalReviews: number;
//     averageRating: number | null;
//     ratingDistribution: Record<string, number>;
//     totalFlaggedCount: number;
//   };
// };

export type ReviewGroups = {
  byListing: Record<string, Review[]>;
  byType: Record<string, Review[]>;
  byChannel: Record<string, Review[]>;
  byDate: Record<string, Review[]>;
};

type ListingStats = Record<
  string,
  {
    reviewCount: number;
    averageRating: number | null;
    ratingPercentage: string;
    flaggedCount: number;
  }
>;

export type ReviewSummary = {
  totalReviews: number;
  averageRating: number | null;
  ratingDistribution: Record<string, number>;
  totalFlaggedCount: number;
};

export type ReviewApiResponse = {
  count: number;
  reviews: Review[];
  groups: ReviewGroups;
  listingStats: ListingStats;
  summary: ReviewSummary;
};
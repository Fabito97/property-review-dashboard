import { Request, Response } from "express";
import Review from "../models/review";
import { mockReviews } from "../mocks/mockDataGenerator";
import {
  groupByListing,
  groupByType,
  groupByChannel,
  groupByDate,
} from "../utils/normailizationUtils";

const getHostawayReviews = async (req: Request, res: Response) => {
  try {
    const reviews: Review[] = mockReviews;

    // Sort newest first
    reviews.sort((a, b) => {
      const timeA = a.submittedAtIso ? Date.parse(a.submittedAtIso) : 0;
      const timeB = b.submittedAtIso ? Date.parse(b.submittedAtIso) : 0;
      return timeB - timeA;
    });

    // Groupings
    const groupedByListing = groupByListing(reviews);
    const groupedByType = groupByType(reviews);
    const groupedByChannel = groupByChannel(reviews);
    const groupedByDate = groupByDate(reviews);

    // Listing stats with flagged count
    const listingStats: Record<string, {
      reviewCount: number;
      averageRating: number | null;
      ratingPercentage: string;
      flaggedCount: number;
    }> = {};

    for (const [listingId, listingReviews] of Object.entries(groupedByListing)) {
      const rated = listingReviews.filter(r => r.rating != null);
      const count = rated.length;
      const avg = count ? rated.reduce((sum, r) => sum + (r.rating ?? 0), 0) / count : null;

      const flaggedCount = listingReviews.filter(
        (r) =>
          (r.rating != null && r.rating <= 5) ||
          !r.publicReview?.trim()
      ).length;

      listingStats[listingId] = {
        reviewCount: listingReviews.length,
        averageRating: avg,
        ratingPercentage: avg != null ? `${Math.round(avg * 10)}%` : "N/A",
        flaggedCount,
      };
    }

    // Summary block
    const ratedReviews = reviews.filter(r => r.rating != null);
    const ratingDistribution: Record<string, number> = {};
    for (let i = 1; i <= 10; i++) ratingDistribution[i] = 0;
    for (const r of ratedReviews) {
      const score = Math.round(r.rating ?? 0);
      if (score >= 1 && score <= 10) ratingDistribution[score]++;
    }

    const totalFlaggedCount = reviews.filter(
      (r) =>
        (r.rating != null && r.rating <= 5) ||
        !r.publicReview?.trim()
    ).length;

    const summary = {
      totalReviews: reviews.length,
      averageRating: ratedReviews.length
        ? parseFloat((ratedReviews.reduce((sum, r) => sum + (r.rating ?? 0), 0) / ratedReviews.length).toFixed(1))
        : null,
      ratingDistribution,
      totalFlaggedCount,
    };

    return res.json({
      success: true,
      data: {
        count: reviews.length,
        reviews,
        groups: {
          byListing: groupedByListing,
          byType: groupedByType,
          byChannel: groupedByChannel,
          byDate: groupedByDate,
        },
        listingStats,
        summary,
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return res.status(500).json({ success: false, error: message });
  }
};

export default getHostawayReviews;
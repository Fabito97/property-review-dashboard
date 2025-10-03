import React from "react";
import {
  ChatBubbleIcon,
  CheckCircledIcon,
  ExclamationTriangleIcon,
  StarIcon,
} from "@radix-ui/react-icons";
import type { ReviewSummary } from "~/types";
import Skeleton from "~/components/ui/SkeletonLoader";


interface ReviewStatsOverviewProps {
  summary?: ReviewSummary;
  loading?: boolean;
}

const ReviewStatsOverview: React.FC<ReviewStatsOverviewProps> = ({
  summary,
  loading = false,
}) => {
  
   if (loading || !summary) {
    return (
      <section>
        <h2 className="text-xl sm:text-2xl font-bold mb-6">Review Insights</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 flex items-center justify-between"
            >
              <div className="flex-1 space-y-2">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
              <Skeleton className="h-10 w-10 rounded-lg" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  const {
    totalReviews,
    averageRating,
    totalFlaggedCount,
    ratingDistribution,
  } = summary;

  const positiveCount = Object.entries(ratingDistribution)
    .filter(([score]) => parseInt(score) >= 8)
    .reduce((sum, [, count]) => sum + count, 0);

  const approvalRate =
    totalReviews > 0 ? `${Math.round((positiveCount / totalReviews) * 100)}%` : "—";
  const flaggedRate =
    totalReviews > 0 ? `${Math.round((totalFlaggedCount / totalReviews) * 100)}%` : "—";

  const metrics = [
    {
      label: "Total Reviews",
      value: totalReviews,
      icon: ChatBubbleIcon,
      summary: "across all properties",
    },
    {
      label: "Approval Rate",
      value: approvalRate,
      icon: CheckCircledIcon,
      summary: "based on high ratings",
    },
    {
      label: "Flagged Issues",
      value: flaggedRate,
      icon: ExclamationTriangleIcon,
      summary: "based on low ratings",
    },
    {
      label: "Average Rating",
      value: averageRating ?? "—",
      icon: StarIcon,
      summary: "guest-to-host only",
    },
  ];

  const getTextColor = (label: string, value: string | number) => {
    if (label === "Flagged Issues" && parseInt(value as string) > 20) return "text-red-700";
    if (label === "Approval Rate" && parseInt(value as string) >= 80) return "text-green-600";
    if (label === "Total Reviews") return "text-blue-700";
    return "text-gray-800";
  };

  return (
    <section>
      <h2 className="text-xl sm:text-2xl font-bold mb-6">Review Insights</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map(({ label, value, icon: Icon, summary }) => (
          <div
            key={label}
            className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 flex items-center justify-between"
          >
            <div>
              <p className={`text-2xl font-semibold ${getTextColor(label, value)}`}>{value}</p>
              <p className="text-sm font-medium text-gray-600 mt-1">{label}</p>
              {summary && <p className="text-xs text-gray-500 mt-1">{summary}</p>}
            </div>
            <div className="h-10 w-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <Icon className="h-5 w-5 text-blue-600" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReviewStatsOverview;
import React from "react";
import { CalendarIcon, GlobeIcon, StarFilledIcon } from "@radix-ui/react-icons";
import { getSentimentTag } from "~/lib/utils";
import type { Review } from "~/types/review";
import UserIcon from "~/icons/UserIcon";

interface ReviewCardProps {
  review: Review;
  onApproveToggle?: (id: string | number, approved: boolean) => void;
  showPublicStatus?: boolean;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  review,
  onApproveToggle,
  showPublicStatus = true,
}) => {
  const sentiment = getSentimentTag(review?.rating || 0);

  const getChannelColor = (channel: string) => {
    switch (channel) {
      case "Airbnb":
        return "bg-red-100 text-red-800";
      case "Booking.com":
        return "bg-blue-100 text-blue-800";
      case "VRBO":
        return "bg-purple-100 text-purple-800";
      case "Google":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formattedDate = review.submittedAt
    ? new Date(review.submittedAt).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "—";

  return (
    <div className="borde border-gray-200 rounded-lg p-4 transition-shadow">
      {/* Header info */}
      <div className="mb-10 space-y-2 text-sm text-gray-700">
        <div className="flex justify-between items-center gap-4 text-gray-600 pt-2">
          <span className="font-bold">{review.listingName || "—"}</span>
          {showPublicStatus && review.isApproved && (
          <div className="flex items-center text-green-600 text-xs">
            <GlobeIcon className="h-4 w-4 mr-1" />
            <span>Public</span>
          </div>
        )}          
        </div>
      </div>

      {/* Guest info */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1">
          <UserIcon className="h-5 w-5 text-blue-500" />
          <span className="font-medium">{review.guestName || "—"}</span>
        </div>
        <div className="flex items-center text-sm">
            <CalendarIcon className="h-4 w-4 mr-1" />
            <span>{formattedDate}</span>
          </div>
      </div>

      {/* Rating stars */}
      <div className="flex items-center justify-between gap-1 my-2 mt-8">
          <h3 className="font-medium text-gray-900 mr-4">Review</h3>
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }, (_, i) => (
            <StarFilledIcon
              key={i}
              className={`h-4 w-4 ${i < (review.rating || 0) ? "text-yellow-400" : "text-gray-300"}`}
            />
          ))}
          <span className="ml-2 text-sm text-gray-600">
            {review.rating ?? "—"}
          </span>
        </div>
      </div>

      {/* Public review */}
      <div>
        {/* <span className="font-semibold mb-2">Comment</span> */}
        <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-line shadow-sm border border-gray-100 bg-gray-50 p-5 rounded-md mt-2">
          {review.publicReview || "—"}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 my-4">
        {review.channel && (
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full ${getChannelColor(review.channel)}`}
          >
            {review.channel}
          </span>
        )}

        {sentiment && (
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full ${sentiment.color}`}
          >
            {sentiment.label}
          </span>
        )}

        {(review.categories || []).map((c) => (
          <span
            key={c.category}
            className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
          >
            {c.category}
          </span>
        ))}
      </div>

      {/* Optional approve toggle */}
      {/* {onApproveToggle && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => onApproveToggle(review.id, !review.isApproved)}
            className={`px-3 py-1 text-xs rounded-md transition-colors ${
              review.isApproved
                ? 'text-green-600 bg-green-50 hover:bg-green-100'
                : 'text-gray-500 bg-gray-50 hover:bg-gray-100'
            }`}
          >
            {review.isApproved ? 'Approved' : 'Pending'}
          </button>
        </div>
      )} */}
    </div>
  );
};

export default ReviewCard;

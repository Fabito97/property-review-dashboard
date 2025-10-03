import React from "react";
import { Star, Calendar, Eye, EyeOff, Globe, UserIcon } from "lucide-react";
import type { Review } from "~/types/review";
import { formatDate, getChannelColor, getChannelTag } from "~/lib/utils";

interface ReviewCardProps {
  review: Review;
  onToggleApproval?: (review: Review) => void;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  review,
  onToggleApproval,
}) => {
  const formattedDate = new Date(review.submittedAt).toLocaleDateString();

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2 justify-center">

        <h4 className="font-medium text-gray-900 mb-1">Rating</h4>
        
      {review.rating && (
        <div className="flex items-center gap-1 mb-1">
          {Array.from({ length: review?.rating / 2 }, (_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${i < (review.rating || 0) ? "text-yellow-400" : "text-gray-300"}`}
            />
          ))}
          <span className="text-sm text-gray-600 ml-2">
            {review.rating ?? "—"}
          </span>
        </div>
      )}
        </div>

        {onToggleApproval && (
          <button
            onClick={() => onToggleApproval(review)}
            className={`p-2 rounded-md transition-colors ${
              review.isApproved
                ? "text-green-600 bg-green-50 hover:bg-green-100"
                : "text-gray-400 bg-gray-50 hover:bg-gray-100"
            }`}
            title={review.isApproved ? "Hide from public" : "Show to public"}
          >
            {review.isApproved ? (
              <Eye className="h-4 w-4" />
            ) : (
              <EyeOff className="h-4 w-4" />
            )}
          </button>
        )}
      </div>

      <div className="">
        <div className="text-sm text-gray-600 flex justify-between items-center gap-2 w-full">
          <div className="flex items-center gap-2">
            <UserIcon className="w-4 h-4" />
            <span>{review.guestName}</span>
            {/* <span>{review.listingName}</span> */}
          </div>
          <span className="flex items-center">
            <Calendar className="h-4 w-4 mr-1 text-blue-400" />
            {formatDate(formattedDate)}
          </span>
        </div>
        <div className="flex flex-wrap justify-between gap-2 mt-2">
          <div className="flex items-center gap-1">
            <Globe className="h-4 w-4 mr-1" />

            {/* <p>Channel -</p>  */}
            {review.channel && (
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${getChannelColor(review.channel)}`}
              >
                {review.channel}
              </span>
            )}
          </div>
          <div>
            {(review.categories || []).map((c) => (
              <span
                key={c.category}
                className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
              >
                {c.category}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* {review.rating && (
        <div className="flex items-center gap-1 mb-1 pt-4">
          {Array.from({ length: review?.rating / 2 }, (_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${i < (review.rating || 0) ? "text-yellow-400" : "text-gray-300"}`}
            />
          ))}
          <span className="text-sm text-gray-600 ml-2">
            {review.rating ?? "—"}
          </span>
        </div>
      )} */}
      <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line pt-4">
        {review.publicReview}
      </p>
    </div>
  );
};

export default ReviewCard;

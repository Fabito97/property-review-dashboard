import { useState } from "react";
import { Menu } from "@headlessui/react";
import type { Review } from "~/types/review";
import { useNavigate } from "react-router";
import { getChannelColor, getRatingBadge, getSentimentTag } from "~/lib/utils";
import Skeleton from "../ui/SkeletonLoader";

type ReviewTableProps = {
  reviews: Review[];
  onApproveToggle: (review: Review) => void;
  onReviewClick: (review: Review) => void;
  onFlag?: (id: string | number) => void;
  isRecentReviews?: boolean;
  isLoading?: boolean;
};

export default function ReviewTable({
  reviews,
  onApproveToggle,
  onReviewClick,
  onFlag,
  isRecentReviews = true,
  isLoading,
}: ReviewTableProps) {
  const navigate = useNavigate();

  if (isLoading || !reviews) {
    return (
      <div>
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="px-2 w-full bg-white shadow-md rounded-md p-6 border border-gray-100">
      <div className="overflow-x-auto ">
        <table className="min-w-full text-xs md:text-sm">
          <thead>
            <tr className="border-b border-b-gray-200 text-gray-400">
              <th className="text-left py-2 px-3 font-medium">Guest</th>
              <th className="text-left py-2 px-3 font-medium">Property</th>
              <th className="text-left py-2 px-3 font-medium">Rating</th>
              <th className="text-left py-2 px-3 font-medium">Channel</th>
              <th className="text-left py-2 px-3 font-medium">Review</th>
              <th className="text-left py-2 px-3 font-medium">Submitted</th>
              <th className="text-left py-2 px-3 font-medium">Status</th>
              <th className="text-left py-2 px-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review, index) => (
              <tr
                key={review.id}
                className={`${
                  index !== reviews.length - 1
                    ? "border-b border-b-gray-200"
                    : ""
                } hover:bg-gray-50 cursor-pointer`}
                onClick={() => onReviewClick(review)}
              >
                <td className="py-5 px-3">{review.guestName || "N/A"}</td>
                <td className="py-2 px-3">{review.listingName || "N/A"}</td>
                <td className={`py-2 px-3 flex`}>
                  <span className={`p-1 rounded-full px-2 ${review.rating && getRatingBadge(review.rating)?.color}`}>
                  {review.rating ? review.rating+`/10` : "N/A"} 
                  </span>
                  </td>
                <td
                  className={`py-2 px-3`}
                >
                  <span className={`p-1 rounded-full px-2 ${review.channel && getChannelColor(review?.channel)}`}>{review.channel || "—"}</span>
                </td>
                <td className="py-2 px-3 max-w-[200px] truncate">
                  {review.publicReview || "—"}
                </td>
                <td className="py-2 px-3">
                  {review.submittedAt?.slice(0, 10) || "N/A"}
                </td>
                <td className="py-2 px-3">
                  {review.isFlagged ? (
                    <span className="text-xs px-2 py-1 rounded-full bg-red-200 text-gray-700">
                      Flagged
                    </span>
                  ) : review.isApproved ? (
                    <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-gray-700">
                      Approved
                    </span>
                  ) : (
                    <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-gray-700 animate-pulse">
                      Pending
                    </span>
                  )}
                </td>
                <td className="py-2 px-3 flex justify-center">
                  <Menu as="div" className="inline-block text-left">
                    <Menu.Button
                      onClick={(e) => e.stopPropagation()}
                      className="text-sm px-2 py-1 rounded bg-blue-100 hover:bg-blue-200 cursor-pointer mt-2"
                    >
                      ⋯
                    </Menu.Button>
                    <Menu.Items className="absolute right-1 mt-2 w-40 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg z-10">
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onApproveToggle(review);
                              }}
                              className={`block w-full text-left px-4 py-2 text-sm md:border-none border-b border-gray-200 ${
                                active ? "bg-gray-100" : ""
                              }`}
                            >
                              {review.isApproved ? "Unapprove" : "Approve"}
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onFlag?.(review.id);
                              }}
                              className={`block w-full text-left px-4 py-2 text-sm text-red-600 md:border-none border-b border-gray-200 ${
                                active ? "bg-red-50" : ""
                              }`}
                            >
                              Flag Review
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onReviewClick(review);
                              }}
                              className={`block w-full text-left px-4 py-2 text-sm ${
                                active ? "bg-gray-100" : ""
                              }`}
                            >
                              View Details
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Menu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

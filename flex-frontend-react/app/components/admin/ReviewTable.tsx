import { useState } from "react";
import { Menu } from "@headlessui/react";
import type { Review } from "~/types/review";
import { useNavigate } from "react-router";
import { getSentimentTag } from "~/lib/utils";

type ReviewTableProps = {
  reviews: Review[];
  onApproveToggle: (id: string | number, approved: boolean) => void;
  onReviewClick: (review: Review) => void;
  onFlag?: (id: string | number) => void;
  isRecentReviews?: boolean;
};

export default function ReviewTable({
  reviews,
  onApproveToggle,
  onReviewClick,
  onFlag,
  isRecentReviews = true,
}: ReviewTableProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-md rounded-md p-6 w-full overflow-x-auto border border-gray-100">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b border-b-gray-200 text-gray-400">
            <th className="text-left py-2 px-3 font-medium">Guest</th>
            <th className="text-left py-2 px-3 font-medium">Property</th>
            <th className="text-left py-2 px-3 font-medium">Rating</th>
            <th className="text-left py-2 px-3 font-medium">Channel</th>
            <th className="text-left py-2 px-3 font-medium">Review</th>
            <th className="text-left py-2 px-3 font-medium">Submitted</th>
            <th className="text-left py-2 px-3 font-medium">Status</th>
            {!isRecentReviews && (
              <th className="text-left py-2 px-3 font-medium">Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {reviews.map((r, index) => (
            <tr
              key={r.id}
              className={`${
                index !== reviews.length - 1 ? "border-b border-b-gray-200" : ""
              } hover:bg-gray-50 cursor-pointer`}
              onClick={() => onReviewClick(r)}
            >
              <td className="py-5 px-3">{r.guestName || "—"}</td>
              <td className="py-2 px-3">{r.listingName || "—"}</td>
              <td className={`py-2 px-3`}>{r.rating ?? "—"}</td>
              <td className="py-2 px-3">{r.channel || "—"}</td>
              <td className="py-2 px-3 max-w-[200px] truncate">
                {r.publicReview || "—"}
              </td>
              <td className="py-2 px-3">
                {r.submittedAt?.slice(0, 10) || "—"}
              </td>
              <td className="py-2 px-3">
                {r.isFlagged ? (
                  <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-700">
                    Flagged
                  </span>
                ) : r.isApproved ? (
                  <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">
                    Approved
                  </span>
                ) : (
                  <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                    Pending
                  </span>
                )}
              </td>
              {!isRecentReviews && (
                <td className="py-2 px-3 flex justify-center mt-1">
                  <Menu as="div" className="absolute inline-block text-left">
                    <Menu.Button
                      onClick={(e) => e.stopPropagation()}
                      className="text-sm px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 cursor-pointer"
                    >
                      ⋯
                    </Menu.Button>
                    <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg z-10">
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onApproveToggle(r.id, !r.isApproved);
                              }}
                              className={`block w-full text-left px-4 py-2 text-sm ${
                                active ? "bg-gray-100" : ""
                              }`}
                            >
                              {r.isApproved ? "Unapprove" : "Approve"}
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onFlag?.(r.id);
                              }}
                              className={`block w-full text-left px-4 py-2 text-sm text-red-600 ${
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
                                onReviewClick(r);
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
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {isRecentReviews && (
        <div className="mt-13 text-right flex justify-center my-10">
          <button
            onClick={() => navigate("/reviews")}
            className="text-sm text-gray-100 bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600 transition-colors cursor-pointer"
          >
            View More
          </button>
        </div>
      )}
    </div>
  );
}

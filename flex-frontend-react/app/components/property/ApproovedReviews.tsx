import { useState } from "react";
import { formatDate } from "~/lib/utils";
import type { Review } from "~/types/review";

const ApprovedReviews = ({approvedReviews}: {approvedReviews: Review[]}) => {

  return (
    <section className="mb-6 sm:mb-8 bg-white p-6 sm:p-10 rounded-xl shadow-lg">
      <h2 className="text-lg sm:text-xl font-semibold mb-4">Guest Reviews</h2>
      {approvedReviews.length === 0 ? (
        <p className="text-gray-500">No approved reviews yet.</p>
      ) : (
        <ul className="space-y-6">
          {approvedReviews?.map((review, index) => (
            <li key={review.id} className={`${approvedReviews.length -1 !== index ? "border-b border-gray-400" : ""} pb-4`}>
              <p className="text-xs text-gray-600 mb-1">
                <strong>{review.guestName}</strong> —{" "}
                {formatDate(review.submittedAt)}
              </p>
              <p className="text-gray-800 text-xs">{review.publicReview}</p>
              {review.rating && (
                <p className="text-yellow-600 text-xs mt-1">
                  Rating: {review.rating}/10
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default ApprovedReviews;

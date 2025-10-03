import { useState } from "react";
import { formatDate } from "~/lib/utils";
import type { Review } from "~/types/review";

interface ApprovedReviews {
  approvedReviews: Review[];
}

const ApprovedReviews = ({ approvedReviews }: ApprovedReviews) => {
  // const [approvedReviews, setApprovedReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <section className="mb-8 bg-white p-10 rounded-xl shadow-lg max-h-12 overflow-y-hidden">
      <h2 className="text-xl font-semibold mb-4">Guest Reviews</h2>
      {approvedReviews.length === 0 ? (
        <p className="text-gray-500">No approved reviews yet.</p>
      ) : (
        <ul className="space-y-6">
          {approvedReviews?.map((review, index) => (
            <li key={review.id} className={`${index === approvedReviews.length - 1 ? "border-b border-gray-300": ""} pb-4`}>
              <p className="text-sm text-gray-600 mb-1">
                <strong>{review.guestName}</strong> —{" "}
                {formatDate(review.submittedAt)}
              </p>
              <p className="text-gray-800 text-sm">{review.publicReview}</p>
              {review.rating && (
                <p className="text-yellow-600 text-sm mt-1">
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

import { useState } from "react";
import type { Review } from "~/types/review";

const ApprovedReviews = () => {
    const [approvedReviews, setApprovedReviews] = useState<Review[]>([]);
    const [isLoading, setIsLoading] = useState(true);
  
  return (
     <section className="mb-8 bg-white p-10 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Guest Reviews</h2>
          {isLoading ? (
            <p>Loading reviews...</p>
          ) : (
            <div className="space-y-6">
              {approvedReviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-white p-6 rounded-lg shadow-md"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{review.guestName}</h3>
                    {review.rating && (
                      <span className="text-yellow-500 font-bold">
                        {review.rating} ★
                      </span>
                    )}
                  </div>
                  <p className="text-gray-700">{review.publicReview}</p>
                  <div className="mt-2 text-sm text-gray-500">
                    {new Date(review?.submittedAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
  )
}

export default ApprovedReviews;
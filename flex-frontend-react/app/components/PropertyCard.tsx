import React, { useEffect, useState } from "react";
import {
  Star,
  TrendingUp,
  TrendingDown,
  Minus,
  MapPin,
  Eye,
  ArrowBigRight,
  ArrowRightFromLine,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router";
import ReviewsModal from "~/components/ReviewModal";
import type { Property } from "~/types/property";
import { useAppData } from "~/context/AppContext";

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showReviewsModal, setShowReviewsModal] = useState(false);
  const reviews = property.reviews || [];
  const { toggleReviewApproval } = useAppData();

  const guestReviews = reviews.filter(
    (r) => r.type === "guest-to-host" && r.rating != null
  );

  const averageRating = guestReviews.length
    ? parseFloat(
        (
          guestReviews.reduce((sum, r) => sum + (r.rating ?? 0), 0) /
          guestReviews.length
        ).toFixed(1)
      )
    : null;

  const ratingPercentage =
    averageRating != null ? `${Math.round((averageRating / 5) * 100)}%` : "—";

  // Fallback to total reviews array length, then to guestReviews length as a last resort.
  const reviewCount =
    property.reviewCount ??
    (Array.isArray(reviews) ? reviews.length : undefined) ??
    guestReviews.length;

  const negativeReviews = reviews.filter(
    (r) => !r.publicReview && r.rating != null && r.rating <= 2
  );

  const getTrendIcon = () => {
    if (averageRating != null && averageRating >= 4.5)
      return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (averageRating != null && averageRating <= 2.5)
      return <TrendingDown className="h-4 w-4 text-red-500" />;
    return <Minus className="h-4 w-4 text-gray-400" />;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-900">
                {property.name}
              </h3>
              <span className="px-2 py-1 text-xs font-medium rounded-lg bg-green-300 text-gray-800">
                {Number(property.id) % 2 === 0 ? "Avail" : "occupied"}
              </span>
            </div>
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <MapPin className="h-4 w-4 mr-1" />
              {property.location || "—"}
            </div>
          </div>
        </div>

        {/* Insights */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Rating</p>
                <div className="flex items-center mt-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-lg font-semibold ml-1">
                    {averageRating ?? "—"}
                  </span>
                </div>
              </div>
              {getTrendIcon()}
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Reviews</p>
                <div className="flex items-center gap-2">
                  <p className="text-lg font-semibold">{reviewCount}</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const isAdmin = location.pathname.includes("/");
                      if (isAdmin) {
                        setShowReviewsModal(true);
                      } else {
                        navigate(`/properties/${property.id}`);
                      }
                    }}
                    aria-label="Open reviews"
                    className="p-1 rounded hover:shadow bg-blue-100 ml-2 cursor-pointer hover"
                  >
                    <ArrowRightFromLine className="h-4 w-4 text-gray-500" />
                  </button>
                </div>
              </div>
              <span className="mr-3">{getTrendIcon()}</span>
            </div>
          </div>
        </div>

        {/* Highlights */}
        {reviewCount > 0 ? (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <span className="font-medium">{ratingPercentage}</span> rating
              across <span className="font-medium">{reviewCount}</span> reviews
            </p>
          </div>
        ) : (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">
              No guest reviews available yet.
            </p>
          </div>
        )}

        {negativeReviews.length > 0 && (
          <div className="mt-3 p-3 bg-red-50 rounded-lg">
            <p className="text-sm text-red-800">
              {negativeReviews.length} negative reviews need attention
            </p>
          </div>
        )}
        {showReviewsModal && (
          <ReviewsModal
            property={property}
            onClose={() => setShowReviewsModal(false)}
            onToggleApproval={(id, approved) =>
              toggleReviewApproval(id, approved)
            }
          />
        )}
      </div>
    </div>
  );
};

export default PropertyCard;

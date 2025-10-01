import React from 'react';
import { Star, Calendar, Eye, EyeOff, Globe } from 'lucide-react';
import type { Review } from '~/types/review';

interface ReviewCardProps {
  review: Review;
  onToggleApproval?: (id: string | number, approved: boolean) => void;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review, onToggleApproval }) => {
  const formattedDate = new Date(review.submittedAt).toLocaleDateString();

  const getChannelColor = (channel: string) => {
    switch (channel) {
      case 'Airbnb':
        return 'bg-red-100 text-red-800';
      case 'Booking.com':
        return 'bg-blue-100 text-blue-800';
      case 'VRBO':
        return 'bg-purple-100 text-purple-800';
      case 'Google':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-medium text-gray-900 mb-1">Review</h4>
          <div className="flex items-center gap-1 mb-1">
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < (review.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`}
              />
            ))}
            <span className="text-sm text-gray-600 ml-2">{review.rating ?? '—'}</span>
          </div>
          <div className="text-sm text-gray-600 flex items-center gap-2">
            <span>{review.guestName}</span>
            <span>{review.listingName}</span>
            <span className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {formattedDate}
            </span>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {review.channel && (
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getChannelColor(review.channel)}`}>
                {review.channel}
              </span>
            )}
            {(review.categories || []).map((c) => (
              <span key={c.category} className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                {c.category}
              </span>
            ))}
          </div>
        </div>

        {onToggleApproval && (
          <button
            onClick={() => onToggleApproval(review.id, !review.isApproved)}
            className={`p-2 rounded-md transition-colors ${
              review.isApproved
                ? 'text-green-600 bg-green-50 hover:bg-green-100'
                : 'text-gray-400 bg-gray-50 hover:bg-gray-100'
            }`}
            title={review.isApproved ? 'Hide from public' : 'Show to public'}
          >
            {review.isApproved ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
          </button>
        )}
      </div>

      <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
        {review.publicReview || '—'}
      </p>
    </div>
  );
};

export default ReviewCard;
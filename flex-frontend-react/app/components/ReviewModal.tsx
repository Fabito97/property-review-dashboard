import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import ReviewCard from './ReviewCard';
import { Eye, EyeOff, MessageSquare } from 'lucide-react';
import type { Property } from '~/types/property';

interface ReviewsModalProps {
  property?: Property | null;
  onClose: () => void;
  onToggleApproval: (reviewId: string | number, approved: boolean) => void;
}


const ReviewsModal: React.FC<ReviewsModalProps> = ({ property, onClose, onToggleApproval }) => {
  const [filter, setFilter] = useState<'all' | 'public' | 'private'>('all');
  const reviews = property?.reviews || [];
  
  const filtered = reviews.filter((r) =>
    filter === 'public' ? r.isApproved : filter === 'private' ? !r.isApproved : true
);

if (!property) return;

  return (
    <Dialog open={true} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded-xl shadow-xl max-w-4xl w-full p-6 overflow-y-auto max-h-[95vh]">
          <Dialog.Title className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-gray-400" />
            Reviews for {property.name}
          </Dialog.Title>

          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-1 text-green-600">
                <Eye className="h-4 w-4" />
                {reviews.filter((r) => r.isApproved).length} public
              </span>
              <span className="flex items-center gap-1 text-gray-500">
                <EyeOff className="h-4 w-4" />
                {reviews.filter((r) => !r.isApproved).length} private
              </span>
            </div>

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as 'all' | 'public' | 'private')}
              className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All</option>
              <option value="public">Public Only</option>
              <option value="private">Private Only</option>
            </select>
          </div>

          {filtered.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No reviews found.</p>
          ) : (
            <div className="space-y-4">
              {filtered.map((review) => (
                <ReviewCard
                  key={review.id}
                  review={review}
                  onToggleApproval={onToggleApproval}
                />
              ))}
            </div>
          )}

          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md"
            >
              Close
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ReviewsModal;
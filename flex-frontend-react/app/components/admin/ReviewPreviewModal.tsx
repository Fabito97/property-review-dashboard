// components/ReviewPreviewModal.tsx
import { Dialog } from '@headlessui/react';
import { useState } from 'react';
import type { Review } from '~/types/review';
import ReviewCard from './ReviewCard';

type ReviewPreviewModalProps = {
  review: Review | null;
  onClose: () => void;
  onApproveToggle: (id: string | number, approved: boolean) => void;
};

export default function ReviewPreviewModal({
  review,
  onClose,
  onApproveToggle,
}: ReviewPreviewModalProps) {
  const [isFlagged, setIsFlagged] = useState(false);

  if (!review) return null;

  const handleFlag = () => {
    setIsFlagged(true);
    // TODO: send flag to backend
  };

  return (
    <Dialog open={!!review} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 space-y-4">
          {/* <Dialog.Title className="text-lg font-semibold text-gray-900">Review Details</Dialog.Title> */}

          <ReviewCard review={review} onApproveToggle={onApproveToggle} />

          <div className="flex justify-end gap-2">
            {!isFlagged && (
              <button
                onClick={handleFlag}
                className="px-3 py-2 text-sm text-red-600 bg-red-50 hover:bg-red-100 rounded-md"
              >
                Flag
              </button>
            )}
            <button
              onClick={onClose}
              className="px-3 py-2 text-sm text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-md"
            >
              Close
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
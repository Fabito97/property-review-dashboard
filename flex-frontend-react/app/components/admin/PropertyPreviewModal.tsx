import React from 'react';
import { Dialog } from '@headlessui/react';
import type { Property } from '~/types/property';
import PropertyCard from '../PropertyCard'; // adjust path if needed

interface PropertyPreviewModalProps {
  property: Property | null;
  onClose: () => void;
}

const PropertyPreviewModal: React.FC<PropertyPreviewModalProps> = ({ property, onClose }) => {
  return (
    <Dialog open={!!property} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded-xl shadow-xl max-w-xl w-full p-6">
          <Dialog.Title className="text-lg font-semibold text-gray-900 mb-4">
            Property Details
          </Dialog.Title>

          {property && <PropertyCard property={property} />}

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

export default PropertyPreviewModal;
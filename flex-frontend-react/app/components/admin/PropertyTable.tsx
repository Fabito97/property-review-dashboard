// components/admin/PropertyTableContent.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { MapPin, ArrowRightFromLine, ArrowBigRight } from "lucide-react";
import ReviewsModal from "~/components/ReviewModal";
import PropertyPreviewModal from "~/components/admin/PropertyPreviewModal";
import type { Property } from "~/types/property";
import { useAppData } from "~/context/AppContext";

interface PropertyTableContentProps {
  properties: Property[];
}

export default function PropertyTableContent({
  properties,
}: PropertyTableContentProps) {
  const navigate = useNavigate();
  const { toggleReviewApproval, properties: sourceProperties } = useAppData();
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(
    null
  );
  const [reviewModalPropertyId, setReviewModalPropertyId] = useState<
    string | null
  >(null);

  // Resolve selected properties from the context-backed sourceProperties to avoid stale objects
  const selectedProperty: Property | null = selectedPropertyId
    ? (sourceProperties.find(
        (p) => String(p.id) === String(selectedPropertyId)
      ) ?? null)
    : null;

  const reviewModalProperty: Property | null = reviewModalPropertyId
    ? (sourceProperties.find(
        (p) => String(p.id) === String(reviewModalPropertyId)
      ) ?? null)
    : null;

  return (
    <>
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 text-gray-500 bg-gray-50">
            <th className="text-left py-3 px-4 font-medium">Name</th>
            <th className="text-left py-3 px-4 font-medium">Location</th>
            <th className="text-left py-3 px-4 font-medium">Reviews</th>
            <th className="text-left py-3 px-4 font-medium">Rating</th>
            <th className="text-left py-3 px-4 font-medium">Created</th>
            <th className="text-left py-3 px-4 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((p, index) => (
            <tr
              key={p.id}
              className={`hover:bg-blue-50 cursor-pointer transition-colors ${
                index !== properties.length - 1
                  ? "border-b border-gray-100"
                  : ""
              }`}
              onClick={() => setSelectedPropertyId(p.id.toString())}
            >
              <td className="py-4 px-4 font-medium text-gray-800">
                {p.name || "—"}
              </td>
              <td className="py-4 px-4 text-gray-600 flex items-center gap-1">
                <MapPin className="h-4 w-4 text-gray-400" />
                {p.location || "—"}
              </td>
              <td className="py-4 px-4 text-gray-600">
                <div className="flex items-center gap-3">
                  {p.reviewCount ?? 0}
                  {p.reviewCount && p.reviewCount > 0 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setReviewModalPropertyId(p.id.toString());
                        setSelectedPropertyId(null);
                      }}
                      className="text-xs px-2 py-1 rounded bg-gray-100 text-blue-700 hover:bg-blue-200 flex items-center gap-1"
                    >
                      <ArrowRightFromLine className="h-3 w-3" />
                    </button>
                  )}
                </div>
              </td>
              <td className="py-4 px-4 text-gray-600">
                {p.ratingPercentage != null ? `${p.ratingPercentage}` : "—"}
              </td>
              <td className="py-4 px-4 text-gray-600">
                {p.createdAt ? new Date(p.createdAt).toLocaleDateString() : "—"}
              </td>
              <td className="py-4 px-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/properties/${p.id}`);
                  }}
                  className="text-sm px-3 py-1 rounded-md bg-blue-100 text-gray-700 hover:bg-blue-200 flex items-center gap-1"
                >
                  <ArrowBigRight className="h-4 w-4 text-blue-400" />
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modals */}
      {/* Modals: render only when resolved property objects exist */}
      {selectedProperty && !reviewModalProperty && (
        <PropertyPreviewModal
          property={selectedProperty}
          onClose={() => setSelectedPropertyId(null)}
        />
      )}

      {reviewModalProperty && (
        <ReviewsModal
          property={reviewModalProperty}
          onClose={() => setReviewModalPropertyId(null)}
          onToggleApproval={(review) => toggleReviewApproval(review)}
        />
      )}
    </>
  );
}

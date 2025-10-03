// components/admin/PropertySection.tsx
import React, { useState } from "react";
import Skeleton from "~/components/ui/SkeletonLoader";
import type { Property } from "~/types/property";
import PropertyTableContent from "./PropertyTable";

interface PropertySectionProps {
  properties: Property[];
  loading?: boolean;
  pageSize?: number;
}

export default function PropertySection({
  properties,
  loading = false,
  pageSize = 5,
}: PropertySectionProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(properties.length / pageSize);
  const paginated = properties.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <>  
      <div className="shadow-md sm:p-6 rounded-lg border border-gray-200 bg-white overflow-x-auto">
        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: pageSize }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : (
          <PropertyTableContent properties={paginated} />
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col md:flex-row md:justify-between items-center gap-2 mt-6 px-2 md:w-[70%] mx-auto">
          <p className="text-sm text-gray-600">
            Showing {currentPage * paginated.length} of {properties.length} properties.
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-md text-sm ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Previous
            </button>

            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded-md text-sm ${
                  currentPage === i + 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-md text-sm ${
                currentPage === totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
}
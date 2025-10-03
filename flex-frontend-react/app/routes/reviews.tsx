import { useState, useEffect, useMemo } from "react";
import ReviewTable from "~/components/admin/ReviewTable";
import ReviewFilterPopover from "~/components/ui/ReviewFilterPanel";
import DashboardLayout from "../layouts/dashboardLayout";
import ReviewPreviewModal from "~/components/admin/ReviewPreviewModal";
import { useAppData } from "~/context/AppContext";
import SearchFilter from "~/components/ui/SearchFilter";
import Skeleton from "~/components/ui/SkeletonLoader";
import type { Review } from "~/types/review";
import { DOTS, usePagination } from "~/hooks/usePagination";

export default function ReviewsPage() {
  const {
    reviewData: sourceReviews,
    loadingReviews,
    toggleReviewApproval,
  } = useAppData();

  const [filteredReviews, setFilteredReviews] = useState<Review[]>([]);
  const [searchResults, setSearchResults] = useState<Review[]>([]);
  const [selectedReviewId, setSelectedReviewId] = useState<string | null>(null);
  const selectedReview = sourceReviews?.reviews?.find(
    (r) => r.id == selectedReviewId
  );
  useEffect(() => {
    if (sourceReviews?.reviews) {
      setFilteredReviews(sourceReviews.reviews);
      setSearchResults(sourceReviews.reviews);
    }
  }, [sourceReviews]);

  const finalReviews = useMemo(() => {
    const searchIds = new Set(searchResults.map((r) => r.id));
    return filteredReviews.filter((r) => searchIds.has(r.id));
  }, [filteredReviews, searchResults]);

  const pageSize = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedReviews = finalReviews.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const totalPages = Math.ceil(finalReviews.length / pageSize);

  const paginationRange = usePagination({
    currentPage,
    totalCount: finalReviews.length,
    siblingCount: 1,
    pageSize,
  });

  return (
    <DashboardLayout>
      <div className="py-5 w-full pb-10 md:pb-15 overflow-hidden">
        <h1 className="text-2xl font-bold mb-4">All Reviews</h1>

        <div className="flex justify-between items-center mb-4">
          <SearchFilter<Review>
            data={sourceReviews?.reviews || []}
            keys={["listingName", "guestName"]}
            onFiltered={setSearchResults}
            placeholder="Guest or property..."
          />
          <ReviewFilterPopover
            reviews={sourceReviews?.reviews || []}
            onFilterChange={setFilteredReviews}
          />
        </div>

        {loadingReviews || finalReviews.length === 0 ? (
          <div className="space-y-4">
            {Array.from({ length: pageSize }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        ) : (
          <>
            <ReviewTable
              reviews={paginatedReviews}
              onApproveToggle={(review: Review) => {
                toggleReviewApproval(review);
              }}
              onReviewClick={(r) => setSelectedReviewId(r.id.toString())}
              isRecentReviews={false}
            />

            {totalPages > 1 && (
              <div className="flex flex-col md:flex-row md:justify-between items-center mt-6 gap-2 md:w-[70%] mx-auto">
                <p className="text-xs md:text-sm text-gray-600">
                  Showing {currentPage * paginatedReviews.length} of{" "}
                  {finalReviews.length} reviews.
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className={`px-3 py-1 rounded-md text-xs md:text-sm ${
                      currentPage === 1
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Prev
                  </button>

                  {paginationRange.map((pageNumber, index) => {
                    if (pageNumber === DOTS) {
                      return (
                        <span
                          key={`${pageNumber}-${index}`}
                          className="px-1 md:px-3 py-1 text-sm text-gray-400"
                        >
                          ...
                        </span>
                      );
                    }

                    return (
                      <button
                        key={pageNumber}
                        onClick={() => setCurrentPage(pageNumber as number)}
                        className={`px-[6px] sm:px-3 py-1 rounded-md text-xs ${
                          currentPage === pageNumber
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                        disabled={currentPage === pageNumber}
                      >
                        {pageNumber}
                      </button>
                    );
                  })}

                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1 rounded-md text-xs md:text-sm ${
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
        )}

        <ReviewPreviewModal
          review={selectedReview}
          onClose={() => setSelectedReviewId(null)}
          onApproveToggle={(review: Review) => {
            toggleReviewApproval(review);
          }}
        />
      </div>
    </DashboardLayout>
  );
}

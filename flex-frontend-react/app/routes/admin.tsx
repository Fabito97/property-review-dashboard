import DashboardLayout from "../layouts/dashboardLayout";
import ReviewTable from "~/components/admin/ReviewTable";
import ReviewPreviewModal from "~/components/admin/ReviewPreviewModal";
import PropertyGrid from "~/components/admin/PropertyGrid";
import OverviewStats from "~/components/admin/OverviewStats";
import Skeleton from "~/components/ui/SkeletonLoader";
import { useAppData } from "~/context/AppContext";
import { useEffect, useState, useMemo } from "react";
import type { Review } from "~/types/review";
import { useNavigate } from "react-router";

export default function Home() {
  const {
    properties,
    reviewData,
    loadingReviews,
    loadingProperties,
    toggleReviewApproval,
  } = useAppData();
  const navigate = useNavigate();

  const sourceData = reviewData?.reviews ?? [];
  const [filteredReviews, setFilteredReviews] = useState<Review[]>([]);
  const [selectedReviewId, setSelectedReviewId] = useState<string | null>(null);
  const selectReview: Review | null = sourceData.find((r) => r.id === selectedReviewId);

  useEffect(() => {
    setFilteredReviews(sourceData);
  }, [sourceData]);

  const recentReviews = useMemo(() => {
    return [...sourceData]
      .sort(
        (a, b) =>
          new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
      )
      .slice(0, 5);
  }, [sourceData]);

  const topRatedProperties = [...properties]
    .filter((p) => p.overallRating != null && p.overallRating >= 4)
    .sort((a, b) => (b.overallRating ?? 0) - (a.overallRating ?? 0))
    .slice(0, 5); // top 5

  const handleApproveToggle = (review: Review) => {
    toggleReviewApproval(review);
  };

  return (
    <DashboardLayout>
      <div className="font-sans flex-1 py-6 xl:py-5 overflow-y-aut mb-10 bg-[#FAFBFF]">
        {/* Overview Section */}
        <section>
          <OverviewStats
            loading={loadingReviews}
            summary={reviewData?.summary}
          />
        </section>

        {/* Property Grid */}
        <section className="mt-20">
          {loadingProperties || properties.length === 0 ? (
            <>
              <h2 className="text-2xl font-bold mb-4">Too Rated Properties</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-40 w-full" />
                ))}
              </div>
            </>
          ) : (
            <PropertyGrid
              properties={topRatedProperties}
              reviews={filteredReviews}
            />
          )}
        </section>

        {/* Filter Panel */}
        <section className="mt-15">
          <h2 className="text-2xl font-bold mb-4">Recent Reviews</h2>

          <ReviewTable
            reviews={recentReviews}
            onApproveToggle={toggleReviewApproval}
            onReviewClick={(review) => setSelectedReviewId(review.id.toString())}
            isLoading={loadingReviews}
          />
          <div className=" text-right flex justify-center my-5">
            <button
              onClick={() => navigate("/reviews")}
              className="text-sm text-gray-700 bg-blue-100 px-4 py-2 rounded-md hover:bg-emerald-500 transition-colors cursor-pointer"
            >
              View More
            </button>
          </div>

          <ReviewPreviewModal
            review={selectReview}
            onClose={() => setSelectedReviewId(null)}
            onApproveToggle={(review) => handleApproveToggle(review)}
          />
        </section>
      </div>
    </DashboardLayout>
  );
}

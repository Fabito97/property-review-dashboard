import DashboardLayout from "./layouts/dashboardLayout";
import ReviewFilterPanel from "~/components/ReviewFilterPanel";
import ReviewTable from "~/components/admin/ReviewTable";
import ReviewPreviewModal from "~/components/admin/ReviewPreviewModal";
import PropertyGrid from "~/components/admin/PropertyGrid";
import SearchFilter from "~/components/SearchFilter";
import OverviewStats from "~/components/admin/OverviewStats";
import Skeleton from "~/components/ui/SkeletonLoader";
import { useAppData } from "~/context/AppContext";
import { useEffect, useState, useMemo } from "react";
import type { Review } from "~/types/review";

export default function Home() {
  const { properties, reviewData, loadingReviews, loadingProperties } =
    useAppData();

  const sourceData = reviewData?.reviews ?? [];
  const [filteredReviews, setFilteredReviews] = useState<Review[]>([]);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

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

  const handleApproveToggle = (id: string | number, approved: boolean) => {
    const updated = filteredReviews.map((r) =>
      r.id === id ? { ...r, isApproved: approved } : r
    );
    setFilteredReviews(updated);
  };

  return (
    <DashboardLayout>
      <div className="font-sans flex-1 py-6 xl:py-5 bg-[#fdfdfd] overflow-y-auto mb-20">
        {/* Overview Section */}
        <section>
          {loadingReviews ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-24 w-full" />
              ))}
            </div>
          ) : (
            <OverviewStats
              loading={loadingReviews}
              summary={reviewData?.summary}
            />
          )}
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
        <section className="mt-20">
          <h2 className="text-2xl font-bold mb-4">Recent Reviews</h2>
          {/* Recent Review Table */}
          {loadingReviews ? (
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          ) : (
            <section className="my-5">
              <ReviewTable
                reviews={recentReviews}
                onApproveToggle={handleApproveToggle}
                onReviewClick={setSelectedReview}
              />
              <ReviewPreviewModal
                review={selectedReview}
                onClose={() => setSelectedReview(null)}
                onApproveToggle={handleApproveToggle}
              />
            </section>
          )}
        </section>
      </div>
    </DashboardLayout>
  );
}

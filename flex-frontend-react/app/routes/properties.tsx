import React, { useEffect, useMemo, useState } from "react";
import DashboardLayout from "../layouts/dashboardLayout";
import PropertyStats from "~/components/admin/PropertyStats";
import PropertySection from "~/components/admin/PropertySection";
import Skeleton from "~/components/ui/SkeletonLoader";
import { useAppData } from "~/context/AppContext";
import SearchFilter from "~/components/ui/SearchFilter";
import PropertyFilterPanel from "~/components/ui/PropertyFilterPanel";
import type { Property } from "~/types/property";

export default function PropertyPage() {
  const { properties: originalProperties, loadingReviews } = useAppData();

  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [searchResults, setSearchResults] = useState<Property[]>([]);

  // Memoize originalProperties to prevent re-renders
  const stableProperties = useMemo(
    () => originalProperties,
    [originalProperties]
  );

  // Initialize filteredProperties from originalProperties
  useEffect(() => {
    if (stableProperties) {
      setFilteredProperties(stableProperties);
      setSearchResults(stableProperties);
    }
  }, [stableProperties]);

  // Combine search + filter results
  const combinedResults = useMemo(() => {
    const searchIds = new Set(searchResults.map((p) => p.id));
    return filteredProperties.filter((p) => searchIds.has(p.id));
  }, [filteredProperties, searchResults]);

  return (
    <DashboardLayout>
      <div className="bg-white rounded-md py-5 w-full overflow-x-hidden pb-10 md:pb-15">
        <h2 className="text-2xl font-semibold mb-2">Property Overview</h2>

        {/* Stats */}
        {loadingReviews ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
          </div>
        ) : (
          <PropertyStats
            properties={stableProperties}
            loading={loadingReviews}
          />
        )}

        {/* Property table Section */}
        <div className="pt-5 md:pt-10 pb-2 flex items-center justify-between">
          <h2 className="text-2xl font-bold mb-4">All Properties</h2>
        </div>

        {/* Filters */}
        <div className="flex justify-between items-center mb-4">
          <SearchFilter<Property>
            data={stableProperties}
            keys={["name", "location"]}
            onFiltered={setSearchResults}
            placeholder="Search by name or location"
          />
          <PropertyFilterPanel
            properties={stableProperties}
            onFilterChange={setFilteredProperties}
          />
        </div>

        <PropertySection
          properties={combinedResults}
          loading={loadingReviews}
        />
      </div>
    </DashboardLayout>
  );
}

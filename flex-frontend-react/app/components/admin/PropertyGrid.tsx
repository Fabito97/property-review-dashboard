import React from "react";
import { useNavigate } from "react-router";
import type { Property } from "~/types/property";
import type { Review } from "~/types/review";
import PropertyCard from "../PropertyCard";

interface PropertyGridProps {
  properties: Property[];
  reviews: Review[];
  limit?: number;
  showViewMore?: boolean;
  title?: string;
}

const PropertyGrid: React.FC<PropertyGridProps> = ({
  properties,
  reviews,
  limit = 4,
  showViewMore = false,
  title = "Top Rated Properties",
}) => {
  const navigate = useNavigate();
  const visible = limit ? properties.slice(0, limit) : properties;

  if (visible.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center border border-gray-200">
        <p className="text-gray-500">No properties found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        {showViewMore && (
          <button
            onClick={() => navigate("/property")}
            className="text-sm text-blue-600 underline"
          >
            View More
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-4 gap-6">
        {visible.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default PropertyGrid;
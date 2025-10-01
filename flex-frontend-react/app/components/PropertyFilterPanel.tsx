import { useState, useEffect, useCallback } from "react";
import type { Property } from "~/types/property";
import { Popover } from "@headlessui/react";
import { Filter } from "lucide-react";

type PropertyFilterPanelProps = {
  properties: Property[];
  onFilterChange: (filtered: Property[]) => void;
};

export default function PropertyFilterPanel({
  properties,
  onFilterChange,
}: PropertyFilterPanelProps) {
  const [location, setLocation] = useState("all");
  const [type, setType] = useState("all");
  const [rating, setRating] = useState("all");
  const [timeframe, setTimeframe] = useState("30d");

  const uniqueLocations = Array.from(
    new Set(properties.map((p) => p.location).filter(Boolean))
  );
  const uniqueTypes = ["guest-to-host", "host-to-guest"]

  const filterProperties = useCallback(() => {
    const now = Date.now();

    const filtered = properties.filter((p) => {
      const locationMatch = location === "all" || p.location === location;
      const typeMatch = type === "all" || p.type === type;
      const ratingMatch =
        rating === "all" ||
        (!isNaN(Number(p.ratingPercentage?.replace("%", ""))) &&
          Number(p?.ratingPercentage && p.ratingPercentage.replace("%", "")) >= Number(rating));

      let dateMatch = true;
      if (timeframe !== "30d") {
        const created = new Date(p.createdAt || "").getTime();
        let cutoff = now;
        switch (timeframe) {
          case "7d":
            cutoff -= 7 * 24 * 60 * 60 * 1000;
            break;
          case "30d":
            cutoff -= 30 * 24 * 60 * 60 * 1000;
            break;
          case "90d":
            cutoff -= 90 * 24 * 60 * 60 * 1000;
            break;
          case "1y":
            cutoff -= 365 * 24 * 60 * 60 * 1000;
            break;
        }
        dateMatch = created >= cutoff;
      }

      return locationMatch && typeMatch && ratingMatch && dateMatch;
    });

    const isDefault =
      location === "all" &&
      type === "all" &&
      rating === "all" &&
      timeframe === "30d";

    onFilterChange(isDefault ? properties : filtered);
  }, [location, type, rating, timeframe, properties, onFilterChange]);

  useEffect(() => {
    filterProperties();
  }, [filterProperties]);

  const resetFilters = () => {
    setLocation("all");
    setType("all");
    setRating("all");
    setTimeframe("30d");
  };

  return (
    <Popover className="relative">
      <Popover.Button className="px-3 py-1.5 text-sm font-medium bg-gray-900 text-white rounded-md shadow hover:bg-black cursor-pointer flex items-center gap-1">
        <Filter className="h-4 w-4" />
        Filters
      </Popover.Button>

      <Popover.Panel className="absolute z-100 mt-2 w-[280px] bg-white shadow-lg rounded-md p-3 right-0">
        <div className="space-y-2 text-sm">
          {/* Location */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Location
            </label>
            <select
              className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="all">All Locations</option>
              {uniqueLocations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {/* Type */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Property Type
            </label>
            <select
              className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="all">All Types</option>
              {uniqueTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Rating */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Minimum Rating
            </label>
            <select
              className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            >
              <option value="all">Any Rating</option>
              <option value="5">5+</option>
              <option value="4">4+</option>
              <option value="3">3+</option>
              <option value="2">2+</option>
              <option value="1">1+</option>
            </select>
          </div>

          {/* Timeframe */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Created
            </label>
            <select
              className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value as any)}
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
          </div>

          {/* Reset */}
          <button
            onClick={resetFilters}
            className="w-full px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
          >
            Reset
          </button>
        </div>
      </Popover.Panel>
    </Popover>
  );
}

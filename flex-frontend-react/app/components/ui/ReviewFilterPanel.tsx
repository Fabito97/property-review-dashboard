// components/ReviewFilterPanel.tsx
import { useState, useMemo, useEffect, useCallback } from "react";
import type { Review } from "~/types/review";
import { Popover } from "@headlessui/react";
import { Filter } from "lucide-react";

type ReviewFilterPanelProps = {
  reviews: Review[];
  onFilterChange: (filtered: Review[]) => void;
};

export default function ReviewFilterPanel({
  reviews,
  onFilterChange,
}: ReviewFilterPanelProps) {
  const [rating, setRating] = useState<"all" | "1" | "2" | "3" | "4" | "5">("all");
  const [category, setCategory] = useState<string>("all");
  const [channel, setChannel] = useState<string>("all");
  const [timeframe, setTimeframe] = useState<"7d" | "30d" | "90d" | "1y">("30d");

  const uniqueCategories = useMemo(() => {
    const all = reviews.flatMap((r) => r.categories?.map((c) => c.category) || []);
    return Array.from(new Set(all));
  }, [reviews]);

  const uniqueChannels = useMemo(() => {
    const all = reviews.map((r) => r.channel).filter(Boolean);
    return Array.from(new Set(all));
  }, [reviews]);

  const filterReviews = useCallback(() => {
    const now = Date.now();

    const filtered = reviews.filter((r) => {
      const ratingMatch =
        rating === "all" || (r.rating != null && r.rating >= Number(rating));

      const categoryMatch =
        category === "all" ||
        (r.categories || []).some((c) => c.category === category);

      const channelMatch = channel === "all" || r.channel === channel;

      let dateMatch = true;
      if (timeframe !== "30d") {
        const submitted = new Date(r.submittedAtIso || "").getTime();
        let cutoff = now;
        switch (timeframe) {
          case "7d":
            cutoff -= 7 * 24 * 60 * 60 * 1000;
            break;
          case "90d":
            cutoff -= 90 * 24 * 60 * 60 * 1000;
            break;
          case "1y":
            cutoff -= 365 * 24 * 60 * 60 * 1000;
            break;
          default:
            cutoff -= 30 * 24 * 60 * 60 * 1000;
            break;
        }
        dateMatch = submitted >= cutoff;
      }

      return ratingMatch && categoryMatch && channelMatch && dateMatch;
    });

    const isDefault =
      rating === "all" &&
      category === "all" &&
      channel === "all" &&
      timeframe === "30d";

    onFilterChange(isDefault ? reviews : filtered);
  }, [reviews, rating, category, channel, timeframe, onFilterChange]);

  useEffect(() => {
    filterReviews();
  }, [filterReviews]);

  const resetFilters = () => {
    setRating("all");
    setCategory("all");
    setChannel("all");
    setTimeframe("30d");
  };

  return (
    <Popover className="relative">
      <Popover.Button className="px-3 py-1.5 text-sm font-medium bg-gray-900 text-white rounded-md shadow hover:bg-black cursor-pointer flex items-center gap-1">
        <Filter className="h-4 w-4" />
        Filters
      </Popover.Button>

      <Popover.Panel className="absolute z-10 mt-2 w-[280px] bg-white shadow-lg rounded-md p-3 right-0">
        <div className="space-y-2 text-sm">
          {/* Rating */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">Rating</label>
            <select
              className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 text-sm"
              value={rating}
              onChange={(e) => setRating(e.target.value as any)}
            >
              <option value="all">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4+ Stars</option>
              <option value="3">3+ Stars</option>
              <option value="2">2+ Stars</option>
              <option value="1">1+ Stars</option>
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">Category</label>
            <select
              className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 text-sm"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              {uniqueCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Channel */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">Channel</label>
            <select
              className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 text-sm"
              value={channel}
              onChange={(e) => setChannel(e.target.value)}
            >
              <option value="all">All Channels</option>
              {uniqueChannels.map((ch) => (
                <option key={ch} value={ch}>
                  {ch}
                </option>
              ))}
            </select>
          </div>

          {/* Timeframe */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">Timeframe</label>
            <select
              className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 text-sm"
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
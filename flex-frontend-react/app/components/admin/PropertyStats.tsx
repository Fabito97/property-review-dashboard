import { Star, AlertTriangle, Home, MessageSquare } from "lucide-react";
import Skeleton from "~/components/ui/SkeletonLoader";
import type { Property } from "~/types/property";

interface PropertyStatsProps {
  properties: Property[];
  loading?: boolean;
}

export default function PropertyStats({ properties, loading = false }: PropertyStatsProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-24 w-full" />
        ))}
      </div>
    );
  }

  const all = properties || [];
  const reviews = all.flatMap((p) => p.reviews || []);

  const guestReviews = reviews.filter((r) => r.type === "guest-to-host" && r.rating != null);
  const hostReviews = reviews.filter((r) => r.type === "host-to-guest" && r.rating != null);
  const negativeReviews = guestReviews.filter((r) => r.rating && r.rating <= 2);

  const totalProperties = all.length;
  const totalReviews = guestReviews.length + hostReviews.length;
  const averageRating =
    guestReviews.length > 0
      ? parseFloat(
          (
            guestReviews.reduce((sum, r) => sum + (r.rating ?? 0), 0) / guestReviews.length
          ).toFixed(1)
        )
      : null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      <StatCard
        label="Total Properties"
        value={totalProperties}
        icon={<Home className="h-5 w-5 text-blue-500" />}
      />
      <StatCard
        label="Average Guest Rating"
        value={averageRating ?? "—"}
        icon={<Star className="h-4 w-4 text-yellow-400 fill-current" />}
      />
      <StatCard
        label="Total Reviews"
        value={totalReviews}
        subLabel={`Guest: ${guestReviews.length}, Host: ${hostReviews.length}`}
        icon={<MessageSquare className="h-5 w-5 text-green-500" />}
      />
      <StatCard
        label="Negative Reviews"
        value={negativeReviews.length}
        valueClass="text-xl font-semibold text-red-600"
        icon={<AlertTriangle className="h-5 w-5 text-red-500" />}
      />
    </div>
  );
}

function StatCard({
  label,
  value,
  subLabel,
  icon,
  valueClass = "text-xl font-semibold",
}: {
  label: string;
  value: string | number;
  subLabel?: string;
  icon?: React.ReactNode;
  valueClass?: string;
}) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{label}</p>
          <p className={valueClass}>{value}</p>
          {subLabel && <p className="text-xs text-gray-500 mt-1">{subLabel}</p>}
        </div>
        {icon}
      </div>
    </div>
  );
}
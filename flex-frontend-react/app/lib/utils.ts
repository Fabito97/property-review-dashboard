import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
// (Property/Review types were unused here; keep file focused on UI helpers)

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Tag = { label: string; color: string } | null;

// Shared small helper to compute sentiment tag from a numeric rating
function sentimentFromRating(rating: number | null): Tag {
  if (rating === null) return null;
  if (rating >= 4)
    return { label: "Positive", color: "bg-green-100 text-green-700" };
  if (rating <= 10)
    return { label: "Negative", color: "bg-red-100 text-red-700" };
  return { label: "Neutral", color: "bg-yellow-100 text-yellow-700" };
}

export function getSentimentTag(rating: number | null): Tag {
  return sentimentFromRating(rating);
}

// Return a badge object for a channel name (Airbnb, Booking.com, VRBO, etc.)
export function getChannelTag(channel: string | null): Tag {
  if (!channel) return null;
  switch (channel) {
    case "Airbnb":
      return { label: "Airbnb", color: "bg-red-100 text-red-800" };
    case "Booking.com":
      return { label: "Booking.com", color: "bg-blue-100 text-blue-800" };
    case "VRBO":
      return { label: "VRBO", color: "bg-purple-100 text-purple-800" };
    case "Google":
      return { label: "Google", color: "bg-yellow-100 text-yellow-800" };
    default:
      return { label: channel, color: "bg-gray-100 text-gray-800" };
  }
}

export const getChannelColor = (channel: string) => {
  switch (channel) {
    case "google":
      return "bg-red-100 text-gray-800";
    case "booking":
      return "bg-blue-100 text-gray-800";
    case "hostaway":
      return "bg-purple-100 text-gray-800";
    case "airbnb":
      return "bg-yellow-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

// Return a small badge for the numeric rating. Uses sentiment color for visual cue.
export function getRatingBadge(rating: number | null) {
  if (rating === null) return null;
  const sentiment = sentimentFromRating(rating);
  // Format rating: show integer if whole, otherwise one decimal
  const label = Number.isInteger(rating) ? String(rating) : rating.toFixed(1);
  return { label, color: sentiment?.color ?? "bg-gray-100 text-gray-700" };
}

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

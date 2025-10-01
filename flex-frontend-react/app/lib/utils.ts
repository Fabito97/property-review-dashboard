import {type ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";
import type { Property } from "~/types/property";
import type { Review } from "~/types/review";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getSentimentTag(rating: number | null) {
  if (rating === null) return null;
  if (rating >= 4)
    return { label: "Positive", color: "bg-green-100 text-green-700" };
  if (rating <= 2)
    return { label: "Negative", color: "bg-red-100 text-red-700" };
  return { label: "Neutral", color: "bg-yellow-100 text-yellow-700" };
}


export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      })
}
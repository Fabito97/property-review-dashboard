// models/Property.ts
import { Review } from "../models/review";

export interface PropertyImage {
  id: string;
  caption: string;
  url: string;
  sortOrder: number;
}

export interface Property {
  id: string;
  name: string;
  location: string;
  description?: string;
  overallRating?: number | null;
  reviewCount?: number;
  ratingPercentage?: string;
  createdAt: string;
  channel?: string;
  hostName?: string;
  amenities?: string[];
  pricePerNight?: number;
  currency?: string;
  bedrooms?: number;
  bathrooms?: number;
  maxGuests?: number;
  isActive?: boolean;
  images?: PropertyImage[];
  reviews: Review[];
}

import type { Review } from "./review";

export interface Property {
  id: string | number;
  name: string;
  location?: string; 
  overallRating?: number | null;   
  reviewCount?: number;           
  ratingPercentage?: string;       
  createdAt?: string;              
  type?: string
  amenities?: string[];
  description?: string;
  reviews: Review[];
  images?: PropertyImages[]
}


export interface PropertyImages {
  url: string;
  caption: string;
  sortOrder?: number;
  id?: number;
}


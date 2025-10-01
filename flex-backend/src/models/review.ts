// models/Review.js
export interface Review {
  id: string | number;
  listingName: string;
  listingId: string;
  type: string; // e.g. host-to-guest, guest-to-host
  status: string;
  channel: string; // e.g. hostaway, google
  publicReview: string;
  rating?: number | null;
  categories: Category[];
  submittedAt: string;
  submittedAtIso: string; // ISO string normalized
  guestName: string;
  isApproved: Boolean; 
  location?: string;
}

export default Review;

export interface Category {
  category: string;
  rating: Number;
}
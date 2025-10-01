
export type NormalizedReview = {
  id: string | number;
  listingId?: string;
  listingName?: string;
  type?: string; // e.g. host-to-guest, guest-to-host
  status?: string;
  rating?: number | null;
  channel?: string; // e.g. hostaway, google
  publicReview?: string;
  categories?: Array<{ category: string; rating: number }>;
  submittedAt?: string; 
  submittedAtIso?: string; // ISO string normalized
  guestName?: string;
  isApproved?: boolean; 
};
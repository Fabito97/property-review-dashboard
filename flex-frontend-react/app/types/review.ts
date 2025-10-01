// review.ts
export interface Review {
    id: string | number;
  listingId?: string | number;
  listingName?: string;
  type?: string; // e.g. host-to-guest, guest-to-host
  status?: string;
  rating?: number | null;
  channel?: string; // e.g. hostaway, google
  publicReview?: string;
  categories?: Array<{ category: string; rating: number }>;
  submittedAt: string; // keep original string for now
  submittedAtIso?: string; // ISO string normalized
  guestName?: string;
  isApproved?: boolean; // manager selection field
  isFlagged?: boolean; // manager selection field
  location?: string;
}

export const mockReviews = [
  {
    id: 1,
    guestName: "Shane Finkelstein",
    listingName: "2B N1 A - 29 Shoreditch Heights",
    rating: 4.8,
    publicReview:
      "Shane and family are wonderful! Would definitely host again :)",
    reviewCategory: [
      { category: "cleanliness", rating: 10 },
      { category: "communication", rating: 9 },
      { category: "respect_house_rules", rating: 10 },
    ],
    submittedAt: "2023-08-21T22:45:14Z",
    channel: "Hostaway",
    isApproved: true,
  },
  {
    id: 2,
    guestName: "Maria Gomez",
    listingName: "Modish 1 Bed Apartment in St Katharine",
    rating: 4.5,
    publicReview: "Clean and cozy place. Loved the location!",
    reviewCategory: [
      { category: "cleanliness", rating: 9 },
      { category: "communication", rating: 8 },
    ],
    submittedAt: "2023-09-12T18:30:00Z",
    channel: "Hostaway",
    isApproved: false,
  },
  {
    id: 3,
    guestName: "Liam O'Connor",
    listingName: "2B N1 A - 29 Shoreditch Heights",
    rating: 5.0,
    publicReview: "Perfect stay. Everything was spotless and well organized.",
    reviewCategory: [
      { category: "cleanliness", rating: 10 },
      { category: "communication", rating: 10 },
      { category: "respect_house_rules", rating: 10 },
    ],
    submittedAt: "2023-10-01T10:15:00Z",
    channel: "Google",
    isApproved: true,
  },
  {
    id: 4,
    guestName: "Aisha Bello",
    listingName: "Modish 1 Bed Apartment in St Katharine",
    rating: 4.2,
    publicReview: "Nice apartment but Wi-Fi was a bit slow.",
    reviewCategory: [
      { category: "cleanliness", rating: 8 },
      { category: "communication", rating: 7 },
      { category: "amenities", rating: 6 },
    ],
    submittedAt: "2023-10-05T14:00:00Z",
    channel: "Hostaway",
    isApproved: false,
  },
];

export const approvedReviews = [
  {
    id: 1,
    guestName: "Shane Finkelstein",
    listingName: "2B N1 A - 29 Shoreditch Heights",
    rating: 4.8,
    publicReview:
      "Shane and family are wonderful! Would definitely host again :)",
    reviewCategory: [
      { category: "cleanliness", rating: 10 },
      { category: "communication", rating: 9 },
      { category: "respect_house_rules", rating: 10 },
    ],
    submittedAt: "2023-08-21T22:45:14Z",
    channel: "Hostaway",
    isApproved: true,
  },
  {
    id: 3,
    guestName: "Liam O'Connor",
    listingName: "2B N1 A - 29 Shoreditch Heights",
    rating: 5.0,
    publicReview: "Perfect stay. Everything was spotless and well organized.",
    reviewCategory: [
      { category: "cleanliness", rating: 10 },
      { category: "communication", rating: 10 },
      { category: "respect_house_rules", rating: 10 },
    ],
    submittedAt: "2023-10-01T10:15:00Z",
    channel: "Google",
    isApproved: true,
  },
];

import Review from "../models/review";
import { NormalizedReview } from "../types";
// mockReviews.ts

export const mockReviews = [
  {
    id: 1,
    type: "host-to-guest",
    status: "published",
    rating: 5,
    publicReview:
      "Shane and family are wonderful! Would definitely host again :)",
    reviewCategory: [
      { category: "cleanliness", rating: 10 },
      { category: "communication", rating: 9 },
      { category: "respect_house_rules", rating: 10 },
    ],
    submittedAt: "2020-08-21 22:45:14",
    guestName: "Shane Finkelstein",
    listingName: "2B N1 A - 29 Shoreditch Heights",
    channel: "airbnb",
  },
  {
    id: 2,
    type: "guest-to-host",
    status: "published",
    rating: 4,
    publicReview: "Great place, but the Wi-Fi could be faster.",
    reviewCategory: [
      { category: "cleanliness", rating: 8 },
      { category: "communication", rating: 7 },
      { category: "location", rating: 9 },
    ],
    submittedAt: "2021-01-15 10:20:00",
    guestName: "Emily Carter",
    listingName: "2B N1 A - 29 Shoreditch Heights",
    channel: "booking.com",
  },
  {
    id: 3,
    type: "guest-to-host",
    status: "published",
    rating: 5,
    publicReview: "Absolutely loved our stay. The view was incredible!",
    reviewCategory: [
      { category: "cleanliness", rating: 9 },
      { category: "communication", rating: 10 },
      { category: "location", rating: 10 },
    ],
    submittedAt: "2022-06-05 18:00:00",
    guestName: "Michael Brown",
    listingName: "Central Park Apartment",
    channel: "airbnb",
  },
  {
    id: 4,
    type: "host-to-guest",
    status: "published",
    rating: null,
    publicReview: "Michael was a great guest — respectful and tidy.",
    reviewCategory: [
      { category: "cleanliness", rating: 10 },
      { category: "communication", rating: 9 },
    ],
    submittedAt: "2022-06-07 09:30:00",
    guestName: "Michael Brown",
    listingName: "Central Park Apartment",
    channel: "vrbo",
  },
  {
    id: 5,
    type: "guest-to-host",
    status: "published",
    rating: 3,
    publicReview: "The location was good, but it was noisy at night.",
    reviewCategory: [
      { category: "cleanliness", rating: 7 },
      { category: "communication", rating: 8 },
      { category: "location", rating: 6 },
    ],
    submittedAt: "2023-03-12 14:00:00",
    guestName: "Sarah Johnson",
    listingName: "Beachfront Condo",
    channel: "airbnb",
  },
];

export const listingPool = [
  { id: "155613", name: "The Bromley Collection" },
  { id: "155615", name: "Downtown Loft" },
  { id: "346994", name: "Camden Townhouse" },
  { id: "234523", name: "Soho Studio" },
  { id: "42552", name: "Notting Hill Flat" },
  { id: "882134", name: "Shoreditch Warehouse Retreat" },
  { id: "991245", name: "Greenwich Garden Apartment" },
  { id: "774321", name: "Mayfair Executive Suite" },
  { id: "663210", name: "Chelsea Chic Residence" },
  { id: "558901", name: "Hampstead Hilltop Hideaway" },
];

export const guestNames = [
  "Alice Johnson",
  "Michael Lee",
  "Dana White",
  "Sophia Brown",
  "Tom Parker",
  "Emily Davis",
  "Sarah Green",
  "James Wilson",
  "Olivia Martinez",
  "Daniel Carter",
];

export const channels = ["hostaway", "airbnb", "booking", "google"];
export const types = ["guest-to-host", "host-to-guest"];

export const publicReviews = [
  // Positive
  "Amazing stay, would definitely recommend! The apartment was spotless and even better than in the photos. The host went above and beyond to make sure we had everything we needed.",
  "Very clean and well located. It was easy to walk to restaurants, shops, and public transport. I felt safe and comfortable throughout my stay.",
  "The host was super helpful and responsive. They quickly answered all of our questions and even gave us fantastic local recommendations for food and attractions.",
  "The guest was polite, tidy, and easy to communicate with. They left the place in great condition, and I’d be happy to host them again anytime.",
  "Fantastic experience overall. The check-in was smooth, the space was cozy, and I really appreciated the thoughtful touches like fresh towels and snacks.",
  "Perfect location for exploring the city. Everything was within walking distance, and the neighborhood had a great atmosphere with plenty of cafes and shops.",
  "The apartment was quiet and cozy, and I instantly felt at home. The furniture was modern, and the bed was extremely comfortable — I slept like a baby.",
  "The place had modern amenities and a spacious layout. The kitchen was fully stocked, which made cooking meals very convenient.",
  "Would definitely come again! The combination of a great host, clean space, and prime location made this one of my best Airbnb experiences.",
  "Check-in was smooth and hassle-free. The host provided clear instructions, and I had no trouble finding the property.",
  "The apartment looked even better than in the pictures. Everything was stylishly decorated, and it gave off a very welcoming vibe.",
  "Great value for money. The location, cleanliness, and service exceeded my expectations, especially for the price I paid.",
  "WiFi was fast and reliable, which made it easy to work remotely during my stay. Streaming and video calls were no problem at all.",
  "The neighborhood was safe and full of charming cafes and bakeries. I loved being able to grab fresh coffee every morning just around the corner.",
  "The bed was extremely comfortable, and the blackout curtains made for a restful night’s sleep. I woke up feeling refreshed every morning.",

  // Neutral / Mixed
  "Good location, but the furniture felt a little outdated. Everything was functional, though, so it didn’t impact my stay too much.",
  "The stay was okay overall, but communication could have been quicker. It sometimes took a few hours for the host to reply to messages.",
  "The apartment was fine but smaller than expected. It worked for a short stay, but I would’ve liked more space for a longer visit.",
  "Check-in instructions were a bit confusing at first, but once I figured it out, the process was smooth.",
  "Reasonable for the price, but there are definitely areas for improvement. A few small maintenance issues could be addressed.",

  // Negative
  "The property was not as clean as advertised. I found dust in several corners and the bathroom could have used a deeper clean.",
  "The host was hard to reach when we had issues with the heating. It took nearly a full day before they got back to us.",
  "The apartment itself was nice, but the neighbors were very loud at night. It made it difficult to get a proper rest.",
  "The heating didn’t work properly during our stay, which made the nights uncomfortably cold. This really affected the overall experience.",
  "The photos online were a bit misleading compared to reality. The space looked larger and brighter in the listing than it actually was."
];


export const PropertyImages = [
  {
    id: "298057373",
    caption: "Photo 1.jpg",
    url: "https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/61148-155613-Q--MbaXvAXE-zjXmOxoJ2Pq9cuC06iwhkZu12FefEies-6425773082011",
    sortOrder: 1,
  },
  {
    id: "298057373",
    caption: "Photo 2.jpg",
    url: "https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/61148-155613-Q--MbaXvAXE-zjXmOxoJ2Pq9cuC06iwhkZu12FefEies-6425773082011",
    sortOrder: 3,
  },
  {
    id: "298057373",
    caption: "Photo 3.jpg",
    url: "https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/61148-155613-Q--MbaXvAXE-zjXmOxoJ2Pq9cuC06iwhkZu12FefEies-6425773082011",
    sortOrder: 4,
  },
  {
    id: "298057377",
    caption: "Cover Photo 4.jpg",
    url: "https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/61148-155613-iyM94ntDUqzJWlvM7K0jydynf3nUm3nKYTokZv9WnR8-6425774de77d2",
    sortOrder: 5,
  },
  {
    id: "298057380",
    caption: "Photo 7.jpg",
    url: "https://hostaway-platform.s3.us-west-2.amazonaws.com/listing/61148-155613-cXzFkL--eb42nnvhxlCkpUohN5RWrGqx7LFsU6THxjyE-64257769ce50c",
    sortOrder: 8,
  },
];


export const mockLocations = [
  "London, UK",
  "Camden, London",
  "Notting Hill, London",
  "Soho, London, UK",
  "Chelsea, London",
  "Greenwich, London",
  "Manchester City, UK",
  "Edinburgh, Scotland",
  "Dublin, Ireland",
  "Paris, France",
  "Montmartre, Paris, France",
  "Berlin Mitte, Germany",
  "Munich Altstadt, Germany",
  "Barcelona, Spain",
  "Madrid, Spain",
  "Lisbon, Portugal",
  "Rome, Italy",
];

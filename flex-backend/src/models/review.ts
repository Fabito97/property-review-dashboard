// models/Review.js
const Review = {
  id: String,
  propertyId: String,
  guestName: String,
  rating: Number,         // 1–5
  comment: String,
  date: Date,
  isApproved: Boolean,    // <-- important new field
};

export default Review;

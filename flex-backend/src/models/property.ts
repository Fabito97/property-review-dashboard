// models/Property.js
const Property = {
  id: String,             // unique
  name: String,
  location: String,
  description: String,
  reviews: [String],      // list of review IDs
};

export default Property;

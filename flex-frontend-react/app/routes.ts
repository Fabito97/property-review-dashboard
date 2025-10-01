import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/admin.tsx"),
  route("/properties", "routes/properties.tsx"),
  route("/properties/:id", "routes/propertyDetail.tsx"),
  route("/reviews", "routes/reviews.tsx"),
] satisfies RouteConfig;

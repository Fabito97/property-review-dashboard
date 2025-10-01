import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/admin.tsx"),
  route("/properties", "routes/properties.tsx"),
  route("/properties/:id", "routes/propertyDetail.tsx"),
  route("/reviews", "routes/reviews.tsx"),
//   route("/property/:id/reviews", "routes/propertyReview.tsx"),    
//     route("/dashboard", "routes/layouts/dashboardLayout.tsx", [
//       route("/dashboard/admin", "routes/admin.tsx"), // /dashboard
//       route("/property/:id/reviews", "routes/propertyReview.tsx"),    
//   ]),

] satisfies RouteConfig;

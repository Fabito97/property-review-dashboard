import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/admin.tsx"),
  route("/properties/:id", "routes/property.tsx"),
//   route("/property/:id/reviews", "routes/propertyReview.tsx"),    
//     route("/dashboard", "routes/layouts/dashboardLayout.tsx", [
//       route("/dashboard/admin", "routes/admin.tsx"), // /dashboard
//       route("/property/:id/reviews", "routes/propertyReview.tsx"),    
//   ]),

] satisfies RouteConfig;

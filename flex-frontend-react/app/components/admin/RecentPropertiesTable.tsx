import { useNavigate } from "react-router";
import { mockProperties } from "~/constants";
import type { Property } from "~/types/property";

type RecentPropertiesTableProps = {
  properties: Property[];
};

export default function RecentPropertiesTable({ properties }: RecentPropertiesTableProps) {
  const navigate = useNavigate();
  const visible = properties.slice(0, 5) || mockProperties;

  return (
    <div className="bg-white shadow-md rounded-md p-6 w-full overflow-x-auto">
      <h2 className="text-lg font-semibold mb-4">Recent Properties</h2>

      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 text-gray-400">
            <th className="text-left py-2 px-3 font-medium">Name</th>
            <th className="text-left py-2 px-3 font-medium">Location</th>
            <th className="text-left py-2 px-3 font-medium">Reviews</th>
            <th className="text-left py-2 px-3 font-medium">Rating</th>
            <th className="text-left py-2 px-3 font-medium">Created</th>
            <th className="text-left py-2 px-3 font-medium">View</th>
          </tr>
        </thead>
        <tbody>
          {visible.map((p, index) => (
            <tr
              key={p.id}
              className={`${
                index !== visible.length - 1 ? "border-b border-gray-200" : ""
              } hover:bg-gray-50`}
            >
              <td className="py-5 px-3">{p.name || "—"}</td>
              <td className="py-2 px-3">{p.location || "—"}</td>
              <td className="py-2 px-3">{p.reviewCount ?? 0}</td>
              <td className="py-2 px-3">
                {p.ratingPercentage != null ? p.ratingPercentage : "—"}
              </td>
              <td className="py-2 px-3">
                {p.createdAt ? new Date(p.createdAt).toLocaleDateString() : "—"}
              </td>
              <td className="py-2 px-3">
                <button
                  onClick={() => navigate(`/properties/${p.id}`)}
                  className="text-sm px-3 py-1 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {properties.length > 2 && (
        <div className="mt-4 text-right flex justify-center my-10 mt-15">
          <button
            onClick={() => navigate("/properties/1")}
             className="text-sm text-gray-100 bg-blue-400 px-4 py-2 rounded-md hover:bg-blue-500 transition-colors cursor-pointer"
          >
            View More
          </button>
        </div>
      )}
    </div>
  );
}
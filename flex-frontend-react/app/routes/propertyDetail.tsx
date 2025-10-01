import { useEffect, useState } from "react";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import PropertyShowCase from "~/components/property/PropertyShowCase";
import BookingBox from "~/components/property/Booking";
import StayPolicy from "~/components/property/StayPolicy";
import { About } from "~/constants";
import type { Property } from "~/types/property";
import type { Review } from "~/types/review";
import { useParams } from "react-router";
import axios from "axios";
import Skeleton from "~/components/ui/SkeletonLoader";
import { useAppData } from "~/context/AppContext";
import { formatDate } from "~/lib/utils";
import { apiRequest } from "~/lib/api/axios";

export default function PropertyPage() {
  const { id } = useParams();
  const { reviewData } = useAppData();

  const [property, setProperty] = useState<Property | null>(null);
  const [approvedReviews, setApprovedReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await apiRequest<any>("get", `/properties/${id}/hostaway`);
        const data: Property = res.data.data;

        // ✅ Filter reviews from context
        const allReviews = reviewData?.reviews || [];
        const filtered = allReviews.filter(
          (r) => r.listingId === data.id
        );

        setProperty({ ...data, reviews: filtered });
        setApprovedReviews(filtered);
      } catch (error) {
        console.error("Failed to fetch property:", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (id) fetchProperty();
  }, [id, reviewData]);
  console.log("Properties from me:", property)

  if (isLoading) {
    return (
      <div className="bg-[#f4f4f4] h-screen">
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-48 w-full rounded-md" />
              ))}
            </div>
            <Skeleton className="h-10 w-1/3" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Property not found.
      </div>
    );
  }

  return (
    <div className="bg-[#f4f4f4]">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <PropertyShowCase images={property.images} />
      </div>

      <main className="max-w-6xl mx-auto px-10 py-8 flex md:flex-row flex-col gap-8">
        <div className="md:w-[70%]">
          {/* About */}
          <section className="mb-8 bg-white p-10 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4">About Details</h2>
            <p className="text-[#333] line-clamp-3">{About.slice(100)}</p>
            <button className="text-green-700 text-sm mt-2 cursor-pointer">
              Read more
            </button>
          </section>

          {/* Amenities — left as-is for now */}
          <section className="mb-8 bg-white p-10 rounded-xl shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold mb-4">Amenities</h2>
              <button className="text-gray-700 text-sm cursor-pointer p-2 px-5 border border-gray-500 rounded-md hover:bg-gray-200">
                View all
              </button>
            </div>
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-gray-700">
              <li>Kitchen</li>
              <li>Wifi</li>
              <li>Washer</li>
              <li>Dryer</li>
              <li>Hair dryer</li>
              <li>Heating</li>
              <li>Hangers</li>
              <li>Iron</li>
              <li>TV</li>
            </ul>
          </section>

          <StayPolicy />

          {/* Approved Reviews */}
          <section className="mb-8 bg-white p-10 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Guest Reviews</h2>
            {approvedReviews.length === 0 ? (
              <p className="text-gray-500">No approved reviews yet.</p>
            ) : (
              <ul className="space-y-6">
                {approvedReviews?.map((review) => (
                  <li key={review.id} className="border-b pb-4">
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>{review.guestName}</strong> — {formatDate(review.submittedAt)}
                    </p>
                    <p className="text-gray-800 text-sm">{review.publicReview}</p>
                    {review.rating && (
                      <p className="text-yellow-600 text-sm mt-1">
                        Rating: {review.rating}/10
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        <BookingBox />
      </main>

      <Footer />
    </div>
  );
}
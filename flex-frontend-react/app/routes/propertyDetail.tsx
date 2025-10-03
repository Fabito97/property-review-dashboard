import { useEffect, useState } from "react";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import PropertyShowCase from "~/components/propertyDetails/PropertyShowCase";
import BookingBox from "~/components/propertyDetails/Booking";
import { About } from "~/constants";
import type { Property } from "~/types/property";
import type { Review } from "~/types/review";
import { useParams } from "react-router";
import Skeleton from "~/components/ui/SkeletonLoader";
import { useAppData } from "~/context/AppContext";
import { apiRequest } from "~/lib/api/axios";
import ApprovedReviews from "~/components/propertyDetails/ApproovedReviews";
import StayPolicy from "~/components/propertyDetails/StayPolicy";

export default function PropertyPage() {
  const { id } = useParams();
  const { reviewData } = useAppData();

  const [property, setProperty] = useState<Property | null>(null);
  const [approvedReviews, setApprovedReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFullDetails, setShowFullDetails] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await apiRequest<any>("get", `/properties/${id}/hostaway`);
        const data: Property = res.data.data;

        // Filter reviews from context
        const allReviews = reviewData?.reviews || [];
        const filtered = allReviews.filter(
          (r) => r.listingId === id && r.isApproved
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

  if (isLoading) {
    return (
      <div className="bg-[#fff]">
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 pb-10 h-screen sm:px-6 py-6 sm:py-8">
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-40 sm:h-48 w-full rounded-md" />
              ))}
            </div>
            <Skeleton className="h-8 w-2/3 sm:w-1/3" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-28 w-full" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-[#fffdf4]">
      <Navbar />

      <div className="md:max-w-6xl mx-auto px-4 sm:px-6 sm:py-8 h-full">
        <PropertyShowCase images={property?.images} />
      </div>

      <main className="max-w-6xl mx-auto px-5 md:px-10 sm:px-6 py-6 sm:py-8 flex flex-col md:flex-row gap-6 md:gap-8">
        <div className="w-full md:w-[70%]">
          {/* About */}
          <section className="mb-6 sm:mb-8 bg-white p-6 sm:p-10 rounded-xl shadow-lg">
            <h2 className="text-lg sm:text-xl font-semibold mb-3">
              About this property
            </h2>
            <p className="text-[#333] text-xs sm:text-sm whitespace-pre-line">
              {showFullDetails
                ? property?.description || About
                : property?.description?.slice(0, 100) || About.slice(0, 100)}
            </p>
            <button
              className="text-green-700 text-sm mt-2 cursor-pointer"
              onClick={() => setShowFullDetails((prev) => !prev)}
            >
              {showFullDetails ? "Read less" : "Read more"}
            </button>
          </section>

          {/* Amenities — left as-is for now */}
          <section className="mb-6 sm:mb-8 bg-white p-6 sm:p-10 rounded-xl shadow-lg">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg sm:text-xl font-semibold mb-0">
                Amenities
              </h2>
              <button className="text-gray-700 text-xs cursor-pointer p-2 px-4 border border-gray-400 rounded-md hover:bg-gray-100">
                View all Amenities
              </button>
            </div>
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-gray-700 text-sm">
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
        </div>

        {/* Booking box*/}
        <div className="w-full md:w-[30%] mb-10">
          <div className="md:sticky md:top-24">
            <div className="flex flex-col md:flex-col-reverse gap-4 md:gap-8">
              <ApprovedReviews approvedReviews={approvedReviews} />
              <BookingBox />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

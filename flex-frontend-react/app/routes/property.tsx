"use client";

import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import Footer from "~/components/Footer";
import Navbar from "~/components/Navbar";
import ApprovedReviews from "~/components/property/ApproovedReviews";
import BookingBox from "~/components/property/Booking";
import PropertyShowCase from "~/components/property/PropertyShowCase";
import StayPolicy from "~/components/property/StayPolicy";
import { About } from "~/constants";
import type { Review } from "~/types/review";

const Page = () => {
  const [approvedReviews, setApprovedReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("/api/reviews/hostaway");
        const data = await response.json();
        // Filter for approved reviews as per the requirement
        const approved = data.reviews.filter(
          (review: Review) => review.isApproved
        );
        setApprovedReviews(approved);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="bg-[#f4f4f4]">
      <Navbar />

      {/* Hero */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <PropertyShowCase />
      </div>

      <main className="max-w-6xl mx-auto px-10 py-8 flex md:flex-row flex-col gap-8">
        <div className="md:w-[70%]">
          <section className="mb-8 bg-white p-10 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4">About Details</h2>
            <p className="text-[#333] line-clamp-3">{About.slice(100)}</p>
            <button className="text-green-700 test-sm mt-2 cursor-pointer">
              Read more
            </button>
          </section>

          {/* Amenities */}
          <section className="mb-8 bg-white p-10 rounded-xl shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold mb-4">Amenities</h2>
              <button className="text-green-700 test-sm cursor-pointer p-2 px-5 border rounded-md hover:bg-gray-400">
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
          <ApprovedReviews />
        </div>
        <BookingBox />
      </main>
      <Footer />
    </div>
  );
};

export default Page;

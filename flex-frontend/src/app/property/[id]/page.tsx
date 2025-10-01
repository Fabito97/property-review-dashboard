"use client";

import Footer from "@/components/Footer";
import ApprovedReviews from "@/components/property/ApproovedReviews";
import PropertyShowCase from "@/components/property/PropertyShowCase";
import StayPolicy from "@/components/property/StayPolicy";
import { Review } from "@/types/review";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const navItems = [
  {
    name: "Landlords",
    href: "/",
  },
  {
    name: "About Us",
    href: "/",
  },
  {
    name: "Careers",
    href: "/",
  },
  {
    name: "Contact",
    href: "/",
  },
];

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
      <nav className="p-5 sticky top-0 bg-white z-10 shadow-md">
        <div className="flex items-center justify-between max-w-[1100px] mx-auto">
          <div className="flex gap-1 items-end">
            <Image
              src={"/logo.png"}
              alt="the flex"
              width={40}
              height={40}
              className={"rounded-full"}
            />
            <h1 className="mb-1 text-xl">the flex</h1>
          </div>

          <div className="flex gap-10">
            {navItems.map((item) => (
              <Link
                href={item.href}
                key={item.name}
                className="p-2 md:py-3 md:px-8 hover:bg-gray-200 hover:rounded-md gap-8"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Property Header */}
        <PropertyShowCase />
        
      </div>

        <main className="max-w-6xl mx-auto px-10 py-8">


        <section className="mb-8 bg-white p-10 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">About Details</h2>
            <p className="text-[#333] line-clamp-3">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloremque quod sed, odio fugiat voluptatibus quo totam atque ratione facere vero in quis tempora est velit, numquam excepturi, porro perferendis magni autem modi illo enim! Provident nesciunt nihil eligendi quam quis aliquid. Ad neque minima perspiciatis. Temporibus voluptatum iure perferendis hic aliquid. Sint commodi dicta architecto rem a, sequi dolore officiis tempora quos ipsam quidem, dolor porro facilis excepturi. Delectus alias ad a quia commodi sunt vero, accusamus molestiae deserunt similique exercitationem ab illo eligendi numquam nesciunt maxime nam minus voluptatem saepe, officia quasi dicta aliquid officiis. Molestiae, harum. Quisquam, rem.</p>
            <button className="text-green-700 test-sm mt-2 cursor-pointer">Read more</button>
        </section>

        {/* Amenities */}
        <section className="mb-8 bg-white p-10 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Amenities</h2>
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
       
        </main>    
    </div>
  );
};

export default Page;

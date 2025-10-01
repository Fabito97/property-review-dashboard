import { Bath, BedIcon, Home, User } from "lucide-react";
import React from "react";
import type { PropertyImages } from "~/types/property";

const specs = [
  { name: "Guests", number: 1, icon: "" },
  { name: "Bedrooms", number: 1, icon: "" },
  { name: "Bathrooms", number: 1, icon: "" },
  { name: "Beds", number: 3, icon: "" },
];

// Fallback mock images matching PropertyImages type
const fallbackImages: PropertyImages[] = [
  { url: "/images/image-1.png", caption: "Property Image 1" },
  { url: "/images/image-3.png", caption: "Property Image 2" },
  { url: "/images/image-3.png", caption: "Property Image 3" },
  { url: "/images/image-4.png", caption: "Property Image 4" },
  { url: "/images/image-5.png", caption: "Property Image 5" },
];

const PropertyShowCase = ({ images }: { images?: PropertyImages[] }) => {
  const displayImages = images && images.length > 0 ? images : fallbackImages;

  return (
    <section className="mb-8 px-4 sm:px-6 lg:px-8 pt-10">
      <div className="border-b border-gray-400">
        {/* Image Gallery */}
        <div className="flex justify-center sm:h-[500px] items-center gap-4 mb-8 sm:mb-13">
          {/* Main Image */}
          <div className="relative md:w-[50%] sm:h-full rounded-lg overflow-hidden">
            <img
              src={displayImages[0].url}
              alt={displayImages[0].caption}
              className=" h-full w-full"
            />
          </div>

          {/* Grid of Additional Images */}
          <div className="hidden md:grid grid-cols-2 grid-rows-2 gap-4 w-[50%] h-full">
            {displayImages.slice(1, 5).map((image, index) => (
              <div
                key={index}
                className="relative w-full h-full rounded-lg overflow-hidden"
              >
                <img
                  src={image.url}
                  alt={image.caption}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Property Title */}
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">
          Modish 1 Bed Apartment in St Katharine - London
        </h1>

        {/* Specifications */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center md:w-[50%] mb-5">
          {specs.map((spec, index) => (
            <div key={index} className="sm:p-4 p-2 flex items-center gap-4 justif-center">
              {spec.name === "Beds" && <BedIcon className="h-4 w-4"/>}
              {spec.name === "Bathrooms" && <Bath className="h-4 w-4"/>}
              {spec.name === "Bedrooms" && <Home className="h-4 w-4"/>}
              {spec.name === "Guests" && <User className="h-4 w-4"/>}
              <div>
                <span className="text-xs font-semibold">{spec.number}</span>
                <p className="text-xs font-semibold text-gray-500">
                  {spec.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertyShowCase;

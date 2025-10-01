import React from "react";
import type { PropertyImages } from "~/types/property";

const IconGuests = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <path
      d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z"
      fill="currentColor"
    />
    <path
      d="M4 20c0-2.21 3.58-4 8-4s8 1.79 8 4v1H4v-1z"
      fill="currentColor"
      opacity="0.85"
    />
  </svg>
);

const IconBedroom = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <path
      d="M21 10V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <rect
      x="3"
      y="10"
      width="18"
      height="8"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.2"
    />
  </svg>
);

const IconBathroom = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <path
      d="M7 21v-4a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v4"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 7h.01"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 7h.01"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconBeds = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <path
      d="M3 10h18v6H3z"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7 10V7a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v3"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const specs = [
  { name: "Guests", number: 1, icon: <IconGuests /> },
  { name: "Bedrooms", number: 1, icon: <IconBedroom /> },
  { name: "Bathrooms", number: 1, icon: <IconBathroom /> },
  { name: "Beds", number: 3, icon: <IconBeds /> },
];

// ✅ Fallback mock images matching PropertyImages type
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
    <section className="mb-8 px-4 sm:px-6 lg:px-8 pt-6">
      <div className="border-b border-gray-400 pb-6">
        {/* Image Gallery */}
        <div className="w-full mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Main Image */}
            <div
              className="relative w-full md:w-1/2 rounded-lg overflow-hidden md:m-h-[60vh]"
              style={{ aspectRatio: "16/9"}}
            >
              <img
                src={displayImages[0].url}
                alt={displayImages[0].caption}
                className="object-cover w-full h-full"
              />
            </div>

            {/* Grid of Additional Images (desktop) */}
            <div className="hidden md:grid grid-cols-2 grid-rows-2 gap-4 w-1/2">
              {displayImages.slice(1, 5).map((image, index) => (
                <div
                  key={index}
                  className="relative w-full h-40 md:h-48 rounded-lg overflow-hidden"
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

          {/* Thumbnails for mobile */}
          <div className="mt-3 md:hidden flex gap-3 overflow-x-auto pb-2">
            {displayImages.slice(1, 6).map((img, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-28 h-20 rounded-lg overflow-hidden border border-gray-100"
              >
                <img
                  src={img.url}
                  alt={img.caption}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Property Title */}
        <h1 className="text-2xl sm:text-3xl font-bold mb-3">
          Modish 1 Bed Apartment in St Katharine - London
        </h1>

        {/* Specifications */}
        <div className="mb-5">
          <div className="flex gap-3 overflow-x-auto md:grid md:grid-cols-4 md:gap-2 md:w-1/2">
            {specs.map((spec, index) => (
              <div
                key={index}
                className="p-3 min-w-[110px] text-center md:static flex flex-col items-center gap-2"
              >
                <div className="text-gray-700">{spec.icon}</div>
                <span className="text-lg font-medium">{spec.number}</span>
                <p className="text-sm text-gray-500">{spec.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyShowCase;

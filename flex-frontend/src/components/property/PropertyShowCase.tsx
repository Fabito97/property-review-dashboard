import Image from "next/image";
import React from "react";

const specs = [
  { name: "Guests", number: 1, icon: "" },
  { name: "Bedrooms", number: 1, icon: "" },
  { name: "Bathrooms", number: 1, icon: "" },
  { name: "Beds", number: 3, icon: "" },
];

const propertyImages = [
  { alt: "Property Image 1", src: "/assets/image-1.png" },
  { alt: "Property Image 2", src: "/assets/image-3.png" },
  { alt: "Property Image 3", src: "/assets/image-3.png" },
  { alt: "Property Image 4", src: "/assets/image-4.png" },
  { alt: "Property Image 5", src: "/assets/image-5.png" },
];

const PropertyShowCase = () => {
  return (
    <section className="mb-8 px-4 sm:px-6 lg:px-8 pt-10">
      <div className="border-b border-gray-400 ">
        {/* Image Gallery */}
        <div className="flex justify-center h-[500px] items-center gap-4 mb-8 sm:mb-13">
          <div className="relative w-[50%] sm:h-full rounded-lg overflow-hidden">
            <img
              src={propertyImages[0].src}
              alt={propertyImages[0].alt}
              className="object-cover h-full w-full"
            />
          </div>

          <div className="hidden md:grid grid-cols-2 grid-rows-2 gap-4 w-[50%] h-full">
            {propertyImages.map((image, index) => (
              <div
                key={index}
                className={`relative w-full h-full rounded-lg overflow-hidden ${
                  index === 0 ? "hidden" : ""
                }`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="object-cover w-full h-full "
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
            <div key={index} className=" p-4">
              <span className="text-sm">{spec.number}</span>
              <p className="text-sm text-gray-500">{spec.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertyShowCase;

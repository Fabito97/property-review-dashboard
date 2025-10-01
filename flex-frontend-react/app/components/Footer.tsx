import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#104d32] border-t text-center text-sm text-gray-200 px-10 py-4 md:py-10">
      &copy; {new Date().getFullYear()} The Flex Living. All rights reserved.
    </footer>
  );
};

export default Footer;

    // <footer className="p-10 bg-green-900 text-white pt-20">
    //   <div className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center mb-8 border-d border-gray-700">
       
    //   </div>
    //   <div className="flex justify-center items-center gap-2 pt-10">
    //     <p>2025 The Flex. All rights reserved.</p>
    //   </div>
    // </footer>
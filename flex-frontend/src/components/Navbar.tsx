import Image from "next/image";
import React from "react";

const Navbar = () => {
  return (
    <nav className="flex- w-[300px] flex-col items-center justify-center ">
      <Image src={"/logo.png"} alt="the flex" width={100} height={50} />
    </nav>
  );
};

export default Navbar;

import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { navItems } from "~/constants";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    // set initial state in case component mounts after some scroll
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`p-4 sm:p-5 sticky top-0 z-40 shadow-d ${
        scrolled ? "bg-green-900 text-white" : "bg-[#fffdf4] text-gray-800"
      }`}
    >
      <div className="flex items-center justify-between max-w-[1100px] mx-auto">
        <div className="flex gap-2 items-center">
          <img
            src={"/logo.png"}
            alt="the flex"
            width={40}
            height={40}
            className={"rounded-full"}
          />
          <h1 className="mb-0 text-lg sm:text-xl font-semibold">the flex</h1>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex gap-6 items-center">
          {navItems.map((item) => (
            <Link
              to={item.href}
              key={item.name}
              className={`p-2 md:py-3 md:px-6 rounded-md transition-colors ${
                scrolled
                  ? "text-white hover:bg-emerald-500"
                  : "text-gray-800 hover:bg-gray-200"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <div className="md:hidden">
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((s) => !s)}
            className={`p-2 rounded-md focus:outline-none focus:ring-2 ${
              scrolled ? "focus:ring-white" : "focus:ring-indigo-500"
            }`}
          >
            <div className="w-6 h-6 flex flex-col justify-between">
              <span
                className={`block h-0.5 transform transition-all duration-200 ${
                  scrolled ? "bg-white" : "bg-gray-800"
                } ${open ? "rotate-45 translate-y-1" : ""}`}
              />
              <span
                className={`block h-0.5 transition-all duration-200 ${
                  scrolled ? "bg-white" : "bg-gray-800"
                } ${open ? "opacity-0" : ""}`}
              />
              <span
                className={`block h-0.5 transform transition-all duration-200 ${
                  scrolled ? "bg-white" : "bg-gray-800"
                } ${open ? "-rotate-45 -translate-y-1" : ""}`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile overlay menu */}
      {open && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black bg-opacity-40"
            onClick={() => setOpen(false)}
            aria-hidden
          />

          <div
            className={`absolute top-0 right-0 w-11/12 max-w-xs h-full shadow-lg p-6 overflow-auto ${
              scrolled ? "bg-emerald-900 text-white" : "bg-white text-gray-800"
            }`}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <img
                  src={"/logo.png"}
                  alt="the flex"
                  width={36}
                  height={36}
                  className={"rounded-full"}
                />
                <span className="font-semibold">the flex</span>
              </div>
              <button
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className={`p-2 rounded-md focus:outline-none focus:ring-2 ${
                  scrolled ? "focus:ring-white" : "focus:ring-indigo-500"
                }`}
              >
                Close
              </button>
            </div>

            <nav className="flex flex-col gap-3">
              {navItems.map((item) => (
                <Link
                  to={item.href}
                  key={item.name}
                  onClick={() => setOpen(false)}
                  className={`py-3 px-2 rounded-md ${
                    scrolled ? "hover:bg-emerald-500" : "hover:bg-gray-100"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

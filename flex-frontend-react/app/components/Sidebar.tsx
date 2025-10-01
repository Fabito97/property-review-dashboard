import { Link, useLocation } from "react-router";
import { useState } from "react";
import { HamburgerMenuIcon, DashboardIcon, HomeIcon, ChatBubbleIcon } from "@radix-ui/react-icons";

const navItems = [
  {
    name: "Dashboard",
    href: "/",
    icon: <DashboardIcon className="w-4 h-4" />,
  },
  {
    name: "Properties",
    href: "/properties",
    icon: <HomeIcon className="w-4 h-4" />,
  },
  {
    name: "Reviews",
    href: "/reviews",
    icon: <ChatBubbleIcon className="w-4 h-4" />,
  },
];

const Sidebar = () => {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle */}
      <button
        className="sm:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-md shadow-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        <HamburgerMenuIcon className="w-6 h-6" />
      </button>

      {/* Sidebar */}
      <nav
        className={`fixed top-0 left-0 h-screen w-[260px] bg-white shadow-sm z-40 transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0 sm:static sm:h-auto sm:flex sm:flex-col`}
      >
        {/* Logo */}
        <div className="flex gap-2 p-5 items-center mb-5 border-b pb-4 border-gray-300 py-10">
          <img src="/logo.png" alt="The Flex" width={40} height={40} />
          <h3 className="text-xl font-bold">The Flex</h3>
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-4 p-5 ">
          {navItems.map((item) => (
            <Link
              to={item.href}
              key={item.name}
              className={`flex items-center gap-2 text-sm px-3 py-2 rounded-md transition-colors
                ${pathname === item.href ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-100"}`}
              onClick={() => setIsOpen(false)}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
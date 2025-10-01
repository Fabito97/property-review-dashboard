import { Link, useLocation } from "react-router";
import { useState } from "react";
import {
  HamburgerMenuIcon,
  DashboardIcon,
  HomeIcon,
  ChatBubbleIcon,
} from "@radix-ui/react-icons";

export const sideBarNavItems = [
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

const Sidebar = ({ embedded = false }: { embedded?: boolean }) => {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // If embedded (rendered inside a parent overlay), avoid rendering its own mobile toggle
  const showMobileToggle = !embedded;

  const navClass = embedded
    ? `w-full bg-transparent static shadow-none transform-none`
    : `fixed top-0 left-0 h-screen w-[260px] bg-white shadow-sm z-40 transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } sm:translate-x-0 sm:static sm:h-auto sm:flex sm:flex-col md:pb-6`;

  return (
    <>
      {/* Mobile Toggle (only when not embedded) */}
      {showMobileToggle && (
        <button
          className="sm:hidden fixed top-4 left-4 z-50 bg-whit p-2 rounded-md shadow-md"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open sidebar"
        >
          <HamburgerMenuIcon className="w-6 h-6" />
        </button>
      )}

      {/* Sidebar */}
      <nav className={`${navClass} `}>
        {/* Logo */}
        <div className="flex gap-2 items-center mb-5 border-b pb-4 border-gray-300 py-4 px-5">
          <img src="/logo.png" alt="The Flex" width={40} height={40} />
          <h3 className="text-xl font-bold">The Flex</h3>
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-3 p-4">
          {sideBarNavItems.map((item) => (
            <Link
              to={item.href}
              key={item.name}
              className={`flex items-center gap-3 text-sm px-3 py-3 rounded-md transition-colors touch-manipulation select-none ${
                pathname === item.href
                  ? "bg-green-800 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => {
                if (!embedded) setIsOpen(false);
              }}
            >
              {item.icon}
              <span className="truncate">{item.name}</span>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Sidebar;

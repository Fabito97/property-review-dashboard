import { Link, useLocation } from "react-router";
import { useState } from "react";
import {
  HamburgerMenuIcon,
  DashboardIcon,
  HomeIcon,
  ChatBubbleIcon,
} from "@radix-ui/react-icons";
import { X } from "lucide-react";

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

interface SidebarProps {
  embedded?: boolean;
  sidebarOpen: boolean;
  onSidebarOpen: (state: boolean) => void;
}

const Sidebar = ({
  embedded = false,
  sidebarOpen,
  onSidebarOpen,
}: SidebarProps) => {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navClass = embedded
    ? `bg-transparent static shadow-none transform-none`
    : `fixe top-0 left-0 h-screenbg-white shadow-sm z-40 transition-transform duration-300 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 sm:static sm:h-full md:flex sm:flex-col w-full md:pb-6`;

  return (
    <>    

      {/* Backdrop for mobile when sidebar open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-30 md:hidden"
          onClick={() => onSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar (overlay) */}
      <div
        className={`fixed inset-y-0 left-0 z-51 w-64 bg-white shadow-lg transform transition-transform duration-200 md:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-hidden={!sidebarOpen}
      >
        <div className="p-2 h-full overflow-auto">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-300">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="The Flex" width={36} height={36} />
              <h3 className="font-bold">The Flex</h3>
            </div>
            <button
              onClick={() => onSidebarOpen(false)}
              aria-label="Close menu"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              <X className="w-5 h-5" />
            </button>
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
        </div>
      </div>

      {/* Sidebar */}
      <nav className={`${navClass} hidden`}>
        {/* Logo */}
        <div className="hidden md:flex gap-2 items-center mb-5 border-b pb-4 border-gray-300 h-22 pt-3 px-5">
          <img src="/logo.png" alt="The Flex" width={40} height={40} />
          <h3 className="lg:text-xl font-medium">The Flex</h3>
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
              <span className="truncate lg:block">{item.name}</span>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Sidebar;

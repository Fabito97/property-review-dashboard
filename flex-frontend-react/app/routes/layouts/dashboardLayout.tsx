import React, { useState } from "react";
import Footer from "~/components/Footer";
import Sidebar from "~/components/Sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFBFF] font-sans">
      {/* Layout Grid */}
      <div className="flex flex-1 min-h-screen">
        {/* Desktop Sidebar (fixed) */}
        <div className="hidden md:block md:fixed md:inset-y-0 md:left-0 md:w-64 md:z-40">
          <Sidebar embedded={false} />
        </div>

        {/* Mobile Sidebar (overlay) */}
        <div
          className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-200 md:hidden ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          aria-hidden={!sidebarOpen}
        >
          <div className="p-2 h-full overflow-auto">
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <div className="flex items-center gap-3">
                <img src="/logo.png" alt="The Flex" width={36} height={36} />
                <h3 className="font-bold">The Flex</h3>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                aria-label="Close menu"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Close
              </button>
            </div>
            <Sidebar embedded />
          </div>
        </div>

        {/* Backdrop for mobile when sidebar open */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

  {/* Main Content (reserve sidebar width on desktop) */}
  <div className="w-full md:ml-64">
          {/* Header */}
          <header className="mb-1 border-b border-gray-200 py-4 px-4 md:py-5 md:px-10 flex items-start md:items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Mobile hamburger */}
              <button
                className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open menu"
              >
                <span className="sr-only">Open menu</span>
                <div className="w-6 h-6 flex flex-col justify-between">
                  <span className="block h-0.5 bg-gray-700" />
                  <span className="block h-0.5 bg-gray-700" />
                  <span className="block h-0.5 bg-gray-700" />
                </div>
              </button>

              <div>
                <h1 className="text-lg md:text-xl font-bold mb-0">
                  Welcome Admin
                </h1>
                <p className="text-sm text-gray-600">
                  Manage and assess your properties' review performance here.
                </p>
              </div>
            </div>

            {/* Right-side header area (keeps spacing on desktop) */}
            <div className="hidden md:block">
              {/* Placeholder for future header controls */}
            </div>
          </header>

          {/* Content */}
          <section className="p-4 md:p-5 md:px-10">{children}</section>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DashboardLayout;

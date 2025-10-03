import React, { useState } from "react";
import Footer from "~/components/Footer";
import Sidebar from "~/components/Sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFBFF] font-sans">
      {/* Layout Grid */}
      <div className="flex flex-1 min-h-screen relativ">
        
        <div className="md:fixed md:inset-y-0 md:left-0 w-auto lg:w-64 md:z-40">
          <Sidebar
            onSidebarOpen={setSidebarOpen}
            sidebarOpen={sidebarOpen}
          />
        </div>

        {/* Main Content */}
        <div className="w-full md:ml-40 lg:ml-64 min-h-screen relative">
          {/* Header */}
          <header className="sticky top-0 z-50 h-22 mb-1 border-b bg-white border-gray-200 py-4 px-4 md:py-5 md:px-10 flex items-start md:items-center justify-between">
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
          
          </header>

          {/* Content */}
          <section className="p-4 md:p-5 md:px-10 bg-[#FAFBFF] overflow-y-auto relative">
            {children}
          </section>

        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DashboardLayout;

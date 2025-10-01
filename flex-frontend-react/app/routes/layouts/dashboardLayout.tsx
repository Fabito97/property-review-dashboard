import React from "react";
import Footer from "~/components/Footer";
import Sidebar from "~/components/Sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAFBFF] font-sans">
      {/* Layout Grid */}
      <div className="flex flex-1 min-h-screen ">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="w-full">
          {/* Header */}
          <header className="mb-1  border-b border-gray-200 py-5 p-10 ">
            <h1 className="text-xl font-bold mb-2">Welcome Admin</h1>
            <p className="text-sm text-gray-600">
              Manage and assess your properties' review performance here.
            </p>
          </header>

            {/* Content */}
          <section className="p-5 px-10 ">
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

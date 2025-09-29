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
     
          {children}
        
      </div>

      {/* Footer */}
      <Footer/>
    </div>
  );
};

export default DashboardLayout;
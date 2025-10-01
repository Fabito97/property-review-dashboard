import Navbar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | The Flex Living",
  description: "Review Dashboard for the managers to assess their properties' performances",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="font-sans flex  min-h-screen">
        <Navbar />
        {children}
      </div>
    </div>
  );
}

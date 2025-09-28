import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Flex Living",
  description: "Review Dashboard for the managers to assess their properties' performances",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="font-sans flex  min-h-screen gap-16">
        <Navbar />
        {children}
      </div>
      <Footer />
    </div>
  );
}

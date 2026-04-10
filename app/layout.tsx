import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingContactButtons from "@/components/ui/FloatingContactButtons";

export const metadata: Metadata = {
  title: {
    default: "Tourism Platform — Travel With Purpose",
    template: "%s | Tourism Platform",
  },
  description:
    "All-inclusive tour packages to the world's most breathtaking destinations. Adventure, luxury, wellness, and cultural trips curated by experts.",
  keywords: [
    "travel",
    "tours",
    "vacation",
    "adventure",
    "luxury travel",
    "tour packages",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <FloatingContactButtons />
      </body>
    </html>
  );
}

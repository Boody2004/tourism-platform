import type { Metadata } from "next";
import agencyData from "@/data/agency.json";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: `${agencyData.name} — ${agencyData.slogin}`,
    template: `%s | ${agencyData.name}`,
  },
  description:
    "All-inclusive tour packages to the world's most breathtaking destinations.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

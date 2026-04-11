import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Touriva — Travel With Purpose",
    template: "%s | Touriva",
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

import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HashScrollHandler from "@/components/HashScrollHandler";
import "./globals.css";

export const metadata: Metadata = {
  title: "Raptor Staffing Solutions | Industrial Manpower & Recruitment",
  description:
    "Skilled, semi-skilled, and general manpower supply, volume recruitment, payroll compliance, and employee welfare management across South & East India.",
  icons: { icon: "/favicon.svg?v=2" },
  keywords: [
    "manpower solutions",
    "industrial staffing",
    "recruitment agency Tamil Nadu",
    "Kanchipuram staffing",
    "Sunguvarchatram manpower",
    "contract staffing India",
    "factory workforce supply",
    "payroll compliance",
  ],
  verification: {
    google: "xHO1z5NPPt5-2yaE_XcQorqzLQbr0W-adSUTjCWOP1M",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <HashScrollHandler />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

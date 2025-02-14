import localFont from "next/font/local";
import "./globals.css";

export const metadata = {
  title: "Integrasi",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#16151a]">{children}</body>
    </html>
  );
}

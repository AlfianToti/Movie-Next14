import localFont from "next/font/local";
import "./globals.css";

export const metadata = {
  title: "The Movie by Toti",
  description: "Created with Next App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#16151a]">{children}</body>
    </html>
  );
}

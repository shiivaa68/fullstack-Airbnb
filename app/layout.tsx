import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navabr from "./components/navbar/Navbar";

const font = Nunito({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Airbnb",
  description: "Airbnb clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Navabr/>
        {children}</body>
    </html>
  );
}

"use client"; // This will mark the component as a client-side component

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation"; // Correct import for next/navigation
import localFont from "next/font/local";
import "./globals.css";
import Hero from "../app/components/Hero"; // Import the Hero component

// Custom fonts
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }) {
  const [hasMounted, setHasMounted] = useState(false); // Track if mounted on the client
  const pathname = usePathname(); // This gives us the current pathname

  useEffect(() => {
    // Ensure this runs only on the client-side (after hydration)
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    // During the initial render (before client-side hydration)
    return <html lang="en"><body></body></html>;
  }

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Conditionally render Hero only on non-home, non-login, and non-signup pages */}
        {!["/", "/login", "/signup"].includes(pathname) && <Hero />}
        {children}
      </body>
    </html>
  );
}

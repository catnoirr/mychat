"use client";
import React from "react";
import { useRouter } from "next/navigation"; // Import the useRouter hook

const Homepage = () => {
  const router = useRouter(); // Initialize the router

  // Function to handle button click and navigate to the signup page
  const handleGetStartedClick = () => {
    router.push("/signup"); // Navigate to the signup page
  };

  return (
    <div className="flex items-center justify-center">
      <div className="relative bg-black text-white w-full h-screen p-6 flex flex-col lg:flex-row lg:items-center lg:justify-between lg:w-full lg:px-20 shadow-lg">
        
        {/* Left side: Text content */}
        <div className="text-center mt-40 space-y-4 lg:text-left lg:mt-0 lg:w-1/2">
          <h1 className="text-4xl font-semibold sm:text-3xl md:text-4xl lg:text-5xl">
            It's easy talking to your friends with <span className="text-7xl font-thin text-">Uni</span>
          </h1>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg lg:text-xl">
            Call Your Friend Simply And Simple With <span className="font-thin text-xl">uni</span>
          </p>
        </div>

        {/* Right side: Get Started button */}
        <div className="text-center mt-10 lg:mt-0 lg:w-1/2 lg:text-right">
          <button
            className="mb-10 px-6 py-3 bg-yellow-200 text-black font-medium rounded-full shadow-md hover:bg-yellow-300 transition-colors sm:px-8 sm:py-4 md:px-10 md:py-5 lg:px-12 lg:py-6"
            onClick={handleGetStartedClick} // Call the navigate function on button click
          >
            Get Started
          </button>
        </div>

        {/* Decorative shapes */}
        <div className="absolute -top-10 left-6 w-28 h-28 rounded-full bg-gradient-to-br from-white to-blue-200 opacity-90 blur-xl sm:w-36 sm:h-36 md:w-48 md:h-48 lg:w-56 lg:h-56"></div>
        <div className="absolute top-20 -left-10 w-28 h-28 rounded-full bg-gradient-to-br from-pink-300 to-white opacity-80 blur-xl sm:w-36 sm:h-36 md:w-48 md:h-48 lg:w-56 lg:h-56"></div>
        <div className="absolute top-10 right-6 w-24 h-24 rounded-full bg-gradient-to-br from-yellow-200 to-white opacity-80 blur-xl sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48"></div>
      </div>
    </div>
  );
};

export default Homepage;

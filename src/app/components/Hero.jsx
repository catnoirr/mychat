"use client";
import React, { useState } from 'react';
import { HiMenu } from 'react-icons/hi'; // Importing a hamburger icon from react-icons
import Sidebar from './Sidebar'; // Import your Sidebar component

export default function Hero() {
  const [selectedFrequency, setSelectedFrequency] = useState('Daily');
  const [sidebarOpen, setSidebarOpen] = useState(false); // State for sidebar visibility

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="relative">
      {/* Sidebar Component with overlay */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main content */}
      <div className="p-3 px-8 bg-black text-white rounded-full mx-4 mt-4">
        <div className="flex justify-between items-center">
          {/* Hamburger Icon - visible on all screen sizes */}
          <button
            className="mr-4 text-2xl"
            onClick={toggleSidebar}
          >
            <HiMenu />
          </button>

          {/* Logo */}
          <div className="text-2xl font-bold">Uni</div>
          
          {/* Frequency Selector */}
          <div className="flex space-x-4">
            {['Daily', 'Weekly', 'Monthly'].map((freq) => (
              <button
                key={freq}
                onClick={() => setSelectedFrequency(freq)}
                className={`px-4 py-2 rounded-full ${
                  selectedFrequency === freq ? 'bg-purple-800 text-white' : 'bg-purple-300 text-purple-900'
                } transition duration-200`}
              >
                {freq}
              </button>
            ))}
          </div>
          
          {/* Profile Icon */}
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full bg-gray-300">
              {/* Placeholder for profile image */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

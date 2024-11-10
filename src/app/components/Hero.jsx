"use client";
import React, { useState } from 'react';
import { HiMenu } from 'react-icons/hi'; // Importing a hamburger icon from react-icons
import Sidebar from './Sidebar'; // Import your Sidebar component

export default function Hero() {
  const [selectedFrequency, setSelectedFrequency] = useState('All');
  const [sidebarOpen, setSidebarOpen] = useState(false); // State for sidebar visibility
  const [profileMenuOpen, setProfileMenuOpen] = useState(false); // State for profile menu visibility

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };

  return (
    <div className="relative">
      {/* Sidebar Component with overlay */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main content */}
      <div className="p-3 px-8 bg-black text-white rounded-full mx-4 mt-4">
        <div className="flex justify-between items-center">
          {/* Hamburger Icon - visible on all screen sizes */}
          <div className='flex'>
          <button
            className="mr-4 text-2xl"
            onClick={toggleSidebar}
          >
            <HiMenu />
          </button>

          {/* Logo placed just right of the hamburger icon on all screen sizes */}
          <div className="text-2xl font-bold ml-2">Uni</div>
          </div>
          
          {/* Search Bar - visible on all screen sizes */}
          <input
            type="text"
            placeholder="Send Request"
            className="px-12 py-2 bg-white rounded-full text-black md:w-9/12 focus:outline-none focus:border-4 text-center "
          />

          {/* Profile Icon and Dropdown Menu */}
          <div className="flex items-center space-x-4 relative">
            <div
            
              className="w-10 h-10 rounded-full bg-gray-300 cursor-pointer"
              onClick={toggleProfileMenu}
            >
              {/* Placeholder for profile image */}
              <img src="./profile.jpg" alt=""  className='rounded-full'/>
            </div>

            {/* Profile Menu Options (Hidden on Small Screens) */}
            {profileMenuOpen && (
              <div className="absolute right-3 mt-2 top-8 bg-white text-black p-2 rounded-xl shadow-lg w-40 ">
                <button
                  className="w-full text-center px-4 py-1 hover:border-4 border rounded-full  md:hidden block"
                  onClick={() => setSelectedFrequency('All')}
                >
                  All Chats
                </button>
                <button
                  className="w-full text-center px-4 py-1 hover:border-4 border rounded-full mt-1 "
                  onClick={() => setSelectedFrequency('Requests')}
                >
                  New Requests
                </button>
                <button
                  className="w-full text-center px-4 py-1 hover:border-4 border rounded-full mt-1"
                  onClick={() => alert("Logout")}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

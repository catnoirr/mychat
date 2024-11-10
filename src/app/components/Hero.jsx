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

  // Hide profile menu when clicked outside of it
  const handleClickOutside = (e) => {
    if (e.target.closest('.profile-menu') === null && e.target.closest('.profile-icon') === null) {
      setProfileMenuOpen(false);
    }
  };

  React.useEffect(() => {
    // Adding event listener for click outside to close the profile menu
    document.addEventListener('click', handleClickOutside);

    // Cleanup the event listener
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // Show profile menu on hover or click
  const handleMouseEnter = () => {
    setProfileMenuOpen(true);
  };

  const handleMouseLeave = () => {
    setProfileMenuOpen(false);
  };

  const toggleProfileMenu = () => {
    setProfileMenuOpen((prev) => !prev); // Toggle menu visibility on click
  };

  return (
    <div className="relative">
      {/* Sidebar Component with overlay */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main content */}
      <div className="p-3 px-8 bg-black text-white rounded-full mx-4 mt-4">
        <div className="flex justify-between items-center">
          {/* Hamburger Icon - visible on all screen sizes */}
          <div className="flex">
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
          <div
            className="flex items-center space-x-4 relative"
            onMouseEnter={handleMouseEnter} // Show menu on hover
            onMouseLeave={handleMouseLeave} // Hide menu on mouse leave
          >
            <div
              className="w-10 h-10 rounded-full bg-gray-300 cursor-pointer profile-icon"
              onClick={toggleProfileMenu} // Toggle on click
            >
              {/* Placeholder for profile image */}
              <img src="./profile.jpg" alt="" className="rounded-full" />
            </div>

            {/* Profile Menu Options (Hidden on Small Screens) */}
            {(profileMenuOpen || document.querySelector('.profile-icon:hover')) && (
              <div
                className="absolute right-3 mt-2 top-8 bg-white text-black p-2 rounded-xl shadow-lg w-40 profile-menu"
              >
                <button
                  className="w-full text-center px-4 py-1 hover:border-4 border rounded-full md:hidden block"
                  onClick={() => setSelectedFrequency('All')}
                >
                  All Chats
                </button>
                <button
                  className="w-full text-center px-4 py-1 hover:border-4 border rounded-full mt-1"
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

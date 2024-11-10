"use client";
import { useState } from "react";
import { FaHome, FaInbox, FaCalendarAlt, FaComments, FaCog, FaSignOutAlt, FaBars } from "react-icons/fa";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      {/* Backdrop for closing the sidebar by clicking outside */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={toggleSidebar} // Click on backdrop to close sidebar
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-2  h-full w-28 bg-black  rounded-full border-gray-800 flex flex-col items-center py-4 space-y-8 shadow-md transform transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo at the top */}
        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
          <span className="text-black font-bold text-xl">O</span> {/* Replace with your logo */}
        </div>

        {/* Sidebar icons */}
        <nav className="flex flex-col space-y-4">
          <SidebarIcon icon={<FaHome className="h-6 w-6" />} label="Home" />
          <SidebarIcon icon={<FaInbox className="h-6 w-6" />} label="Inbox" />
          <SidebarIcon icon={<FaCalendarAlt className="h-6 w-6" />} label="Calendar" />
          <SidebarIcon icon={<FaComments className="h-6 w-6" />} label="Comments" />
          <SidebarIcon icon={<FaCog className="h-6 w-6" />} label="Settings" />
        </nav>

        {/* Logout icon at the bottom */}
        <div className="mt-auto">
          <SidebarIcon icon={<FaSignOutAlt className="h-6 w-6" />} label="Logout" />
        </div>
      </div>
    </>
  );
};

const SidebarIcon = ({ icon, label }) => (
  <div className="relative group w-10 h-10 flex items-center justify-center bg-white rounded-full transition-colors cursor-pointer hover:border-2 hover:bg-black hover:text-white hover:shadow-md">
    {icon}
    <span className="absolute left-12 opacity-0 group-hover:opacity-100 text-black border-2 p-6 text-xs rounded-full px-3 py-1 bg-white transition-opacity duration-200">
      {label}
    </span>
  </div>
);

export default Sidebar;

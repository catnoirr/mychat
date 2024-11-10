"use client";
import { useState } from "react";
import { FaHome, FaInbox, FaCalendarAlt, FaComments, FaCog, FaSignOutAlt, FaArrowRight } from "react-icons/fa";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [isExpanded, setIsExpanded] = useState(false); // State for expanded view

  const handleExpandToggle = () => {
    setIsExpanded(!isExpanded); // Toggle expanded state
  };

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
        className={`fixed top-0 -left-1 rounded-r-3xl h-full w-28 transition-all duration-300 bg-black border-gray-800 flex flex-col items-center py-4 space-y-8 shadow-md z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } ${isExpanded ? " w-52" : " w-28"}`} // Sidebar stays at same width but changes padding on expand
      >
        {/* Logo at the top */}
        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center border-4">
          <span className="text-black  text-xl font-thin">Uni</span> {/* Replace with your logo */}
        </div>

        {/* Sidebar icons */}
        <nav
          className={`flex flex-col space-y-4 mt-4 ${
            isExpanded ? "items-start" : "items-center" // Align left when expanded, center when collapsed
          }`}
        >
          <SidebarIcon icon={<FaHome className="h-6 w-6" />} label="Home" isExpanded={isExpanded} />
          <SidebarIcon icon={<FaInbox className="h-6 w-6" />} label="Request" isExpanded={isExpanded} />
          <SidebarIcon icon={<FaCalendarAlt className="h-6 w-6" />} label="Users" isExpanded={isExpanded} />
          <SidebarIcon icon={<FaComments className="h-6 w-6" />} label="Confessions" isExpanded={isExpanded} />
          <SidebarIcon icon={<FaCog className="h-6 w-6" />} label="Settings" isExpanded={isExpanded} />
        </nav>

        {/* Logout icon at the bottom */}
        <div className="mt-auto">
          <SidebarIcon icon={<FaSignOutAlt className="h-6 w-6" />} label="Logout" isExpanded={isExpanded} />
        </div>

        {/* Expand button for small screens */}
        <button
          onClick={handleExpandToggle}
          className="absolute top-14 -right-3 p-2 bg-white rounded-full text-black hover:bg-gray-200 transform -translate-y-1/2 md:hidden"
        >
          <FaArrowRight
            className={`transform ${isExpanded ? "rotate-180" : "rotate-0"} transition-transform`}
          />
        </button>
      </div>
    </>
  );
};

const SidebarIcon = ({ icon, label, isExpanded }) => (
<div
    className={`relative group  w-10 h-10 flex items-center justify-center bg-white rounded-full transition-colors cursor-pointer hover:border-2 hover:bg-black hover:text-white hover:shadow-md ${
      isExpanded ? "right-16" : "" // Shift icon to the right when expanded
    }`}
  >
    {icon}
    {/* Show label only when expanded */}
    <span
      className={`absolute left-12 opacity-0 group-hover:opacity-100 text-white md:border-2 p-6 md:text-xs text-lg md:rounded-full px-3 py-1  md:bg-black transition-opacity duration-200 ${
        isExpanded ? "opacity-100" : "opacity-0"
      }`}
    >
      {label}
    </span>
  </div>
);

export default Sidebar;

"use client";
import React, { useState, useEffect } from "react";
import { HiMenu } from "react-icons/hi";
import Sidebar from "./Sidebar";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig"; // Import the Firebase authentication
import { useRouter } from "next/navigation"; // Import useRouter for page redirection
import { db } from "../../firebaseConfig"; // Import Firestore instance
import { doc, getDoc } from "firebase/firestore"; // Firestore functions

export default function Hero() {
  const [ setSelectedFrequency] = useState("All");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [userName, setUserName] = useState(""); // State to store user's name
  const router = useRouter(); // Hook for routing

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleClickOutside = (e) => {
    if (
      e.target.closest(".profile-menu") === null &&
      e.target.closest(".profile-icon") === null
    ) {
      setProfileMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Fetch the authenticated user and get user data from Firestore
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Get the user's name from Firestore using the user UID
        const userDocRef = doc(db, "users", user.uid); // Access the user's document
        const userDoc = await getDoc(userDocRef); // Fetch the document
        if (userDoc.exists()) {
          setUserName(userDoc.data().name || "User"); // Set name from Firestore
        } else {
          setUserName(user.displayName || "User"); // Use Firebase Auth name if Firestore doesn't have it
        }
      } else {
        setUserName(""); // Reset name if the user is logged out
      }
    });
    return () => unsubscribe();
  }, []);

  const handleMouseEnter = () => {
    setProfileMenuOpen(true);
  };

  const handleMouseLeave = () => {
    setProfileMenuOpen(false);
  };

  // Function to handle logout and redirect to the main page
  const handleLogout = () => {
    console.log("Logging out..."); // Add a log to confirm this function is triggered
    signOut(auth)
      .then(() => {
        console.log("User logged out"); // Log this message to confirm logout
        setUserName(""); // Clear the user name on logout
        router.push("/"); // Redirect to the main page (home page)
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

  // Function to extract the first letter from the full name
  const getFirstLetter = (name) => {
    if (name) {
      const firstName = name.split(" ")[0]; // Split by space and get the first name
      return firstName.charAt(0).toUpperCase(); // Return the first letter
    }
    return "U"; // Default if no name is found
  };

  return (
    <div className="relative">
      {/* Sidebar Component with overlay */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main content */}
      <div className="p-3 px-8 bg-black text-white rounded-full mx-4 mt-4">
        <div className="flex justify-between items-center">
          {/* Hamburger Icon */}
          <div className="flex gap-0">
            <button className="text-2xl" onClick={toggleSidebar}>
              <HiMenu />
            </button>
            <div className="text-2xl font-bold ml-2">Uni</div>
          </div>

          {/* Search Bar */}
          <input
            type="text"
            placeholder="Send Request"
            className="py-2 bg-white rounded-full text-black md:w-9/12 focus:outline-none focus:border-4 text-center hover:border-2 w-44"
          />

          {/* Profile Icon and Dropdown Menu */}
          <div
            className="flex items-center space-x-4 relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div
              className="w-10 h-10 rounded-full bg-gray-300 cursor-pointer profile-icon flex items-center justify-center text-xl font-semibold text-white"
              onClick={() => setProfileMenuOpen((prev) => !prev)}
            >
              {/* Display first letter if available */}
              {userName ? getFirstLetter(userName) : "U"}
            </div>

            {/* Profile Menu Options */}
            {profileMenuOpen && (
              <div className="absolute right-3 mt-2 top-8 bg-white text-black p-2 rounded-xl shadow-lg w-40 profile-menu">
                <button
                  className="w-full text-center px-4 py-1 hover:border-4 border rounded-full md:hidden block"
                  onClick={() => setSelectedFrequency("All")}
                >
                  All Chats
                </button>
                <button
                  className="w-full text-center px-4 py-1 hover:border-4 border rounded-full mt-1"
                  onClick={() => setSelectedFrequency("Requests")}
                >
                  New Requests
                </button>
                <button
                  className="w-full text-center px-4 py-1 hover:border-4 border rounded-full mt-1"
                  onClick={handleLogout} // Trigger logout and redirect
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

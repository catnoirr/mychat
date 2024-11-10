"use client";
import React, { useState } from "react";
import { FaUserAlt, FaLock } from "react-icons/fa";  // FontAwesome icons for user and lock

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login submission here
    console.log("Logging in with:", email, password);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black text-white px-4 sm:px-6 lg:px-8">
      <div className="relative w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-lg">
        {/* Left side: Text content */}
        <div className="text-center mb-8 space-y-4">
          <h1 className="text-2xl font-semibold sm:text-3xl md:text-4xl lg:text-5xl">
            Welcome Back to <span className="text-4xl font-thin">Uni</span>
          </h1>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg lg:text-xl">
            Log in to connect with your friends and start chatting instantly.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 text-white rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-300"
              placeholder="Enter your email"
              required
            />
            <FaUserAlt className="absolute top-3 right-3 text-gray-400" />
          </div>

          <div className="relative">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 text-white rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-300"
              placeholder="Enter your password"
              required
            />
            <FaLock className="absolute top-3 right-3 text-gray-400" />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full px-6 py-3 bg-yellow-200 text-black font-medium rounded-full shadow-md hover:bg-yellow-300 transition-colors"
            >
              Log In
            </button>
          </div>
        </form>

        {/* Decorative shapes */}
        <div className="absolute -top-10 left-6 w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-48 lg:h-48 rounded-full bg-gradient-to-br from-white to-blue-200 opacity-90 blur-xl"></div>
        <div className="absolute top-20 -left-10 w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-48 lg:h-48 rounded-full bg-gradient-to-br from-pink-300 to-white opacity-80 blur-xl"></div>
        <div className="absolute top-10 right-6 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full bg-gradient-to-br from-yellow-200 to-white opacity-80 blur-xl"></div>
      </div>
    </div>
  );
};

export default Login;

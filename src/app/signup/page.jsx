"use client";
import React, { useState } from "react";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Email validation: must end with @edu.in
    const emailRegex = /^[a-zA-Z0-9._%+-]+@edu\.in$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address with @edu.in");
      return;
    }

    // Password matching validation
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Handle sign-up submission here
    console.log("Signing up with:", name, email, password);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black text-white px-4 sm:px-6 lg:px-8">
      <div className="relative w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-lg">
        {/* Left side: Text content */}
        <div className="text-center mb-8 space-y-4">
          <h1 className="text-2xl font-semibold sm:text-3xl md:text-4xl lg:text-5xl">
            Create an Account with <span className="text-4xl font-thin">Uni</span>
          </h1>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg lg:text-xl">
            Sign up to start connecting with your friends and chatting instantly.
          </p>
        </div>

        {/* Sign Up Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 text-white rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-300"
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="relative">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 text-white rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-300"
              placeholder="Enter your email (must end with @edu.in)"
              required
            />
            {emailError && (
              <p className="text-red-500 text-xs mt-2">{emailError}</p>
            )}
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
          </div>

          <div className="relative">
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 text-white rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-300"
              placeholder="Confirm your password"
              required
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full px-6 py-3 bg-yellow-200 text-black font-medium rounded-full shadow-md hover:bg-yellow-300 transition-colors"
            >
              Sign Up
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

export default SignUp;

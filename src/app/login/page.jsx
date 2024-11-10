"use client";
import React, { useState } from "react";
import { FaUserAlt, FaLock } from "react-icons/fa"; // FontAwesome icons for user and lock
import { useRouter } from "next/navigation"; // Import useRouter hook
import { signInWithEmailAndPassword } from "firebase/auth"; // Firebase Authentication

// Import Firebase Auth instance
import { auth } from "../../firebaseConfig"; // Make sure you have configured Firebase

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(""); // State to handle email errors
  const [isForgotPassword, setIsForgotPassword] = useState(false); // Toggle state for Forgot Password section
  const [error, setError] = useState(""); // State to handle general login errors
  const router = useRouter(); // Initialize the router

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setError("");

    // Validate email and password (e.g., check if not empty)
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      // Firebase authentication login method
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Logged in:", userCredential);

      // After successful login, navigate to the dashboard
      router.push("/Home"); // Update this to your actual dashboard route
    } catch (err) {
      setError("Invalid email or password.");
      console.error("Login failed:", err);
    }
  };

  // Function to navigate to the sign-up page
  const handleGoToSignUp = () => {
    router.push("/signup"); // Redirect to the sign-up page
  };

  // Function to handle forgot password form submission
  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@edu\.in$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address with @edu.in");
      return;
    }
    alert("Password reset link has been sent to your email!");
    setIsForgotPassword(false); // Hide the forgot password section after submission
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

        {/* Conditional rendering based on the state */}
        {isForgotPassword ? (
          // Forgot Password Form
          <form onSubmit={handleForgotPasswordSubmit} className="space-y-6">
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
            {emailError && (
              <p className="text-red-500 text-xs mt-2">{emailError}</p>
            )}

            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full px-6 py-3 bg-yellow-200 text-black font-medium rounded-full shadow-md hover:bg-yellow-300 transition-colors"
              >
                Send Reset Link
              </button>
            </div>

            <div className="mt-4 text-center">
              <button
                onClick={() => setIsForgotPassword(false)} // Go back to the login form
                className="text-yellow-200 hover:text-yellow-300 text-sm"
              >
                Back to Login
              </button>
            </div>
          </form>
        ) : (
          // Login Form
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

            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}

            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full px-6 py-3 bg-yellow-200 text-black font-medium rounded-full shadow-md hover:bg-yellow-300 transition-colors"
              >
                Log In
              </button>
            </div>
          </form>
        )}

        {/* Links for sign-up and forgot password */}
        {!isForgotPassword && (
          <div className="mt-4 text-center">
            <button
              onClick={handleGoToSignUp}
              className="text-yellow-200 hover:text-yellow-300 text-sm"
            >
              New User? Sign Up
            </button>
          </div>
        )}

        {!isForgotPassword && (
          <div className="mt-2 text-center">
            <button
              onClick={() => setIsForgotPassword(true)} // Show the forgot password section
              className="text-yellow-200 hover:text-yellow-300 text-sm"
            >
              Forgot Password?
            </button>
          </div>
        )}

        {/* Decorative shapes */}
        <div className="absolute -top-10 left-6 w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-48 lg:h-48 rounded-full bg-gradient-to-br from-white to-blue-200 opacity-90 blur-xl"></div>
        <div className="absolute top-20 -left-10 w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-48 lg:h-48 rounded-full bg-gradient-to-br from-pink-300 to-white opacity-80 blur-xl"></div>
        <div className="absolute top-10 right-6 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full bg-gradient-to-br from-yellow-200 to-white opacity-80 blur-xl"></div>
      </div>
    </div>
  );
};

export default Login;

"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "../../firebaseConfig"; // Import Firebase config
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@edu\.in$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address with @edu.in");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      // Create user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user info to Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: email,
        status: "online", // Initialize with 'online' status
      });

      console.log("User signed up and saved to Firestore:", name, email);
      router.push("/login"); // Redirect to login after successful signup
    } catch (error) {
      console.error("Error signing up:", error.message);
    }
  };

  const handleGoToLogin = () => {
    router.push("/login");
  };

  const handleGoToForgotPassword = () => {
    setIsForgotPassword(true);
  };

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@edu\.in$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address with @edu.in");
      return;
    }
    alert("Password reset link has been sent to your email!");
    setIsForgotPassword(false);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black text-white px-4 sm:px-6 lg:px-8">
      <div className="relative w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-lg">
        <div className="text-center mb-8 space-y-4">
          <h1 className="text-2xl font-semibold sm:text-3xl md:text-4xl lg:text-5xl">
            Create an Account with <span className="text-4xl font-thin">Uni</span>
          </h1>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg lg:text-xl">
            Sign up to start connecting with your friends and chatting instantly.
          </p>
        </div>

        {isForgotPassword ? (
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
              {emailError && <p className="text-red-500 text-xs mt-2">{emailError}</p>}
            </div>

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
                onClick={() => setIsForgotPassword(false)}
                className="text-yellow-200 hover:text-yellow-300 text-sm"
              >
                Back to Sign Up
              </button>
            </div>
          </form>
        ) : (
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
              {emailError && <p className="text-red-500 text-xs mt-2">{emailError}</p>}
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
        )}

        {!isForgotPassword && (
          <div className="mt-4 text-center">
            <button
              onClick={handleGoToLogin}
              className="text-yellow-200 hover:text-yellow-300 text-sm"
            >
              Already have an account? Login
            </button>
          </div>
        )}
        {!isForgotPassword && (
          <div className="mt-2 text-center">
            <button
              onClick={handleGoToForgotPassword}
              className="text-yellow-200 hover:text-yellow-300 text-sm"
            >
              Forgot Password?
            </button>
          </div>
        )}
         <div className="absolute -top-10 left-6 w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-48 lg:h-48 rounded-full bg-gradient-to-br from-white to-blue-200 opacity-90 blur-xl"></div>
        <div className="absolute top-20 -left-10 w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-48 lg:h-48 rounded-full bg-gradient-to-br from-pink-300 to-white opacity-80 blur-xl"></div>
        <div className="absolute top-10 right-6 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full bg-gradient-to-br from-yellow-200 to-white opacity-80 blur-xl"></div>
      </div>
    </div>
  );
};

export default SignUp;

import React from 'react'
import { Link } from 'react-router-dom'
import MoodMoneyLogo from '../assets/MoodMoneyLogo.png'
import { IoArrowBack } from "react-icons/io5";

export default function Login() {
  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-start bg-white px-4 pt-6">
      {/* Back arrow */}
      <div className="w-full max-w-sm">
        <Link to="/">
          <div className="w-10 h-10 flex items-center justify-center bg-green-600 rounded-full mt-4">
            <IoArrowBack className="text-yellow-400 text-xl" />
          </div>
        </Link>
      </div>

      {/* Logo */}
      <img src={MoodMoneyLogo} alt="MoodMoney Logo" className="w-48 sm:w-64 h-auto mb-6" />

      {/* Title */}
      <h1 className="text-xl font-bold text-green-700 mb-4 font-luckiest">WELCOME BACK!</h1>

      {/* Form fields */}
      <form className="w-full max-w-sm flex flex-col gap-4">
        <div>
          <label className="block text-gray-700 mb-1">Username</label>
          <input
            type="text"
            className="w-full px-4 py-2 border-2 border-green-600 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 border-2 border-green-600 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* Submit Button (functionality comes later) */}
        <button
          type="button"
          className="w-40 mx-auto mt-4 bg-green-600 text-white font-bold py-2 rounded-lg border-4 border-yellow-400 hover:bg-green-700 transition font-luckiest"
        >
          SIGN IN
        </button>
      </form>
    </div>
  );
}

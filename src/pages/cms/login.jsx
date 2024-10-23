import React, { useState, startTransition  } from "react";
import { useNavigate } from "react-router-dom";
import RegisterImage from "../../assets/images/sana-model.jpg";

const CMSLogin = () => {
  const navigate = useNavigate();

  const _handleSubmit = (e) => {
    e.preventDefault();
    startTransition(() => {
        navigate("/cms/dashboard");
      });
  };

  return (
    <div className="flex h-screen">
      {/* Left Side - Image */}
      <div
        className="w-1/2 bg-cover bg-center"
        style={{ backgroundImage: `url(${RegisterImage})` }}
      >
        {/* Optional: Add any additional elements like a logo or title here */}
      </div>

      {/* Right Side - Sign In Form */}
      <div className="w-1/2 flex flex-col items-center justify-center bg-white">
        <div className="flex flex-col w-96">
          <h1 className="text-2xl font-bold mb-2 text-center">Sign in</h1>
          <p className="text-gray-600 text-center mb-6">
            Sign in to your account to start using Ayam A1
          </p>
          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring focus:ring-orange-500"
                placeholder="Enter your username"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring focus:ring-orange-500"
                placeholder="Enter your password"
              />
            </div>
            <div className="flex items-center mb-4">
              <input type="checkbox" id="keepMeSignedIn" className="mr-2" />
              <label htmlFor="keepMeSignedIn" className="text-sm text-gray-600">
                Keep Me Signed In
              </label>
            </div>
            <button
              onClick={_handleSubmit}
              className="w-full bg-orange-500 text-white font-semibold py-2 rounded-md hover:bg-orange-600 transition"
            >
              Sign In
            </button>
          </form>
        </div>

        {/* Copyright Section */}
        <div className="text-center text-sm text-gray-500 mt-4">
          © 2024 TAN SOFTWARE SDN. BHD. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default CMSLogin;

import React, { useState, startTransition  } from "react";
import { useNavigate } from "react-router-dom";
import RegisterImage from "../../assets/images/tzuyu-model.jpg";

const CMSLogin = () => {
  const navigate = useNavigate();
  const [keepMeSignedIn, setKeepMeSignedIn] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    startTransition(() => {
        navigate("/cms/dashboard");
      });
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="flex h-screen">
      {/* Left Side - Image */}
      <div className="w-1/2">
          <img src={RegisterImage} alt="Register" className="object-contain"/>
      </div>

      {/* Right Side - Sign In Form */}
      <div className="w-1/2 flex flex-col items-center justify-center bg-white">
        <div className="flex flex-col w-[415px]">
          <h1 className="text-2xl font-semibold mb-2 text-center">Sign in</h1>
          <p className="text-gray-600 text-center mb-12">
            Sign in to your account to start using ZEPHYR
          </p>
          <form>
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                className="mt-2 block w-full border border-gray-300 shadow-sm px-3 py-3 focus:outline-none focus:ring focus:ring-orange-500"
                placeholder="Enter your username"
              />
            </div>
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                className="mt-2 block w-full border border-gray-300 shadow-sm px-3 py-3 focus:outline-none focus:ring focus:ring-orange-500"
                placeholder="Enter your password"
              />
            </div>
            <div className="flex items-center mb-5">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="keepMeSignedIn"
                  checked={keepMeSignedIn}
                  onChange={() => setKeepMeSignedIn(!keepMeSignedIn)}
                  className="peer cursor-pointer hidden after:opacity-100"
                />
                <label
                  htmlFor="keepMeSignedIn"
                  class="inline-block w-5 h-5 border-2 relative cursor-pointer after:content-[''] after:absolute after:top-2/4 after:left-2/4 after:-translate-x-1/2 after:-translate-y-1/2 after:w-[10px] after:h-[10px] after:bg-[#333] after:rounded-[2px] after:opacity-0 peer-checked:after:opacity-100"
                ></label>
                <label
                  className="text-sm text-gray-600 ml-2"
                >
                  Keep Me Signed In
                </label>
              </div>
            </div>
            <button
              onClick={handleSubmit}
              className="w-full bg-black text-white py-3 hover:bg-zinc-700 uppercase tracking-widest font-semibold text-sm"
            >
              Sign In
            </button>
          </form>
        </div>

        {/* Copyright Section */}
        <div className="text-center text-sm text-gray-500 mt-4">
          COPYRIGHT &copy; {currentYear} ZEPHYR, All rights Reserved.
        </div>
      </div>
    </div>
  );
};

export default CMSLogin;

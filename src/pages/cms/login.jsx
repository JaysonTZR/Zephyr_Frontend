import React, { useState, startTransition  } from "react";
import { useNavigate } from "react-router-dom";
import RegisterImage from "../../assets/images/tzuyu-model.jpg";
import { ToastContainer, toast } from "react-toastify";
import { apiUrl } from "../../constant/constants";
import axios from "axios";

const CMSLogin = () => {
  const navigate = useNavigate();
  const [keepMeSignedIn, setKeepMeSignedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleSubmit = async () => {
    let hasError = false;

    if (!email) {
      setEmailError(true);
      hasError = true;
    } else {
      setEmailError(false);
    }

    if (!password) {
      setPasswordError(true);
      hasError = true;
    } else {
      setPasswordError(false);
    }

    if (hasError) {
      return;
    }

    try {
      const response = await axios.post(
        apiUrl + "login/authenticate",
        {
          user_email: email,
          user_password: password,
        }
      );

      if (response.status === 200) {
        const authToken = response.data.token;
        const authUserData = response.data.user;
        const expirationTime = keepMeSignedIn
        ? new Date().getTime() + 3 * 24 * 60 * 60 * 1000 // 3 days
        : new Date().getTime() + 24 * 60 * 60 * 1000; // 1 day

        if (authUserData.user_permission !== "yes") {
          toast.error("User unauthorized", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          return;
        }

        localStorage.setItem("authToken", authToken);
        localStorage.setItem("authUserData", JSON.stringify(authUserData));
        localStorage.setItem('expirationTime', expirationTime);

        toast.success("Login successfully", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          onClose: () => {
            startTransition(() => {
              navigate("/cms/dashboard");
            });
          },
        });
      }
    } catch (error) {
      toast.error("Invalid credentials", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="flex h-screen">
      <ToastContainer />
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
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="text"
              className={`mt-2 block w-full border px-3 py-3 focus:outline-none focus:ring focus:ring-black ${
                emailError ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setEmailError(false)}
            />
            {emailError && (
              <p className="text-red-500 text-sm mt-1">Email is required</p>
            )}
          </div>
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              className={`mt-2 block w-full border px-3 py-3 focus:outline-none focus:ring focus:ring-black ${
                passwordError ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setPasswordError(false)}
            />
            {passwordError && (
              <p className="text-red-500 text-sm mt-1">Password is required</p>
            )}
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
                className="inline-block w-5 h-5 border-2 relative cursor-pointer after:content-[''] after:absolute after:top-2/4 after:left-2/4 after:-translate-x-1/2 after:-translate-y-1/2 after:w-[10px] after:h-[10px] after:bg-[#333] after:rounded-[2px] after:opacity-0 peer-checked:after:opacity-100"
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

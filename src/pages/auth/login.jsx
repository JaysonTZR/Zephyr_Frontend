import React, { useState, startTransition  } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Banner from "../../components/Banner";
import { ToastContainer, toast } from "react-toastify";
import { apiUrl } from "../../constant/constants";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleLogin = async () => {
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

        if (authUserData.user_role !== "customer") {
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

        const authCustomerData = response.data.customer;

        localStorage.setItem("authToken", authToken);
        localStorage.setItem("authUserData", JSON.stringify(authUserData));
        localStorage.setItem('authCustomerData', JSON.stringify(authCustomerData));

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
              navigate("/");
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

  const handleCreateAccount = () => {
    startTransition(() => {
      navigate("/register");
    });
  };

  return (
    <div>
      <Header />

      <Banner bannerText="Login" />
      <ToastContainer />
      <div className="flex justify-center mb-20">
        <div className="py-8 w-7/12">
          <div className="bg-white rounded-md shadow-lg flex p-8">
            {" "}
            {/* Combined sections in one box */}
            {/* Login Form */}
            <div className="w-1/2 pr-4">
              <h1 className="text-3xl font-bold mb-4 uppercase">Login</h1>
              <p className="mb-4">
                Log in with your email address and password.
              </p>

              <div onSubmit={handleLogin}>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2 font-semibold uppercase" htmlFor="email">
                    Email Address <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setEmailError(false)}
                    className={`border border-gray-300 py-3 px-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-black ${
                      emailError ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter a valid email"
                  />
                  {emailError && (
                    <p className="text-red-500 text-sm mt-1">Email is required</p>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    className="block text-gray-700 mb-2 font-semibold uppercase"
                    htmlFor="password"
                  >
                    Password <span className="text-red-600">*</span>
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setPasswordError(false)}
                    className={`border border-gray-300 py-3 px-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-black ${
                      passwordError ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your password"
                  />
                  {passwordError && (
                    <p className="text-red-500 text-sm mt-1">Password is required</p>
                  )}
                  <div className="mt-2">
                    <label className="text-sm text-zinc-500">Password must be at least 8 characters, and contain both letters and numbers. Only these symbols can be used -_.@</label>
                  </div>
                  <div className="flex items-center mt-4">
                    <input
                      type="checkbox"
                      id="show-password"
                      checked={showPassword}
                      onChange={() => setShowPassword(!showPassword)}
                      className="peer cursor-pointer hidden after:opacity-100"
                    />
                    <label
                      htmlFor="show-password"
                      className="inline-block w-5 h-5 border-2 relative cursor-pointer after:content-[''] after:absolute after:top-2/4 after:left-2/4 after:-translate-x-1/2 after:-translate-y-1/2 after:w-[10px] after:h-[10px] after:bg-[#333] after:rounded-[2px] after:opacity-0 peer-checked:after:opacity-100"
                    ></label>
                    <label
                      className="text-sm text-gray-600 ml-2"
                    >
                      Show my password
                    </label>
                  </div>
                </div>

                <div className="flex justify-between mt-6 mb-4">
                  <a
                    href="/terms"
                    className="text-sm text-black font-semibold underline hover:text-zinc-500"
                  >
                    Terms of Use
                  </a>
                  <a
                    href="/privacy"
                    className="text-sm text-black font-semibold underline hover:text-zinc-500"
                  >
                    Privacy Policy
                  </a>
                </div>

                <button
                  type="button"
                  className="bg-black text-white w-full px-6 py-3 uppercase tracking-widest font-semibold text-sm hover:bg-zinc-700"
                  onClick={handleLogin}
                >
                  Log In
                </button>
              </div>

              <div className="mt-4 text-center">
                <p className="text-sm text-gray-500">
                  Forgot your password?{" "}
                  <a
                    href="/forgot-password"
                    className="text-black font-semibold hover:underline"
                  >
                    Click here
                  </a>
                </p>
              </div>
            </div>
            <div className="border-l border-gray-300 mx-4" />{" "}
            {/* Vertical separator */}
            {/* Create Account Section */}
            <div className="w-1/2 pl-4">
              <h1 className="text-3xl font-bold mb-4 uppercase">Create An Account</h1>
              <p className="mb-4">
                If you create an account, it takes less time to go through
                checkout and complete your orders. Register today for free!
              </p>
              <button
                onClick={handleCreateAccount}
                className="bg-black text-white w-full px-6 py-3 uppercase tracking-widest font-semibold text-sm hover:bg-zinc-700"
              >
                Create An Account
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Login;

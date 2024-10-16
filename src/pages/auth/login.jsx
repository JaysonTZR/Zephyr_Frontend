import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer2 from "../../components/Footer2";
import Banner from "../../components/Banner";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Implement login logic here
    navigate("/dashboard"); // Navigate to the dashboard after successful login
  };

  const handleCreateAccount = () => {
    navigate("/register");
  };

  return (
    <div>
      <Header />

      <Banner bannerText="Login" />

      <div className="flex justify-center">
        <div className="py-8 w-7/12">
          <div className="bg-white rounded-md shadow-lg flex p-8">
            {" "}
            {/* Combined sections in one box */}
            {/* Login Form */}
            <div className="w-1/2 pr-4">
              <h1 className="text-2xl font-bold mb-4">LOGIN</h1>
              <p className="mb-4">
                Log in with your email address and password.
              </p>

              <form onSubmit={handleLogin}>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="email">
                    EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border border-gray-300 py-3 px-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Enter a valid email"
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block text-gray-700 mb-2"
                    htmlFor="password"
                  >
                    PASSWORD *
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border border-gray-300 py-3 px-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Enter your password"
                  />
                  <div className="flex items-center mt-2">
                    <input
                      type="checkbox"
                      id="show-password"
                      checked={showPassword}
                      onChange={() => setShowPassword(!showPassword)}
                      className="mr-2"
                    />
                    <label
                      htmlFor="show-password"
                      className="text-sm text-gray-600"
                    >
                      Show my password
                    </label>
                  </div>
                </div>

                <div className="flex justify-between mb-4">
                  <a
                    href="/terms"
                    className="text-sm text-gray-600 hover:underline"
                  >
                    Terms of Use
                  </a>
                  <a
                    href="/privacy"
                    className="text-sm text-gray-600 hover:underline"
                  >
                    Privacy Policy
                  </a>
                </div>

                <button
                  type="submit"
                  className="bg-black text-white w-full px-6 py-3 uppercase tracking-widest font-semibold text-sm hover:bg-zinc-700 transition duration-300"
                >
                  LOG IN
                </button>
              </form>

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
              <h1 className="text-2xl font-bold mb-4">CREATE AN ACCOUNT</h1>
              <p className="mb-4">
                If you create an account, it takes less time to go through
                checkout and complete your orders. Register today for free!
              </p>
              <button
                onClick={handleCreateAccount}
                className="bg-black text-white w-full px-6 py-3 uppercase tracking-widest font-semibold text-sm hover:bg-zinc-700 transition duration-300"
              >
                CREATE AN ACCOUNT
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer2 />
    </div>
  );
}

export default Login;

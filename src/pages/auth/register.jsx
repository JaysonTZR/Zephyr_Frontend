import React, { useState, startTransition } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Banner from "../../components/Banner";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("preferNotToState");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    startTransition(() => {
      // Registration logic here
      navigate("/welcome");
    });
  };

  return (
    <div>
      <Header />
      <Banner bannerText="CREATE AN ACCOUNT" />

      <div className="flex justify-center">
        <div className="py-8 w-7/12">
          <div className="bg-white rounded-md shadow-lg p-8">
            <h1 className="text-2xl font-bold mb-4 text-left">
              Create An Account
            </h1>
            <p className="mb-4">
              You will receive the confirmation mail to your email address
              associated with your account. Please make sure to check your
              incoming email from us.
            </p>

            <form onSubmit={() => handleRegister()}>
              <div className="mb-4 flex items-center">
                <label
                  className="block text-gray-700 mb-2 w-1/3"
                  htmlFor="email"
                >
                  EMAIL ADDRESS *
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border border-gray-300 py-3 px-4 w-2/3 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Enter a valid email"
                />
              </div>

              <div className=" flex items-center">
                <label
                  className="block text-gray-700 mb-2 w-1/3"
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
                  className="border border-gray-300 py-3 px-4 w-2/3 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Password must be at least 8 characters"
                />
              </div>

              <div className="flex items-center w-full mb-4 mt-2">
                <div className="w-2/3 ml-auto flex items-center">
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

              <div className="mb-4 flex items-center">
                <label
                  className="block text-gray-700 mb-2 w-1/3"
                  htmlFor="postal-code"
                >
                  POSTAL CODE *
                </label>
                <input
                  type="text"
                  id="postal-code"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  required
                  className="border border-gray-300 py-3 px-4 w-2/3 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Please enter postal code"
                />
              </div>

              <div className="mb-1 flex items-center">
                <label
                  className="block text-gray-700 mb-2 w-1/3"
                  htmlFor="birthday"
                >
                  BIRTHDAY *
                </label>
                <input
                  type="date"
                  id="birthday"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                  required
                  className="border border-gray-300 py-3 px-4 w-2/3 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <p className="text-sm text-red-500 w-2/3 ml-auto flex mb-4">
                *Unable to edit birthday after you register.
              </p>

              <div className="mb-4 flex items-center">
                <label className="block text-gray-700 mb-2 w-1/3">
                  GENDER *
                </label>
                <div className="flex items-center w-2/3">
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    value="male"
                    checked={gender === "male"}
                    onChange={(e) => setGender(e.target.value)}
                    className="mr-2"
                  />
                  <label htmlFor="male" className="text-sm text-gray-600">
                    Male
                  </label>
                </div>
                <div className="flex items-center w-2/3">
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    value="female"
                    checked={gender === "female"}
                    onChange={(e) => setGender(e.target.value)}
                    className="mr-2"
                  />
                  <label htmlFor="female" className="text-sm text-gray-600">
                    Female
                  </label>
                </div>
                <div className="flex items-center w-2/3">
                  <input
                    type="radio"
                    id="prefer-not-to-state"
                    name="gender"
                    value="preferNotToState"
                    checked={gender === "preferNotToState"}
                    onChange={(e) => setGender(e.target.value)}
                    className="mr-2"
                  />
                  <label
                    htmlFor="prefer-not-to-state"
                    className="text-sm text-gray-600"
                  >
                    Prefer Not To State
                  </label>
                </div>
              </div>


              <div className="flex justify-between mb-4">
                <a
                  href="/terms"
                  className="text-sm text-gray-600 hover:underline"
                >
                  TERMS OF USE
                </a>
                <a
                  href="/privacy"
                  className="text-sm text-gray-600 hover:underline"
                >
                  PRIVACY POLICY
                </a>
              </div>

              <button
                type="submit"
                className="bg-black text-white w-full px-6 py-3 uppercase tracking-widest font-semibold text-sm hover:bg-zinc-700 transition duration-300"
              >
                REGISTER
              </button>

              <div className="flex items-center justify-center mt-4">
                <hr className="border-gray-300 w-1/4" />
                <span className="mx-2 text-gray-600">OR</span>
                <hr className="border-gray-300 w-1/4" />
              </div>

              <button
                type="button"
                onClick={() => navigate("/login")}
                className="bg-gray-300 text-black w-full px-6 py-3 uppercase tracking-widest font-semibold text-sm hover:bg-gray-400 transition duration-300 mt-2"
              >
                Back to Login
              </button>

            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Register;

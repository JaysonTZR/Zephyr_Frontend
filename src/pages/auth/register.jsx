import React, { useState, startTransition } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Banner from "../../components/Banner";
import RegisterImage from "../../assets/images/sana-model.jpg"

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("preferNotToState");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTNC, setAgreeTNC] = useState(false);
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
          <div className="bg-white rounded-md shadow-lg flex p-8">
            <div className="w-1/2 pr-4">
              <h1 className="text-3xl font-bold mb-4 text-left uppercase">
                Create An Account
              </h1>
              <p className="mb-4">
                You will receive the confirmation mail to your email address
                associated with account. Please make sure to check your
                incoming email from us.
              </p>

              <form onSubmit={() => handleRegister()}>
                <div className="mb-4 flex items-center">
                  <label
                    className="block text-gray-700 mb-2 w-1/3 font-semibold uppercase"
                    htmlFor="email"
                  >
                    Email Address <span className="text-red-600">*</span>
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

                <div className="flex items-center">
                  <label
                    className="block text-gray-700 mb-2 w-1/3 font-semibold uppercase"
                    htmlFor="password"
                  >
                    Password <span className="text-red-600">*</span>
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
                <div className="flex items-center">
                  <div className="mt-2 w-1/3"></div>
                  <div className="mt-2 w-2/3">
                    <label className="text-sm text-zinc-500">Password must be at least 8 characters, and contain both letters and numbers. Only these symbols can be used -_.@</label>
                  </div>
                </div>
                <div className="flex items-center w-full mb-4 mt-4">
                  <div className="w-2/3 ml-auto flex items-center">
                    <input
                      type="checkbox"
                      id="show-password"
                      checked={showPassword}
                      onChange={() => setShowPassword(!showPassword)}
                      className="peer cursor-pointer hidden after:opacity-100"
                    />
                    <label
                      htmlFor="show-password"
                      class="inline-block w-5 h-5 border-2 relative cursor-pointer after:content-[''] after:absolute after:top-2/4 after:left-2/4 after:-translate-x-1/2 after:-translate-y-1/2 after:w-[10px] after:h-[10px] after:bg-[#333] after:rounded-[2px] after:opacity-0 peer-checked:after:opacity-100"
                    ></label>
                    <label
                      className="text-sm text-gray-600 ml-2"
                    >
                      Show my password
                    </label>
                  </div>
                </div>

                <div className="mb-4 flex items-center">
                  <label
                    className="block text-gray-700 mb-2 w-1/3 font-semibold uppercase"
                    htmlFor="postal-code"
                  >
                    Postal Code <span className="text-red-600">*</span>
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
                    className="block text-gray-700 mb-2 w-1/3 font-semibold uppercase"
                    htmlFor="birthday"
                  >
                    Birthday
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
                  <label className="block text-gray-700 mb-2 w-1/3 font-semibold uppercase">
                    Gender <span className="text-red-600">*</span>
                  </label>
                  <div className="flex items-center w-2/3">
                    <div className="flex w-1/4">
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
                    <div className="flex w-1/4">
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
                    <div className="flex w-2/4">
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
                </div>

                <div className="border-t border-gray-300 my-6" />{" "}
                <label
                  className="block text-gray-700 mb-2 font-semibold uppercase"
                  htmlFor="postal-code"
                >
                  Membership Agreement <span className="text-red-600">*</span>
                </label>
                <div className="mt-2">
                    <label className="text-sm text-zinc-500">By creating an account, you agree to ZEPHYR’s privacy policy and terms of use</label>
                </div>
                <div className="w-full mb-6 mt-4">
                  <div className="ml-auto flex items-center">
                    <input
                      type="checkbox"
                      id="agree-tnc"
                      checked={agreeTNC}
                      onChange={() => setAgreeTNC(!agreeTNC)}
                      className="peer cursor-pointer hidden after:opacity-100"
                    />
                    <label
                      htmlFor="agree-tnc"
                      class="inline-block w-5 h-5 border-2 relative cursor-pointer after:content-[''] after:absolute after:top-2/4 after:left-2/4 after:-translate-x-1/2 after:-translate-y-1/2 after:w-[10px] after:h-[10px] after:bg-[#333] after:rounded-[2px] after:opacity-0 peer-checked:after:opacity-100"
                    ></label>
                    <label
                      className="text-sm text-gray-600 ml-2"
                    >
                      I agree to the ZEPHYR’s 
                      <a
                        href="/terms"
                        className="ml-1 text-sm text-black font-semibold underline hover:text-zinc-500"
                      >
                        Terms of Use
                      </a> and 
                      <a
                        href="/privacy"
                        className="ml-1 text-sm text-black font-semibold underline hover:text-zinc-500"
                      >
                        Privacy Policy
                      </a>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="bg-black text-white w-full px-6 py-3 uppercase tracking-widest font-semibold text-sm hover:bg-zinc-700"
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
                  className="bg-gray-300 text-black w-full px-6 py-3 uppercase tracking-widest font-semibold text-sm hover:bg-gray-400 mt-2"
                >
                  Back to Login
                </button>

              </form>
            </div>
            <div className="border-l border-gray-300 mx-4" />{" "}
            <div className="w-1/2 pl-4 flex justify-center items-center">
              <img src={RegisterImage} alt="Register" className="object-cover w-auto h-full"/>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Register;

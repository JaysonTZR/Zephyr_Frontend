import React, { useState, useEffect, useRef, startTransition } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Banner from "../../components/Banner";
import RegisterImage from "../../assets/images/sana-model.jpg"
import { ToastContainer, toast } from "react-toastify";
import { apiUrl } from "../../constant/constants";
import axios from "axios";

function Register() {
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);
  const [state, setState] = useState(null);
  const [city, setCity] = useState(null);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTNC, setAgreeTNC] = useState(false);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [isOtpModalVisible, setIsOtpModalVisible] = useState(false);
  const otpRefs = useRef([]);
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    user_password: "",
    user_role: "customer",
    user_permission: "no",
    user_access: "",
    user_status: "active",
    user_trash: false,
    customer_name: "",
    customer_gender: "",
    customer_mobile_no: "",
    customer_country: "",
    customer_state: "",
    customer_city: "",
    customer_address_1: "",
    customer_address_2: "",
    customer_address_3: "",
    customer_status: "active",
    customer_trash: false,
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const isMobileNoValid = (mobileNo) => {
    const mobileNorRegex = /^\d+$/;
    return mobileNorRegex.test(mobileNo);
  };

  const isPasswordValid = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\-_.@]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleInputChange = (name, value) => {
    setFormData((prevData) => {
      const updatedData = {
        ...prevData,
        [name]: value,
      };
  
      return updatedData;
    });
  };

  const handleOtpModal = async () => {
    try {
      if (!agreeTNC) {
        toast.error("Please agree to ZEPHYR's TnC & Privacy Policy", {
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

      if (!isMobileNoValid(formData.customer_mobile_no)) {
        toast.error("Please enter a valid mobile number", {
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

      if (!isPasswordValid(formData.user_password)) {
        toast.error("Password must be at least 8 characters, and contain both letters and numbers. Only these symbols can be used -_.@", {
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

      const response = await axios.post(
        apiUrl + `register/send-otp`, 
        {
          user_email: formData.user_email,
        }, 
        {}
      );
      
      if (response.status === 200) {
        setIsOtpModalVisible(true);
      }
    } catch (error) {
      toast.error("Error sending OTP", {
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

  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return;
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.value && index < 5) {
      otpRefs.current[index + 1].focus();
    }
  };

  const handleSubmit = async () => {
    setIsOtpModalVisible(false);
    setButtonDisabled(true);
    try {
      const otpString = otp.join("");
      const response = await axios.post(
        apiUrl + `register`, 
        {
          ...formData,
          created_by: formData.customer_name,
          otp: otpString,
        }, 
        {}
      );

      if (response.status === 200) {
        const authToken = response.data.token;
        const authUserData = response.data.user;
        const authCustomerData = response.data.customer;

        localStorage.setItem("authToken", authToken);
        localStorage.setItem("authUserData", JSON.stringify(authUserData));
        localStorage.setItem('authCustomerData', JSON.stringify(authCustomerData));

        toast.success("Register Successfully", {
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
      setButtonDisabled(false);
    } catch (error) {
      toast.error("Error Submitting", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setButtonDisabled(false);
    }
  };

  useEffect(() => {
    // Fetch countries
    const fetchCountries = async () => {
      try {
        const response = await axios.get(`http://api.geonames.org/countryInfoJSON?username=jaysonzr`);
        const countryOptions = response.data.geonames.map((country) => ({
          value: country.geonameId,
          label: country.countryName,
        }));
        setCountries(countryOptions);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    if (formData.customer_country) {
      // Fetch states
      const fetchStates = async () => {
        try {
          const response = await axios.get(
            `http://api.geonames.org/childrenJSON?geonameId=${country.value}&username=jaysonzr`
          );
          const stateOptions = response.data.geonames.map((state) => ({
            value: state.geonameId,
            label: state.name,
          }));
          setStates(stateOptions);
        } catch (error) {
          console.error('Error fetching states:', error);
        }
      };

      fetchStates();
    }
  }, [country]);

  useEffect(() => {
    if (formData.customer_state) {
      // Fetch cities
      const fetchCities = async () => {
        try {
          const response = await axios.get(
            `http://api.geonames.org/childrenJSON?geonameId=${state.value}&username=jaysonzr`
          );
          const cityOptions = response.data.geonames.map((city) => ({
            value: city.geonameId,
            label: city.name,
          }));
          setCities(cityOptions);
        } catch (error) {
          console.error('Error fetching cities:', error);
        }
      };

      fetchCities();
    }
  }, [state]);

  return (
    <div>
      <ToastContainer />
      <Header />
      <Banner bannerText="CREATE AN ACCOUNT" />

      <div className="flex justify-center mb-20">
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

              <div>
                <div className="mb-4 flex items-center">
                  <label
                    className="block text-gray-700 mb-2 w-1/3 font-semibold uppercase"
                    htmlFor="user_name"
                  >
                    Username <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="user_name"
                    value={formData && formData.user_name}
                    onChange={(e) =>
                      handleInputChange("user_name", e.target.value)
                    }
                    required
                    className="border border-gray-300 py-3 px-4 w-2/3 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Please enter your username"
                  />
                </div>

                <div className="mb-4 flex items-center">
                  <label
                    className="block text-gray-700 mb-2 w-1/3 font-semibold uppercase"
                    htmlFor="customer_name"
                  >
                    Real Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="customer_name"
                    value={formData && formData.customer_name}
                    onChange={(e) =>
                      handleInputChange("customer_name", e.target.value)
                    }
                    required
                    className="border border-gray-300 py-3 px-4 w-2/3 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Please enter your real name"
                  />
                </div>

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
                        value="Male"
                        checked={formData && formData.customer_gender === "male"}
                        onChange={(e) =>
                          handleInputChange("customer_gender", e.target.value)
                        }
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
                        value="Female"
                        checked={formData && formData.customer_gender === "female"}
                        onChange={(e) =>
                          handleInputChange("customer_gender", e.target.value)
                        }
                        className="mr-2"
                      />
                      <label htmlFor="female" className="text-sm text-gray-600">
                        Female
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mb-4 flex items-center">
                  <label
                    className="block text-gray-700 mb-2 w-1/3 font-semibold uppercase"
                    htmlFor="user_email"
                  >
                    Email Address <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    id="user_email"
                    value={formData && formData.user_email}
                    onChange={(e) =>
                      handleInputChange("user_email", e.target.value)
                    }
                    required
                    className="border border-gray-300 py-3 px-4 w-2/3 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Enter a valid email"
                  />
                </div>

                <div className="flex items-center">
                  <label
                    className="block text-gray-700 mb-2 w-1/3 font-semibold uppercase"
                    htmlFor="user_password"
                  >
                    Password <span className="text-red-600">*</span>
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="user_password"
                    value={formData && formData.user_password}
                    onChange={(e) =>
                      handleInputChange("user_password", e.target.value)
                    }
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
                      className="inline-block w-5 h-5 border-2 relative cursor-pointer after:content-[''] after:absolute after:top-2/4 after:left-2/4 after:-translate-x-1/2 after:-translate-y-1/2 after:w-[10px] after:h-[10px] after:bg-[#333] after:rounded-[2px] after:opacity-0 peer-checked:after:opacity-100"
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
                    htmlFor="customer_mobile_no"
                  >
                    Mobile No. <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="customer_mobile_no"
                    value={formData && formData.customer_mobile_no}
                    onChange={(e) =>
                      handleInputChange("customer_mobile_no", e.target.value)
                    }
                    required
                    className="border border-gray-300 py-3 px-4 w-2/3 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Please enter your mobile number"
                  />
                </div>

                <div className="mb-4 flex items-center">
                  <label
                    className="block text-gray-700 mb-2 w-1/3 font-semibold uppercase"
                    htmlFor="customer_country"
                  >
                    Country <span className="text-red-600">*</span>
                  </label>
                  <Select
                    id="customer_country"
                    value={country}
                    onChange={(e) => {
                      setCountry(e);
                      handleInputChange("customer_country", e.label);
                    }}
                    options={countries}
                    className="w-2/3"
                    placeholder="Select a country"
                  />
                </div>

                <div className="mb-4 flex items-center">
                  <label
                    className="block text-gray-700 mb-2 w-1/3 font-semibold uppercase"
                    htmlFor="customer_state"
                  >
                    State <span className="text-red-600">*</span>
                  </label>
                  <Select
                    id="customer_state"
                    value={state}
                    onChange={(e) => {
                      setState(e);
                      handleInputChange("customer_state", e.label);
                    }}
                    options={states}
                    className="w-2/3"
                    placeholder="Select a state"
                    isDisabled={!country}
                  />
                </div>

                <div className="mb-4 flex items-center">
                  <label
                    className="block text-gray-700 mb-2 w-1/3 font-semibold uppercase"
                    htmlFor="customer_city"
                  >
                    City <span className="text-red-600">*</span>
                  </label>
                  <Select
                    id="customer_city"
                    value={city}
                    onChange={(e) => {
                      setCity(e);
                      handleInputChange("customer_city", e.label);
                    }}
                    options={cities}
                    className="w-2/3"
                    placeholder="Select a city"
                    isDisabled={!state}
                  />
                </div>

                <div className="mb-4 flex items-center">
                  <label
                    className="block text-gray-700 mb-2 w-1/3 font-semibold uppercase"
                    htmlFor="customer_address_1"
                  >
                    Address Line 1 <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="customer_address_1"
                    value={formData && formData.customer_address_1}
                    onChange={(e) =>
                      handleInputChange("customer_address_1", e.target.value)
                    }
                    required
                    className="border border-gray-300 py-3 px-4 w-2/3 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Enter a valid address"
                  />
                </div>

                <div className="mb-4 flex items-center">
                  <label
                    className="block text-gray-700 mb-2 w-1/3 font-semibold uppercase"
                    htmlFor="customer_address_2"
                  >
                    Address Line 2 <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="customer_address_2"
                    value={formData && formData.customer_address_2}
                    onChange={(e) =>
                      handleInputChange("customer_address_2", e.target.value)
                    }
                    required
                    className="border border-gray-300 py-3 px-4 w-2/3 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Enter a valid address"
                  />
                </div>

                <div className="mb-4 flex items-center">
                  <label
                    className="block text-gray-700 mb-2 w-1/3 font-semibold uppercase"
                    htmlFor="customer_address_3"
                  >
                    Address Line 3
                  </label>
                  <input
                    type="text"
                    id="customer_address_3"
                    value={formData && formData.customer_address_3}
                    onChange={(e) =>
                      handleInputChange("customer_address_3", e.target.value)
                    }
                    required
                    className="border border-gray-300 py-3 px-4 w-2/3 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Enter a valid address"
                  />
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
                      className="inline-block w-5 h-5 border-2 relative cursor-pointer after:content-[''] after:absolute after:top-2/4 after:left-2/4 after:-translate-x-1/2 after:-translate-y-1/2 after:w-[10px] after:h-[10px] after:bg-[#333] after:rounded-[2px] after:opacity-0 peer-checked:after:opacity-100"
                    ></label>
                    <label
                      className="text-sm text-gray-600 ml-2"
                    >
                      I agree to the ZEPHYR.’s 
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
                  type="button"
                  className="bg-black text-white w-full px-6 py-3 uppercase tracking-widest font-semibold text-sm hover:bg-zinc-700"
                  disabled={buttonDisabled}
                  onClick={handleOtpModal}
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
                  onClick={() => {
                    startTransition(() => {
                      navigate("/login");
                    });
                  }}
                  className="bg-gray-300 text-black w-full px-6 py-3 uppercase tracking-widest font-semibold text-sm hover:bg-gray-400 mt-2"
                >
                  Back to Login
                </button>

              </div>
            </div>
            <div className="border-l border-gray-300 mx-4" />{" "}
            <div className="w-1/2 pl-4 flex justify-center items-center">
              <img src={RegisterImage} alt="Register" className="object-cover w-auto h-full"/>
            </div>
          </div>
        </div>
      </div>

      {isOtpModalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Enter OTP</h2>
            <p className="text-gray-600">An OTP has been sent to your email. Enter the</p>
            <p className="text-gray-600 mb-4">OTP to register your account.</p>
            <div className="flex space-x-2">
              {otp.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={data}
                  onChange={(e) => handleOtpChange(e.target, index)}
                  onFocus={(e) => e.target.select()}
                  ref={(el) => (otpRefs.current[index] = el)}
                  className="border border-gray-300 py-3 px-4 w-12 text-center rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                />
              ))}
            </div>
            <button
              type="button"
              className="mt-5 bg-black text-white w-full px-6 py-3 uppercase tracking-widest font-semibold text-sm hover:bg-zinc-700"
              disabled={buttonDisabled}
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Register;

import React, { useEffect, useState, startTransition  } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Banner from "../../components/Banner";
import { ToastContainer, toast } from "react-toastify";
import { apiUrl } from "../../constant/constants";
import axios from "axios";

function Profile() {
    const navigate = useNavigate();
    const [selectedButton, setSelectedButton] = useState('Profile');
    const authUserData = localStorage.getItem('authUserData');
    const userDataObject = authUserData ? JSON.parse(authUserData) : null;
    const authCustomerData = localStorage.getItem('authCustomerData');
    const customerDataObject = authCustomerData ? JSON.parse(authCustomerData) : null;
    const [country, setCountry] = useState(null);
    const [state, setState] = useState(null);
    const [city, setCity] = useState(null);
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [changePasswordClicked, setChangePasswordClicked] = useState(false);
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [formData, setFormData] = useState({
        user_name: userDataObject ? userDataObject.user_name : '',
        user_email: userDataObject ? userDataObject.user_email : '',
        user_password: '',
        confirm_user_password: '',
        customer_name: customerDataObject ? customerDataObject.customer_name : '',
        customer_gender: customerDataObject ? customerDataObject.customer_gender: '',
        customer_mobile_no: customerDataObject ? customerDataObject.customer_mobile_no : '',
        customer_address_1: customerDataObject ? customerDataObject.customer_address_1 : '',
        customer_address_2: customerDataObject ? customerDataObject.customer_address_2 : '',
        customer_address_3: customerDataObject ? customerDataObject.customer_address_3 : '',
        customer_country: customerDataObject ? customerDataObject.customer_country : '',
        customer_state: customerDataObject ? customerDataObject.customer_state : '',
        customer_city: customerDataObject ? customerDataObject.customer_city : '',
    });

    const handleProfileClick = async (buttonName) => {
        setSelectedButton(buttonName);
    };

    const handleOrderHistoryClick = async (buttonName) => {
        setSelectedButton(buttonName);
    };

    const handleLogout = () => {
        localStorage.clear();
        toast.success("Logout Successfully", {
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
                    navigate("/login");
                });
            },
        });
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

            if (name === 'user_password' || name === 'confirm_user_password') {
                const match = updatedData.user_password === updatedData.confirm_user_password;
                setPasswordMatch(match);
            }
            
            return updatedData;
        });
    };

    const handleSubmit = async () => {
        try {
            if (changePasswordClicked && !isPasswordValid(formData.user_password)) {
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
    
            if (changePasswordClicked && !passwordMatch) {
                toast.error("Password and Confirm Password do not match", {
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
    
            const userUpdate = axios.put(
                apiUrl + `user/${userDataObject.user_id}`, 
                {
                    'user_id': userDataObject.user_id,
                    'user_name': formData.user_name,
                    'user_email': formData.user_email,
                    'user_role': userDataObject.user_role,
                    'user_status': userDataObject.user_status,
                    'user_permission': userDataObject.user_permission,
                    'user_access': userDataObject.user_access,
                    'user_password': formData.user_password,
                    'created_by': userDataObject.created_by,
                }, 
                {}
            );

            const customerUpdate = axios.put(
                apiUrl + `customer/${customerDataObject.customer_id}`, 
                {
                    'customer_id': customerDataObject.customer_id,
                    'user_id': customerDataObject.user_id,
                    'customer_name': formData.customer_name,
                    'customer_gender': formData.customer_gender,
                    'customer_mobile_no': formData.customer_mobile_no,
                    'customer_country': formData.customer_country,
                    'customer_state': formData.customer_state,
                    'customer_city': formData.customer_city,
                    'customer_address_1': formData.customer_address_1,
                    'customer_address_2': formData.customer_address_2,
                    'customer_address_3': formData.customer_address_3,
                    'customer_status': customerDataObject.customer_status,
                }, 
                {}
            );

            const [userResponse, customerResponse] = await Promise.all([userUpdate, customerUpdate]);
    
            if (userResponse.status === 200 && customerResponse.status === 200) {
                const authUserData = userResponse.data.data;
                const authCustomerData = customerResponse.data.data;

                localStorage.setItem("authUserData", JSON.stringify(authUserData));
                localStorage.setItem('authCustomerData', JSON.stringify(authCustomerData));

                toast.success("Data Updated Successfully", {
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
            toast.error("Error Updating Data", {
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

                const selectedCountry = countryOptions.find(
                    (country) => country.label === formData.customer_country
                );
                if (selectedCountry) {
                    setCountry(selectedCountry);
                }
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };

        fetchCountries();
    }, [formData.customer_country]);

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

                    const selectedState = stateOptions.find(
                        (state) => state.label === formData.customer_state
                    );
                    if (selectedState) {
                        setState(selectedState);
                    }
                } catch (error) {
                    console.error('Error fetching states:', error);
                }
            };

            fetchStates();
        }
    }, [country, formData.customer_state]);

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

                    const selectedCity = cityOptions.find(
                        (city) => city.label === formData.customer_city
                    );
                    if (selectedCity) {
                        setCity(selectedCity);
                    }
                } catch (error) {
                    console.error('Error fetching cities:', error);
                }
            };

            fetchCities();
        }
    }, [state, formData.customer_city]);

    const genderOptions = [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
    ];

    const customStyles = {
        control: (provided) => ({
            ...provided,
            width: '227px',
        }),
    };

    return (
        <div>
            <Header />

            <Banner bannerText="Profile" />
            <ToastContainer />
            <div className="flex justify-center mb-20">
                <div className="py-8 w-9/12">
                    <div className="bg-white rounded-md shadow-lg flex p-8 h-[800px]">
                        <div className="w-1/5 pr-4 flex flex-col h-full">
                            <button
                                type="button"
                                className={`w-full px-6 py-3 mb-5 uppercase tracking-widest font-semibold text-sm shadow-lg ${
                                    selectedButton === 'Profile' ? 'bg-black text-white hover:bg-zinc-700' : 'bg-white text-black hover:bg-zinc-100'
                                }`}
                                onClick={() => handleProfileClick('Profile')}
                            >
                                Profile
                            </button>
                            <button
                                type="button"
                                className={`w-full px-6 py-3 mb-5 uppercase tracking-widest font-semibold text-sm shadow-lg ${
                                    selectedButton === 'Order History' ? 'bg-black text-white hover:bg-zinc-700' : 'bg-white text-black hover:bg-zinc-100'
                                }`}
                                onClick={() => handleOrderHistoryClick('Order History')}
                            >
                                Order History
                            </button>
                            <div className="flex-grow"></div>
                            <button
                                type="button"
                                className="bg-black text-white w-full px-6 py-3 uppercase tracking-widest font-semibold text-sm shadow-lg hover:bg-zinc-700"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </div>
                        <div className="border-l border-gray-300 mx-4" />{" "}
                        
                        <div className="w-4/5 p-4">
                            {selectedButton === 'Profile' && 
                                <div className="flex flex-col">
                                    <div className="text-3xl font-semibold mb-3">Profile</div>
                                    <div className="border-b border-gray-300 mb-3" />{" "}
                                    <div className="flex justify-center p-4 mb-2">
                                        <div className="w-1/2 mr-3">
                                            <div className="flex flex-row mb-4">
                                                <label htmlFor="user_name" className="mb-2 mt-2 w-52">
                                                    Username
                                                </label>
                                                <input
                                                    type="text"
                                                    id="user_name"
                                                    name="user_name"
                                                    className="border py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-black w-full"
                                                    placeholder="Username"
                                                    value={formData && formData.user_name}
                                                    onChange={(e) =>
                                                        handleInputChange("user_name", e.target.value)
                                                    }
                                                />
                                            </div>

                                            <div className="flex flex-row mb-4">
                                                <label htmlFor="customer_name" className="mb-2 mt-2 w-52">
                                                    Name
                                                </label>
                                                <input
                                                    type="text"
                                                    id="customer_name"
                                                    name="customer_name"
                                                    className="border py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-black w-full"
                                                    placeholder="Name"
                                                    value={formData && formData.customer_name}
                                                    onChange={(e) =>
                                                        handleInputChange("customer_name", e.target.value)
                                                    }
                                                />
                                            </div>

                                            <div className="flex flex-row">
                                                <label htmlFor="customer_mobile_no" className="mb-2 mt-2 w-52">
                                                    Mobile No.
                                                </label>
                                                <input
                                                    type="text"
                                                    id="customer_mobile_no"
                                                    name="customer_mobile_no"
                                                    className="border py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-black w-full"
                                                    placeholder="Mobile No."
                                                    value={formData && formData.customer_mobile_no}
                                                    onChange={(e) =>
                                                        handleInputChange("customer_mobile_no", e.target.value)
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="w-1/2 ml-3">
                                            <div className="flex flex-row mb-4">
                                                <label htmlFor="user_email" className="mb-2 mt-2 w-52">
                                                    Email
                                                </label>
                                                <input
                                                    type="text"
                                                    id="user_email"
                                                    name="user_email"
                                                    className="border py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-black w-full"
                                                    placeholder="Email"
                                                    value={formData && formData.user_email}
                                                    onChange={(e) =>
                                                        handleInputChange("user_email", e.target.value)
                                                    }
                                                />
                                            </div>

                                            <div className="flex flex-row">
                                                <label htmlFor="customer_gender" className="mb-2 mt-2 w-52">
                                                    Gender
                                                </label>
                                                <select
                                                    id="customer_gender"
                                                    name="customer_gender"
                                                    className="border py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-black w-full"
                                                    value={formData && formData.customer_gender}
                                                    onChange={(e) =>
                                                        handleInputChange("customer_gender", e.target.value)
                                                    }
                                                >
                                                <option value="" disabled hidden>Select a gender</option>
                                                    {genderOptions.map((option) => (
                                                        <option key={option.value} value={option.value}>
                                                        {option.label}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mx-4 mb-6">
                                        <div className="flex flex-row mb-4">
                                            <label htmlFor="customer_address_1" className="mb-2 mt-2 w-72">
                                            Address Line 1
                                            </label>
                                            <input
                                            type="text"
                                            id="customer_address_1"
                                            name="customer_address_1"
                                            className="border py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-black w-full"
                                            placeholder="Address Line 1"
                                            value={formData && formData.customer_address_1}
                                            onChange={(e) =>
                                                handleInputChange("customer_address_1", e.target.value)
                                            }
                                            />
                                        </div>

                                        <div className="flex flex-row mb-4">
                                            <label htmlFor="customer_address_2" className="mb-2 mt-2 w-72">
                                            Address Line 2
                                            </label>
                                            <input
                                            type="text"
                                            id="customer_address_2"
                                            name="customer_address_2"
                                            className="border py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-black w-full"
                                            placeholder="Address Line 2"
                                            value={formData && formData.customer_address_2}
                                            onChange={(e) =>
                                                handleInputChange("customer_address_2", e.target.value)
                                            }
                                            />
                                        </div>

                                        <div className="flex flex-row">
                                            <label htmlFor="customer_address_3" className="mb-2 mt-2 w-72">
                                            Address Line 3
                                            </label>
                                            <input
                                            type="text"
                                            id="customer_address_3"
                                            name="customer_address_3"
                                            className="border py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-black w-full"
                                            placeholder="Address Line 3"
                                            value={formData && formData.customer_address_3}
                                            onChange={(e) =>
                                                handleInputChange("customer_address_3", e.target.value)
                                            }
                                            />
                                        </div>
                                    </div>

                                    <div className="mx-4">
                                        <div className="flex flex-row">
                                            <div className="flex flex-row mr-4">
                                                <label htmlFor="customer_country" className="mb-2 mt-2 w-24">
                                                    Country
                                                </label>
                                                <Select
                                                    id="customer_country"
                                                    value={country}
                                                    onChange={(e) => {
                                                        setCountry(e);
                                                        handleInputChange("customer_country", e.label);
                                                    }}
                                                    options={countries}
                                                    styles={customStyles}
                                                    placeholder="Select a country"
                                                />
                                            </div>

                                            <div className="flex flex-row mr-4">
                                                <label htmlFor="customer_state" className="mb-2 mt-2 w-24">
                                                    State
                                                </label>
                                                <Select
                                                    id="customer_state"
                                                    value={state}
                                                    onChange={(e) => {
                                                        setState(e);
                                                        handleInputChange("customer_state", e.label);
                                                    }}
                                                    options={states}
                                                    styles={customStyles}
                                                    placeholder="Select a state"
                                                    isDisabled={!country}
                                                />
                                            </div>

                                            <div className="flex flex-row">
                                                <label htmlFor="customer_city" className="mb-2 mt-2 w-24">
                                                    City
                                                </label>
                                                <Select
                                                    id="customer_city"
                                                    value={city}
                                                    onChange={(e) => {
                                                        setCity(e);
                                                        handleInputChange("customer_city", e.label);
                                                    }}
                                                    options={cities}
                                                    styles={customStyles}
                                                    placeholder="Select a city"
                                                    isDisabled={!state}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {changePasswordClicked && (
                                        <div className="mx-4 mt-6">
                                            <div className="flex flex-row mb-4">
                                                <label htmlFor="user_password" className="mb-2 mt-2 w-72">
                                                    New Password
                                                </label>
                                                <input
                                                    type="text"
                                                    id="user_password"
                                                    name="user_password"
                                                    className="border py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-black w-full"
                                                    placeholder="Password"
                                                    value={formData && formData.user_password}
                                                    onChange={(e) =>
                                                        handleInputChange("user_password", e.target.value)
                                                    }
                                                />
                                            </div>
                                            <div className="flex flex-row">
                                                <label htmlFor="confirm_user_password" className="mb-2 mt-2 w-72">
                                                    Confirm Password
                                                </label>
                                                <input
                                                    type="text"
                                                    id="confirm_user_password"
                                                    name="confirm_user_password"
                                                    className="border py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-black w-full"
                                                    placeholder="Confirm Password"
                                                    value={formData && formData.confirm_user_password}
                                                    onChange={(e) =>
                                                        handleInputChange("confirm_user_password", e.target.value)
                                                    }
                                                />
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex justify-between mt-6 mx-4">
                                        <button className="bg-black text-white px-5 py-3 rounded-md hover:bg-zinc-700 tracking-widest text-sm flex" 
                                            onClick={() => {
                                                handleInputChange("user_password", "")
                                                handleInputChange("confirm_user_password", "")
                                                setChangePasswordClicked(!changePasswordClicked)
                                            }}
                                        >
                                            {changePasswordClicked ? "Cancel" : "Change Password"}
                                        </button>
                                        <div className="flex space-x-4">
                                            <button
                                                type="button"
                                                className="bg-black text-white px-5 py-3 rounded-md hover:bg-zinc-700 tracking-widest text-sm flex"
                                                onClick={handleSubmit}
                                            >
                                                Update
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            }
                            {selectedButton === 'Order History' && 
                                <div>
                                    <div className="text-3xl font-semibold mb-3">Order History</div>
                                    <div className="border-b border-gray-300 mb-3" />{" "}
                                    <div>

                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Profile;

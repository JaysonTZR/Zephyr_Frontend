import React, { useState, startTransition  } from "react";
import { useNavigate } from "react-router-dom";
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
  const userId = userDataObject ? userDataObject.user_id : null;

  const handleProfileClick = async (buttonName) => {
    setSelectedButton(buttonName);
    
  };

  const handleOrderHistoryClick = async (buttonName) => {
    setSelectedButton(buttonName);
    
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
                        >
                            Logout
                        </button>
                    </div>
                    <div className="border-l border-gray-300 mx-4" />{" "}
                    
                    <div className="w-4/5 p-4">
                        {selectedButton === 'Profile' && 
                            <div>
                                <div className="text-3xl font-semibold mb-3">Profile</div>
                                <div className="border-b border-gray-300 mb-3" />{" "}
                                <div>

                                </div>
                            </div>
                        }
                        {selectedButton === 'Order History' && 
                            <div>Order History Content</div>
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

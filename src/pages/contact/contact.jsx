import React, { useState, startTransition } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import { ToastContainer, toast } from "react-toastify";
import { apiUrl } from "../../constant/constants";
import axios from "axios";

const Contact = () => {
  const [formData, setFormData] = useState({
    contact_name: "",
    contact_email: "",
    contact_message: "",
  });

  const handleInputChange = (name, value) => {
    setFormData((prevData) => {
      const updatedData = {
        ...prevData,
        [name]: value,
      };

      return updatedData;
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        apiUrl + `contact`,
        {
          ...formData,
          contact_status: "active",
          trash: false,
        },
        {}
      );

      if (response.status === 201) {
        setFormData({
          contact_name: "",
          contact_email: "",
          contact_message: "",
        });

        toast.success(response.data.message, {
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
    } catch (error) {
      toast.error("Error Sending Message", {
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

  return (
    <div>
      <Header />
      <ToastContainer />
      <div className="w-full h-[510px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.14660757484!2d101.69798647584416!3d3.0554110537199097!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc4abb795025d9%3A0x1c37182a714ba968!2sAsia%20Pacific%20University%20of%20Technology%20%26%20Innovation%20(APU)!5e0!3m2!1sen!2smy!4v1729179134046!5m2!1sen!2smy"
          width="100%"
          height="500"
          style={{ border: 0 }}
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <div className="container mx-auto my-12 px-48 md:flex justify-between items-start pt-10 mb-20">
        <div className="md:w-1/2">
          <h5 className="text-sm font-semibold text-red-600 tracking-wider uppercase mb-3">
            {" "}
            Information
          </h5>
          <h1 className="text-5xl font-semibold mb-5"> Contact Us</h1>
          <p className="text-gray-500 pr-5 text-sm mb-10">
            As you might expect of a company that began as a high-end interiors
            contractor, we pay strict attention.
          </p>
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-semibold mb-2">
              Asia Pacific University of Technology & Innovation</h2>
              <p className="mb-1">Jalan Teknologi 5, Taman Teknologi Malaysia, 57000,</p>
              <p className="mb-1">Kuala Lumpur, Wilayah Persekutuan Kuala Lumpur</p>
              <p>+ 03-8996 1000</p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-2">France</h2>
              <p className="mb-1">109 Avenue Léon, 63 Clermont-Ferrand</p>
              <p>+ 03-8996 1000</p>
            </div>
          </div>
        </div>
        {/* right side */}
        <div className="md:w-1/2 mt-8 md:mt-0">
          <div className="space-y-6">
            <div className="flex space-x-6 mb-1">
              <input
                className="w-1/2 px-4 py-3 border border-gray-300"
                type="text"
                placeholder="Name"
                id="contact_name"
                value={formData && formData.contact_name}
                onChange={(e) =>
                  handleInputChange("contact_name", e.target.value)
                }
              />
              <input
                className="w-1/2 px-4 py-3 border border-gray-300"
                type="email"
                placeholder="Email"
                id="contact_email"
                value={formData && formData.contact_email}
                onChange={(e) =>
                  handleInputChange("contact_email", e.target.value)
                }
              />
            </div>
            <textarea
              className="w-full px-4 py-3 border border-gray-300 resize-none"
              rows="6"
              placeholder="Message"
              id="contact_message"
              value={formData && formData.contact_message}
              onChange={(e) =>
                handleInputChange("contact_message", e.target.value)
              }
            />
            <button
              className="bg-black text-white px-10 py-4 hover:bg-zinc-700 uppercase tracking-widest font-semibold text-sm flex"
              onClick={handleSubmit}
            >
              Send Message
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;

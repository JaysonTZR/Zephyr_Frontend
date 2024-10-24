import React from "react";
import Sidebar from "../../../components/cms/Sidebar";
import Footer from "../../../components/cms/Footer";
import Breadcrumb from "../../../components/cms/Breadcrumb";
import Header from "../../../components/cms/Header";

const CMSProductList = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar page='product-list' />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header />

        <Breadcrumb />

        {/* Main Section */}
        <main className="flex-1 p-6">
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">
              Welcome to Zephyr E-commerce Management System!
            </h2>
            <p className="text-gray-600">
              For assistance, feel free to reach out to us at +60 12-313 9872 or
              email us at tanzhirong@gmail.com.my. We are here to provide guidance on
              maximizing your experience with your current screen.
            </p>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default CMSProductList;

import React from "react";
import Sidebar from "../../../components/cms/Sidebar";
import Footer from "../../../components/cms/Footer";
import Breadcrumb from "../../../components/cms/Breadcrumb";
import Header from "../../../components/cms/Header";

const CMSOrderList = () => {
  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "#f1f5f9" }}>
      <Sidebar page={"order-list"} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header />

        <Breadcrumb />

        {/* Main Section */}
        <div className="text-2xl font-semibold ml-6">Dashboard</div>
        <main className="flex-1 p-6">
          <div className="bg-white py-12 px-16 border rounded-lg">
            <h2 className="font-medium text-center text-2xl">
              Welcome to Zephyr E-commerce Management System!
            </h2>
            <p className="text text-gray-500 pt-4">
              For assistance, feel free to reach out to us at +60 12-345 6789 or
              email us at twice@gmail.com.my. We are here to provide guidance on
              maximizing your experience with your current screen.
            </p>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default CMSOrderList;

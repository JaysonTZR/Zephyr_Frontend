import React from "react";
import Sidebar from "../../../components/cms/Sidebar";
import Footer from "../../../components/cms/Footer";
import Breadcrumb from "../../../components/cms/Breadcrumb";
import Header from "../../../components/cms/Header";
import AnnualSalesChart from "../../../components/cms/AnnualSalesChart";

const Dashboard = () => {
  const salesData = [
    { month: "Jan", sales: 3000 },
    { month: "Feb", sales: 2500 },
    { month: "Mar", sales: 4000 },
    { month: "Apr", sales: 3500 },
    { month: "May", sales: 4500 },
    { month: "Jun", sales: 5000 },
    { month: "Jul", sales: 5500 },
    { month: "Aug", sales: 6000 },
    { month: "Sep", sales: 5200 },
    { month: "Oct", sales: 4800 },
    { month: "Nov", sales: 5300 },
    { month: "Dec", sales: 6200 },
  ];

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar page={"dashboard"} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="ml-64 flex-1 flex flex-col">
          <Breadcrumb />

          {/* Main Section */}
          <div className="text-2xl font-semibold ml-6">Dashboard</div>
          <main className="flex-1 p-6">
            {/* New Cards Section */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white flex items-center py-4 px-4 border rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 text-green-600 mr-3 p-1 bg-green-100 rounded-full"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
                  />
                </svg>

                <div>
                  <h3 className="text-lg font-semibold">Total Sales</h3>
                  <p className="text-2xl font-bold text-green-500">$25,000</p>
                </div>
              </div>
              <div className="bg-white flex items-center py-4 px-4 border rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 text-blue-600 mr-3 p-1 bg-blue-100 rounded-full"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                  />
                </svg>

                <div>
                  <h3 className="text-lg font-semibold">Total Reviews</h3>
                  <p className="text-2xl font-bold text-blue-500">1,200</p>
                </div>
              </div>
              <div className="bg-white flex items-center py-4 px-4 border rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 text-purple-600 mr-3 p-1 bg-purple-100 rounded-full"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                  />
                </svg>

                <div>
                  <h3 className="text-lg font-semibold">New Products</h3>
                  <p className="text-2xl font-bold text-purple-500">50</p>
                </div>
              </div>
              <div className="bg-white flex items-center py-4 px-4 border rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 text-yellow-600 mr-3 p-1 bg-yellow-100 rounded-full"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                  />
                </svg>

                <div>
                  <h3 className="text-lg font-semibold">Total Rating</h3>
                  <p className="text-2xl font-bold text-yellow-500">4.8</p>
                </div>
              </div>
            </div>

            <div className="bg-white py-12 px-16 border rounded-lg">
              <h2 className="font-medium text-center text-2xl">
                Welcome to Zephyr E-commerce Management System!
              </h2>
              <p className="text text-gray-500 pt-4">
                For assistance, feel free to reach out to us at +60 12-345 6789
                or email us at twice@gmail.com.my. We are here to provide
                guidance on maximizing your experience with your current screen.
              </p>
            </div>

            {/* Annual Sales Charts Section */}
            {/* <AnnualSalesChart data={salesData} /> */}
          </main>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

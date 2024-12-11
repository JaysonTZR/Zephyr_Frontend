import React, { useEffect, useState, startTransition } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../../components/cms/Sidebar";
import Footer from "../../../components/cms/Footer";
import Breadcrumb from "../../../components/cms/Breadcrumb";
import Header from "../../../components/cms/Header";
import Table from "../../../components/cms/Table";
import { toast } from "react-toastify";
import { apiUrl } from "../../../constant/constants";
import axios from "axios";

const CMSOrderList = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [showFilters, setShowFilters] = useState(false);
    const [selectedField, setSelectedField] = useState("");
    const [filterValue, setFilterValue] = useState("");
    const [itemOriData, setItemOriData] = useState([]);
    const [itemData, setItemData] = useState([]);
    const [billingData, setBillingData] = useState([]);
    const [productMap, setProductMap] = useState(false);

    const fetchProductData = async () => {
        try {
            const response = await axios.get(
                apiUrl + "product", 
                {}
            );
    
            if (response.status === 200) {
                const productData = response.data.reduce((acc, product) => {
                acc[product.product_id] = {
                    name: product.product_name,
                    image: product.product_photo,
                };
                return acc;
                }, {});
                setProductMap(productData);
            }
        } catch (error) {
            toast.error("Error Fetching Data", {
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

    const fetchData = async () => {
        try {
            const response = await axios.get(
                apiUrl + "salesorderitem", 
                {}
            );
        
            if (response.status === 200) {
                const filteredData = response.data.filter((item) => item.order_id == id && item.trash === false);
                const transformedData = filteredData.map((item) => ({
                    id: item.order_item_id,
                    product: productMap[item.product_id]?.name || item.product_id,
                    product_image: productMap[item.product_id]?.image || '',
                    quantity: item.order_item_quantity,
                    total_price: item.order_item_total_price,
                    description: item.order_item_description,
                    status: item.order_item_status,
                    trash: item.trash,
                    updated_at: item.updated_at,
                    created_at: item.created_at,
                }));
        
                setItemData(transformedData);
                setItemOriData(transformedData);
            }
        } catch (error) {
            toast.error("Error Fetching Data", {
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

    const fetchBillingData = async () => {
        try {
            const response = await axios.get(
                apiUrl + "billing", 
                {}
            );
        
            if (response.status === 200) {
                const filteredData = response.data.filter((item) => item.order_id == id && item.trash === false);
                setBillingData(filteredData[0]);
            }
        } catch (error) {
            toast.error("Error Fetching Data", {
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

    const itemTableHeader = ["product_image", "product", "quantity", "total_price", "description", "status"];

    useEffect(() => {
        fetchProductData();
        fetchBillingData();
    }, []);

    useEffect(() => {
        if (Object.keys(productMap).length > 0) {
          fetchData();
        }
    }, [productMap]);

    const handleFieldChange = (e) => {
        setSelectedField(e.target.value);
        setFilterValue("");
    };

    const handleFilterValueChange = (e) => {
        setFilterValue(e.target.value);
    };

    const clearFilter = () => {
        setSelectedField("");
        setFilterValue("");
    };

    const filteredDataDetail = itemOriData.filter(item => {
        if (selectedField && filterValue) {
            return item[selectedField].toString().toLowerCase().includes(filterValue.toLowerCase());
        }
            return true;
    });

    return (
        <div className="flex min-h-screen bg-slate-100">
            <Sidebar page="order-list" />
            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                <Header />
                <div className="ml-64 flex-1 flex flex-col">
                    <Breadcrumb />
                    {/* Main Section */}
                    <main className="flex-1 px-6 pt-0 pb-10">
                        <div className="bg-white shadow-md rounded-lg mb-10">
                            <div className="p-6 border-b">
                                <h2 className="text-2xl font-semibold">Billing Details</h2>
                            </div>

                            <div className="p-6">
                                <div className="space-y-6">
                                    <div className="flex flex-row">
                                        <label htmlFor="billing_name" className="mb-2 mt-2 w-72">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            id="billing_name"
                                            name="billing_name"
                                            className="border py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-black w-full"
                                            placeholder="Billing Name"
                                            value={billingData && billingData.billing_name}
                                            disabled={true}
                                        />
                                    </div>
                                    <div className="flex flex-row">
                                        <label htmlFor="billing_email" className="mb-2 mt-2 w-72">
                                            Email
                                        </label>
                                        <input
                                            type="text"
                                            id="billing_email"
                                            name="billing_email"
                                            className="border py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-black w-full"
                                            placeholder="Billing Email"
                                            value={billingData && billingData.billing_email}
                                            disabled={true}
                                        />
                                    </div>
                                    <div className="flex flex-row">
                                        <label htmlFor="billing_mobile_no" className="mb-2 mt-2 w-72">
                                            Mobile No.
                                        </label>
                                        <input
                                            type="text"
                                            id="billing_mobile_no"
                                            name="billing_mobile_no"
                                            className="border py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-black w-full"
                                            placeholder="Billing Mobile No."
                                            value={billingData && billingData.billing_mobile_no}
                                            disabled={true}
                                        />
                                    </div>
                                    <div className="flex flex-row">
                                        <label htmlFor="billing_address" className="mb-2 mt-2 w-72">
                                            Address
                                        </label>
                                        <input
                                            type="text"
                                            id="billing_address"
                                            name="billing_address"
                                            className="border py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-black w-full"
                                            placeholder="Billing Address"
                                            value={billingData && billingData.billing_address}
                                            disabled={true}
                                        />
                                    </div>
                                    <div className="flex flex-row">
                                        <label htmlFor="billing_address_optional" className="mb-2 mt-2 w-72">
                                            Address Optional
                                        </label>
                                        <input
                                            type="text"
                                            id="billing_address_optional"
                                            name="billing_address_optional"
                                            className="border py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-black w-full"
                                            placeholder="Billing Address Optional"
                                            value={billingData && billingData.billing_address_optional}
                                            disabled={true}
                                        />
                                    </div>
                                    <div className="flex flex-row">
                                        <label htmlFor="billing_country" className="mb-2 mt-2 w-72">
                                            Country
                                        </label>
                                        <input
                                            type="text"
                                            id="billing_country"
                                            name="billing_country"
                                            className="border py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-black w-full"
                                            placeholder="Billing Country"
                                            value={billingData && billingData.billing_country}
                                            disabled={true}
                                        />
                                    </div>
                                    <div className="flex flex-row">
                                        <label htmlFor="billing_state" className="mb-2 mt-2 w-72">
                                            State
                                        </label>
                                        <input
                                            type="text"
                                            id="billing_state"
                                            name="billing_state"
                                            className="border py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-black w-full"
                                            placeholder="Billing State"
                                            value={billingData && billingData.billing_state}
                                            disabled={true}
                                        />
                                    </div>
                                    <div className="flex flex-row">
                                        <label htmlFor="billing_city" className="mb-2 mt-2 w-72">
                                            City
                                        </label>
                                        <input
                                            type="text"
                                            id="billing_city"
                                            name="billing_city"
                                            className="border py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-black w-full"
                                            placeholder="Billing City"
                                            value={billingData && billingData.billing_city}
                                            disabled={true}
                                        />
                                    </div>
                                    <div className="flex flex-row">
                                        <label htmlFor="billing_notes" className="mb-2 mt-2 w-72">
                                            Notes
                                        </label>
                                        <input
                                            type="text"
                                            id="billing_notes"
                                            name="billing_notes"
                                            className="border py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-black w-full"
                                            placeholder="Billing Notes"
                                            value={billingData && billingData.billing_notes}
                                            disabled={true}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white shadow-md rounded-lg">
                            <div className="flex justify-between items-center p-6">
                                <div className="flex items-center space-x-3">
                                <h2 className="text-2xl font-semibold">Order Items</h2>
                                </div>

                                <div className="flex space-x-4">
                                    <button onClick={() => setShowFilters(!showFilters)} className=" text-gray-700 w-24 h-9 rounded-md text-sm focus:outline-none hover:bg-gray-300 border border-black flex justify-center items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 mr-2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
                                        </svg>
                                        Filter
                                    </button>
                                </div>
                            </div>

                            {showFilters && (
                                <div className="p-6 bg-gray-50">
                                    <div className="grid grid-cols-11 gap-4 items-center">
                                        {/* Left column: Choose field to filter */}
                                        <select
                                            name="selectedField"
                                            value={selectedField}
                                            onChange={handleFieldChange}
                                            className="border rounded-md p-2 col-span-5"
                                        >
                                            <option value="">Select Field</option>
                                            <option value="username">Username</option>
                                            <option value="role">Role</option>
                                            <option value="status">Status</option>
                                        </select>

                                        {/* Right column: Enter value for selected filter field */}
                                        {selectedField === "status" ? (
                                            <select
                                                name="filterValue"
                                                value={filterValue}
                                                onChange={handleFilterValueChange}
                                                className="border rounded-md p-2 col-span-5"
                                            >
                                                <option value="">All Status</option>
                                                <option value="Active">Active</option>
                                                <option value="Inactive">Inactive</option>
                                            </select>
                                        ) : (
                                            <input
                                                type="text"
                                                name="filterValue"
                                                placeholder={`Enter ${selectedField}`}
                                                value={filterValue}
                                                onChange={handleFilterValueChange}
                                                className="border rounded-md p-2 col-span-5"
                                            />
                                        )}

                                        {/* Clear Button */}
                                        <button 
                                            onClick={clearFilter}
                                            className="text-white h-9 rounded-md text-sm focus:outline-none hover:bg-zinc-700 bg-black flex justify-center items-center"
                                        >
                                            Clear
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Table Section */}
                            <Table tableHeader={itemTableHeader} tableData={filteredDataDetail}/>
                        </div>
                    </main>
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default CMSOrderList;
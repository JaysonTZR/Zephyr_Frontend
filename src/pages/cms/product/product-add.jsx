import React, { useEffect, useState, useRef, startTransition } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import Sidebar from "../../../components/cms/Sidebar";
import Footer from "../../../components/cms/Footer";
import Breadcrumb from "../../../components/cms/Breadcrumb";
import Header from "../../../components/cms/Header";
import { toast } from "react-toastify";
import { apiUrl } from "../../../constant/constants";
import axios from "axios";

const CMSProductAdd = () => {
    const navigate = useNavigate();
    const authUserData = localStorage.getItem('authUserData');
    const userDataObject = authUserData ? JSON.parse(authUserData) : null;
    const username = userDataObject ? userDataObject.user_name : null;
    const [category, setCategory] = useState([]);
    const [imageUrl, setImageUrl] = useState('');
    const [file, setFile] = useState(null);
    const [files, setFiles] = useState([]);
    const [fileOptions, setFileOptions] = useState([]);
    const fileInput = useRef();
    const filesInput = useRef();
    const [formData, setFormData] = useState({
        category_id: "",
        product_name: "",
        product_code: "",
        product_photo: "",
        product_sub_photo: "",
        product_price: 0.0,
        product_description: "",
        product_information: "",
        product_sale: false,
        product_new: false,
        product_status: "",
        trash: false,
    });

    const [buttonDisabled, setButtonDisabled] = useState(false);

    const onFileSelection = () => {
        fileInput.current.click();
    };

    const onFilesSelection = () => {
        filesInput.current.click();
    };

    const handleFileChange = (e) => {
        if (e.target.files) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);

            const reader = new FileReader();
            reader.readAsDataURL(selectedFile);
            reader.onloadend = () => {
                setImageUrl(reader.result);
                setFormData((prevData) => ({
                    ...prevData,
                    product_photo: selectedFile.name,
                    product_photo_base64: reader.result.split(",")[1],
                }));
            };
        }
    };

    const handleFilesChange = (e) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files);
            const updatedFiles = [...files];
            const updatedOptions = [...fileOptions];

            selectedFiles.forEach((file) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = () => {
                    const fileBase64 = reader.result.split(",")[1];
                    updatedFiles.push({ name: file.name, base64: fileBase64 });
                    updatedOptions.push({ value: file.name, label: file.name });

                    const fileNames = updatedFiles.map((f) => f.name).join(", ");
                    const base64Strings = updatedFiles.map((f) => f.base64).join(", ");

                    setFiles(updatedFiles);
                    setFileOptions(updatedOptions);

                    setFormData((prevData) => ({
                        ...prevData,
                        product_sub_photo: fileNames,
                        product_sub_photo_base64: base64Strings,
                    }));
                };
            });
        }
    };

    const handleFilesRemove = (selectedOptions) => {
        const updatedFiles = files.filter((file) =>
            selectedOptions.some((opt) => opt.value === file.name)
        );
        
        const fileNames = updatedFiles.map((f) => f.name).join(", ");
        const base64Strings = updatedFiles.map((f) => f.base64).join(", ");

        setFiles(updatedFiles);
        setFileOptions(selectedOptions);

        setFormData((prevData) => ({
            ...prevData,
            product_sub_photo: fileNames,
            product_sub_photo_base64: base64Strings,
        }));
    };

    const handleInputChange = (name, value) => {
        setFormData((prevData) => {
            const updatedData = {
                ...prevData,
                [name]: (name === 'product_sale' || name === 'product_new') ? value === 'true' : value,
            };
        
            return updatedData;
        });
    };

    //Validation
    const isPriceValid = (price) => {
        const priceRegex = /^\d+(\.\d+)?$/;
        return priceRegex.test(price);
    };

    const handleSubmit = async () => {
        setButtonDisabled(true);
        try {
            if (!isPriceValid(formData.product_price)) {
                toast.error("Cost price must be a valid decimal number.", {
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

            const response = await axios.post(
                apiUrl + `product`, 
                {
                    ...formData,
                    created_by: username,
                }, 
                {}
            );

            if (response.status === 201) {
                toast.success("Data Added Successfully", {
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
                        navigate("/cms/product/list");
                        });
                    },
                });
            }
        } catch (error) {
            toast.error("Error Adding Data", {
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

    const handleClear = () => {
        setFormData({
            category_id: "",
            product_name: "",
            product_code: "",
            product_photo: "",
            product_photo_base64: "",
            product_sub_photo: "",
            photo_sub_photo_base64: "",
            product_price: 0.0,
            product_description: "",
            product_information: "",
            product_sale: false,
            product_new: false,
            product_status: "active",
        });
        setFile(null);
        setFiles([]);
        setFileOptions([]);
        setImageUrl('');
    };

    const fetchCategory = async () => {
        try {
            const response = await axios.get(
                apiUrl + "category",
                {}
            );

            const filteredData = response.data
            .filter((categories) => categories?.trash === false && categories?.category_status === "active")
            .map((categories) => ({
            ...categories,
            }));

            setCategory(filteredData);
        } catch (error) {
            console.error("Error fetching categories:", error.message);
        }
    };

    useEffect(() => {
        fetchCategory();
    }, []);

    const categoryOptions = category.map((categories) => ({
        value: categories.category_id,
        label: categories.category_name,
    }))

    const saleOptions = [
        { value: true, label: "Yes" },
        { value: false, label: "No" },
    ];

    const statusOptions = [
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" },
    ];

    const DropdownIndicator = () => null;
    const Menu = () => null;

    const customStyles = {
        multiValue: (provided) => ({
          ...provided,
          maxHeight: '30px',
          overflowY: 'auto',
        }),
        valueContainer: (provided) => ({
          ...provided,
          maxHeight: '35px',
          overflowY: 'auto',
        }),
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar page="product-list" />

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                <Header />
                <div className="ml-64 flex-1 flex flex-col">
                    <Breadcrumb />

                    {/* Main Section */}
                    <main className="flex-1 px-6 pt-0 pb-10">
                        <div className="bg-white shadow-md rounded-lg">
                            <div className="p-6 border-b">
                                <h2 className="text-2xl font-semibold">Add Product</h2>
                            </div>

                            <div className="p-6">
                                <div className="grid grid-cols-4 gap-4">
                                    <div className="space-y-6 col-span-2 border p-6 rounded-lg">
                                        {/* Name */}
                                        <div className="flex flex-row">
                                            <label htmlFor="product_name" className="mb-2 mt-2 w-72">
                                                Product Name<span className="text-red-500"> *</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="product_name"
                                                name="product_name"
                                                className="border py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-black w-full"
                                                placeholder="Product Name"
                                                value={formData && formData.product_name}
                                                onChange={(e) =>
                                                    handleInputChange("product_name", e.target.value)
                                                }
                                            />
                                        </div>

                                        {/* Code */}
                                        <div className="flex flex-row">
                                            <label htmlFor="product_code" className="mb-2 mt-2 w-72">
                                                Product Code<span className="text-red-500"> *</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="product_code"
                                                name="product_code"
                                                className="border py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-black w-full"
                                                placeholder="Product Code"
                                                value={formData && formData.product_code}
                                                onChange={(e) =>
                                                    handleInputChange("product_code", e.target.value)
                                                }
                                            />
                                        </div>

                                        {/* Category */}
                                        <div className="flex flex-row">
                                            <label htmlFor="category_id" className="mb-2 mt-2 w-72">
                                                Category<span className="text-red-500"> *</span>
                                            </label>
                                            <select
                                                id="category_id"
                                                name="category_id"
                                                className="border py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-black w-full"
                                                value={formData && formData.category_id}
                                                onChange={(e) =>
                                                    handleInputChange("category_id", e.target.value)
                                                }
                                            >
                                                <option value="" disabled hidden>Select a category</option>
                                                {categoryOptions.map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Price */}
                                        <div className="flex flex-row">
                                            <label htmlFor="product_price" className="mb-2 mt-2 w-72">
                                                Product Price<span className="text-red-500"> *</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="product_price"
                                                name="product_price"
                                                className="border py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-black w-full"
                                                placeholder="Product Price"
                                                value={formData && formData.product_price}
                                                onChange={(e) =>
                                                    handleInputChange("product_price", e.target.value)
                                                }
                                            />
                                        </div>

                                        {/* Description */}
                                        <div className="flex flex-row">
                                            <label
                                                htmlFor="product_description"
                                                className="mb-2 mt-2 w-72"
                                            >
                                                Description<span className="text-red-500"> *</span>
                                            </label>
                                            <textarea
                                                type="text"
                                                id="product_description"
                                                name="product_description"
                                                className="resize-none border py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-black w-full"
                                                placeholder="Product Description"
                                                value={formData && formData.product_description}
                                                onChange={(e) =>
                                                    handleInputChange("product_description", e.target.value)
                                                }
                                                rows="4"
                                            />
                                        </div>

                                        {/* Information */}
                                        <div className="flex flex-row">
                                            <label
                                                htmlFor="product_information"
                                                className="mb-2 mt-2 w-72"
                                            >
                                                Information<span className="text-red-500"> *</span>
                                            </label>
                                            <textarea
                                                type="text"
                                                id="product_information"
                                                name="product_information"
                                                className="resize-none border py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-black w-full"
                                                placeholder="Product Information"
                                                value={formData && formData.product_information}
                                                onChange={(e) =>
                                                    handleInputChange("product_information", e.target.value)
                                                }
                                                rows="4"
                                            />
                                        </div>

                                        {/* Sale */}
                                        <div className="flex flex-row">
                                            <label htmlFor="product_sale" className="mb-2 mt-2 w-72">
                                                On Sale<span className="text-red-500"> *</span>
                                            </label>
                                            <select
                                                id="product_sale"
                                                name="product_sale"
                                                className="border py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-black w-full"
                                                value={formData && formData.product_sale}
                                                onChange={(e) =>
                                                    handleInputChange("product_sale", e.target.value)
                                                }
                                            >
                                                <option value="" disabled hidden>Select an option</option>
                                                {saleOptions.map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* New */}
                                        <div className="flex flex-row">
                                            <label htmlFor="product_new" className="mb-2 mt-2 w-72">
                                                Is New<span className="text-red-500"> *</span>
                                            </label>
                                            <select
                                                id="product_new"
                                                name="product_new"
                                                className="border py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-black w-full"
                                                value={formData && formData.product_new}
                                                onChange={(e) =>
                                                    handleInputChange("product_new", e.target.value)
                                                }
                                            >
                                                <option value="" disabled hidden>Select an option</option>
                                                {saleOptions.map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Status */}
                                        <div className="flex flex-row">
                                            <label htmlFor="product_status" className="mb-2 mt-2 w-72">
                                                Status<span className="text-red-500"> *</span>
                                            </label>
                                            <select
                                                id="product_status"
                                                name="product_status"
                                                className="border py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-black w-full"
                                                value={formData && formData.product_status}
                                                onChange={(e) =>
                                                    handleInputChange("product_status", e.target.value)
                                                }
                                            >
                                                <option value="" disabled hidden>Select a status</option>
                                                {statusOptions.map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-span-2 border p-6 rounded-lg">
                                        <div className="flex items-center pb-2 mb-4">
                                            <label htmlFor="product_photo" className="mb-2 mt-2 w-72">
                                                Product Photo
                                            </label>
                                            <input
                                                type="text"
                                                id="product_photo"
                                                name="product_photo"
                                                className={"border py-2 px-3 rounded-md w-full"}
                                                placeholder={file ? file.name : 'Choose a file or drop it here...'}
                                                value={file ? file.name : ''}
                                                disabled
                                            />
                                            <input
                                                id="file"
                                                type="file"
                                                accept=".png, .jpg, .jpeg"
                                                className="hidden"
                                                ref={fileInput}
                                                onChange={handleFileChange}
                                            />
                                            <button
                                                type="button"
                                                onClick={onFileSelection} 
                                                className="border flex items-center h-10 px-2 py-2 w-[100px] rounded-md"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-cloud-upload mr-2" viewBox="0 0 16 16">
                                                    <path fillRule="evenodd" d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z" />
                                                    <path fillRule="evenodd" d="M7.646 4.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V14.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3z" />
                                                </svg>
                                                <span>Browse</span>
                                            </button>
                                        </div>
                                        {file && imageUrl && (
                                            <div className="flex items-center mb-6">
                                                <div className="w-1/4"/>
                                                <img
                                                    src={imageUrl}
                                                    alt="Product"
                                                    style={{ maxWidth: "300px", maxHeight: "300px" }}
                                                />
                                            </div>
                                        )}
                                        <div className="flex items-center pb-2 mb-4">
                                            <label htmlFor="product_sub_photo" className="mb-2 mt-2 w-72">
                                                Product Sub Photo
                                            </label>
                                            <Select
                                                id="product_sub_photo"
                                                name="product_sub_photo"
                                                className={"w-full"}
                                                placeholder="Choose files or drop them here..."
                                                value={fileOptions}
                                                isMulti
                                                onChange={handleFilesRemove}
                                                options={fileOptions}
                                                components={{ DropdownIndicator, Menu }}
                                                styles={customStyles}
                                            />
                                            <input
                                                id="file"
                                                type="file"
                                                accept=".png, .jpg, .jpeg"
                                                className="hidden"
                                                ref={filesInput}
                                                onChange={handleFilesChange}
                                            />
                                            <button
                                                type="button"
                                                onClick={onFilesSelection} 
                                                className="border flex items-center h-10 px-2 py-2 w-[100px] rounded-md"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-cloud-upload mr-2" viewBox="0 0 16 16">
                                                    <path fillRule="evenodd" d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z" />
                                                    <path fillRule="evenodd" d="M7.646 4.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V14.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3z" />
                                                </svg>
                                                <span>Browse</span>
                                            </button>
                                        </div>
                                        {files.length > 0 && (
                                            <div className="flex items-center mb-6">
                                                <div className="w-1/4"/>
                                                <div className="overflow-y-auto max-h-[360px]">
                                                    <div className="flex flex-col space-y-4">
                                                        {files.map((file, index) => (
                                                            <div key={index} className="flex-shrink-0">
                                                                <img
                                                                    src={`data:image/jpeg;base64,${file.base64}`}
                                                                    alt={file.name}
                                                                    style={{ maxWidth: "300px", maxHeight: "300px" }}
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {/* Buttons */}
                                <div className="flex justify-end space-x-4 mt-6">
                                    <button
                                        type="button"
                                        className="bg-white text-gray-700 px-5 py-3 rounded-md hover:bg-gray-300 border border-black tracking-widest text-sm flex"
                                        onClick={handleClear}
                                    >
                                        Clear
                                    </button>
                                    <button
                                        type="button"
                                        className="bg-black text-white px-5 py-3 rounded-md hover:bg-zinc-700 tracking-widest text-sm flex"
                                        disabled={buttonDisabled}
                                        onClick={handleSubmit}
                                    >
                                        Add
                                    </button>
                                </div>
                            </div>
                        </div>
                    </main>

                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default CMSProductAdd;

import React, { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import { apiUrl } from '../../../../constant/constants';
import axios from "axios";

const Categories = ({ setIsCategoriesOpen, isCategoriesOpen, onCategorySelect }) => {
    const [data, setData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const fetchData = async () => {
        try {
            const response = await axios.get(
                apiUrl + "category",
                {
        
                }
            );
        
            if (response.status === 200){
                const filteredData = response.data.filter((item) => item.category_type === "Categories" && item.category_status === "active" && item.trash === false);
                const transformedData = filteredData.map((item) => ({
                    category_id: item.category_id,
                    category_name: item.category_name,
                }));
        
                setData(transformedData);
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

    useEffect(() => {
        fetchData();
    }, []);

    const handleCategoryClick = (categoryId) => {
        const newSelectedCategory = selectedCategory === categoryId ? null : categoryId;
        setSelectedCategory(newSelectedCategory);
        onCategorySelect(newSelectedCategory);
    };

    return (
        <div className="p-2 border-b mb-2">
            <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
            >
                <h2 className="font-semibold uppercase mb-4">Categories</h2>
                <div className="mb-4">
                    {isCategoriesOpen ? 
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                        </svg>                  
                        : 
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                        </svg>                
                    }
                </div>
            </div>
            <div
                className={`overflow-hidden transition-max-height duration-1000 ease-in-out ${
                    isCategoriesOpen ? "max-h-screen" : "max-h-0"
                }`}
            >
                <ul className="space-y-2 mb-3">
                    {data.map((category) => (
                        <li key={category.category_id}>
                            <button
                                className={`text-gray-400 hover:text-gray-800 transition duration-300 ${
                                selectedCategory === category.category_id ? 'text-gray-800' : ''
                                }`}
                                onClick={() => handleCategoryClick(category.category_id)}
                            >
                                {category.category_name}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Categories;
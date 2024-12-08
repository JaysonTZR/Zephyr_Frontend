import React, { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import { apiUrl } from '../../../../constant/constants';
import axios from "axios";

const Colors = ({ setIsColorsOpen, isColorsOpen, onColorsSelect }) => {
    const [data, setData] = useState([]);
    const [selectedColors, setSelectedColors] = useState(null);

    const fetchData = async () => {
        try {
            const response = await axios.get(
                apiUrl + "category",
                {
        
                }
            );
        
            if (response.status === 200){
                const filteredData = response.data.filter((item) => item.category_type === "Colors" && item.category_status === "active" && item.trash === false);
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

    const getColorClass = (categoryName) => {
        switch (categoryName.toLowerCase()) {
            case 'black':
                return 'bg-black';
            case 'blue':
                return 'bg-blue-950';
            case 'yellow':
                return 'bg-amber-500';
            case 'gray':
                return 'bg-gray-500';
            case 'pink':
                return 'bg-fuchsia-300';
            case 'red':
                return 'bg-red-500';
            case 'white':
                return 'bg-white';
            default:
                return '';
        }
    };

    const handleColorsClick = (categoryId) => {
        const newSelectedColors = selectedColors === categoryId ? null : categoryId;
        setSelectedColors(newSelectedColors);
        onColorsSelect(newSelectedColors);
    };

    return (
        <div className="p-2 border-b mb-2">
            <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setIsColorsOpen(!isColorsOpen)}
            >
                <h2 className="font-semibold uppercase mb-4">Colors</h2>
                <div className="mb-4">
                    {isColorsOpen ? 
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
                    isColorsOpen ? "max-h-screen" : "max-h-0"
                }`}
            >
                <div className="mb-3 flex flex-wrap gap-y-2">
                    {data.map((color) => (
                        <div key={color.category_id} className={`rounded-full w-9 h-9 mr-2 flex items-center justify-center ${
                        selectedColors === color.category_id ? 'border border-slate-800' : 'border'
                        }`}>
                            <button 
                                className={`w-8 h-8 rounded-full ${getColorClass(color.category_name)}`} 
                                onClick={() => handleColorsClick(color.category_id)}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Colors;
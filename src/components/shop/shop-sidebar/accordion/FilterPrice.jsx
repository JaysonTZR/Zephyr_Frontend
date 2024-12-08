import React, { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import { apiUrl } from '../../../../constant/constants';
import axios from "axios";

const FilterPrice = ({ setIsFilterPriceOpen, isFilterPriceOpen, onPriceSelect }) => {
    const [selectedPriceRange, setSelectedPriceRange] = useState(null);

    const priceRanges = [
        { label: '$0.00 - $50.00', min: 0, max: 50 },
        { label: '$50.00 - $100.00', min: 50, max: 100 },
        { label: '$100.00 - $150.00', min: 100, max: 150 },
        { label: '$150.00 - $200.00', min: 150, max: 200 },
        { label: '$200.00 - $250.00', min: 200, max: 250 },
        { label: '$250.00+', min: 250, max: Infinity },
    ];
    
    const handlePriceClick = (min, max) => {
        const newSelectedPriceRange = selectedPriceRange && selectedPriceRange.min === min && selectedPriceRange.max === max
          ? null
          : { min, max };
        setSelectedPriceRange(newSelectedPriceRange);
        onPriceSelect(newSelectedPriceRange ? newSelectedPriceRange.min : 0, newSelectedPriceRange ? newSelectedPriceRange.max : Infinity);
    };

    return (
        <div className="p-2 border-b mb-2">
            <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setIsFilterPriceOpen(!isFilterPriceOpen)}
            >
                <h2 className="font-semibold uppercase mb-4">Filter Price</h2>
                <div className="mb-4">
                    {isFilterPriceOpen ? 
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
                    isFilterPriceOpen ? "max-h-screen" : "max-h-0"
                }`}
            >
                <ul className="space-y-2 mb-3">
                    {priceRanges.map((range, index) => (
                        <li key={index}>
                        <button
                            className={`text-gray-400 hover:text-gray-800 transition duration-300 ${
                            selectedPriceRange && selectedPriceRange.min === range.min && selectedPriceRange.max === range.max ? 'text-gray-800' : ''
                            }`}
                            onClick={() => handlePriceClick(range.min, range.max)}
                        >
                            {range.label}
                        </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default FilterPrice;
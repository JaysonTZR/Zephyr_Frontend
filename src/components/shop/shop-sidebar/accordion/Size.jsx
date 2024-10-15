import React from 'react';

const Size = ({ setIsSizeOpen, isSizeOpen }) => {
    return (
        <div className="p-2 border-b mb-2">
            <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setIsSizeOpen(!isSizeOpen)}
            >
                <h2 className="font-semibold uppercase mb-4">Size</h2>
                <div className="mb-4">
                    {isSizeOpen ? 
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
                    isSizeOpen ? "max-h-screen" : "max-h-0"
                }`}
            >
                <div className="space-y-2 mb-3">
                    <button className="font-semibold text-gray-800 border border-gray-200 px-6 py-1 mr-3">
                        XS
                    </button>
                    <button className="font-semibold text-gray-800 border border-gray-200 px-6 py-1 mr-3">
                        S
                    </button>
                    <button className="font-semibold text-gray-800 border border-gray-200 px-6 py-1 mr-3">
                        M
                    </button>
                    <button className="font-semibold text-gray-800 border border-gray-200 px-6 py-1 mr-3">
                        XL
                    </button>
                    <button className="font-semibold text-gray-800 border border-gray-200 px-6 py-1 mr-3">
                        2XL
                    </button>
                    <button className="font-semibold text-gray-800 border border-gray-200 px-6 py-1 mr-3">
                        XXL
                    </button>
                    <button className="font-semibold text-gray-800 border border-gray-200 px-6 py-1 mr-3">
                        3XL
                    </button>
                    <button className="font-semibold text-gray-800 border border-gray-200 px-6 py-1 mr-3">
                        4XL
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Size;
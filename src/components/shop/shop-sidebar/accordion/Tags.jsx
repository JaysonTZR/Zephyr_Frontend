import React from 'react';

const Tags = ({ setIsTagsOpen, isTagsOpen }) => {
    return (
        <div className="p-2 border-b mb-2">
            <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setIsTagsOpen(!isTagsOpen)}
            >
                <h2 className="font-semibold uppercase mb-4">Tags</h2>
                <div className="mb-4">
                    {isTagsOpen ? 
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
                    isTagsOpen ? "max-h-screen" : "max-h-0"
                }`}
            >
                <div className="space-y-2 mb-3">
                    <button className="text-sm font-semibold text-gray-800 bg-slate-100 px-4 py-1 mr-3 uppercase">
                        Product
                    </button>
                    <button className="text-sm font-semibold text-gray-800 bg-slate-100 px-4 py-1 mr-3 uppercase">
                        Bags
                    </button>
                    <button className="text-sm font-semibold text-gray-800 bg-slate-100 px-4 py-1 mr-3 uppercase">
                        Shoes
                    </button>
                    <button className="text-sm font-semibold text-gray-800 bg-slate-100 px-4 py-1 mr-3 uppercase">
                        Fashion
                    </button>
                    <button className="text-sm font-semibold text-gray-800 bg-slate-100 px-4 py-1 mr-3 uppercase">
                        Clothing
                    </button>
                    <button className="text-sm font-semibold text-gray-800 bg-slate-100 px-4 py-1 mr-3 uppercase">
                        Hats
                    </button>
                    <button className="text-sm font-semibold text-gray-800 bg-slate-100 px-4 py-1 mr-3 uppercase">
                        Accessories
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Tags;
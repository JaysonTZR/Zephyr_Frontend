import React from 'react';

const Branding = ({ setIsBrandingOpen, isBrandingOpen }) => {
    return (
        <div className="p-2 border-b mb-2">
            <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setIsBrandingOpen(!isBrandingOpen)}
            >
                <h2 className="font-semibold uppercase mb-4">Branding</h2>
                <div className="mb-4">
                    {isBrandingOpen ? 
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
                    isBrandingOpen ? "max-h-screen" : "max-h-0"
                }`}
            >
                <ul className="space-y-2 mb-3">
                    <li>
                        <button className="text-gray-400 hover:text-gray-800 transition duration-300">
                            Louis Vuitton
                        </button>
                    </li>
                    <li>
                        <button className="text-gray-400 hover:text-gray-800 transition duration-300">
                            Chanel
                        </button>
                    </li>
                    <li>
                        <button className="text-gray-400 hover:text-gray-800 transition duration-300">
                            Hermes
                        </button>
                    </li>
                    <li>
                        <button className="text-gray-400 hover:text-gray-800 transition duration-300">
                            Gucci
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Branding;
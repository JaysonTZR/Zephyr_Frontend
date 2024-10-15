import React from 'react';

const Colors = ({ setIsColorsOpen, isColorsOpen }) => {
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
                    <div className="border rounded-full w-9 h-9 mr-2 flex items-center justify-center">
                        <button className="bg-black w-8 h-8 border rounded-full" />
                    </div>
                    <div className="border rounded-full w-9 h-9 mr-2 flex items-center justify-center">
                        <button className="bg-blue-950 w-8 h-8 border rounded-full" />
                    </div>
                    <div className="border rounded-full w-9 h-9 mr-2 flex items-center justify-center">
                        <button className="bg-amber-500 w-8 h-8 border rounded-full" />
                    </div>
                    <div className="border rounded-full w-9 h-9 mr-2 flex items-center justify-center">
                        <button className="bg-gray-500 w-8 h-8 border rounded-full" />
                    </div>
                    <div className="border rounded-full w-9 h-9 mr-2 flex items-center justify-center">
                        <button className="bg-rose-200 w-8 h-8 border rounded-full" />
                    </div>
                    <div className="border rounded-full w-9 h-9 mr-2 flex items-center justify-center">
                        <button className="bg-fuchsia-300 w-8 h-8 border rounded-full" />
                    </div>
                    <div className="border rounded-full w-9 h-9 mr-2 flex items-center justify-center">
                        <button className="bg-red-500 w-8 h-8 border rounded-full" />
                    </div>
                    <div className="border rounded-full w-9 h-9 mr-2 flex items-center justify-center">
                        <button className="bg-white w-8 h-8 border rounded-full" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Colors;
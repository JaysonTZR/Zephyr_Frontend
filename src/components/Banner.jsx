import React from "react";

const Banner = ({ bannerText }) => {
    return (
        <div className="flex justify-center mb-16" style={{ backgroundColor: '#f3f2ee' }}>
            <div className="flex items-center h-40">
                <span className="text-3xl font-bold">{bannerText}</span>
            </div>
      </div>
    );
};

export default Banner;
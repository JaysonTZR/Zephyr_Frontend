import React from "react";
import BannerImage from "../assets/images/banner-background.jpg";

const Banner = ({ bannerText }) => {
    return (
        <div className="flex justify-center mb-16">
            <img
                src={BannerImage}
                alt="Banner background"
                className="absolute object-cover h-60 w-full"
            />
            <div className="flex items-center h-60 z-10">
                <span className="text-4xl font-bold text-white tracking-wide">{bannerText}</span>
            </div>
      </div>
    );
};

export default Banner;
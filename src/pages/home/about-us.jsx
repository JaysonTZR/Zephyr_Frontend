import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Banner from "../../components/Banner";
import AboutUsImage from "../../assets/images/tzuyu-model-2.jpg"
import CampingImage from "../../assets/images/camping.jpg"
import ClientImage from "../../assets/images/client.png"

const AboutUs = () => {
  return (
    <div className="font-sans">
        <Header />

        <Banner bannerText="About Us" />
        <div className="flex justify-center">
            <div className="py-10">
                <div className="flex justify-center">
                    <img src={AboutUsImage} alt="AboutUs" className="object-cover w-auto h-full"/>
                </div>
                <div class="container px-56 py-2 mb-6">
                    <div class="grid grid-cols-3 gap-8">
                        <div class="py-6">
                            <h2 class="text-2xl font-semibold mb-4">Who We Are ?</h2>
                            <p>
                                Contextual advertising programs sometimes have strict policies that need to be adhered to. Let's take Google as an example.
                            </p>
                        </div>
                        <div class="py-6">
                            <h2 class="text-2xl font-semibold mb-4">Who We Do ?</h2>
                            <p>
                                In this digital generation where information can be easily obtained within seconds, business cards still have retained their importance.
                            </p>
                        </div>
                        <div class="py-6">
                            <h2 class="text-2xl font-semibold mb-4">Why Choose Us ?</h2>
                            <p>
                                A two or three storey house is the ideal way to maximise the piece of earth on which our home sits, but for older or infirm people.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-2">
            <div className="flex flex-col py-36" style={{ backgroundColor: '#f1f1f0'}}>
                <div className="text-9xl font-serif flex justify-center text-red-500">
                    "
                </div>
                <div className="mt-[-50px]">
                    <div className="text-xl italic px-36 text-center">"Going out after work? Take your butane curling iron with you to the office, heat it up, style your hair before you leave the office and you won't have to make a trip back home."</div>   
                    <div className="flex items-center justify-center">
                        <img src={AboutUsImage} alt="Augusta Schultz" className="w-14 h-14 rounded-full mr-5"/>
                        <div className="flex flex-col">
                            <div className="text-lg font-semibold">Augusta Schultz</div>
                            <div className="text-xl italic font-normal text-gray-400">Fashion Design</div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <img src={CampingImage} alt="Camping" className="w-full h-full object-cover"/>
            </div>
        </div>

        <div className="flex flex-row justify-center items-center py-24">
            <div className="flex flex-row px-14">
                <span className="text-6xl font-semibold mr-4">
                    102
                </span>
                <span className="flex flex-col text-lg font-semibold mt-1">
                    <span>Our</span>
                    <span>Clients</span>
                </span>
            </div>
            <div className="flex flex-row px-14">
                <span className="text-6xl font-semibold mr-4">
                    30
                </span>
                <span className="flex flex-col text-lg font-semibold mt-1">
                    <span>Total</span>
                    <span>Categories</span>
                </span>
            </div>
            <div className="flex flex-row px-14">
                <span className="text-6xl font-semibold mr-4">
                    102
                </span>
                <span className="flex flex-col text-lg font-semibold mt-1">
                    <span>In</span>
                    <span>Country</span>
                </span>
            </div>
            <div className="flex flex-row px-14">
                <span className="text-6xl font-semibold mr-4">
                    98%
                </span>
                <span className="flex flex-col text-lg font-semibold mt-1">
                    <span>Happy</span>
                    <span>Customer</span>
                </span>
            </div>
        </div>

        <div className="flex justify-center">
            <div className="border-b w-7/12"/>
        </div>

        <div className="flex flex-col items-center py-24">
            <div className="uppercase font-semibold text-red-500 tracking-widest">
                Our Team
            </div>
            <div className="text-4xl font-semibold py-3">
                Meet Our Team
            </div>
            <div className="flex flex-row pt-10">
                <div className="px-4">
                    <div className="bg-gray-100 w-64 h-80 mb-5"></div>
                    <div className="flex flex-col">
                        <span className="font-semibold text-2xl mb-2">
                            Leo
                        </span>
                        <span className="text-gray-400">
                            C.E.O
                        </span>
                    </div>
                </div>
                <div className="px-4">
                    <div className="bg-gray-100 w-64 h-80 mb-5"></div>
                    <div className="flex flex-col">
                        <span className="font-semibold text-2xl mb-2">
                            Jayson
                        </span>
                        <span className="text-gray-400">
                            C.E.O
                        </span>
                    </div>
                </div>
                <div className="px-4">
                    <div className="bg-gray-100 w-64 h-80 mb-5"></div>
                    <div className="flex flex-col">
                        <span className="font-semibold text-2xl mb-2">
                            Jellyern
                        </span>
                        <span className="text-gray-400">
                            C.E.O
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <div className="flex flex-col items-center py-8 mb-20">
            <div className="uppercase font-semibold text-red-500 tracking-widest">
                Partner
            </div>
            <div className="text-4xl font-semibold py-3">
                Happy Clients
            </div>
            <div className="flex flex-col pt-10">
                <div className="flex flex-row">
                    <div className="px-28">
                        <img src={ClientImage} alt="Client" className="w-full h-full object-cover"/>
                    </div>
                    <div className="px-28">
                        <img src={ClientImage} alt="Client" className="w-full h-full object-cover"/>
                    </div>
                    <div className="px-28">
                        <img src={ClientImage} alt="Client" className="w-full h-full object-cover"/>
                    </div>
                    <div className="px-28">
                        <img src={ClientImage} alt="Client" className="w-full h-full object-cover"/>
                    </div>
                </div>
                <div className="flex flex-row mt-20">
                    <div className="px-28">
                        <img src={ClientImage} alt="Client" className="w-full h-full object-cover"/>
                    </div>
                    <div className="px-28">
                        <img src={ClientImage} alt="Client" className="w-full h-full object-cover"/>
                    </div>
                    <div className="px-28">
                        <img src={ClientImage} alt="Client" className="w-full h-full object-cover"/>
                    </div>
                    <div className="px-28">
                        <img src={ClientImage} alt="Client" className="w-full h-full object-cover"/>
                    </div>
                </div>
            </div>
        </div>

        <Footer />
    </div>
  );
};

export default AboutUs;
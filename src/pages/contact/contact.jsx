import React from 'react'
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const Contact = () => {
    return (
        <div>
            <Header />
            <div className='w-full h-[510px]'>
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.14660757484!2d101.69798647584416!3d3.0554110537199097!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc4abb795025d9%3A0x1c37182a714ba968!2sAsia%20Pacific%20University%20of%20Technology%20%26%20Innovation%20(APU)!5e0!3m2!1sen!2smy!4v1729179134046!5m2!1sen!2smy"
                    width="100%" 
                    height="500" 
                    style={{border :0}} 
                    allowfullscreen="" 
                    loading="lazy" 
                    referrerpolicy="no-referrer-when-downgrade">
                </iframe>
            </div>
            <div className="container mx-auto my-12 px-48 md:flex justify-between items-start pt-10 mb-20">
                <div className='md:w-1/2'>
                    <h5 className='text-sm font-semibold text-red-600 tracking-wider uppercase mb-3'> Information</h5>
                    <h1 className='text-5xl font-semibold mb-5'> Contact Us</h1>
                    <p className='text-gray-500 pr-5 text-sm mb-10'>As you might expect of a company that began as a high-end interiors contractor, we pay strict attention.</p>
                    <div className='space-y-4'>
                        <div>
                            <h2 className='text-2xl font-semibold mb-2'>America</h2>
                            <p className='mb-1'>195 E Parker Square Dr, Parker, CO 801</p>
                            <p>+43 982-314-0958</p>
                        </div>
                        <div>
                            <h2 className='text-2xl font-semibold mb-2'>France</h2>
                            <p className='mb-1'>109 Avenue Léon, 63 Clermont-Ferrand</p>
                            <p>+12 345-423-9893</p>
                        </div>
                    </div>
                </div>
                {/* right side */}
                <div className='md:w-1/2 mt-8 md:mt-0'>
                <form className='space-y-6'>
                    <div className='flex space-x-6 mb-1'>
                        <input type="text" placeholder='Name' className='w-1/2 px-4 py-3 border border-gray-300'></input>
                        <input type="email" placeholder='Email' className='w-1/2 px-4 py-3 border border-gray-300'></input>
                    </div>
                    <textarea placeholder='Message' className='w-full px-4 py-3 border border-gray-300 resize-none' rows="6"/>
                <button className="bg-black text-white px-10 py-4 hover:bg-zinc-700 uppercase tracking-widest font-semibold text-sm flex">
                  Send Message
                </button>

                </form>

                </div>

            </div>
            <Footer />
        </div>
    )
}

export default Contact;
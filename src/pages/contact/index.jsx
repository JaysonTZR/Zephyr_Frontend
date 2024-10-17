import React from 'react'
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function index() {
  return (
    <>
    <Header />
    <div className='w-full h-[400px]'>
    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.14660757484!2d101.69798647584416!3d3.0554110537199097!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc4abb795025d9%3A0x1c37182a714ba968!2sAsia%20Pacific%20University%20of%20Technology%20%26%20Innovation%20(APU)!5e0!3m2!1sen!2smy!4v1729179134046!5m2!1sen!2smy" width="100%" height="450" style={{border :0}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
    <div className="container mx-auto my-12 px-4 md:flex justify-between items-start pt-10">
        {/* left side */}
        <div className='md:w-1/2 space-y-6'>
        <h5 className='text-sm text-red-500 tracking-wider uppercase'> Information</h5>
        <h1 className='text-4xl font-bold'> Contact US</h1>
        <p className='text-gray-500 max-w-md'>As you might expect of a company that began as a high-end interiors contractor, we pay strict attention.</p>
        <div className='space-y-4'>
            <div>
                <h2 className='text-xl font-bold'>America</h2>
                <p>195 E Parker Square Dr, Parker, CO 801</p>
                <p>+43 982-314-0958</p>
            </div>
            <div>
                <h2 className='text-xl font-bold'>France</h2>
                <p>109 Avenue Léon, 63 Clermont-Ferrand</p>
                <p>+12 345-423-9893</p>
            </div>
        </div>
        </div>
        {/* right side */}
        <div className='md:w-1/2 mt-8 md:mt-0'>
        <form className='space-y-6'>
            <div className='flex space-x-4'>
                <input type="text" placeholder='Name' className='w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-300'></input>
                <input type="email" placeholder='Email' className='w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-300'></input>

            </div>
            <textarea placeholder='Message' className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-300' rows="6"/>
        <button type='submit' className='px-6 py-2 text-white bg-black rounded-md hover:bg-gray-800 transition-colors'>
            Send Message
        </button>
          
        </form>

        </div>
        
    </div>
    <Footer />
    </>
  )
}

export default index
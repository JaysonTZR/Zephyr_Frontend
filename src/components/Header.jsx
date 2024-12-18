import React, { startTransition } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo/logo.png';

function Header() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      startTransition(() => {
        navigate("/profile");
      });
    } else {
      startTransition(() => {
        navigate("/login");
      });
    }
  };

  const handleWishlistClick = () => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      startTransition(() => {
        navigate("/wishlist");
      });
    } else {
      startTransition(() => {
        navigate("/login");
      });
    }
  };

  const handleCartClick = () => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      startTransition(() => {
        navigate("/cart");
      });
    } else {
      startTransition(() => {
        navigate("/login");
      });
    }
  };

  return (
    <header className='bg-white'>
      <div className='flex justify-center shadow-md'>
        <nav className="flex justify-between items-center p-4 w-8/12">
          {/* <div className="text-2xl font-bold">
            <a href="/">ZEPHYR.</a>
          </div> */}
          <a href="/" className="h-6 flex justify-center items-center">
            <img src={Logo} alt="Logo" className="object-cover w-auto h-full"/>
          </a>
          <ul className="flex space-x-6">
            <li className="cursor-pointer">
              <a 
                href="/" 
                className="font-semibold text-gray-600 hover:text-orange-600 hover:scale-105 transition-all duration-300"
              >
                HOME
              </a>
            </li>
            <li className="cursor-pointer">
              <a 
                href="/about-us" 
                className="font-semibold text-gray-600 hover:text-orange-600 hover:scale-105 transition-all duration-300"
              >
                ABOUT US
              </a>
            </li>
            <li className="cursor-pointer">
              <a 
                href="/shop" 
                className="font-semibold text-gray-600 hover:text-orange-600 hover:scale-105 transition-all duration-300"
              >
                SHOP
              </a>
            </li>
            <li className="cursor-pointer">
              <a 
                href="/contact" 
                className="font-semibold text-gray-600 hover:text-orange-600 hover:scale-105 transition-all duration-300"
              >
                CONTACTS
              </a>
            </li>
          </ul>
          <div className="flex space-x-4 text-xl cursor-pointer">
            <div onClick={handleWishlistClick} className="hover:text-red-500 transition duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
              </svg>
            </div>
            <div onClick={handleCartClick} className="hover:text-gray-800 transition duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
              </svg>
            </div>
            <div onClick={handleLoginClick} className="hover:text-gray-800 transition duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;

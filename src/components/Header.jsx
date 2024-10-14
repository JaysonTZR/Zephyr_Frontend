import React from 'react';

function Header() {
  return (
    <header>
      <div className='flex justify-center shadow-md'>
        <nav className="flex justify-between items-center p-4 w-8/12">
          <div className="text-2xl font-bold">Zephyr</div>
          <ul className="flex space-x-6">
            <li className="cursor-pointer">HOME</li>
            <li className="cursor-pointer">SHOP</li>
            <li className="cursor-pointer">BLOG</li>
            <li className="cursor-pointer">PAGES</li>
            <li className="cursor-pointer">CONTACT</li>
            <li className="cursor-pointer">WISHLIST (0)</li>
            <li className="cursor-pointer">CART (0)</li>
          </ul>
          <div className="text-xl cursor-pointer">🔍</div>
        </nav>
      </div>
    </header>
  );
}

export default Header;

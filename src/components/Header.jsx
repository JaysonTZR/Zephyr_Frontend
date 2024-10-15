import React from 'react';

function Header() {
  return (
    <header>
      <div className='flex justify-center shadow-md'>
        <nav className="flex justify-between items-center p-4 w-8/12">
          <div className="text-2xl font-bold">Zephyr</div>
          <ul className="flex space-x-6">
            <li className="cursor-pointer"><a href="/" >HOME</a></li>
            <li className="cursor-pointer"><a href="/shop" >SHOP</a></li>
            <li className="cursor-pointer"><a href="/" >BLOG</a></li>
            <li className="cursor-pointer"><a href="/" >PAGES</a></li>
            <li className="cursor-pointer"><a href="/" >CONTACT</a></li>
            <li className="cursor-pointer"><a href="/" >WISHLIST(0)</a></li>
            <li className="cursor-pointer"><a href="/cart" >CART(0)</a></li>
          </ul>
          <div className="text-xl cursor-pointer">🔍</div>
        </nav>
      </div>
    </header>
  );
}

export default Header;

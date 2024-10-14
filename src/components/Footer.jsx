import React from 'react';

function Footer() {
  return (
    <section className="my-0 py-0 bg-gray-100 m-0 p-0">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h2 className="text-3xl font-semibold mb-4">Sign Up for Our Newsletter</h2>
        <div className="flex justify-center">
          <input type="email" placeholder="Your Email Address" className="w-1/2 p-3 border border-gray-300" />
          <button className="bg-black text-white py-3 px-8 ml-2">SIGN UP</button>
        </div>
      </div>
      <div className="flex justify-center space-x-4 mb-16">
        <div className="w-60 h-64 bg-gray-300 flex items-center justify-center text-xl text-gray-800">Image 12</div>
        <div className="w-60 h-64 bg-gray-300 flex items-center justify-center text-xl text-gray-800">Image 13</div>
        <div className="w-60 h-64 bg-gray-300 flex items-center justify-center text-xl text-gray-800">Image 14</div>
        <div className="w-60 h-64 bg-gray-300 flex items-center justify-center text-xl text-gray-800">Image 15</div>
        <div className="w-60 h-64 bg-gray-300 flex items-center justify-center text-xl text-gray-800">Image 16</div>
      </div>
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">KAIRA</h3>
            <p className="text-gray-600 mb-4">
              Gravida massa volutpat aenean odio. Amet, turpis erat nullam fringilla elementum diam in. Nisi, purus vitae, ultrices nunc. Sit ac sit suscipit hendrerit.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500">🐦</a>
              <a href="#" className="text-gray-500">📘</a>
              <a href="#" className="text-gray-500">📸</a>
              <a href="#" className="text-gray-500">📌</a>
              <a href="#" className="text-gray-500">🔗</a>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:underline">Home</a></li>
              <li><a href="#" className="text-gray-600 hover:underline">About</a></li>
              <li><a href="#" className="text-gray-600 hover:underline">Services</a></li>
              <li><a href="#" className="text-gray-600 hover:underline">Single Item</a></li>
              <li><a href="#" className="text-gray-600 hover:underline">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Help & Info</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:underline">Track Your Order</a></li>
              <li><a href="#" className="text-gray-600 hover:underline">Returns + Exchanges</a></li>
              <li><a href="#" className="text-gray-600 hover:underline">Shipping + Delivery</a></li>
              <li><a href="#" className="text-gray-600 hover:underline">Contact Us</a></li>
              <li><a href="#" className="text-gray-600 hover:underline">Find Us Easy</a></li>
              <li><a href="#" className="text-gray-600 hover:underline">FAQs</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <p className="text-gray-600 mb-4">
              Do you have any questions or suggestions? <a href="#" className="text-blue-600 underline">contact@yourcompany.com</a>
            </p>
            <p className="text-gray-600">
              Do you need support? Give us a call. <br />
              <strong>+43 720 11 52 78</strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;

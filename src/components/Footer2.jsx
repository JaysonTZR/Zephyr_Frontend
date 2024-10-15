import React from 'react';

function Footer2() {
  return (
    <section className="my-0 py-0 m-0 p-0 mt-20">
      <div className="bg-black py-16 shadow-md">
        <div className="max-w-6xl mx-auto grid grid-cols-4 gap-8">
          <div className="text-left">
            <h3 className="text-xl font-semibold mb-4 text-white">KAIRA</h3>
            <p className="text-gray-400 mb-4">
              Gravida massa volutpat aenean odio. Amet, turpis erat nullam fringilla elementum diam in. Nisi, purus vitae, ultrices nunc. Sit ac sit suscipit hendrerit.
            </p>
            <div className="flex justify-start space-x-4 mt-4">
              <a href="#" className="text-gray-400">🐦</a>
              <a href="#" className="text-gray-400">📘</a>
              <a href="#" className="text-gray-400">📸</a>
              <a href="#" className="text-gray-400">📌</a>
              <a href="#" className="text-gray-400">🔗</a>
            </div>
          </div>
          <div className="text-left">
            <h3 className="text-xl font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:underline">Home</a></li>
              <li><a href="#" className="text-gray-400 hover:underline">About</a></li>
              <li><a href="#" className="text-gray-400 hover:underline">Services</a></li>
              <li><a href="#" className="text-gray-400 hover:underline">Single Item</a></li>
              <li><a href="#" className="text-gray-400 hover:underline">Contact</a></li>
            </ul>
          </div>
          <div className="text-left">
            <h3 className="text-xl font-semibold mb-4 text-white">Help & Info</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:underline">Track Your Order</a></li>
              <li><a href="#" className="text-gray-400 hover:underline">Returns + Exchanges</a></li>
              <li><a href="#" className="text-gray-400 hover:underline">Shipping + Delivery</a></li>
              <li><a href="#" className="text-gray-400 hover:underline">Contact Us</a></li>
              <li><a href="#" className="text-gray-400 hover:underline">Find Us Easy</a></li>
              <li><a href="#" className="text-gray-400 hover:underline">FAQs</a></li>
            </ul>
          </div>
          <div className="text-left">
            <h3 className="text-xl font-semibold mb-4 text-white">Contact Us</h3>
            <p className="text-gray-400 mb-4">
              Do you have any questions or suggestions? <a href="#" className="text-blue-400 underline">contact@yourcompany.com</a>
            </p>
            <p className="text-gray-400">
              Do you need support? Give us a call. <br />
              <strong className="text-white">+43 720 11 52 78</strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer2;

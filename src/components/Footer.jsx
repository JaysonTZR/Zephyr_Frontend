import React from 'react';

function Footer() {
  return (
    <section className="my-0 py-0  m-0 p-0 ">
      <div className="bg-white py-16 shadow-md">
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

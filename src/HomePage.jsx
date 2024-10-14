import React from 'react';
import './App.css';

function HomePage() {
  return (
    <div className="font-sans text-center">
      <header>
        <nav className="flex justify-between items-center p-4 bg-white shadow-md">
          <div className="text-2xl font-bold">KAIRA</div>
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
      </header>

      <main>
        <section className="my-8">
          <h1 className="text-4xl font-semibold">New Collections</h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe voluptas ut
            dolorum consequuntur, adipisci repellat! Eveniet commodi voluptatem
            voluptate, eum minima, in suscipit explicabo voluptatibus harum, quibumdam
            ex repellat eaque!
          </p>
        </section>

        <section className="flex items-center justify-center my-8">
          <button className="text-4xl p-2 cursor-pointer">&#8592;</button>
          <div className="flex space-x-8">
            <div className="w-72">
              <div className="w-full h-48 bg-gray-300 flex items-center justify-center text-xl text-gray-800">
                Image 1
              </div>
              <h2 className="mt-4 text-lg font-semibold">SOFT LEATHER JACKETS</h2>
            </div>
            <div className="w-72">
              <div className="w-full h-48 bg-gray-300 flex items-center justify-center text-xl text-gray-800">
                Image 2
              </div>
              <h2 className="mt-4 text-lg font-semibold">SOFT LEATHER JACKETS</h2>
            </div>
            <div className="w-72">
              <div className="w-full h-48 bg-gray-300 flex items-center justify-center text-xl text-gray-800">
                Image 3
              </div>
              <h2 className="mt-4 text-lg font-semibold">SOFT LEATHER JACKETS</h2>
            </div>
          </div>
          <button className="text-4xl p-2 cursor-pointer">&#8594;</button>
        </section>

        <section className="my-16">
          <div className="grid grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gray-300 flex items-center justify-center rounded-full mb-4">
                Icon 1
              </div>
              <h3 className="text-xl font-semibold">Book An Appointment</h3>
              <p className="mt-2 text-gray-600">At imperdiet dui accumsan sit amet nulla risus est ultricies quis.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gray-300 flex items-center justify-center rounded-full mb-4">
                Icon 2
              </div>
              <h3 className="text-xl font-semibold">Pick Up In Store</h3>
              <p className="mt-2 text-gray-600">At imperdiet dui accumsan sit amet nulla risus est ultricies quis.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gray-300 flex items-center justify-center rounded-full mb-4">
                Icon 3
              </div>
              <h3 className="text-xl font-semibold">Special Packaging</h3>
              <p className="mt-2 text-gray-600">At imperdiet dui accumsan sit amet nulla risus est ultricies quis.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gray-300 flex items-center justify-center rounded-full mb-4">
                Icon 4
              </div>
              <h3 className="text-xl font-semibold">Free Global Returns</h3>
              <p className="mt-2 text-gray-600">At imperdiet dui accumsan sit amet nulla risus est ultricies quis.</p>
            </div>
          </div>
        </section>

        <section className="my-16">
          <div className="flex justify-center space-x-8">
            <div className="w-72">
              <div className="w-full h-64 bg-gray-300 flex items-center justify-center text-xl text-gray-800">
                Image 4
              </div>
              <h2 className="mt-4 text-lg font-semibold">SHOP FOR MEN</h2>
            </div>
            <div className="w-72">
              <div className="w-full h-64 bg-gray-300 flex items-center justify-center text-xl text-gray-800">
                Image 5
              </div>
              <h2 className="mt-4 text-lg font-semibold">SHOP FOR WOMEN</h2>
            </div>
            <div className="w-72">
              <div className="w-full h-64 bg-gray-300 flex items-center justify-center text-xl text-gray-800">
                Image 6
              </div>
              <h2 className="mt-4 text-lg font-semibold">SHOP ACCESSORIES</h2>
            </div>
          </div>
        </section>

        <section className="my-16">
          <h2 className="text-3xl font-semibold mb-8">Our New Arrivals</h2>
          <div className="flex items-center justify-center">
            <button className="text-4xl p-2 cursor-pointer">&#8592;</button>
            <div className="flex space-x-8">
              <div className="w-60">
                <div className="w-full h-64 bg-gray-300 flex items-center justify-center text-xl text-gray-800">
                  Image 7
                </div>
                <h3 className="mt-4 text-lg font-semibold">DARK FLORISH ONEPIECE</h3>
                <p className="text-gray-600 mt-2">$95.00</p>
              </div>
              <div className="w-60">
                <div className="w-full h-64 bg-gray-300 flex items-center justify-center text-xl text-gray-800">
                  Image 8
                </div>
                <h3 className="mt-4 text-lg font-semibold">BAGGY SHIRT</h3>
                <p className="text-gray-600 mt-2">$55.00</p>
              </div>
              <div className="w-60">
                <div className="w-full h-64 bg-gray-300 flex items-center justify-center text-xl text-gray-800">
                  Image 9
                </div>
                <h3 className="mt-4 text-lg font-semibold">COTTON OFF-WHITE SHIRT</h3>
                <p className="text-gray-600 mt-2">$65.00</p>
              </div>
              <div className="w-60">
                <div className="w-full h-64 bg-gray-300 flex items-center justify-center text-xl text-gray-800">
                  Image 10
                </div>
                <h3 className="mt-4 text-lg font-semibold">CROP SWEATER</h3>
                <p className="text-gray-600 mt-2">$50.00</p>
              </div>
            </div>
            <button className="text-4xl p-2 cursor-pointer">&#8594;</button>
          </div>
          <div className="mt-8">
            <a href="#" className="text-blue-600 underline">VIEW ALL PRODUCTS</a>
          </div>
        </section>

        <section className="my-16 bg-gray-100 py-16">
          <div className="max-w-6xl mx-auto flex items-center">
            <div className="w-1/2 h-96 bg-gray-300 flex items-center justify-center text-xl text-gray-800">
              Image 11
            </div>
            <div className="w-1/2 px-16">
              <h2 className="text-4xl font-semibold mb-4">Classic Winter Collection</h2>
              <p className="text-gray-600 mb-8">
                Dignissim lacus, turpis ut suspendisse vel tellus. Turpis purus, gravida orci, fringilla a. Ac sed eu fringilla odio mi. Consequat pharetra at magna imperdiet cursus ac faucibus sit libero. Ultricies quam nunc, lorem sit lorem urna, pretium aliquam ut. In vel, quis donec dolor id in. Pulvinar commodo mollis diam sed facilisis at cursus imperdiet cursus ac faucibus sit faucibus sit libero.
              </p>
              <button className="bg-black text-white py-3 px-8">SHOP COLLECTION</button>
            </div>
          </div>
        </section>

        <section className="my-16 py-16 bg-gray-100">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-semibold mb-4">Sign Up for Our Newsletter</h2>
            <div className="flex justify-center">
              <input type="email" placeholder="Your Email Address" className="w-1/2 p-3 border border-gray-300" />
              <button className="bg-black text-white py-3 px-8 ml-2">SIGN UP</button>
            </div>
          </div>
          <div className="flex justify-center space-x-4 mb-16">
            <div className="w-60 h-64 bg-gray-300 flex items-center justify-center text-xl text-gray-800">
              Image 12
            </div>
            <div className="w-60 h-64 bg-gray-300 flex items-center justify-center text-xl text-gray-800">
              Image 13
            </div>
            <div className="w-60 h-64 bg-gray-300 flex items-center justify-center text-xl text-gray-800">
              Image 14
            </div>
            <div className="w-60 h-64 bg-gray-300 flex items-center justify-center text-xl text-gray-800">
              Image 15
            </div>
            <div className="w-60 h-64 bg-gray-300 flex items-center justify-center text-xl text-gray-800">
              Image 16
            </div>
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
      </main>
    </div>
  );
}

export default HomePage;
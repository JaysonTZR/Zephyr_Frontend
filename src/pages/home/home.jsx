import React from "react";
import { useInView } from "react-intersection-observer";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import WinterCollectionImage from "../../assets/images/momo-model.jpg";

function HomePage() {
  const options = {
    triggerOnce: false,
    threshold: 0.1,
  };

  const [section1Ref, section1InView] = useInView(options);
  const [section2Ref, section2InView] = useInView(options);
  const [section3Ref, section3InView] = useInView(options);
  const [section4Ref, section4InView] = useInView(options);
  const [section5Ref, section5InView] = useInView(options);
  const [section6Ref, section6InView] = useInView(options);

  return (
    <div className="font-sans text-center" style={{ backgroundColor: '#f1f1f0' }}>
      <Header />

      <main>
        <section
          ref={section1Ref}
          className={`mt-24 mb-20 mx-16 ${
            section1InView ? "opacity-100" : "opacity-0"
          }`}
        >
          <h1 className="text-7xl">New Collections</h1>
          <p className="mt-10 text-gray-500 max-w-2xl mx-auto tracking-wider">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
            voluptas ut dolorum consequuntur, adipisci repellat! Eveniet commodi
            voluptatem voluptate, eum minima, in suscipit explicabo voluptatibus
            harum, quibumdam ex repellat eaque!
          </p>
        </section>

        <section
          ref={section2Ref}
          className={`flex items-center justify-center pb-32 mb-32 ${
            section2InView ? "opacity-100" : "opacity-0"
          }`}
        >
          <button className="p-6 mr-28 cursor-pointer rounded-full border border-gray-200 hover:border-gray-300 text-gray-400 hover:text-gray-500 transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="size-8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </button>
          <div className="flex space-x-20 h-[500px]">
            <div className="w-96">
              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-xl text-gray-800 transition-transform duration-500 hover:scale-90">
                Image 1
              </div>
              <div className="flex flex-col justify-center items-start">
                <span className="mt-5 mb-3 text-2xl tracking-wide">
                  SOFT LEATHER JACKETS
                </span>
                <span className="mb-4 text-gray-500 text-left tracking-wider">
                  Scelerisque duis aliquam qui lorem ipsum dolor amet, consectetur adipiscing elit.
                </span>
                <a href="/product" className="underline underline-offset-8 uppercase tracking-widest">
                  Discover Now
                </a>
              </div>
            </div>
            <div className="w-96">
              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-xl text-gray-800 transition-transform duration-500 hover:scale-90">
                Image 2
              </div>
              <div className="flex flex-col justify-center items-start">
                <span className="mt-5 mb-3 text-2xl tracking-wide">
                  SOFT LEATHER JACKETS
                </span>
                <span className="mb-4 text-gray-500 text-left tracking-wider">
                  Scelerisque duis aliquam qui lorem ipsum dolor amet, consectetur adipiscing elit.
                </span>
                <a href="/product" className="underline underline-offset-8 uppercase tracking-widest">
                  Discover Now
                </a>
              </div>
            </div>
            <div className="w-96">
              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-xl text-gray-800 transition-transform duration-500 hover:scale-90">
                Image 3
              </div>
              <div className="flex flex-col justify-center items-start">
                <span className="mt-5 mb-3 text-2xl tracking-wide">
                  SOFT LEATHER JACKETS
                </span>
                <span className="mb-4 text-gray-500 text-left tracking-wider">
                  Scelerisque duis aliquam qui lorem ipsum dolor amet, consectetur adipiscing elit.
                </span>
                <a href="/product" className="underline underline-offset-8 uppercase tracking-widest">
                  Discover Now
                </a>
              </div>
            </div>
          </div>
          <button className="p-6 ml-28 cursor-pointer rounded-full border border-gray-200 hover:border-gray-300 text-gray-400 hover:text-gray-500 transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </section>

        <section
          ref={section3Ref}
          className={` pt-24 px-72 bg-white ${
            section3InView ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="grid grid-cols-4 gap-8">
            <div className="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-11 text-gray-400 mb-3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
              </svg>
              <h3 className="text-3xl mb-2">Book An Appointment</h3>
              <p className="mt-2 text-gray-500 tracking-wider">
                At imperdiet dui accumsan sit amet nulla risus est ultricies
                quis.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-11 text-gray-400 mb-3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
              <h3 className="text-3xl mb-2">Pick Up In Store</h3>
              <p className="mt-2 text-gray-500 tracking-wider">
                At imperdiet dui accumsan sit amet nulla risus est ultricies
                quis.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-11 text-gray-400 mb-3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
              </svg>
              <h3 className="text-3xl mb-2">Special Packaging</h3>
              <p className="mt-2 text-gray-500 tracking-wider">
                At imperdiet dui accumsan sit amet nulla risus est ultricies
                quis.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-11 text-gray-400 mb-3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
              <h3 className="text-3xl mb-2">Free Global Returns</h3>
              <p className="mt-2 text-gray-500 tracking-wider">
                At imperdiet dui accumsan sit amet nulla risus est ultricies
                quis.
              </p>
            </div>
          </div>
        </section>

        <section
          ref={section4Ref}
          className={`bg-white py-28 ${
            section4InView ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex justify-center space-x-14 h-[450px]">
            <div className="w-[400px] group">
              <div className="w-full h-full">
                <a href="/product">
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-xl text-gray-800 transition-transform duration-500 group-hover:scale-95">
                    Image 4
                  </div>
                </a>
              </div>
              <div className="p-2 w-fit">
                <a href="/product" className="text-gray-400 uppercase tracking-wide">Shop For Men</a>
              </div>
            </div>
            <div className="w-[400px] group">
              <div className="w-full h-full">
                <a href="/product">
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-xl text-gray-800 transition-transform duration-500 group-hover:scale-95">
                    Image 5
                  </div>
                </a>
              </div>
              <div className="p-2 w-fit">
                <a href="/product" className="text-gray-400 uppercase tracking-wide">Shop For Women</a>
              </div>
            </div>
            <div className="w-[400px] group">
              <div className="w-full h-full">
                <a href="/product">
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-xl text-gray-800 transition-transform duration-500 group-hover:scale-95">
                    Image 6
                  </div>
                </a>
              </div>
              <div className="p-2 w-fit">
                <a href="/product" className="text-gray-400 uppercase tracking-wide">Shop Acccessories</a>
              </div>
            </div>
          </div>
        </section>

        <section
          ref={section5Ref}
          className={`bg-white px-[300px] pb-12 pt-5 ${
            section5InView ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex justify-between">
            <div>
              <h2 className="text-3xl mb-6 uppercase">Our New Arrivals</h2>
            </div>
            <div>
              <a href="/shop" className="underline underline-offset-8 uppercase text-sm tracking-widest">
                View All Products
              </a>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button className="p-6 mr-28 cursor-pointer rounded-full border border-gray-200 hover:border-gray-300 text-gray-400 hover:text-gray-500 transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="size-8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
            </button>
            <div className="flex space-x-[51px]">
              <div className="w-72 transition-transform duration-500 hover:scale-95">
                <div className="w-full h-96 bg-gray-200 flex items-center justify-center text-xl text-gray-800">
                  Image 7
                </div>
                <div className="mt-3 text-xl tracking-wide text-left uppercase">
                  Dark Florish Onepiece
                </div>
                <div className="mt-2 text-lg text-left">
                  $95.00
                </div>
              </div>
              <div className="w-72 transition-transform duration-500 hover:scale-95">
                <div className="w-full h-96 bg-gray-200 flex items-center justify-center text-xl text-gray-800">
                  Image 8
                </div>
                <div className="mt-3 text-xl tracking-wide text-left uppercase">
                  Baggy Shirt
                </div>
                <div className="mt-2 text-lg text-left">
                  $55.00
                </div>
              </div>
              <div className="w-72 transition-transform duration-500 hover:scale-95">
                <div className="w-full h-96 bg-gray-200 flex items-center justify-center text-xl text-gray-800">
                  Image 9
                </div>
                <div className="mt-3 text-xl tracking-wide text-left uppercase">
                  Cotton Off-White Shirt
                </div>
                <div className="mt-2 text-lg text-left">
                  $65.00
                </div>
              </div>
              <div className="w-72 transition-transform duration-500 hover:scale-95">
                <div className="w-full h-96 bg-gray-200 flex items-center justify-center text-xl text-gray-800">
                  Image 10
                </div>
                <div className="mt-3 text-xl tracking-wide text-left uppercase">
                  Crop Sweater
                </div>
                <div className="mt-2 text-lg text-left">
                  $50.00
                </div>
              </div>
            </div>
            <button className="p-6 ml-28 cursor-pointer rounded-full border border-gray-200 hover:border-gray-300 text-gray-400 hover:text-gray-500 transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </section>

        <section
          ref={section6Ref}
          className={`py-24 px-[300px] ${
            section6InView ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex items-center">
            <img src={WinterCollectionImage} alt="Classic Winter Collection" className="w-1/2 h-[630px] object-cover bg-gray-300 flex items-center justify-center text-xl text-gray-800" />
            <div className="w-1/2 px-24 h-[630px] bg-white flex flex-col justify-center">
              <div className="text-5xl mb-7 text-left uppercase tracking-wide">
                Classic Winter Collection
              </div>
              <p className="text-gray-400 mb-8 text-left tracking-wide leading-7">
                Dignissim lacus, turpis ut suspendisse vel tellus. Turpis purus,
                gravida orci, fringilla a. Ac sed eu fringilla odio mi.
                Consequat pharetra at magna imperdiet cursus ac faucibus sit
                libero. Ultricies quam nunc, lorem sit lorem urna, pretium
                aliquam ut. In vel, quis donec dolor id in. Pulvinar commodo
                mollis diam sed facilisis at cursus imperdiet cursus ac faucibus
                sit faucibus sit libero.
              </p>
              <div className="flex justify-start">
                <a href="shop" className="bg-black text-white w-48 px-6 py-4 uppercase tracking-widest font-semibold text-sm hover:bg-gray-800">
                  Shop Collection
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="text-4xl mb-8 uppercase tracking-wider">
              Sign Up for Our Newsletter
            </h2>
            <div className="flex justify-center">
              <input
                type="email"
                placeholder="Your Email Address"
                className="w-3/5 p-3 border border-gray-300"
              />
              <a href="#" className="bg-black text-white w-36 px-6 py-4 ml-2 uppercase tracking-widest font-semibold text-sm hover:bg-gray-800">
                Sign Up
              </a>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-96 h-80 bg-gray-200 flex items-center justify-center text-xl text-gray-800">
              Image 12
            </div>
            <div className="w-96 h-80 bg-gray-200 flex items-center justify-center text-xl text-gray-800">
              Image 13
            </div>
            <div className="w-96 h-80 bg-gray-200 flex items-center justify-center text-xl text-gray-800">
              Image 14
            </div>
            <div className="w-96 h-80 bg-gray-200 flex items-center justify-center text-xl text-gray-800">
              Image 15
            </div>
            <div className="w-96 h-80 bg-gray-200 flex items-center justify-center text-xl text-gray-800">
              Image 16
            </div>
            <div className="w-96 h-80 bg-gray-200 flex items-center justify-center text-xl text-gray-800">
              Image 17
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}

export default HomePage;

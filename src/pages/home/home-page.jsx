import React from "react";
import { useInView } from "react-intersection-observer";
import Header from "../../components/Header";
// import Footer from "../../components/Footer";
import Footer2 from "../../components/Footer2";

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
    <div className="font-sans text-center">
      <Header />

      <main>
        <section
          ref={section1Ref}
          className={`my-16 mx-4 lg:mx-16 lg:my-32 ${
            section1InView ? "opacity-100" : "opacity-0"
          }`}
        >
          <h1 className="text-4xl font-semibold">New Collections</h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
            voluptas ut dolorum consequuntur, adipisci repellat! Eveniet commodi
            voluptatem voluptate, eum minima, in suscipit explicabo voluptatibus
            harum, quibumdam ex repellat eaque!
          </p>
        </section>

        <section
          ref={section2Ref}
          className={`flex items-center justify-center my-8 ${
            section2InView ? "opacity-100" : "opacity-0"
          }`}
        >
          <button className="text-4xl p-2 cursor-pointer">&#8592;</button>
          <div className="flex space-x-8">
            <div className="w-72">
              <div className="w-full h-48 bg-gray-300 flex items-center justify-center text-xl text-gray-800">
                Image 1
              </div>
              <h2 className="mt-4 text-lg font-semibold">
                SOFT LEATHER JACKETS
              </h2>
            </div>
            <div className="w-72">
              <div className="w-full h-48 bg-gray-300 flex items-center justify-center text-xl text-gray-800">
                Image 2
              </div>
              <h2 className="mt-4 text-lg font-semibold">
                SOFT LEATHER JACKETS
              </h2>
            </div>
            <div className="w-72">
              <div className="w-full h-48 bg-gray-300 flex items-center justify-center text-xl text-gray-800">
                Image 3
              </div>
              <h2 className="mt-4 text-lg font-semibold">
                SOFT LEATHER JACKETS
              </h2>
            </div>
          </div>
          <button className="text-4xl p-2 cursor-pointer">&#8594;</button>
        </section>

        <section
          ref={section3Ref}
          className={`my-32 mx-4 lg:mx-16 lg:my-48 ${
            section3InView ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="grid grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gray-300 flex items-center justify-center rounded-full mb-4">
                Icon 1
              </div>
              <h3 className="text-xl font-semibold">Book An Appointment</h3>
              <p className="mt-2 text-gray-600">
                At imperdiet dui accumsan sit amet nulla risus est ultricies
                quis.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gray-300 flex items-center justify-center rounded-full mb-4">
                Icon 2
              </div>
              <h3 className="text-xl font-semibold">Pick Up In Store</h3>
              <p className="mt-2 text-gray-600">
                At imperdiet dui accumsan sit amet nulla risus est ultricies
                quis.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gray-300 flex items-center justify-center rounded-full mb-4">
                Icon 3
              </div>
              <h3 className="text-xl font-semibold">Special Packaging</h3>
              <p className="mt-2 text-gray-600">
                At imperdiet dui accumsan sit amet nulla risus est ultricies
                quis.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gray-300 flex items-center justify-center rounded-full mb-4">
                Icon 4
              </div>
              <h3 className="text-xl font-semibold">Free Global Returns</h3>
              <p className="mt-2 text-gray-600">
                At imperdiet dui accumsan sit amet nulla risus est ultricies
                quis.
              </p>
            </div>
          </div>
        </section>

        <section
          ref={section4Ref}
          className={`my-32 mx-4 lg:mx-16 lg:my-48 ${
            section4InView ? "opacity-100" : "opacity-0"
          }`}
        >
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

        <section
          ref={section5Ref}
          className={`my-32 mx-4 lg:mx-16 lg:my-48 ${
            section5InView ? "opacity-100" : "opacity-0"
          }`}
        >
          <h2 className="text-3xl font-semibold mb-8">Our New Arrivals</h2>
          <div className="flex items-center justify-center">
            <button className="text-4xl p-2 cursor-pointer">&#8592;</button>
            <div className="flex space-x-8">
              <div className="w-60">
                <div className="w-full h-64 bg-gray-300 flex items-center justify-center text-xl text-gray-800">
                  Image 7
                </div>
                <h3 className="mt-4 text-lg font-semibold">
                  DARK FLORISH ONEPIECE
                </h3>
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
                <h3 className="mt-4 text-lg font-semibold">
                  COTTON OFF-WHITE SHIRT
                </h3>
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
            <a href="#" className="text-blue-600 underline">
              VIEW ALL PRODUCTS
            </a>
          </div>
        </section>

        <section
          ref={section6Ref}
          className={`my-32 mx-4 lg:mx-16 lg:my-48 bg-gray-100 py-24 ${
            section6InView ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="max-w-6xl mx-auto flex items-center">
            <div className="w-1/2 h-96 bg-gray-300 flex items-center justify-center text-xl text-gray-800">
              Image 11
            </div>
            <div className="w-1/2 px-16">
              <h2 className="text-4xl font-semibold mb-4">
                Classic Winter Collection
              </h2>
              <p className="text-gray-600 mb-8">
                Dignissim lacus, turpis ut suspendisse vel tellus. Turpis purus,
                gravida orci, fringilla a. Ac sed eu fringilla odio mi.
                Consequat pharetra at magna imperdiet cursus ac faucibus sit
                libero. Ultricies quam nunc, lorem sit lorem urna, pretium
                aliquam ut. In vel, quis donec dolor id in. Pulvinar commodo
                mollis diam sed facilisis at cursus imperdiet cursus ac faucibus
                sit faucibus sit libero.
              </p>
              <button className="bg-black text-white py-3 px-8">
                SHOP COLLECTION
              </button>
            </div>
          </div>
        </section>

        <section className="bg-gray-100 py-24">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-semibold mb-4">
              Sign Up for Our Newsletter
            </h2>
            <div className="flex justify-center">
              <input
                type="email"
                placeholder="Your Email Address"
                className="w-1/2 p-3 border border-gray-300"
              />
              <button className="bg-black text-white py-3 px-8 ml-2">
                SIGN UP
              </button>
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
        </section>

        <Footer2 />
      </main>
    </div>
  );
}

export default HomePage;

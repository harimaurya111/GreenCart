import React from 'react';

const AboutUs = () => {
  return (
    <div className="bg-white min-h-screen py-12 px-6 md:px-20">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-green-700 mb-6 text-center">About GreenCart</h1>

        <p className="text-gray-700 text-lg mb-6">
          Welcome to <span className="font-semibold text-green-600">GreenCart</span>, your one-stop
          online destination for everything you need — from daily essentials to electronics, fashion,
          home decor, beauty, and much more! We are committed to delivering quality products at
          affordable prices, with fast delivery and a user-friendly shopping experience.
        </p>

        <p className="text-gray-700 text-lg mb-6">
          At GreenCart, we believe that shopping should be easy, reliable, and enjoyable for
          everyone. That’s why we’ve built a platform that connects top-rated sellers, curated
          products, and unbeatable deals — all in one place.
        </p>

        <div className="grid md:grid-cols-2 gap-8 my-10">
          <div>
            <h2 className="text-2xl font-semibold text-green-700 mb-3">Why Choose GreenCart?</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Wide range of products in every category</li>
              <li>Trusted by thousands of satisfied customers</li>
              <li>Fast and secure checkout process</li>
              <li>Responsive customer support team</li>
              <li>Safe, secure, and eco-friendly packaging</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-green-700 mb-3">Our Mission</h2>
            <p className="text-gray-700">
              Our mission is to make online shopping accessible, reliable, and affordable for
              everyone across India and beyond. We are dedicated to creating a seamless and
              trustworthy digital shopping experience where every customer feels valued.
            </p>
          </div>
        </div>

        <div className="bg-green-50 p-6 rounded-lg shadow-md mt-10">
          <h2 className="text-xl font-semibold text-green-700 mb-3">Let’s Build a Greener Tomorrow</h2>
          <p className="text-gray-700">
            GreenCart isn’t just about convenience — it's about conscious shopping too. We encourage
            sustainable practices and work with vendors who care about our planet. Together, let's
            make commerce greener and smarter.
          </p>
        </div>

        <p className="text-center text-sm text-gray-500 mt-10">
          Thank you for choosing GreenCart – Shopping made simple, smart, and sustainable.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;

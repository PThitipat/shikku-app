"use client";

import React from "react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header Section */}
      <header className="bg-gray-800 py-6">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-3xl font-bold">Shikku Shop</h1>
          <nav className="space-x-4">
            <Link href="#products" className="hover:text-gray-300">
              Products
            </Link>
            <Link href="#about" className="hover:text-gray-300">
              About Us
            </Link>
            <Link href="#contact" className="hover:text-gray-300">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-20">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-4">Welcome to Shikku Shop</h2>
          <p className="text-lg mb-6">
            Discover the best products at unbeatable prices.
          </p>
          <Link
            href="#products"
            className="bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-gray-700"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((product) => (
              <div
                key={product}
                className="bg-gray-800 p-6 rounded-lg text-center hover:shadow-lg"
              >
                <div className="h-40 bg-gray-700 rounded-lg mb-4"></div>
                <h3 className="text-xl font-bold">Product {product}</h3>
                <p className="text-gray-400">Lorem ipsum dolor sit amet.</p>
                <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-gray-800 py-20">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">About Us</h2>
          <p className="text-lg text-gray-300">
            Shikku Shop is dedicated to bringing you the finest products with
            exceptional customer service.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>
          <form className="max-w-lg mx-auto space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 rounded-lg bg-gray-800 text-white"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 rounded-lg bg-gray-800 text-white"
            />
            <textarea
              placeholder="Your Message"
              rows={4}
              className="w-full p-3 rounded-lg bg-gray-800 text-white"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-500"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-800 py-6">
        <div className="container mx-auto text-center text-gray-400">
          &copy; 2025 Shikku Shop. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

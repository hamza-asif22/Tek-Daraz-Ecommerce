import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Hero = () => {
  const [loading, setLoading] = useState(true);

  // Simulated loading delay (you can adjust or remove if not needed)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="bg-white border-b border-gray-200">
      <div className="flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto px-6 py-16 sm:py-24">
        {loading ? (
          // ✅ Skeleton Loader
          <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-10 animate-pulse">
            {/* Left Skeleton */}
            <div className="w-full sm:w-1/2 space-y-4 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <div className="w-10 h-[2px] bg-gray-200 rounded-full"></div>
                <div className="h-4 w-28 bg-gray-200 rounded"></div>
              </div>
              <div className="h-10 w-3/4 bg-gray-200 rounded mx-auto sm:mx-0"></div>
              <div className="h-6 w-1/2 bg-gray-200 rounded mx-auto sm:mx-0"></div>
              <div className="h-4 w-full bg-gray-200 rounded mx-auto sm:mx-0"></div>
              <div className="h-4 w-5/6 bg-gray-200 rounded mx-auto sm:mx-0"></div>
              <div className="h-10 w-36 bg-gray-200 rounded-full mx-auto sm:mx-0 mt-6"></div>
            </div>

            {/* Right Skeleton (Image Placeholder) */}
            <div className="w-full sm:w-1/2 flex justify-center">
              <div className="w-full max-w-md sm:max-w-lg h-80 bg-gray-200 rounded-3xl"></div>
            </div>
          </div>
        ) : (
          // ✅ Actual Hero Section
          <>
            {/* Left Side */}
            <motion.div
              className="w-full sm:w-1/2 text-center sm:text-left"
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-4">
                {/* <p className="w-10 h-[2px] bg-gray-800 rounded-full"></p> */}
                <p className="font-medium text-gray-700 tracking-wide text-sm">
                  OUR BESTSELLERS
                </p>
              </div>

              <h1 className="font-[600] text-4xl sm:text-5xl lg:text-6xl text-gray-900 leading-tight">
                Latest <span className="text-black font-semibold">Arrivals</span>
              </h1>

              <p className="mt-5 text-gray-500 text-sm sm:text-base max-w-md mx-auto sm:mx-0 leading-relaxed">
                Discover the newest tech releases at unbeatable prices. Shop
                innovative gadgets, laptops, and accessories — all in one place.
              </p>

              <Link to="/products">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="mt-8 bg-black text-white px-8 py-3 rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Shop Now →
                </motion.button>
              </Link>
            </motion.div>

            {/* Right Side (Product Image) */}
            <motion.div
              className="w-full sm:w-1/2 mt-12 sm:mt-0 flex justify-center"
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: true }}
            >
              <motion.img
                src={assets.Macbook_1}
                alt="Featured Product"
                className="w-full max-w-md sm:max-w-lg rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500"
                whileHover={{ scale: 1.03 }}
              />
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
};

export default Hero;

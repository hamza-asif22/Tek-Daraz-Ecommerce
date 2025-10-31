import React from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";

const policies = [
  {
    icon: assets.exchange_icon,
    title: "Easy Exchange Policy",
    desc: "Enjoy hassle-free exchanges with our simple return process.",
  },
  {
    icon: assets.quality_icon,
    title: "On-Time Delivery",
    desc: "We ensure fast and reliable delivery for every order.",
  },
  {
    icon: assets.support_img,
    title: "24/7 Customer Support",
    desc: "We’re here around the clock to help with your queries.",
  },
];

const OurPolicy = () => {
  return (
    <div className="py-20 bg-white">
      <div className="flex flex-col sm:flex-row justify-center gap-10 sm:gap-6 text-center px-6">
        {policies.map((policy, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-6 w-full sm:w-[280px]"
          >
            <img
              src={policy.icon}
              alt={policy.title}
              className="w-14 mb-4 drop-shadow-md"
            />
            <p className="font-semibold text-gray-800 text-base sm:text-lg mb-1">
              {policy.title}
            </p>
            <p className="text-gray-500 text-sm">{policy.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default OurPolicy;

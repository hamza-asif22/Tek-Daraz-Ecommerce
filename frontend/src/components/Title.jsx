import React from "react";
import { motion } from "framer-motion";

const Title = ({ text1, text2 }) => {
  return (
    <motion.div
      className="inline-flex gap-3 items-center mb-6"
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <p className="text-lg sm:text-xl md:text-2xl tracking-wide text-gray-500 font-light">
        {text1}{" "}
        <span className="text-gray-900 font-semibold">{text2}</span>
      </p>

      <motion.div
        className="w-10 sm:w-16 h-[2px] bg-gradient-to-r from-gray-400 via-gray-700 to-black rounded-full"
        initial={{ width: 0 }}
        whileInView={{ width: "4rem" }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />
    </motion.div>
  );
};

export default Title;

import React from "react";
import { motion } from "framer-motion";

const NewsletterBox = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div className="text-center py-14 bg-white">
      {/* Headings */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-semibold text-gray-800"
      >
        Subscribe Now & Stay Updated
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-gray-500 mt-3 text-sm sm:text-base"
      >
        Join our newsletter to receive the latest product updates, offers, and tech news.
      </motion.p>

      {/* Form */}
      <motion.form
        onSubmit={onSubmitHandler}
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="w-full sm:w-3/4 md:w-1/2 lg:w-2/5 flex items-center justify-between gap-3 mx-auto my-8 border border-gray-300 rounded-full px-4 py-2 shadow-sm hover:shadow-md transition-shadow"
      >
        <input
          type="email"
          placeholder="Enter your email address"
          required
          className="flex-1 outline-none text-gray-700 placeholder-gray-400 bg-transparent px-2 text-sm sm:text-base"
        />
        <button
          type="submit"
          className="bg-black text-white text-xs sm:text-sm px-6 sm:px-10 py-3 rounded-full hover:bg-gray-800 transition"
        >
          SUBSCRIBE
        </button>
      </motion.form>
    </div>
  );
};

export default NewsletterBox;

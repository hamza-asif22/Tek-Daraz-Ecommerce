import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Only show on collection page
    if (location.pathname.includes("collection") && showSearch) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location, showSearch]);

  return (
    <AnimatePresence>
      {showSearch && visible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="border-t border-b backdrop-blur-md bg-white/70 shadow-sm sticky top-0 z-30 text-center py-4"
        >
          <div className="inline-flex items-center justify-between bg-white border border-gray-300 px-5 py-2 rounded-full w-[90%] sm:w-[60%] md:w-[40%] shadow-sm transition-all hover:shadow-md">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 outline-none bg-transparent text-sm text-gray-700 placeholder-gray-400"
              type="text"
              placeholder="Search products..."
            />
            <img
              className="w-4 opacity-70"
              src={assets.search_icon}
              alt="search icon"
            />
          </div>

          <motion.img
            whileHover={{ rotate: 90, scale: 1.1 }}
            transition={{ duration: 0.2 }}
            onClick={() => setShowSearch(false)}
            className="inline ml-4 w-3 cursor-pointer opacity-70 hover:opacity-100"
            src={assets.cross_icon}
            alt="close"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchBar;

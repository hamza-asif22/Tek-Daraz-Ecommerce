import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import { motion, AnimatePresence } from "framer-motion";

const NavBar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } =
    useContext(ShopContext);

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };

  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 font-medium transition-all duration-300">
        {/* Logo */}
        <Link to="/">
          <motion.img
            src={assets.NavBarLogo}
            className="w-36 cursor-pointer"
            alt="TekDaraz Logo"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden sm:flex gap-8 text-gray-700 text-sm font-medium">
          {[
            { name: "HOME", path: "/" },
            { name: "PRODUCTS", path: "/products" },
            { name: "ABOUT", path: "/about" },
            { name: "CONTACT", path: "/contact" },
          ].map((item, i) => (
            <motion.li
              key={i}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
              className="relative group"
            >
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `transition-colors duration-200 ${
                    isActive ? "text-black" : "text-gray-600 hover:text-black"
                  }`
                }
              >
                {item.name}
              </NavLink>
              <span className="absolute left-0 bottom-[-6px] w-0 group-hover:w-full h-[2px] bg-black transition-all duration-300"></span>
            </motion.li>
          ))}
        </ul>

        {/* Right Icons */}
        <div className="flex items-center gap-6">
          {/* Search */}
          <motion.img
            onClick={() => setShowSearch(true)}
            src={assets.search_icon}
            className="w-5 cursor-pointer hover:scale-110 transition-transform"
            alt="Search"
            whileHover={{ rotate: 5 }}
          />

          {/* Profile Dropdown */}
          <div className="relative group">
            <img
              onClick={() => (token ? null : navigate("/login"))}
              className="w-6 cursor-pointer hover:scale-110 transition"
              src={assets.profile_icon}
              alt="Profile"
            />

            <AnimatePresence>
              {token && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full right-0  bg-white border border-gray-200 shadow-lg rounded-xl p-3 w-40 hidden group-hover:block"
                >
                  <ul className="flex flex-col text-gray-600 text-sm">
                    <li
                      onClick={() => navigate("/profile")}
                      className="cursor-pointer py-2 px-3 rounded-md hover:bg-gray-100"
                    >
                      My Profile
                    </li>
                    <li
                      onClick={() => navigate("/orders")}
                      className="cursor-pointer py-2 px-3 rounded-md hover:bg-gray-100"
                    >
                      Orders
                    </li>
                    <li
                      onClick={logout}
                      className="cursor-pointer py-2 px-3 rounded-md text-red-500 hover:bg-gray-100"
                    >
                      Logout
                    </li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Cart */}
          <Link to="/cart" className="relative">
            <motion.img
              src={assets.cart_icon}
              className="w-5 cursor-pointer hover:scale-110 transition-transform"
              alt="Cart"
            />
            {getCartCount() > 0 && (
              <motion.span
                key={getCartCount()}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-2 -right-2 bg-black text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center"
              >
                {getCartCount()}
              </motion.span>
            )}
          </Link>

          {/* Mobile Menu Icon */}
          <img
            onClick={() => setVisible(true)}
            src={assets.menu_icon}
            className="w-5 cursor-pointer sm:hidden"
            alt="Menu"
          />
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 right-0 bottom-0 w-3/4 bg-white shadow-lg z-50 p-6 flex flex-col"
          >
            <div
              onClick={() => setVisible(false)}
              className="flex items-center gap-3 mb-6 cursor-pointer"
            >
              <img src={assets.dropdown_icon} className="h-4 rotate-180" alt="Back" />
              <p className="text-gray-700 font-medium">Back</p>
            </div>

            {["HOME", "PRODUCTS", "ABOUT", "CONTACT"].map((item, i) => (
              <NavLink
                key={i}
                to={item === "HOME" ? "/" : `/${item.toLowerCase()}`}
                onClick={() => setVisible(false)}
                className="py-3 text-gray-700 border-b border-gray-100 hover:text-black transition-colors"
              >
                {item}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default NavBar;

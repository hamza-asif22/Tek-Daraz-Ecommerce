import React from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-white text-gray-700 px-6 md:px-16 py-16 mt-24 border-t border-gray-200">
      <motion.div
        className="flex flex-col sm:grid grid-cols-[2fr_1fr_1fr] gap-14 text-sm"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        viewport={{ once: true }}
      >
        {/* About Section */}
        <div>
          <img
            src={assets.NavBarLogo}
            className="mb-5 w-36 hover:scale-105 transition-transform duration-300"
            alt="TekDaraz Logo"
          />
          <p className="w-full md:w-3/4 text-gray-500 leading-relaxed">
            TekDaraz is your one-stop online marketplace offering top-quality
            electronics, gadgets, and essentials — delivered fast, affordably,
            and reliably. Shop with confidence and convenience from the comfort
            of your home.
          </p>
        </div>

        {/* Store Links */}
        <div>
          <p className="text-lg font-semibold mb-5 tracking-wide text-gray-900">
            STORE
          </p>
          <ul className="flex flex-col gap-2">
            {[
              { label: 'Home', to: '/' },
              { label: 'About Us', to: '/about' },
              { label: 'Contact Us', to: '/contact' },
              { label: 'Privacy Policy', to: '/privacy-policy' },
            ].map((link, index) => (
              <motion.li
                key={index}
                whileHover={{
                  x: 5,
                  color: '#000',
                  scale: 1.03,
                }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                <Link
                  to={link.to}
                  className="hover:text-black transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Get in Touch */}
        <div>
          <p className="text-lg font-semibold mb-5 tracking-wide text-gray-900">
            GET IN TOUCH
          </p>
          <ul className="flex flex-col gap-2 text-gray-500">
            <motion.li
              whileHover={{ x: 5, color: '#000' }}
              transition={{ duration: 0.2 }}
            >
              📞 +1-212-456-7890
            </motion.li>
            <motion.li
              whileHover={{ x: 5, color: '#000' }}
              transition={{ duration: 0.2 }}
            >
              ✉ tekdaraz@company.com
            </motion.li>
          </ul>
        </div>
      </motion.div>

      {/* Footer Bottom */}
      <motion.div
        className="mt-16 text-center pt-6 text-sm text-gray-400 border-t border-gray-200"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
      >
        <p>
          © 2025 <span className="font-medium text-gray-800">TekDaraz</span> — All
          rights reserved.
        </p>
      </motion.div>
    </footer>
  );
};

export default Footer;

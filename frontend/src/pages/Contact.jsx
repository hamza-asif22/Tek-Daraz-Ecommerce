import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import Title from "../components/Title";
import NewsletterBox from "../components/NewsletterBox";
import { assets } from "../assets/assets";

const Contact = () => {
  const [loading, setLoading] = useState(true);

  // Simulate loading delay (you can replace with real data fetching)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* ✅ Full On-Page SEO */}
      <Helmet>
        <title>Contact TekDaraz | Get in Touch with Pakistan’s Top Electronics Store</title>
        <meta
          name="description"
          content="Need help with your order or product inquiry? Contact TekDaraz — your trusted online electronics store in Pakistan. Visit our Lahore branch or reach us by email or phone."
        />
        <meta
          name="keywords"
          content="Contact TekDaraz, TekDaraz Lahore, electronics store Pakistan, tech support, customer service, laptops, mobiles"
        />
        <meta name="author" content="TekDaraz" />
        <meta property="og:title" content="Contact TekDaraz | Get in Touch" />
        <meta
          property="og:description"
          content="Get in touch with TekDaraz for all your electronics inquiries. Fast customer support and service across Pakistan."
        />
        <meta property="og:image" content={assets.contact_img} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://www.tekdaraz.com/contact" />
      </Helmet>

      <main className="bg-gradient-to-b from-gray-50 to-white text-gray-800">
        {/* ✅ Loading Skeleton */}
        {loading ? (
          <div className="animate-pulse space-y-10 p-10 max-w-6xl mx-auto">
            <div className="h-10 bg-gray-300 rounded w-1/3 mx-auto"></div>
            <div className="h-5 bg-gray-200 rounded w-2/3 mx-auto"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <div className="h-80 bg-gray-200 rounded-3xl"></div>
              <div className="space-y-4">
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
            <div className="h-96 bg-gray-200 rounded-3xl mt-10"></div>
          </div>
        ) : (
          <>
            {/* HERO SECTION */}
            <section className="relative text-center py-20 px-6 overflow-hidden">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-5xl md:text-6xl font-bold mb-4">
                  Contact <span className="text-blue-600">TekDaraz</span>
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                  Have questions or need support? We’re here to help — reach out anytime.
                </p>
              </motion.div>

              {/* Animated gradient background */}
              <div className="absolute inset-0 -z-10 overflow-hidden">
                <motion.div
                  className="absolute top-1/4 left-1/3 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl"
                  animate={{ x: [0, 80, 0], y: [0, 40, 0] }}
                  transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
                />
              </div>
            </section>

            {/* CONTACT INFO SECTION */}
            <section className="container mx-auto px-6 lg:px-20 py-20 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <motion.img
                src={assets.office}
                alt="TekDaraz Contact Office"
                className="rounded-3xl shadow-xl hover:scale-[1.03] transition-transform duration-700"
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              />

              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-semibold text-blue-700">Our Office</h2>
                <p className="text-gray-600 leading-relaxed">
                  Visit our Lahore store or reach out to our team online. Whether you need product
                  information, order assistance, or after-sales support — we’re always ready to help.
                </p>

                <div className="space-y-4 text-gray-700">
                  <div>
                    <h3 className="font-semibold text-lg text-blue-700">📍 Address</h3>
                    <p>
                      Hassan Tower, Adjacent Hafeez Center <br />
                      Lahore, Punjab, Pakistan
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-blue-700">📞 Contact Info</h3>
                    <p>
                      Phone:{" "}
                      <a href="tel:+92415550132" className="text-blue-600 hover:underline">
                        (415) 555-0132
                      </a>{" "}
                      <br />
                      Email:{" "}
                      <a href="mailto:admin@tekdaraz.com" className="text-blue-600 hover:underline">
                        admin@tekdaraz.com
                      </a>
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-blue-700">🕒 Business Hours</h3>
                    <p>Monday – Saturday: 10:00 AM – 8:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </motion.div>
            </section>

            {/* MAP SECTION */}
            <section className="relative bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 text-white py-20 text-center overflow-hidden">
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="max-w-3xl mx-auto px-6"
              >
                <h2 className="text-4xl font-semibold mb-6">Visit Our Store</h2>
                <p className="text-blue-100 leading-relaxed text-lg mb-10">
                  Drop by our TekDaraz branch in Lahore and explore our collection of electronics in person.
                </p>
                <iframe
                  title="TekDaraz Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13604.12350490472!2d74.3407!3d31.5204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391904d7fcb1e7e3%3A0xf71a3d6f7a523ab2!2sHafeez%20Center!5e0!3m2!1sen!2s!4v1689988888888!5m2!1sen!2s"
                  width="100%"
                  height="350"
                  className="rounded-2xl border-0 shadow-lg"
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </motion.div>
            </section>

            {/* NEWSLETTER SECTION */}
            <section className="bg-gradient-to-r from-gray-100 to-gray-200 py-20 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-semibold text-blue-800 mb-4">
                  Stay Connected with TekDaraz
                </h2>
                <p className="text-gray-600 mb-8">
                  Subscribe for updates on new arrivals, discounts, and the latest in tech.
                </p>
                <div className="max-w-3xl mx-auto w-full px-6 sm:px-6">
                  <NewsletterBox />
                </div>
              </motion.div>
            </section>
          </>
        )}
      </main>
    </>
  );
};

export default Contact;

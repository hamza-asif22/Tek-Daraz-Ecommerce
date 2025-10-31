import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import Title from "../components/Title";
import NewsletterBox from "../components/NewsletterBox";
import { assets } from "../assets/assets";

const About = () => {
  const [loading, setLoading] = useState(true);

  // Simulate loading time (you can tie this to real data/image load events)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* ✅ SEO Optimized Meta Tags */}
      <Helmet>
        <title>About TekDaraz | Pakistan’s Leading Online Electronics Store</title>
        <meta
          name="description"
          content="TekDaraz is Pakistan’s most trusted online electronics store — delivering premium mobiles, laptops, and accessories with speed, quality, and care."
        />
        <meta
          name="keywords"
          content="TekDaraz, electronics store Pakistan, buy mobiles online, laptops, tech gadgets, online shopping"
        />
        <meta name="author" content="TekDaraz" />
        <meta
          property="og:title"
          content="About TekDaraz | Leading Online Electronics Store"
        />
        <meta
          property="og:description"
          content="Discover TekDaraz — your destination for high-quality electronics and exceptional service across Pakistan."
        />
        <meta property="og:image" content={assets.about_img} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://www.tekdaraz.com/about" />
      </Helmet>

      {/* ✅ Skeleton Loader */}
      {loading ? (
        <div className="animate-pulse p-10 space-y-8 max-w-6xl mx-auto">
          <div className="h-10 w-1/3 bg-gray-200 rounded"></div>
          <div className="h-5 w-2/3 bg-gray-200 rounded"></div>
          <div className="h-96 w-full bg-gray-200 rounded-lg"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Array(3)
              .fill()
              .map((_, i) => (
                <div key={i} className="space-y-4">
                  <div className="h-40 bg-gray-200 rounded-lg"></div>
                  <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                  <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
                </div>
              ))}
          </div>
        </div>
      ) : (
        <main className="bg-gradient-to-b from-gray-50 to-white text-gray-800 transition-opacity duration-500">
          {/* HERO SECTION */}
          <section className="relative flex flex-col items-center justify-center py-20 px-6 text-center overflow-hidden">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                About <span className="text-blue-600">TekDaraz</span>
              </h1>
              <p className="max-w-2xl mx-auto text-lg text-gray-600">
                Redefining how Pakistan shops for electronics — through
                innovation, trust, and excellence.
              </p>
            </motion.div>

            {/* Subtle Background Gradient Animation */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
              <motion.div
                className="absolute top-1/4 left-1/3 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl"
                animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 10,
                  ease: "easeInOut",
                }}
              />
            </div>
          </section>

          {/* WHO WE ARE SECTION */}
          <section className="container mx-auto px-6 lg:px-20 py-20 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              className="space-y-6 order-2 md:order-1"
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-semibold text-blue-700">
                Who We Are
              </h2>
              <p className="text-gray-600 leading-relaxed">
                At <strong>TekDaraz</strong>, we believe technology should be
                accessible, reliable, and inspiring. We connect you to the
                latest electronics — from smartphones and laptops to essential
                accessories — ensuring quality, value, and convenience.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our vision is to transform the online shopping experience in
                Pakistan by making it simple, secure, and enjoyable. We take
                pride in fast deliveries, transparent service, and exceptional
                customer care.
              </p>
            </motion.div>

            <LazyImage
              src={assets.about}
              alt="About TekDaraz"
              className="order-1 md:order-2 rounded-3xl shadow-xl hover:scale-[1.03] transition-transform duration-700"
            />
          </section>

          {/* OUR MISSION SECTION */}
          <section className="relative py-24 bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 text-white text-center overflow-hidden">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto px-6"
            >
              <h2 className="text-4xl font-semibold mb-6">Our Mission</h2>
              <p className="text-blue-100 leading-relaxed text-lg">
                Our mission is to empower Pakistan’s digital generation through
                technology — combining innovation, reliability, and
                affordability. We’re constantly improving our platform to ensure
                a fast, secure, and rewarding shopping experience for everyone.
              </p>
            </motion.div>

            <motion.div
              className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-white/10 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2"
              animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.2, 1] }}
              transition={{
                repeat: Infinity,
                duration: 10,
                ease: "easeInOut",
              }}
            />
          </section>

          {/* WHY CHOOSE US SECTION */}
          <section className="container mx-auto px-6 lg:px-20 py-24">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-semibold text-blue-700">
                Why Choose TekDaraz
              </h2>
              <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
                We stand out by offering excellence at every touchpoint — from
                product selection to post-purchase support.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                {
                  title: "Quality Assurance",
                  desc: "Every product is carefully vetted to meet the highest standards of quality, performance, and authenticity.",
                  icon: "💎",
                },
                {
                  title: "Seamless Experience",
                  desc: "Enjoy smooth browsing, secure payments, and lightning-fast delivery across Pakistan.",
                  icon: "⚡",
                },
                {
                  title: "Customer First",
                  desc: "Our dedicated support team is always ready to help, ensuring you have a worry-free shopping journey.",
                  icon: "🤝",
                },
              ].map((card, i) => (
                <motion.div
                  key={i}
                  className="bg-white rounded-3xl p-8 shadow-md hover:shadow-2xl transition-all duration-300 text-center"
                  whileHover={{ y: -10 }}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="text-4xl mb-4">{card.icon}</div>
                  <h3 className="text-xl font-semibold text-blue-700 mb-3">
                    {card.title}
                  </h3>
                  <p className="text-gray-600">{card.desc}</p>
                </motion.div>
              ))}
            </div>
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
                Join our newsletter to receive the latest product updates,
                exclusive deals, and tech insights.
              </p>
              <div className="max-w-3xl mx-auto w-full px-6 sm:px-6">
                <NewsletterBox />
              </div>
            </motion.div>
          </section>
        </main>
      )}
    </>
  );
};

// ✅ Small reusable image loader with skeleton
const LazyImage = ({ src, alt, className }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="relative overflow-hidden rounded-3xl">
      {!loaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-3xl"></div>
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} ${!loaded ? "opacity-0" : "opacity-100"} transition-opacity duration-700`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
};

export default About;

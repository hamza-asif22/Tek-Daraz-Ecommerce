import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    if (Array.isArray(products)) {
      setLatestProducts(products.slice(0, 10));
    }
  }, [products]);

  return (
    <section className="bg-white py-16 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <Title text1={"LATEST"} text2={"PRODUCTS"} />
          <p className="text-gray-500 text-sm sm:text-base max-w-md mx-auto mt-2">
            Explore the newest arrivals in our collection — fresh tech and gadgets
            you’ll love, just dropped this week.
          </p>
        </motion.div>

        {/* Product Grid */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {latestProducts.map((item, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <ProductItem
                id={item._id}
                imageUrl={item.imageUrl}
                name={item.name}
                price={item.price}
                slug={item.slug}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            to="/products"
            className="inline-block bg-black text-white px-10 py-3 rounded-full text-sm font-medium shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            View All →
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default LatestCollection;

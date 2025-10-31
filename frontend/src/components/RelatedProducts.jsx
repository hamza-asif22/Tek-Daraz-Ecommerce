import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";
import Title from "./Title";
import { motion } from "framer-motion";

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = [...products];
      productsCopy = productsCopy.filter(
        (item) =>
          item.category === category && item.subCategory === subCategory
      );
      setRelated(productsCopy.slice(0, 5));
    }
  }, [products, category, subCategory]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="my-24 px-4 md:px-10"
    >
      {/* Section Title */}
      <div className="text-center text-3xl py-4">
        <Title text1={"RELATED"} text2={"PRODUCTS"} />
        <p className="text-gray-500 text-sm mt-2">
          Discover more items that complement your selection.
        </p>
      </div>

      {/* Related Product Grid */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.1 }}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-8 mt-8"
      >
        {related.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <ProductItem
              id={item._id}
              slug={item.slug}
              name={item.name}
              price={item.price}
              imageUrl={item.imageUrl}
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default RelatedProducts;

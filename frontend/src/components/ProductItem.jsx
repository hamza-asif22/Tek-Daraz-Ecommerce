import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ProductItem = ({ id, slug, imageUrl, name, price }) => {
  const { currency } = useContext(ShopContext);

  const productImage = Array.isArray(imageUrl)
    ? imageUrl[0]
    : imageUrl || "/placeholder.jpg";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.03 }}
      className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300"
    >
      <Link
        to={`/product/${slug}`}
        className="block text-gray-700 cursor-pointer"
      >
        {/* Image Section */}
        <div className="overflow-hidden rounded-t-2xl">
          <motion.img
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5 }}
            src={productImage}
            alt={name || "Product"}
            className="w-full h-60 object-cover"
            onError={(e) => (e.target.src = "/placeholder.jpg")}
          />
        </div>

        {/* Text Section */}
        <div className="p-4">
          <p className="font-medium text-base text-gray-800 truncate">
            {name || "Unnamed Product"}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            {currency ? `${currency}${price}` : "Price Not Available"}
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductItem;

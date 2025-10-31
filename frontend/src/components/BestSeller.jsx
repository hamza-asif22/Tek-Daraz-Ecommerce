import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';
import { motion } from 'framer-motion';

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestseller);
    setBestSeller(bestProduct.slice(0, 5));
  }, [products]);

  return (
    <motion.div
      className="my-16"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      viewport={{ once: true }}
    >
      <div className="text-center text-3xl py-8">
        <Title text1={'BEST'} text2={'SELLING'} />
        <p className="w-4/5 sm:w-2/3 mx-auto text-gray-500 text-sm mt-2 leading-relaxed">
          Discover our most popular tech picks — top-rated, in-demand products our customers love.
        </p>
      </div>

      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8"
        initial="hidden"
        whileInView="visible"
        variants={{
          visible: {
            transition: { staggerChildren: 0.15 },
          },
        }}
        viewport={{ once: true }}
      >
        {bestSeller.map((item, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
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
    </motion.div>
  );
};

export default BestSeller;

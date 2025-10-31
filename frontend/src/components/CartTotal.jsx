import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import { motion } from 'framer-motion';

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);
  const subtotal = getCartAmount();
  const total = subtotal === 0 ? 0 : subtotal + delivery_fee;

  return (
    <motion.div
      className="w-full bg-white rounded-2xl shadow-md p-6 border border-gray-100"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true }}
    >
      <div className="text-2xl mb-4">
        <Title text1={'CART'} text2={'TOTALS'} />
      </div>

      <div className="flex flex-col gap-3 text-gray-700 text-sm">
        <div className="flex justify-between">
          <p className="font-medium">Subtotal</p>
          <p>{currency} {subtotal.toFixed(2)}</p>
        </div>

        <hr className="border-gray-200" />

        <div className="flex justify-between">
          <p className="font-medium">Shipping Fee</p>
          <p>{currency} {delivery_fee.toFixed(2)}</p>
        </div>

        <hr className="border-gray-200" />

        <div className="flex justify-between text-base font-semibold text-gray-900 mt-2">
          <p>Total</p>
          <p>{currency} {total.toFixed(2)}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default CartTotal;

import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  return (
    <>
      {/* ✅ Full On-Page SEO Optimization */}
      <Helmet>
        <title>Your Shopping Cart | TekDaraz Electronics Store Pakistan</title>
        <meta
          name="description"
          content="Review your TekDaraz shopping cart — view products, update quantities, and proceed to a secure checkout. Fast delivery, trusted electronics store in Pakistan."
        />
        <meta
          name="keywords"
          content="TekDaraz cart, TekDaraz checkout, buy mobiles online, laptops, accessories, Pakistan electronics store"
        />
        <meta name="author" content="TekDaraz" />
        <meta property="og:title" content="Your Cart | TekDaraz Online Electronics Store" />
        <meta
          property="og:description"
          content="View and manage items in your TekDaraz cart. Simple, fast, and secure checkout for your favorite tech products."
        />
        <meta property="og:image" content={assets.about_img} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://www.tekdaraz.com/cart" />
      </Helmet>

      {/* MAIN CONTAINER */}
      <main className="bg-gradient-to-b from-gray-50 to-white text-gray-800 min-h-screen pt-10">
        {/* HERO SECTION */}
        <section className="relative text-center py-16 px-6 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Your <span className="text-blue-600">Shopping Cart</span>
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Review, adjust, and proceed — TekDaraz makes checkout fast, secure, and seamless.
            </p>
          </motion.div>

          {/* Animated gradient orb */}
          <div className="absolute inset-0 -z-10">
            <motion.div
              className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-blue-300/30 rounded-full blur-3xl"
              animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
              transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
            />
          </div>
        </section>

        {/* CART ITEMS SECTION */}
        <section className="container mx-auto px-6 lg:px-20 py-12">
          {cartData.length === 0 ? (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              {/* <img
                src={assets.empty_cart}
                alt="Empty Cart"
                className="mx-auto w-48 mb-6 opacity-80"
              /> */}
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                Your cart is currently empty
              </h2>
              <p className="text-gray-500 mb-6">
                Start exploring our latest electronics and add your favorites!
              </p>
              <button
                onClick={() => navigate("/")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl transition-all"
              >
                Continue Shopping
              </button>
            </motion.div>
          ) : (
            <>
              <div className="mb-10">
                <Title text1="YOUR" text2="CART" />
              </div>

              <div className="space-y-4">
                {cartData.map((item, index) => {
                  const productData = products.find((p) => p._id === item._id);
                  if (!productData) return null;
                  return (
                    <motion.div
                      key={index}
                      className="bg-white shadow-sm hover:shadow-md rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-center gap-6 border border-gray-100 transition-all duration-300"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center gap-6 w-full sm:w-auto">
                        <img
                          src={
                            Array.isArray(productData.imageUrl)
                              ? productData.imageUrl[0]
                              : productData.imageUrl
                          }
                          alt={productData.name}
                          className="w-20 h-20 object-contain rounded-lg"
                        />
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">
                            {productData.name}
                          </h3>
                          <p className="text-gray-600 mt-1">
                            {currency}
                            {productData.price}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <input
                          type="number"
                          min="1"
                          defaultValue={item.quantity}
                          onChange={(e) =>
                            e.target.value === "" || e.target.value === "0"
                              ? null
                              : updateQuantity(
                                  item._id,
                                  item.size,
                                  Number(e.target.value)
                                )
                          }
                          className="border border-gray-300 rounded-md px-3 py-2 w-16 text-center focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />
                        <img
                          src={assets.bin_icon}
                          alt="Remove"
                          className="w-5 cursor-pointer hover:scale-110 transition-transform"
                          onClick={() => updateQuantity(item._id, item.size, 0)}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* CART TOTAL SECTION */}
              <motion.div
                className="flex justify-end mt-16"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="w-full sm:w-[450px] bg-gradient-to-r from-blue-50 to-white p-8 rounded-3xl shadow-lg border border-gray-100">
                  <CartTotal />
                  <div className="text-end mt-6">
                    <button
                      onClick={() => navigate("/place-order")}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-8 py-3 rounded-xl transition-all shadow-md"
                    >
                      PROCEED TO CHECKOUT
                    </button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </section>
      </main>
    </>
  );
};

export default Cart;

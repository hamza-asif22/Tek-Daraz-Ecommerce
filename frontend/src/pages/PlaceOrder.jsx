import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const { backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } =
    useContext(ShopContext);
  const [method, setMethod] = useState("cod");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];

      Object.keys(cartItems).forEach((itemId) => {
        Object.keys(cartItems[itemId]).forEach((size) => {
          if (cartItems[itemId][size] > 0) {
            const itemInfo = structuredClone(products.find((product) => product._id === itemId));
            if (itemInfo) {
              itemInfo.size = size;
              itemInfo.quantity = cartItems[itemId][size];
              orderItems.push(itemInfo);
            }
          }
        });
      });

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      // Only Cash on Delivery active
      if (method === "cod") {
        const response = await axios.post(`${backendUrl}/api/order/place`, orderData, {
          headers: { token },
        });
        if (response.data.success) {
          setCartItems({});
          navigate("/orders");
          toast.success("Order placed successfully!");
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <>
      <Helmet>
        <title>Place Order | TekDaraz</title>
        <meta
          name="description"
          content="Place your order easily at TekDaraz. We currently offer Cash on Delivery for mobiles, laptops, and accessories across Pakistan."
        />
        <meta
          name="keywords"
          content="TekDaraz checkout, cash on delivery, place order, electronics, mobiles, laptops, accessories, Pakistan"
        />
        <meta property="og:title" content="Place Order | TekDaraz" />
        <meta
          property="og:description"
          content="Securely complete your purchase at TekDaraz with Cash on Delivery. Fast delivery, trusted electronics store in Pakistan."
        />
        <meta property="og:image" content="https://www.tekdaraz.com/assets/og-image.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.tekdaraz.com/place-order" />
        <link rel="canonical" href="https://www.tekdaraz.com/place-order" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <motion.form
        onSubmit={onSubmitHandler}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col sm:flex-row justify-between gap-8 pt-10 sm:pt-16 border-t bg-gray-50 px-4 sm:px-10 pb-16"
      >
        {/* LEFT: DELIVERY INFORMATION */}
        <div className="flex flex-col gap-4 w-full sm:max-w-[480px] bg-white shadow-sm rounded-2xl p-6 sm:p-8">
          <div className="text-xl sm:text-2xl mb-2">
            <Title text1={"DELIVERY"} text2={"INFORMATION"} />
          </div>

          <div className="flex gap-3">
            <input
              required
              onChange={onChangeHandler}
              name="firstName"
              value={formData.firstName}
              className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:ring-2 focus:ring-black outline-none"
              type="text"
              placeholder="First name"
            />
            <input
              required
              onChange={onChangeHandler}
              name="lastName"
              value={formData.lastName}
              className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:ring-2 focus:ring-black outline-none"
              type="text"
              placeholder="Last name"
            />
          </div>

          <input
            required
            onChange={onChangeHandler}
            name="email"
            value={formData.email}
            className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:ring-2 focus:ring-black outline-none"
            type="email"
            placeholder="Email address"
          />

          <input
            required
            onChange={onChangeHandler}
            name="street"
            value={formData.street}
            className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:ring-2 focus:ring-black outline-none"
            type="text"
            placeholder="Street"
          />

          <div className="flex gap-3">
            <input
              required
              onChange={onChangeHandler}
              name="city"
              value={formData.city}
              className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:ring-2 focus:ring-black outline-none"
              type="text"
              placeholder="City"
            />
            <input
              required
              onChange={onChangeHandler}
              name="state"
              value={formData.state}
              className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:ring-2 focus:ring-black outline-none"
              type="text"
              placeholder="State"
            />
          </div>

          <div className="flex gap-3">
            <input
              required
              onChange={onChangeHandler}
              name="zipcode"
              value={formData.zipcode}
              className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:ring-2 focus:ring-black outline-none"
              type="number"
              placeholder="Zipcode"
            />
            <input
              required
              onChange={onChangeHandler}
              name="country"
              value={formData.country}
              className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:ring-2 focus:ring-black outline-none"
              type="text"
              placeholder="Country"
            />
          </div>

          <input
            required
            onChange={onChangeHandler}
            name="phone"
            value={formData.phone}
            className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:ring-2 focus:ring-black outline-none"
            type="number"
            placeholder="Phone"
          />
        </div>

        {/* RIGHT: PAYMENT + SUMMARY */}
        <div className="flex flex-col gap-8 w-full sm:max-w-[420px]">
          <div className="bg-white shadow-sm rounded-2xl p-6 sm:p-8">
            <CartTotal />
          </div>

          <div className="bg-white shadow-sm rounded-2xl p-6 sm:p-8">
            <Title text1={"PAYMENT"} text2={"METHOD"} />

            <div className="flex flex-col gap-4 mt-4">
              {/* 
              <div
                onClick={() => setMethod("stripe")}
                className={`flex items-center gap-3 border p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                  method === "stripe" ? "border-black shadow-md" : "border-gray-300"
                }`}
              >
                <div
                  className={`min-w-3.5 h-3.5 rounded-full border ${
                    method === "stripe" ? "bg-green-500" : ""
                  }`}
                ></div>
                <img className="h-5 mx-3" src={assets.stripe_logo} alt="Stripe" />
              </div>

              <div
                onClick={() => setMethod("razorpay")}
                className={`flex items-center gap-3 border p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                  method === "razorpay" ? "border-black shadow-md" : "border-gray-300"
                }`}
              >
                <div
                  className={`min-w-3.5 h-3.5 rounded-full border ${
                    method === "razorpay" ? "bg-green-500" : ""
                  }`}
                ></div>
                <img className="h-5 mx-3" src={assets.razorpay_logo} alt="Razorpay" />
              </div>
              */}

              {/* Only Cash on Delivery active */}
              <div
                onClick={() => setMethod("cod")}
                className={`flex items-center gap-3 border p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                  method === "cod" ? "border-black shadow-md" : "border-gray-300"
                }`}
              >
                <div
                  className={`min-w-3.5 h-3.5 rounded-full border ${
                    method === "cod" ? "bg-green-500" : ""
                  }`}
                ></div>
                <p className="text-gray-600 text-sm font-medium">CASH ON DELIVERY</p>
              </div>
            </div>

            <div className="w-full text-end mt-8">
              <button
                type="submit"
                className="bg-black hover:bg-gray-800 text-white font-medium px-12 py-3 rounded-xl transition-all duration-300"
              >
                PLACE ORDER
              </button>
            </div>
          </div>
        </div>
      </motion.form>
    </>
  );
};

export default PlaceOrder;

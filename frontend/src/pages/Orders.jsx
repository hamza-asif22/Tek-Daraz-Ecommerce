import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { PackageSearch, Loader2 } from "lucide-react";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrderData = async () => {
    try {
      if (!token) return;

      const response = await axios.post(
        backendUrl + "/api/order/userOrders",
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        let allOrderItems = [];
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = order.date;
            allOrderItems.push(item);
          });
        });
        setOrderData(allOrderItems.reverse());
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <>
      <Helmet>
        <title>My Orders | TekDaraz</title>
        <meta
          name="description"
          content="Track your TekDaraz orders and stay updated with real-time status, payment details, and delivery updates for your electronics purchases."
        />
        <meta
          name="keywords"
          content="TekDaraz orders, order tracking, purchase history, electronics orders Pakistan, tech delivery"
        />
        <meta property="og:title" content="My Orders | TekDaraz" />
        <meta
          property="og:description"
          content="View and track your TekDaraz electronics orders easily. Stay informed about your shipment and delivery updates."
        />
        <meta property="og:image" content="https://www.tekdaraz.com/assets/og-image.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.tekdaraz.com/orders" />
        <link rel="canonical" href="https://www.tekdaraz.com/orders" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="border-t pt-16 pb-20 bg-gray-50 min-h-screen">
        <div className="text-2xl text-center mb-10">
          <Title text1={"MY"} text2={"ORDERS"} />
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin text-gray-600 w-8 h-8" />
          </div>
        ) : orderData.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-gray-600 py-24">
            <PackageSearch size={48} className="mb-3 text-gray-400" />
            <p className="text-lg font-medium">You haven’t placed any orders yet.</p>
            <p className="text-sm text-gray-500 mt-1">
              Start shopping today to see your orders here.
            </p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm p-6 sm:p-10"
          >
            {orderData.map((item, index) => (
              <div
                key={index}
                className="py-4 border-b border-gray-200 text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:bg-gray-50 transition-all duration-200 rounded-lg px-2"
              >
                {/* Product Section */}
                <div className="flex items-start gap-5 text-sm sm:text-base">
                  <img
                    className="w-16 sm:w-20 rounded-lg border"
                    src={Array.isArray(item.imageUrl) ? item.imageUrl[0] : item.imageUrl}
                    alt={item.name}
                    onError={(e) => (e.target.src = "/placeholder.png")}
                  />

                  <div>
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                      <p>
                        {currency}
                        {item.price}
                      </p>
                      <p>Qty: {item.quantity}</p>
                      {item.size && <p>Size: {item.size}</p>}
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      Date:{" "}
                      <span className="font-medium text-gray-700">
                        {new Date(item.date).toDateString()}
                      </span>
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      Payment:{" "}
                      <span className="font-medium text-gray-700">{item.paymentMethod}</span>
                    </p>
                  </div>
                </div>

                {/* Status + Button */}
                <div className="flex items-center justify-between md:w-1/3 gap-4">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-3 h-3 rounded-full ${
                        item.status === "Delivered"
                          ? "bg-green-500"
                          : item.status === "Pending"
                          ? "bg-yellow-500"
                          : "bg-blue-500"
                      }`}
                    ></span>
                    <p className="text-sm font-medium">{item.status}</p>
                  </div>
                  <button
                    onClick={loadOrderData}
                    className="border border-gray-400 text-sm font-medium px-4 py-2 rounded-lg hover:bg-black hover:text-white transition-all duration-300"
                  >
                    Track
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </>
  );
};

export default Orders;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return;
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        { headers: { token } }
      );
      if (response.data.success) setOrders(response.data.orders);
      else toast.error(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/status`,
        { orderId, status: event.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success('Order status updated');
        await fetchAllOrders();
      } else toast.error(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update status');
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="px-4 md:px-8 w-full md:w-[125%] py-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
        Orders
      </h2>

      <div className="flex flex-col gap-5">
        {orders.map((order, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row justify-between bg-white shadow-md rounded-lg border border-gray-200 p-5 md:p-6 hover:shadow-lg transition"
          >
            {/* Icon + Items */}
            <div className="flex gap-4 md:w-2/5">
              <img
                className="w-14 h-14 object-contain"
                src={assets.parcel_icon}
                alt="Parcel Icon"
              />
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">
                  Items ({order.items.length})
                </h3>
                {order.items.map((item, idx) => (
                  <p key={idx} className="text-gray-600 text-sm">
                    {item.name} (x {item.quantity}) {item.size && `(${item.size})`}
                  </p>
                ))}
              </div>
            </div>

            {/* Customer Info */}
            <div className="mt-4 md:mt-0 md:w-2/5">
              <h4 className="font-semibold text-gray-800 mb-1">
                {order.address.firstName} {order.address.lastName}
              </h4>
              <p className="text-gray-600 text-sm">
                {order.address.street}, {order.address.city}, {order.address.state}
              </p>
              <p className="text-gray-600 text-sm">
                {order.address.country} - {order.address.zipcode}
              </p>
              <p className="text-gray-600 text-sm mt-1">📞 {order.address.phone}</p>
            </div>

            {/* Order Info */}
            <div className="mt-4 md:mt-0 flex flex-col gap-1 text-gray-700 md:w-1/5">
              <p>
                <span className="font-semibold">Payment:</span> {order.payment}
              </p>
              <p>
                <span className="font-semibold">Method:</span> {order.paymentMethod}
              </p>
              <p>
                <span className="font-semibold">Date:</span>{' '}
                {new Date(order.date).toLocaleDateString()}
              </p>
              <p className="font-semibold text-gray-800">
                {currency}
                {order.amount}
              </p>
            </div>

            {/* Status Selector */}
            <div className="mt-4 md:mt-0 md:w-1/5 flex items-center">
              <select
                onChange={(event) => statusHandler(event, order._id)}
                value={order.status}
                className="w-full p-2 rounded-md border border-gray-300 text-gray-700 font-semibold hover:border-gray-500 transition"
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;

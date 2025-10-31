import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'

const List = ({ token }) => {
  const [list, setList] = useState([])

  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`)
      if (response.data.success) {
        setList(response.data.products)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  const removeProduct = async (id) => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        toast.error('Authentication token not found')
        return
      }

      const response = await axios.post(
        `${backendUrl}/api/product/remove`,
        { id },
        { headers: { token } }
      )

      if (response.data.success) {
        toast.success(response.data.message)
        await fetchList()
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.error(error)
      toast.error(error.response?.data?.message || error.message)
    }
  }

  return (
    <div className="w-full md:w-[155%] mx-auto mt-6 px-4">
      <p className="mb-4 font-bold text-3xl text-gray-800 border-b pb-2">
        All Products List
      </p>

      <div className="flex flex-col gap-4">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-3 px-4 border bg-gray-100 text-sm font-semibold text-gray-700 rounded-md">
          <span>Image</span>
          <span>Name</span>
          <span>Category</span>
          <span>Price</span>
          <span className="text-center">Action</span>
        </div>

        {/* Product Rows */}
        {list.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-3 py-3 px-4 border rounded-md hover:shadow-sm transition"
          >
            <img
              className="w-14 h-14 object-cover rounded-md"
              src={item.imageUrl?.[0] || 'default-image-url'}
              alt={item.name}
            />
            <p className="font-medium text-gray-800">{item.name}</p>
            <p className="text-gray-600">{item.category}</p>
            <p className="text-gray-800 font-semibold">
              {currency}
              {item.price}
            </p>
            <p
              onClick={() => removeProduct(item._id)}
              className="text-center text-red-500 font-bold cursor-pointer text-lg hover:text-red-700"
            >
              ✕
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default List

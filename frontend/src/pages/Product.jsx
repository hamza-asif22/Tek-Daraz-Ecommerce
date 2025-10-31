import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";

const Product = () => {
  const { slug } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const fetchProductData = () => {
    const product = products.find((item) => item.slug === slug);
    if (product) {
      const imageArray = Array.isArray(product.imageUrl)
        ? product.imageUrl
        : product.imageUrl
        ? [product.imageUrl]
        : [];
      setProductData({ ...product, image: imageArray });
      setImage(imageArray[0]);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [slug, products]);

  if (!productData) return <div className="opacity-0"></div>;

  return (
    <>
      <Helmet>
        <title>{`${productData.name} | TekDaraz`}</title>
        <meta
          name="description"
          content={`Buy ${productData.name} at TekDaraz. Explore premium ${productData.category} with best prices and cash on delivery in Pakistan.`}
        />
        <meta
          name="keywords"
          content={`TekDaraz, ${productData.name}, ${productData.category}, ${productData.subCategory}, electronics, Pakistan`}
        />
        <meta property="og:title" content={`${productData.name} | TekDaraz`} />
        <meta property="og:image" content={productData.image[0]} />
        <meta
          property="og:description"
          content={`Shop ${productData.name} now on TekDaraz with fast delivery & cash on delivery.`}
        />
        <meta
          property="og:url"
          content={`https://www.tekdaraz.com/product/${productData.slug}`}
        />
        <link
          rel="canonical"
          href={`https://www.tekdaraz.com/product/${productData.slug}`}
        />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <motion.div
        className="border-t-2 pt-10 px-4 sm:px-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Product Section */}
        <div className="flex flex-col sm:flex-row gap-12">
          {/* Left Section: Images */}
          <motion.div
            className="flex-1 flex flex-col sm:flex-row gap-3"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Thumbnails */}
            <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-auto sm:w-[20%] w-full gap-2">
              {productData.image.map((item, index) => (
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setImage(item)}
                  src={item}
                  key={index}
                  className={`w-24 h-24 object-cover cursor-pointer rounded-xl border transition-all duration-300 ${
                    image === item
                      ? "border-orange-500 shadow-lg scale-105"
                      : "border-gray-200 hover:border-orange-400"
                  }`}
                  alt={`Thumbnail ${index + 1}`}
                />
              ))}
            </div>

            {/* Main Image */}
            <div className="w-full sm:w-[80%] flex justify-center items-center relative">
              <AnimatePresence mode="wait">
                <motion.img
                  key={image}
                  src={image}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-auto max-h-[600px] object-contain border border-gray-200 rounded-2xl shadow-md cursor-zoom-in hover:scale-[1.03] transition-transform duration-500"
                  alt={productData.name}
                />
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Right Section: Product Details */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-semibold text-3xl mt-2 tracking-tight">
              {productData.name}
            </h1>

            <div className="flex items-center gap-1 mt-3">
              {[...Array(4)].map((_, i) => (
                <img key={i} src={assets.star_icon} className="w-4" alt="Star" />
              ))}
              <img src={assets.star_dull_icon} className="w-4" alt="Dull Star" />
              <p className="pl-2 text-gray-600 text-sm">122 Reviews</p>
            </div>

            <p className="mt-5 text-3xl font-semibold text-gray-800">
              {currency}
              {productData.price}
            </p>

            <p className="mt-5 text-gray-600 leading-relaxed">
              {productData.description}
            </p>

            {/* Size Options */}
            {productData.sizes?.length > 0 && (
              <div className="flex flex-col gap-4 my-8">
                <p className="font-medium text-gray-700">Select Size</p>
                <div className="flex gap-2 flex-wrap">
                  {productData.sizes.map((item, index) => (
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSize(item)}
                      key={index}
                      className={`py-2 px-5 border rounded-lg text-sm transition-all duration-300 ${
                        item === size
                          ? "border-orange-500 bg-orange-50 text-orange-600"
                          : "border-gray-300 hover:border-orange-400"
                      }`}
                    >
                      {item}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{
                scale: 1.03,
                boxShadow: "0px 4px 20px rgba(255, 128, 0, 0.3)",
              }}
              onClick={() => addToCart(productData._id, size)}
              className="bg-black text-white px-10 py-3 text-sm rounded-lg shadow-md hover:bg-gray-800 transition-all duration-300"
            >
              ADD TO CART
            </motion.button>

            <hr className="mt-8 sm:w-4/5" />

            <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
              <p>✅ 100% Original product.</p>
              <p>🚚 Cash on delivery available.</p>
              <p>🔁 Easy return & exchange policy within 7 days.</p>
            </div>
          </motion.div>
        </div>

        {/* Description and Reviews */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex">
            <b className="border px-5 py-3 text-sm bg-gray-100">Description</b>
            <p className="border px-5 py-3 text-sm cursor-pointer">
              Reviews (122)
            </p>
          </div>
          <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-600 leading-relaxed bg-white rounded-b-xl">
            <p>
              TekDaraz brings you premium quality products directly from
              verified sellers. Enjoy smooth online shopping with fast delivery,
              authentic products, and the best customer experience.
            </p>
            <p>
              Our electronics collection is carefully curated for performance,
              reliability, and modern design — all backed by TekDaraz’s trusted
              service.
            </p>
          </div>
        </motion.div>

        {/* Related Products */}
        <RelatedProducts
          category={productData.category}
          subCategory={productData.subCategory}
        />
      </motion.div>
    </>
  );
};

export default Product;

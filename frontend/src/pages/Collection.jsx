import React, { useState, useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");
  const [loading, setLoading] = useState(true); // ✅ loading state

  // ✅ Toggle category
  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  // ✅ Toggle subcategory
  const toggleSubCategory = (e) => {
    const value = e.target.value;
    setSubCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  // ✅ Filter and sort products
  const updateProducts = () => {
    if (!products || products.length === 0) return;

    let productsCopy = [...products];

    // Search
    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Category
    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    // Subcategory
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    // Sort
    switch (sortType) {
      case "low-high":
        productsCopy.sort((a, b) => a.price - b.price);
        break;
      case "high-low":
        productsCopy.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilterProducts(productsCopy);
    setLoading(false);
  };

  // ✅ Update when filters change
  useEffect(() => {
    updateProducts();
  }, [category, subCategory, search, showSearch, products, sortType]);

  // ✅ Handle loading
  if (loading || !products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] text-center">
        <motion.img
          src={assets.NavBarLogo}
          alt="TekDaraz Logo"
          className="w-24 mb-6 opacity-80"
          initial={{ scale: 0.8, opacity: 0.6 }}
          animate={{ scale: [0.8, 1, 0.8], opacity: [0.6, 1, 0.6] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        />
        <p className="text-gray-500 font-medium animate-pulse">
          Loading your collection...
        </p>
      </div>
    );
  }

  return (
    <>
      {/* ✅ SEO Tags */}
      <Helmet>
        <title>Shop Collection | TekDaraz Electronics in Pakistan</title>
        <meta
          name="description"
          content="Discover TekDaraz’s full collection of mobiles, laptops, and tech accessories. Filter by category and price for the latest tech deals."
        />
        <meta
          name="keywords"
          content="TekDaraz, mobiles, laptops, accessories, online electronics, Pakistan tech store"
        />
        <meta name="author" content="TekDaraz" />
        <meta property="og:title" content="TekDaraz | Tech Collection" />
        <meta
          property="og:description"
          content="Explore top-quality tech — mobiles, laptops, and accessories available across Pakistan."
        />
        <meta property="og:image" content={assets.about_img} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://www.tekdaraz.com/collection" />
      </Helmet>

      {/* ✅ MAIN */}
      <main className="bg-gradient-to-b from-gray-50 to-white text-gray-800 min-h-screen border-t pt-10">
        {/* HEADER */}
        <section className="relative text-center py-16 px-6 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Our <span className="text-blue-600">Collection</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-gray-600">
              Explore the latest tech trends — curated with quality and
              performance for every lifestyle.
            </p>
          </motion.div>

          {/* Floating gradient light */}
          <div className="absolute inset-0 -z-10">
            <motion.div
              className="absolute top-1/4 left-1/3 w-[450px] h-[450px] bg-blue-300/30 rounded-full blur-3xl"
              animate={{ x: [0, 80, 0], y: [0, 40, 0] }}
              transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
            />
          </div>
        </section>

        {/* FILTER + PRODUCTS */}
        <section className="container mx-auto px-6 lg:px-20 flex flex-col sm:flex-row gap-10 pb-20">
          {/* FILTERS */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="min-w-60"
          >
            {/* Mobile filter toggle */}
            <button
              onClick={() => setShowFilter(!showFilter)}
              className="my-2 text-xl flex items-center justify-between w-full sm:hidden font-semibold text-blue-700"
            >
              FILTERS
              <img
                src={assets.dropdown_icon}
                alt=""
                className={`w-4 transform transition-transform ${
                  showFilter ? "rotate-90" : ""
                }`}
              />
            </button>

            {/* Desktop filters */}
            <div
              className={`space-y-6 border-t pt-4 ${
                showFilter ? "block" : "hidden sm:block"
              }`}
            >
              {/* Category */}
              <div className="border border-gray-200 p-5 rounded-2xl shadow-sm bg-white hover:shadow-md transition-all duration-200">
                <h3 className="mb-3 text-sm font-semibold text-blue-700">
                  CATEGORIES
                </h3>
                <div className="flex flex-col gap-2 text-sm text-gray-600">
                  {["Mobile", "Laptop", "Accessories"].map((cat) => (
                    <label key={cat} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        onChange={toggleCategory}
                        value={cat}
                        className="w-3 accent-blue-600"
                      />
                      {cat}
                    </label>
                  ))}
                </div>
              </div>

              {/* Subcategory */}
              <div className="border border-gray-200 p-5 rounded-2xl shadow-sm bg-white hover:shadow-md transition-all duration-200">
                <h3 className="mb-3 text-sm font-semibold text-blue-700">TYPE</h3>
                <div className="flex flex-col gap-2 text-sm text-gray-600">
                  {[
                    "Mobiles & Tablets",
                    "Laptops & Computers",
                    "Accessories & Peripherals",
                  ].map((sub) => (
                    <label key={sub} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        onChange={toggleSubCategory}
                        value={sub}
                        className="w-3 accent-blue-600"
                      />
                      {sub}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* PRODUCTS */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            {/* Header with sorting */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
              <Title text1="ALL" text2="COLLECTIONS" />

              <select
                onChange={(e) => setSortType(e.target.value)}
                value={sortType}
                className="border-2 border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 transition-all"
              >
                <option value="relevant">Sort by: Relevant</option>
                <option value="low-high">Sort by: Low to High</option>
                <option value="high-low">Sort by: High to Low</option>
              </select>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filterProducts.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <ProductItem
                    name={item.name}
                    id={item._id}
                    slug={item.slug}
                    price={item.price}
                    imageUrl={item.imageUrl}
                  />
                </motion.div>
              ))}
            </div>

            {/* Empty State */}
            {filterProducts.length === 0 && (
              <div className="text-center py-20">
                <img
                  src={assets.empty_cart}
                  alt="No Products Found"
                  className="mx-auto w-40 opacity-70 mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-700">
                  No products found
                </h3>
                <p className="text-gray-500 mt-2">
                  Try adjusting your filters or search to find what you need.
                </p>
              </div>
            )}
          </motion.div>
        </section>
      </main>
    </>
  );
};

export default Collection;

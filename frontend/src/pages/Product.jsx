// import React, { useContext, useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { ShopContext } from "../context/ShopContext";
// import { assets } from "../assets/assets";
// import RelatedProducts from "../components/RelatedProducts";
// import { Helmet } from "react-helmet-async";
// import { motion, AnimatePresence } from "framer-motion";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// const Product = () => {
//   const { slug } = useParams();
//   const { products, currency, addToCart } = useContext(ShopContext);

//   const [productData, setProductData] = useState(null);
//   const [image, setImage] = useState("");
//   const [size, setSize] = useState("");

 
//   const [metaDescription, setMetaDescription] = useState("");
//   const [keywords, setKeywords] = useState("");

//   // Zoom
//   const [isZoomOpen, setIsZoomOpen] = useState(false);

//   // Fetch Product Data
//   const fetchProductData = () => {
//     const product = products.find((item) => item.slug === slug);
//     if (product) {
//       const imageArray = Array.isArray(product.imageUrl)
//         ? product.imageUrl
//         : product.imageUrl
//         ? [product.imageUrl]
//         : [];

//       setProductData({ ...product, image: imageArray });
//       setImage(imageArray[0]);
//     }
//   };

//   useEffect(() => {
//     fetchProductData();
//   }, [slug, products]);


// const generateSEO = async () => {
//   if (!productData) return;

//   const cacheKey = `seo_${productData.slug}`;
//   const cached = localStorage.getItem(cacheKey);

//   const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;

//   // ✅ USE CACHE IF STILL FRESH
//   if (cached) {
//     const parsed = JSON.parse(cached);

//     if (Date.now() - parsed.updatedAt < SEVEN_DAYS) {
//       setMetaDescription(parsed.meta_description);
//       setKeywords(parsed.keywords);
//       return;
//     }
//   }

//   try {
//     const genAI = new GoogleGenerativeAI(
//       import.meta.env.VITE_GEMINI_API_KEY
//     );

//     const model = genAI.getGenerativeModel({
//       model: "gemini-2.5-flash",
//     });

//     const prompt = `
// You are an advanced AI that generates SEO metadata for eCommerce products.

// Return:
// 1. meta_description (200–250 chars, high CTR)
// 2. long-tail + trending Pakistani keywords (comma-separated, no line breaks)

// Product:
// Name: ${productData.name}
// Category: ${productData.category}
// Sub Category: ${productData.subCategory}
// Description: ${productData.description}

// Rules:
// - Keywords must be Pakistan-focused
// - Include buyer-intent & long-tail keywords
// - No markdown
// - Return ONLY valid JSON

// {
//   "meta_description": "...",
//   "keywords": "..., ..., ..."
// }
// `;

//     const result = await model.generateContent(prompt);

//     let text = result.response.text()
//       .replace(/```json/g, "")
//       .replace(/```/g, "")
//       .trim();

//     const parsed = JSON.parse(text);

//     setMetaDescription(parsed.meta_description);
//     setKeywords(parsed.keywords);

//     // ✅ SAVE WITH TIMESTAMP
//     localStorage.setItem(
//       cacheKey,
//       JSON.stringify({
//         meta_description: parsed.meta_description,
//         keywords: parsed.keywords,
//         updatedAt: Date.now(),
//       })
//     );

//   } catch (error) {
//     console.error("Gemini SEO Error:", error);
//   }
// };



//   useEffect(() => {
//   if (productData) {
//     generateSEO();
//   }
// }, [productData]);


//   if (!productData) return <div className="opacity-0"></div>;

//   return (
//     <>
//       <Helmet>
//         <title>{`${productData.name} | TekDaraz`}</title>

//         <meta
//           name="description"
//           content={
//             metaDescription ||
//             `Buy ${productData.name} at TekDaraz with best prices in Pakistan.`
//           }
//         />

//         <meta
//           name="keywords"
//           content={
//             keywords ||
//             `${productData.name}, ${productData.category}, TekDaraz Pakistan`
//           }
//         />

//         <meta property="og:title" content={`${productData.name} | TekDaraz`} />
//         <meta property="og:image" content={productData.image[0]} />

//         <meta
//           property="og:description"
//           content={
//             metaDescription ||
//             `Order ${productData.name} with fast delivery in Pakistan.`
//           }
//         />

//         <meta
//           property="og:url"
//           content={`https://www.tekdaraz.com/product/${productData.slug}`}
//         />

//         <link
//           rel="canonical"
//           href={`https://www.tekdaraz.com/product/${productData.slug}`}
//         />
//       </Helmet>

//       {/* Zoom Modal */}
//       <AnimatePresence>
//         {isZoomOpen && (
//           <motion.div
//             className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-[9999] p-4"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <button
//               onClick={() => setIsZoomOpen(false)}
//               className="absolute top-5 right-5 text-white text-3xl font-bold"
//             >
//               ✕
//             </button>
//             <motion.img
//               src={image}
//               className="max-h-[95vh] w-auto object-contain rounded-lg"
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//             />
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <motion.div
//         className="border-t-2 pt-10 px-4 sm:px-10"
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//       >
//         <div className="flex flex-col sm:flex-row gap-12">

//           {/* Images */}
//           <motion.div
//             className="flex-1 flex flex-col sm:flex-row gap-3"
//             initial={{ opacity: 0, x: -40 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6 }}
//           >
//             <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-auto sm:w-[20%] w-full gap-2">
//               {productData.image.map((item, index) => (
//                 <motion.img
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={() => setImage(item)}
//                   src={item}
//                   key={index}
//                   className={`w-24 h-24 object-cover cursor-pointer rounded-xl border transition-all duration-300 ${
//                     image === item
//                       ? "border-orange-500 shadow-lg scale-105"
//                       : "border-gray-200 hover:border-orange-400"
//                   }`}
//                   alt={`Thumbnail ${index + 1}`}
//                 />
//               ))}
//             </div>

//             <div className="w-full sm:w-[80%] flex justify-center items-center relative p-4">
//               <AnimatePresence mode="wait">
//                 <motion.img
//                   key={image}
//                   src={image}
//                   onClick={() => setIsZoomOpen(true)}
//                   initial={{ opacity: 0, scale: 0.95 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   exit={{ opacity: 0, scale: 0.95 }}
//                   transition={{ duration: 0.4 }}
//                   className="w-full h-auto max-h-[700px] object-contain rounded-2xl shadow-md cursor-zoom-in"
//                   alt={productData.name}
//                 />
//               </AnimatePresence>
//             </div>
//           </motion.div>

//           {/* PRODUCT INFO */}
//           <motion.div
//             className="flex-1"
//             initial={{ opacity: 0, x: 40 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6 }}
//           >
//             <h1 className="font-semibold text-3xl mt-2 tracking-tight">
//               {productData.name}
//             </h1>

//             <div className="flex items-center gap-1 mt-3">
//               {[...Array(4)].map((_, i) => (
//                 <img key={i} src={assets.star_icon} className="w-4" />
//               ))}
//               <img src={assets.star_dull_icon} className="w-4" />
//               <p className="pl-2 text-gray-600 text-sm">122 Reviews</p>
//             </div>

//             <p className="mt-5 text-3xl font-semibold text-gray-800">
//               {currency}
//               {productData.price}
//             </p>

//             {productData.sizes?.length > 0 && (
//               <div className="flex flex-col gap-4 my-8">
//                 <p className="font-medium text-gray-700">Select Size</p>
//                 <div className="flex gap-2 flex-wrap">
//                   {productData.sizes.map((item, index) => (
//                     <motion.button
//                       whileTap={{ scale: 0.95 }}
//                       onClick={() => setSize(item)}
//                       key={index}
//                       className={`py-2 px-5 border rounded-lg text-sm transition-all duration-300 ${
//                         item === size
//                           ? "border-orange-500 bg-orange-50 text-orange-600"
//                           : "border-gray-300 hover:border-orange-400"
//                       }`}
//                     >
//                       {item}
//                     </motion.button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             <motion.button
//               whileTap={{ scale: 0.95 }}
//               whileHover={{
//                 scale: 1.03,
//                 boxShadow: "0px 4px 20px rgba(255, 128, 0, 0.3)",
//               }}
//               onClick={() => addToCart(productData._id, size)}
//               className="bg-black text-white px-10 py-3 text-sm rounded-lg shadow-md hover:bg-gray-800"
//             >
//               ADD TO CART
//             </motion.button>

//             <hr className="mt-8 sm:w-4/5" />

//             <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
//               <p>✅ 100% Original product.</p>
//               <p>🚚 Cash on delivery available.</p>
//               <p>🔁 Easy return & exchange policy within 7 days.</p>
//             </div>
//           </motion.div>
//         </div>

//         {/* Description */}
//         <motion.div
//           className="mt-20"
//           initial={{ opacity: 0, y: 40 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <div className="flex">
//             <b className="border px-5 py-3 text-sm bg-gray-100">Description</b>
//             <p className="border px-5 py-3 text-sm cursor-pointer">
//               Reviews (122)
//             </p>
//           </div>

//           <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-600 leading-relaxed bg-white rounded-b-xl">
//             {productData.description
//               ?.split("\n")
//               .map((line, i) => (
//                 <p key={i} className="flex gap-2">
//                   {line.trim().startsWith("-") ||
//                   line.trim().startsWith("•") ? (
//                     <>
//                       <span>•</span>
//                       <span>{line.replace(/^[-•]\s*/, "")}</span>
//                     </>
//                   ) : (
//                     line
//                   )}
//                 </p>
//               ))}
//           </div>
//         </motion.div>

//         <RelatedProducts
//           category={productData.category}
//           subCategory={productData.subCategory}
//         />
//       </motion.div>
//     </>
//   );
// };

// export default Product;



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
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  // Fetch Product Data
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
  useEffect(() => {
  if (productData) {
    console.log("Fetched productData from context:", productData);
  }
}, [productData]);

  if (!productData) return <div className="opacity-0"></div>;

  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>{`${productData.name} | TekDaraz`}</title>

        <meta
          name="description"
          content={
            productData.metaDescription ||
            productData.description?.slice(0, 155) ||
            `Buy ${productData.name} at TekDaraz with best prices in Pakistan.`
          }
        />

        <meta
          name="keywords"
          content={
            productData.keywords ||
            `${productData.name}, ${productData.category}, ${productData.subCategory}, TekDaraz Pakistan`
          }
        />

        <meta property="og:title" content={`${productData.name} | TekDaraz`} />
        <meta property="og:image" content={productData.image[0] || assets.default_product} />
        <meta
          property="og:description"
          content={
            productData.metaDescription ||
            productData.description?.slice(0, 155) ||
            `Order ${productData.name} with fast delivery in Pakistan.`
          }
        />
        <meta property="og:url" content={`https://www.tekdaraz.com/product/${productData.slug}`} />
        <meta property="og:type" content="product" />

        <link rel="canonical" href={`https://www.tekdaraz.com/product/${productData.slug}`} />
      </Helmet>

      {/* Zoom Modal */}
      <AnimatePresence>
        {isZoomOpen && (
          <motion.div
            className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-[9999] p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              onClick={() => setIsZoomOpen(false)}
              className="absolute top-5 right-5 text-white text-3xl font-bold"
            >
              ✕
            </button>
            <motion.img
              src={image}
              className="max-h-[95vh] w-auto object-contain rounded-lg"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="border-t-2 pt-10 px-4 sm:px-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col sm:flex-row gap-12">

          {/* Images */}
          <motion.div
            className="flex-1 flex flex-col sm:flex-row gap-3"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
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

            <div className="w-full sm:w-[80%] flex justify-center items-center relative p-4">
              <AnimatePresence mode="wait">
                <motion.img
                  key={image}
                  src={image}
                  onClick={() => setIsZoomOpen(true)}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-auto max-h-[700px] object-contain rounded-2xl shadow-md cursor-zoom-in"
                  alt={productData.name}
                />
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Product Info */}
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
                <img key={i} src={assets.star_icon} className="w-4" />
              ))}
              <img src={assets.star_dull_icon} className="w-4" />
              <p className="pl-2 text-gray-600 text-sm">122 Reviews</p>
            </div>

            <p className="mt-5 text-3xl font-semibold text-gray-800">
              {currency}
              {productData.price}
            </p>

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
              className="bg-black text-white px-10 py-3 text-sm rounded-lg shadow-md hover:bg-gray-800"
            >
              ADD TO CART
            </motion.button>

            <hr className="mt-8 sm:w-4/5" />

            <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
              <p>100% Original product.</p>
              <p>Cash on delivery available.</p>
              <p>Easy return & exchange policy within 7 days.</p>
            </div>
          </motion.div>
        </div>

        {/* Description */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex">
            <b className="border px-5 py-3 text-sm bg-gray-100">Description</b>
            
          </div>

          <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-600 leading-relaxed bg-white rounded-b-xl">
            {productData.description
              ?.split("\n")
              .map((line, i) => (
                <p key={i} className="flex gap-2">
                  {line.trim().startsWith("-") || line.trim().startsWith("•") ? (
                    <>
                      <span>•</span>
                      <span>{line.replace(/^[-•]\s*/, "")}</span>
                    </>
                  ) : (
                    line
                  )}
                </p>
              ))}
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

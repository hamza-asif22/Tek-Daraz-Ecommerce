import { v2 as cloudinary } from 'cloudinary';
import productModel from '../models/productModel.js';
import slugify from 'slugify';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY
});

// ✅ Add Product
const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

    // Upload images
    const images = [
      req.files.image1?.[0],
      req.files.image2?.[0],
      req.files.image3?.[0],
      req.files.image4?.[0]
    ].filter(Boolean);

    const imageUrl = await Promise.all(
      images.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, { resource_type: 'image' });
        return result.secure_url;
      })
    );

    // ✅ Generate unique slug
    let baseSlug = slugify(name, { lower: true, strict: true });
    let slug = baseSlug;
    let existing = await productModel.findOne({ slug });
    if (existing) {
      const randomStr = Math.random().toString(36).substring(2, 6);
      slug = `${baseSlug}-${randomStr}`;
    }

    // ✅ Build product data
    const productData = {
      name,
      slug,
      description,
      price: Number(price),
      category,
      subCategory,
      bestseller: bestseller === 'true',
      sizes: sizes ? JSON.parse(sizes) : [],
      imageUrl,
      date: Date.now()
    };

    // Save to DB
    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, message: 'Product added successfully', product });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// ✅ List All Products
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// ✅ Remove Product
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: 'Product removed successfully' });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// ✅ Get Product by ID
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    res.json({ success: true, product });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// ✅ Get Product by Slug (for frontend `/product/:slug`)
const getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const product = await productModel.findOne({ slug });
    if (!product) {
      return res.json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, product });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export { listProducts, addProduct, removeProduct, singleProduct, getProductBySlug };


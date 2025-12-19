import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";
import slugify from "slugify";
import { GoogleGenerativeAI } from "@google/generative-ai";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


const generateProductSEO = async (productData) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const prompt = `
Generate SEO metadata for a Pakistan-based eCommerce product.

Product:
Name: ${productData.name}
Category: ${productData.category}
Sub Category: ${productData.subCategory}
Description: ${productData.description}

Return JSON with:
{
  "meta_description": "short 200-250 char description",
  "keywords": "comma-separated long-tail keywords focused on Pakistan and eCommerce"
}
`;

    const result = await model.generateContent(prompt);
    let text = result.response.text().trim();
    text = text.replace(/```json/g, "").replace(/```/g, "").trim();

    const parsed = JSON.parse(text);

    return {
      metaDescription: parsed.meta_description,
      keywords: parsed.keywords,
    };
  } catch (err) {
    console.warn("AI SEO fallback:", err);
    return {
      metaDescription: `Buy ${productData.name} in Pakistan at the best price. Premium quality ${productData.category} with fast delivery. Delivered all over Pakistan.`,
      keywords: `buy ${productData.name}, ${productData.category}, ${productData.subCategory}, best price pakistan, online shopping pakistan, ecommerce pakistan, tech store pakistan, electronics pakistan`,
    };
  }
};


const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, subCategory, sizes, bestseller } =
      req.body;

    
    const images = [
      req.files?.image1?.[0],
      req.files?.image2?.[0],
      req.files?.image3?.[0],
      req.files?.image4?.[0],
    ].filter(Boolean);

    const imageUrl = await Promise.all(
      images.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    
    let baseSlug = slugify(name, { lower: true, strict: true });
    let slug = baseSlug;
    const exists = await productModel.findOne({ slug });
    if (exists) {
      slug = `${baseSlug}-${Math.random().toString(36).slice(2, 6)}`;
    }

    
    console.log("Generating SEO for:", name);
    const seoData = await generateProductSEO({ name, description, category, subCategory });

    const product = new productModel({
      name,
      slug,
      description,
      price: Number(price),
      category,
      subCategory,
      bestseller: bestseller === "true",
      sizes: sizes ? JSON.parse(sizes) : [],
      imageUrl,
      date: Date.now(),
      metaDescription: seoData.metaDescription,
      keywords: seoData.keywords,
    });

    await product.save();

    res.json({
      success: true,
      message: "Product added successfully with SEO",
      product,
      seo: seoData,
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};


const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const product = await productModel.findById(id);
    if (!product)
      return res.json({ success: false, message: "Product not found" });

    const seoChanged =
      updateData.name !== product.name ||
      updateData.description !== product.description ||
      updateData.category !== product.category ||
      updateData.subCategory !== product.subCategory;

    if (seoChanged) {
      console.log("🔄 Regenerating SEO...");
      const seoData = await generateProductSEO({
        name: updateData.name || product.name,
        description: updateData.description || product.description,
        category: updateData.category || product.category,
        subCategory: updateData.subCategory || product.subCategory,
      });
      updateData.metaDescription = seoData.metaDescription;
      updateData.keywords = seoData.keywords;
    }

    const updatedProduct = await productModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    res.json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


const regenerateSEO = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    if (!product)
      return res.json({ success: false, message: "Product not found" });

    const seoData = await generateProductSEO(product);
    product.metaDescription = seoData.metaDescription;
    product.keywords = seoData.keywords;
    await product.save();

    res.json({
      success: true,
      message: "SEO regenerated successfully",
      seo: seoData,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product removed successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


const singleProduct = async (req, res) => {
  try {
    const product = await productModel.findById(req.body.productId);
    res.json({ success: true, product });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


const getProductBySlug = async (req, res) => {
  try {
    const product = await productModel.findOne({ slug: req.params.slug });
    if (!product)
      return res.json({ success: false, message: "Product not found" });
    res.json({ success: true, product });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export {
  listProducts,
  addProduct,
  removeProduct,
  singleProduct,
  getProductBySlug,
  updateProduct,
  regenerateSEO,
};

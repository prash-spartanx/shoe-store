// backend/routes/products.js
const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// Get Single Product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(404).json({ message: 'Product not found' });
  }
});

router.get('/test-products', async (req, res) => {
  try {
    const products = await Product.find().limit(10);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});
module.exports = router;
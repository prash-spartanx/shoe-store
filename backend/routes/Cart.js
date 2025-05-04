// backend/routes/Cart.js
const express = require("express");
const router = express.Router();
const { addToCart, getCart, removeFromCart } = require("../controllers/cartController");
const authenticate = require('../middleware/authMiddleware');

// Cart Routes

router.post("/add", authenticate, addToCart);
router.get("/", authenticate, getCart);
router.delete("/remove/:productId", authenticate, removeFromCart);

module.exports = router;
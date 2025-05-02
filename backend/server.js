const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// ========== ROUTES ==========
// Test Route
app.get("/api/test", (req, res) => {
  res.json({ message: "Server is working!" });
});

// Products Route (Temporary)
// Add this route before starting the server
app.get("/api/test-products", (req, res) => {
  const testProducts = [
    {
      _id: 1,
      name: "Nike Air Max 270",
      price: 150,
      image:
        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/9acdbda3-6e4d-488b-8f0b-706505248c64/air-max-270-mens-shoes-KkLcGR.png",
      description: "Iconic Air Max cushioning",
    },
    {
      _id: 2,
      name: "Adidas Ultraboost 22",
      price: 180,
      image:
        "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/2cee9868d67f4d73a8dcae8c00fb220c_9366/Ultraboost_22_Shoes_Black_GZ0127_01_standard.jpg",
      description: "Responsive cushioning shoes",
    },
  ];
  res.json(testProducts);
});

// ========== START SERVER ==========
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Test endpoint: http://localhost:${PORT}/api/test`);
});

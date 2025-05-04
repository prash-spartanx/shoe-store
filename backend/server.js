// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(express.json());
app.use(cookieParser());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Routes
const productRoutes = require('./routes/products');
const authRoutes = require('./routes/auth');
 // Ensure correct file name
// backend/server.js
const cartRoutes = require("./routes/cart");
app.use("/api/cart", cartRoutes);
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);


// Start Server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use(cors({
  origin: 'http://localhost:3001', // Match your frontend port
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
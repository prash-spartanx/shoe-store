// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const { login, logout } = require('../controllers/authcontroller');

router.post('/login', login);
router.post('/logout', logout);

module.exports = router;
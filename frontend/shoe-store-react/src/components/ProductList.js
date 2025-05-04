import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  CardMedia,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Snackbar
} from '@mui/material';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const { addToCart } = useCart();
  const navigate = useNavigate();

// Update your useEffect to handle errors properly
useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/test-products`,
        { withCredentials: true } // Add this
      );
      setProducts(response.data);
    } catch (err) {
      setError('Failed to load products');
      // Load demo products only if server is down
      if(err.response?.status !== 500) {
        setProducts([
          // Paste your full demo products array here
          {
            _id: 1,
            name: "Running Sneakers",
            price: 99.99,
            image: "https://images.unsplash.com/photo-1600180758890-6c3b8a6c0cc7",
            description: "Comfortable running sneakers for daily wear."
          },
          // ... other demo products
        ]);
      }
    }
    setLoading(false);
  };
  fetchProducts();
}, []);

  const handleAddToCart = async (product) => {
    try {
      await addToCart(product._id, 1);
      setSnackbarMessage(`${product.name} added to cart!`);
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage('Please login to add items to cart');
      setSnackbarOpen(true);
      navigate('/login');
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const styles = {
    page: {
      padding: '2rem',
      backgroundColor: '#f8f9fa',
      minHeight: '100vh'
    },
    card: {
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      transition: 'transform 0.3s, box-shadow 0.3s',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    },
    media: {
      height: '220px',
      objectFit: 'cover',
      backgroundColor: '#f5f5f5'
    },
    button: {
      backgroundColor: '#0d6efd',
      '&:hover': {
        backgroundColor: '#0b5ed7'
      },
      fontWeight: '600',
      textTransform: 'none',
      letterSpacing: '0.5px'
    },
    price: {
      color: '#2a2a2a',
      fontWeight: '700',
      fontSize: '1.25rem'
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center p-5">
        <CircularProgress size={60} thickness={4} />
      </div>
    );
  }

  return (
    <div style={styles.page}>
      {error && <Alert severity="error" sx={{ mb: 4 }}>{error}</Alert>}

      <div className="container">
        <div className="row g-4">
          {products.map((product) => (
            <div key={product._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <div className="card h-100" style={styles.card}>
                <CardMedia
                  component="img"
                  image={`${product.image}?w=400&q=80`}
                  alt={product.name}
                  style={styles.media}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {product.description}
                  </Typography>
                  <Typography variant="h6" sx={styles.price}>
                    ${product.price.toFixed(2)}
                  </Typography>
                </CardContent>
                <div className="d-grid gap-2 m-3">
                  <Button
                    variant="contained"
                    size="medium"
                    style={styles.button}
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </div>
  );
};

export default ProductList;

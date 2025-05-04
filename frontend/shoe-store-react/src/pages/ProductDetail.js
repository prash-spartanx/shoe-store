import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  TextField,
  CircularProgress,
  Alert,
  Snackbar,
  Box
} from '@mui/material';

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/products/${productId}`
        );
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        setError('Product not found');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = async () => {
    try {
      await addToCart(product._id, quantity);
      setSnackbarOpen(true);
      setTimeout(() => setSnackbarOpen(false), 3000);
    } catch (error) {
      navigate('/login');
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error || !product) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button variant="contained" onClick={() => navigate('/')}>
          Continue Shopping
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button
        variant="outlined"
        sx={{ mb: 3 }}
        onClick={() => navigate(-1)}
      >
        &larr; Back to Products
      </Button>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 2 }}>
            <CardMedia
              component="img"
              image={`${product.image}?w=800&q=80`}
              alt={product.name}
              sx={{ height: 500, objectFit: 'contain', p: 2 }}
            />
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <CardContent>
            <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
              {product.name}
            </Typography>
            
            <Typography variant="h4" sx={{ mb: 3, color: 'primary.main' }}>
              ${product.price.toFixed(2)}
            </Typography>

            <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem' }}>
              {product.description}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 4 }}>
              <TextField
                type="number"
                label="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, e.target.value))}
                inputProps={{ min: 1 }}
                sx={{ width: 120 }}
              />
              <Button
                variant="contained"
                size="large"
                onClick={handleAddToCart}
                sx={{ px: 4, py: 1.5, fontSize: '1.1rem' }}
              >
                Add to Cart
              </Button>
            </Box>
          </CardContent>
        </Grid>
      </Grid>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          {quantity} {product.name} added to cart!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ProductDetail;
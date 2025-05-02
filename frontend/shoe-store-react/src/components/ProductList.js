import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Alert
} from '@mui/material';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { dispatch } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/test-products`);
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load products. Showing demo products...');
        setLoading(false);
        // Fallback demo data
        setProducts([
          {
            _id: 1,
            name: "Demo Shoe 1",
            price: 99.99,
            image: "https://via.placeholder.com/300x200",
            description: "Sample product description"
          },
          {
            _id: 2,
            name: "Demo Shoe 2",
            price: 129.99,
            image: "https://via.placeholder.com/300x200",
            description: "Another sample product"
          }
        ]);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: product
    });
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem' }}>
      {error && <Alert severity="error" sx={{ mb: 4 }}>{error}</Alert>}
      
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                image={product.image}
                alt={product.name}
                sx={{ 
                  height: 200,
                  objectFit: 'cover',
                  padding: '1rem'
                }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
                <Typography variant="h6" sx={{ mt: 2 }}>
                  ${product.price}
                </Typography>
              </CardContent>
              <Button
                variant="contained"
                sx={{ m: 2 }}
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ProductList;
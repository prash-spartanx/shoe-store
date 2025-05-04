import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Badge 
} from '@mui/material';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  
  const handleLogin = async () => {
    // Temporary hardcoded credentials for development
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'test123'
        })
      });
      
      if (response.ok) {
        navigate('/');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include'
    });
    navigate('/');
  };
  

  return (
    <AppBar position="sticky" sx={{ mb: 4 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Shoe Store
        </Typography>
        
        <Button
          color="inherit"
          component={Link}
          to="/"
          sx={{ mr: 2 }}
        >
          Home
        </Button>
        
<Button color="inherit" onClick={handleLogin}>
  Login
</Button>
<Button color="inherit" onClick={handleLogout}>
  Logout
</Button>
        <Badge
          // Safe array access
badgeContent={cartItems?.reduce((acc, item) => acc + item.quantity, 0) || 0}
          color="secondary"
          sx={{ '& .MuiBadge-badge': { top: 8, right: -8 } }}
        >
          <Button
            color="inherit"
            component={Link}
            to="/checkout"
          >
            Cart
          </Button>
        </Badge>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
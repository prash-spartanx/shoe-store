import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Typography,
  IconButton,
  Snackbar,
  Alert,
  Box
} from "@mui/material";
import { useCart } from "../context/CartContext";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useState } from "react";

const Cart = () => {
  const { cartItems, addToCart, removeFromCart } = useCart();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleQuantityChange = async (productId, delta) => {
    try {
      await addToCart(productId, delta);
      setSnackbarMessage("Cart updated successfully");
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage(error.message);
      setSnackbarOpen(true);
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      await removeFromCart(productId);
      setSnackbarMessage("Item removed from cart");
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage("Failed to remove item");
      setSnackbarOpen(true);
    }
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <Box sx={{ p: 3, maxWidth: 1200, margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 600 }}>
        Shopping Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Typography variant="h6" sx={{ textAlign: 'center', mt: 4 }}>
          Your cart is empty
        </Typography>
      ) : (
        <>
          <TableContainer sx={{ border: '1px solid #e0e0e0', borderRadius: 2 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableCell sx={{ fontWeight: 600 }}>Product</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Price</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Quantity</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Total</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartItems.map((item) => (
                  <TableRow key={item.product._id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          style={{ width: 60, height: 60, objectFit: 'cover', marginRight: 2 }}
                        />
                        <Typography variant="body1">{item.product.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>${item.product.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton 
                          onClick={() => handleQuantityChange(item.product._id, -1)}
                          disabled={item.quantity <= 1}
                        >
                          <RemoveIcon />
                        </IconButton>
                        <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
                        <IconButton onClick={() => handleQuantityChange(item.product._id, 1)}>
                          <AddIcon />
                        </IconButton>
                      </Box>
                    </TableCell>
                    <TableCell>
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleRemoveItem(item.product._id)}
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ mt: 4, textAlign: 'right' }}>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Total: ${total.toFixed(2)}
            </Typography>
            <Button 
              variant="contained" 
              size="large" 
              sx={{ mt: 2, px: 4, fontSize: '1.1rem' }}
            >
              Checkout
            </Button>
          </Box>
        </>
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          severity="info" 
          onClose={() => setSnackbarOpen(false)}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Cart;
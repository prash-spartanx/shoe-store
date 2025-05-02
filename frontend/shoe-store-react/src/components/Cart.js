import { 
    TableContainer, 
    Table, 
    TableHead, 
    TableBody, 
    TableRow, 
    TableCell, 
    Button 
  } from '@mui/material';
  import { useCart } from '../context/CartContext';
  
  const Cart = () => {
    const { cartItems, dispatch } = useCart();
  
    const total = cartItems.reduce((acc, item) => acc + item.price, 0);
  
    return (
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems.map(item => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>${item.price}</TableCell>
                <TableCell>
                  <Button 
                    color="error"
                    onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item.id })}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Typography variant="h6" sx={{ margin: 2 }}>
          Total: ${total}
        </Typography>
      </TableContainer>
    );
  };
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  TextField,
  Chip,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PaymentIcon from '@mui/icons-material/Payment';

function CheckoutPage() {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, clearCart, getTotalPrice } = useCart();
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);

  const handleApplyCoupon = () => {
    // Mock coupon codes
    const coupons = {
      'SAVE10': 10,
      'SAVE20': 20,
      'VEHICLE20': 20,
      'ECORIDE': 15,
    };

    if (coupons[appliedCoupon]) {
      setDiscountPercent(coupons[appliedCoupon]);
      alert(`Coupon applied! ${coupons[appliedCoupon]}% discount`);
    } else {
      alert('Invalid coupon code');
      setDiscountPercent(0);
    }
  };

  const subtotal = getTotalPrice();
  const discount = (subtotal * discountPercent) / 100;
  const tax = (subtotal - discount) * 0.1; // 10% tax
  const total = subtotal - discount + tax;

  return (
    <Container maxWidth="lg">
      <Box sx={{ marginTop: '32px', marginBottom: '32px' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          🛒 Vehicle Rental Checkout
        </Typography>

        {cartItems.length === 0 ? (
          <Paper sx={{ padding: '40px', textAlign: 'center' }}>
            <Typography variant="h6" color="textSecondary" sx={{ marginBottom: '16px' }}>
              Your cart is empty
            </Typography>
            <Button variant="contained" color="primary" onClick={() => navigate('/browse-rentals')}>
              Continue Vehicle Shopping
            </Button>
          </Paper>
        ) : (
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: '24px' }}>
            {/* Cart Items */}
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '16px' }}>
                Rental Items ({cartItems.length})
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold' }}>Vehicle</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Variant</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }} align="right">
                        Days
                      </TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }} align="right">
                        Price
                      </TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }} align="center">
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cartItems.map((item) => (
                      <TableRow key={item.id} hover>
                        <TableCell>
                          <Box>
                            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                              {item.vehicleName}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                              {item.brand} • {item.type}
                            </Typography>
                            <Typography variant="caption" color="textSecondary" display="block" sx={{ marginTop: '2px' }}>
                              {new Date(item.startDate).toLocaleDateString()} to{' '}
                              {new Date(item.endDate).toLocaleDateString()}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={`${item.fuelType} - ${item.color}`}
                            size="small"
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell align="right">{item.days}</TableCell>
                        <TableCell align="right">
                          <Typography sx={{ fontWeight: 'bold', color: '#059669' }}>
                            ₹{item.totalPrice}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            (₹{item.pricePerDay}/day)
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            size="small"
                            color="error"
                            startIcon={<DeleteIcon />}
                            onClick={() => removeFromCart(item.id)}
                          >
                            Remove
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Box sx={{ marginTop: '16px' }}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => navigate('/browse-rentals')}
                  sx={{ marginRight: '8px' }}
                >
                  Continue Shopping
                </Button>
                <Button variant="outlined" color="error" onClick={clearCart}>
                  Clear Cart
                </Button>
              </Box>
            </Box>

            {/* Order Summary */}
            <Box>
              <Card sx={{ position: 'sticky', top: '20px' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '16px' }}>
                    Order Summary
                  </Typography>

                  <Box sx={{ marginBottom: '16px' }}>
                    <TextField
                      fullWidth
                      size="small"
                      placeholder="Enter coupon code"
                      value={appliedCoupon}
                      onChange={(e) => setAppliedCoupon(e.target.value.toUpperCase())}
                      sx={{ marginBottom: '8px' }}
                    />
                    <Button fullWidth variant="outlined" size="small" onClick={handleApplyCoupon}>
                      Apply Coupon
                    </Button>
                    <Typography variant="caption" display="block" sx={{ marginTop: '8px', color: '#666' }}>
                      Try: SAVE10, SAVE20, VEHICLE20, ECORIDE
                    </Typography>
                  </Box>

                  <Box sx={{ borderTop: '1px solid #eee', paddingTop: '16px' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <Typography>Subtotal:</Typography>
                      <Typography>₹{subtotal.toFixed(2)}</Typography>
                    </Box>

                    {discountPercent > 0 && (
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: '#4caf50' }}>
                        <Typography>Discount ({discountPercent}%):</Typography>
                        <Typography>-₹{discount.toFixed(2)}</Typography>
                      </Box>
                    )}

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                      <Typography>Tax (10%):</Typography>
                      <Typography>₹{tax.toFixed(2)}</Typography>
                    </Box>

                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        borderTop: '2px solid #059669',
                        paddingTop: '12px',
                        marginBottom: '16px',
                      }}
                    >
                      <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>Total:</Typography>
                      <Typography sx={{ fontWeight: 'bold', fontSize: '18px', color: '#059669' }}>
                        ₹{total.toFixed(2)}
                      </Typography>
                    </Box>

                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      size="large"
                      startIcon={<PaymentIcon />}
                      onClick={() => navigate('/payment')}
                    >
                      Proceed to Payment
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default CheckoutPage;

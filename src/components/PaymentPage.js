import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  RadioGroup,
  FormControlLabel,
  Radio,
  Card,
  CardContent,
  Stepper,
  Step,
  StepLabel,
  Alert,
} from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function PaymentPage() {
  const navigate = useNavigate();
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const [activeStep, setActiveStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
    bankAccount: '',
  });

  const subtotal = getTotalPrice();
  const tax = (subtotal * 0.1).toFixed(2);
  const total = (subtotal + parseFloat(tax)).toFixed(2);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validatePayment = () => {
    if (!formData.fullName || !formData.email || !formData.phone || !formData.address) {
      alert('Please fill in all contact details');
      return false;
    }

    if (paymentMethod === 'credit-card') {
      if (!formData.cardNumber || !formData.cardExpiry || !formData.cardCVC) {
        alert('Please fill in all card details');
        return false;
      }
      if (formData.cardNumber.length < 16) {
        alert('Invalid card number');
        return false;
      }
    } else if (paymentMethod === 'bank-transfer') {
      if (!formData.bankAccount) {
        alert('Please enter bank account details');
        return false;
      }
    }

    return true;
  };

  const handlePlaceOrder = () => {
    if (!validatePayment()) return;

    setActiveStep(1);

    // Simulate payment processing
    setTimeout(() => {
      const newOrderId = 'ORD-' + Date.now();
      setOrderId(newOrderId);
      setOrderPlaced(true);
      clearCart();

      setTimeout(() => {
        navigate('/');
      }, 3000);
    }, 2000);
  };

  if (orderPlaced) {
    return (
      <Container maxWidth="md">
        <Box sx={{ marginTop: '64px', marginBottom: '64px', textAlign: 'center' }}>
          <CheckCircleIcon sx={{ fontSize: 80, color: '#4caf50', marginBottom: '24px' }} />
          <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '16px', color: '#4caf50' }}>
            Payment Successful!
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ marginBottom: '24px' }}>
            Your order has been confirmed
          </Typography>

          <Card sx={{ maxWidth: '400px', margin: '0 auto', marginBottom: '24px' }}>
            <CardContent>
              <Typography variant="body2" color="textSecondary" sx={{ marginBottom: '8px' }}>
                Order ID
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '16px' }}>
                {orderId}
              </Typography>

              <Typography variant="body2" color="textSecondary" sx={{ marginBottom: '8px' }}>
                Total Amount Paid
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#059669', marginBottom: '16px' }}>
                ₹{total}
              </Typography>

              <Typography variant="caption" color="textSecondary">
                ✓ Confirmation email sent
              </Typography>
            </CardContent>
          </Card>

          <Button variant="contained" color="primary" onClick={() => navigate('/')}>
            Back to Home
          </Button>
        </Box>
      </Container>
    );
  }

  if (cartItems.length === 0) {
    return (
      <Container maxWidth="md">
        <Box sx={{ marginTop: '32px', textAlign: 'center' }}>
          <Typography variant="h6" color="textSecondary">
            Your cart is empty
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/browse-rentals')}
            sx={{ marginTop: '16px' }}
          >
            Continue Shopping
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ marginTop: '32px', marginBottom: '32px' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          Payment
        </Typography>

        <Stepper activeStep={activeStep} sx={{ marginBottom: '32px' }}>
          <Step>
            <StepLabel>Enter Details</StepLabel>
          </Step>
          <Step>
            <StepLabel>Processing</StepLabel>
          </Step>
          <Step>
            <StepLabel>Confirmation</StepLabel>
          </Step>
        </Stepper>

        <Grid container spacing={3}>
          {/* Payment Form */}
          <Grid item xs={12} md={7}>
            <Paper sx={{ padding: '24px' }}>
              {/* Contact Details */}
              <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '16px' }}>
                Contact Information
              </Typography>

              <TextField
                fullWidth
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                margin="normal"
                required
              />

              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                margin="normal"
                required
              />

              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                margin="normal"
                required
              />

              <TextField
                fullWidth
                label="Delivery Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                margin="normal"
                required
                multiline
                rows={2}
              />

              {/* Payment Method Selection */}
              <Typography variant="h6" sx={{ fontWeight: 'bold', marginTop: '32px', marginBottom: '16px' }}>
                Payment Method
              </Typography>

              <RadioGroup value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                <FormControlLabel
                  value="credit-card"
                  control={<Radio />}
                  label="Credit Card"
                />
                <FormControlLabel value="bank-transfer" control={<Radio />} label="Bank Transfer" />
              </RadioGroup>

              {/* Credit Card Payment */}
              {paymentMethod === 'credit-card' && (
                <Box sx={{ marginTop: '16px', padding: '16px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
                  <TextField
                    fullWidth
                    label="Card Number"
                    name="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    margin="normal"
                    required
                  />

                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Expiry (MM/YY)"
                        name="cardExpiry"
                        placeholder="12/25"
                        value={formData.cardExpiry}
                        onChange={handleChange}
                        required
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="CVC"
                        name="cardCVC"
                        placeholder="123"
                        value={formData.cardCVC}
                        onChange={handleChange}
                        required
                      />
                    </Grid>
                  </Grid>
                </Box>
              )}

              {/* Bank Transfer */}
              {paymentMethod === 'bank-transfer' && (
                <Box sx={{ marginTop: '16px', padding: '16px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
                  <Alert severity="info" sx={{ marginBottom: '16px' }}>
                    Transfer to: Rental Business Ltd.<br />
                    Account: 1234567890
                  </Alert>
                  <TextField
                    fullWidth
                    label="Bank Account Number"
                    name="bankAccount"
                    value={formData.bankAccount}
                    onChange={handleChange}
                    margin="normal"
                    required
                  />
                </Box>
              )}
            </Paper>
          </Grid>

          {/* Order Summary */}
          <Grid item xs={12} md={5}>
            <Card sx={{ position: 'sticky', top: '20px' }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '16px' }}>
                  Order Summary
                </Typography>

                <Box sx={{ maxHeight: '300px', overflowY: 'auto', marginBottom: '16px' }}>
                  {cartItems.map((item) => (
                    <Box key={item.id} sx={{ marginBottom: '12px', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        {item.name}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {item.days} days × ₹{item.pricePerDay}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#059669', fontWeight: 'bold' }}>
                        ₹{item.totalPrice}
                      </Typography>
                    </Box>
                  ))}
                </Box>

                <Box sx={{ borderTop: '2px solid #eee', paddingTop: '16px' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <Typography>Subtotal:</Typography>
                    <Typography>₹{subtotal.toFixed(2)}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <Typography>Tax (10%):</Typography>
                    <Typography>₹{tax}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                    <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>Total:</Typography>
                    <Typography sx={{ fontWeight: 'bold', fontSize: '18px', color: '#059669' }}>
                      ₹{total}
                    </Typography>
                  </Box>

                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={handlePlaceOrder}
                    disabled={activeStep > 0}
                  >
                    {activeStep === 0 ? 'Place Order' : 'Processing...'}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default PaymentPage;

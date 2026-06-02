import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function AddCustomerPage({ onAddCustomer }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
  });
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.address) {
      alert('Please fill in all fields');
      return;
    }

    onAddCustomer(formData);
    setSuccess(true);
    setFormData({ name: '', phone: '', address: '' });
    
    setTimeout(() => {
      setSuccess(false);
      navigate('/view-data');
    }, 2000);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ marginTop: '32px' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', marginBottom: '24px' }}>
          Add New Customer
        </Typography>

        {success && (
          <Alert severity="success" sx={{ marginBottom: '16px' }}>
            Customer added successfully! Redirecting...
          </Alert>
        )}

        <Paper sx={{ padding: '32px' }}>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Customer Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              margin="normal"
              required
              variant="outlined"
              placeholder="e.g., John Doe"
            />

            <TextField
              fullWidth
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              margin="normal"
              required
              variant="outlined"
              placeholder="e.g., 123-456-7890"
            />

            <TextField
              fullWidth
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              margin="normal"
              required
              variant="outlined"
              placeholder="e.g., 123 Main Street"
              multiline
              rows={3}
            />

            <Box sx={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
              >
                Submit
              </Button>
              <Button
                variant="outlined"
                color="primary"
                size="large"
                onClick={() => navigate('/view-data')}
              >
                Cancel
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}

export default AddCustomerPage;

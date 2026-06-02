import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useVehicles } from '../context/VehicleContext';

function AddRentalPage({ customers, onAddRental }) {
  const navigate = useNavigate();
  const { getFilteredVehicles, filters, setFilters, getVariantsForVehicle } = useVehicles();
  
  const [formData, setFormData] = useState({
    customerId: '',
    vehicleId: '',
    variantId: '',
    startDate: '',
    endDate: '',
  });
  const [success, setSuccess] = useState(false);

  const filteredVehicles = getFilteredVehicles();
  const selectedVehicle = formData.vehicleId
    ? filteredVehicles.find((v) => v.id === parseInt(formData.vehicleId))
    : null;
  const variants = selectedVehicle ? getVariantsForVehicle(selectedVehicle.id) : [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Reset variant selection when vehicle changes
    if (name === 'vehicleId') {
      setFormData((prev) => ({ ...prev, variantId: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.customerId ||
      !formData.vehicleId ||
      !formData.variantId ||
      !formData.startDate ||
      !formData.endDate
    ) {
      alert('Please fill in all fields');
      return;
    }

    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);

    if (endDate <= startDate) {
      alert('End date must be after start date');
      return;
    }

    const vehicle = selectedVehicle;
    const variant = variants.find((v) => v.id === formData.variantId);

    const rentalData = {
      customerId: parseInt(formData.customerId),
      vehicleName: vehicle.name,
      vehicleType: vehicle.type,
      brand: vehicle.brand,
      fuelType: variant.fuelType,
      color: variant.color,
      pricePerDay: variant.pricePerDay,
      startDate: formData.startDate,
      endDate: formData.endDate,
    };

    onAddRental(rentalData);
    setSuccess(true);
    setFormData({ customerId: '', vehicleId: '', variantId: '', startDate: '', endDate: '' });

    setTimeout(() => {
      setSuccess(false);
      navigate('/view-data');
    }, 2000);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ marginTop: '32px' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', marginBottom: '24px' }}>
          Add Vehicle Rental
        </Typography>

        {success && (
          <Alert severity="success" sx={{ marginBottom: '16px' }}>
            Vehicle rental added successfully! Redirecting...
          </Alert>
        )}

        {customers.length === 0 && (
          <Alert severity="warning" sx={{ marginBottom: '16px' }}>
            No customers found. Please add a customer first.
          </Alert>
        )}

        <Paper sx={{ padding: '32px' }}>
          <form onSubmit={handleSubmit}>
            {/* Customer Selection */}
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Select Customer</InputLabel>
              <Select
                name="customerId"
                value={formData.customerId}
                onChange={handleChange}
                label="Select Customer"
              >
                <MenuItem value="">-- Select a Customer --</MenuItem>
                {customers.map((customer) => (
                  <MenuItem key={customer.id} value={customer.id}>
                    {customer.name} - {customer.phone}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Vehicle Selection */}
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Select Vehicle</InputLabel>
              <Select
                name="vehicleId"
                value={formData.vehicleId}
                onChange={handleChange}
                label="Select Vehicle"
              >
                <MenuItem value="">-- Select a Vehicle --</MenuItem>
                {filteredVehicles.map((vehicle) => (
                  <MenuItem key={vehicle.id} value={vehicle.id}>
                    {vehicle.name} ({vehicle.brand}) - {vehicle.type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Variant Selection */}
            {selectedVehicle && variants.length > 0 && (
              <FormControl fullWidth margin="normal" required>
                <InputLabel>Select Variant</InputLabel>
                <Select
                  name="variantId"
                  value={formData.variantId}
                  onChange={handleChange}
                  label="Select Variant"
                >
                  <MenuItem value="">-- Select a Variant --</MenuItem>
                  {variants.map((variant) => (
                    <MenuItem key={variant.id} value={variant.id}>
                      {variant.fuelType} - {variant.color} (₹{variant.pricePerDay}/day)
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            {/* Date Selection */}
            <TextField
              fullWidth
              label="Start Date"
              name="startDate"
              type="date"
              value={formData.startDate}
              onChange={handleChange}
              margin="normal"
              required
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              fullWidth
              label="End Date"
              name="endDate"
              type="date"
              value={formData.endDate}
              onChange={handleChange}
              margin="normal"
              required
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />

            {/* Rental Summary */}
            {selectedVehicle && formData.variantId && formData.startDate && formData.endDate && (
              <Paper
                sx={{
                  marginTop: '20px',
                  padding: '16px',
                  backgroundColor: '#f0fdf4',
                  border: '1px solid #86efac',
                }}
              >
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', marginBottom: '8px' }}>
                  Rental Summary:
                </Typography>
                <Typography variant="body2">
                  <strong>Vehicle:</strong> {selectedVehicle.name} ({selectedVehicle.brand})
                </Typography>
                <Typography variant="body2">
                  <strong>Type:</strong> {selectedVehicle.type}
                </Typography>
                <Typography variant="body2">
                  <strong>Variant:</strong> {variants.find((v) => v.id === formData.variantId)?.fuelType} -{' '}
                  {variants.find((v) => v.id === formData.variantId)?.color}
                </Typography>
                <Typography variant="body2">
                  <strong>Duration:</strong>{' '}
                  {Math.max(
                    1,
                    Math.ceil(
                      (new Date(formData.endDate) - new Date(formData.startDate)) /
                        (1000 * 60 * 60 * 24)
                    )
                  )}{' '}
                  days
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 'bold',
                    color: '#059669',
                    marginTop: '8px',
                  }}
                >
                  Total Cost: ₹
                  {Math.max(
                    1,
                    Math.ceil(
                      (new Date(formData.endDate) - new Date(formData.startDate)) /
                        (1000 * 60 * 60 * 24)
                    )
                  ) * variants.find((v) => v.id === formData.variantId)?.pricePerDay}
                </Typography>
              </Paper>
            )}

            <Box sx={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                disabled={customers.length === 0 || !selectedVehicle}
              >
                Add Rental
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

export default AddRentalPage;

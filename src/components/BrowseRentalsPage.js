import React, { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Button,
  Typography,
  Box,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
} from '@mui/material';
import { useCart } from '../context/CartContext';
import { useVehicles } from '../context/VehicleContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FilterListIcon from '@mui/icons-material/FilterList';

function BrowseRentalsPage() {
  const { addToCart } = useCart();
  const {
    getFilteredVehicles,
    getVariantsForVehicle,
    getVehicleTypes,
    getBrands,
    getFuelTypes,
    getColorsForType,
    filters,
    setFilters,
  } = useVehicles();

  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dates, setDates] = useState({ startDate: '', endDate: '' });
  const [expandFilters, setExpandFilters] = useState(false);

  const filteredVehicles = getFilteredVehicles();
  const vehicleTypes = getVehicleTypes();
  const brands = getBrands();
  const fuelTypes = getFuelTypes();
  const availableColors = getColorsForType(filters.type);

  const handleOpenDialog = (vehicle) => {
    const variants = getVariantsForVehicle(vehicle.id);
    setSelectedVehicle(vehicle);
    setSelectedVariant(variants.length > 0 ? variants[0] : null);
    setDates({ startDate: '', endDate: '' });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedVehicle(null);
    setSelectedVariant(null);
  };

  const handleAddToCart = () => {
    if (!dates.startDate || !dates.endDate) {
      alert('Please select both start and end dates');
      return;
    }

    if (new Date(dates.endDate) <= new Date(dates.startDate)) {
      alert('End date must be after start date');
      return;
    }

    if (!selectedVariant) {
      alert('Please select a vehicle variant');
      return;
    }

    addToCart(selectedVehicle, selectedVariant, dates.startDate, dates.endDate);
    alert(`${selectedVehicle.name} (${selectedVariant.fuelType} - ${selectedVariant.color}) added to cart!`);
    handleCloseDialog();
  };

  const handleFilterChange = (filterName, value) => {
    setFilters({ ...filters, [filterName]: value });
  };

  const clearFilters = () => {
    setFilters({ type: '', brand: '', fuelType: '', color: '' });
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ marginTop: '32px', marginBottom: '32px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', marginBottom: '8px' }}>
              🚗 Vehicle Rental Fleet
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Browse our diverse collection of vehicles for every need
            </Typography>
          </div>
          <Button
            variant="outlined"
            startIcon={<FilterListIcon />}
            onClick={() => setExpandFilters(!expandFilters)}
            sx={{ textTransform: 'none', fontSize: '1rem' }}
          >
            {expandFilters ? 'Hide Filters' : 'Show Filters'}
          </Button>
        </Box>

        {/* Filter Panel */}
        {expandFilters && (
          <Card sx={{ marginBottom: '32px', padding: '20px', backgroundColor: '#f9fafb' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '16px' }}>
              Filter Vehicles
            </Typography>

            <Grid container spacing={2} sx={{ marginBottom: '16px' }}>
              {/* Vehicle Type Filter */}
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>Vehicle Type</InputLabel>
                  <Select
                    value={filters.type}
                    onChange={(e) => handleFilterChange('type', e.target.value)}
                    label="Vehicle Type"
                  >
                    <MenuItem value="">All Types</MenuItem>
                    {vehicleTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Brand Filter */}
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>Brand</InputLabel>
                  <Select
                    value={filters.brand}
                    onChange={(e) => handleFilterChange('brand', e.target.value)}
                    label="Brand"
                  >
                    <MenuItem value="">All Brands</MenuItem>
                    {brands.map((brand) => (
                      <MenuItem key={brand} value={brand}>
                        {brand}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Fuel Type Filter */}
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>Fuel Type</InputLabel>
                  <Select
                    value={filters.fuelType}
                    onChange={(e) => handleFilterChange('fuelType', e.target.value)}
                    label="Fuel Type"
                  >
                    <MenuItem value="">All Fuel Types</MenuItem>
                    {fuelTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Color Filter */}
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>Color</InputLabel>
                  <Select
                    value={filters.color}
                    onChange={(e) => handleFilterChange('color', e.target.value)}
                    label="Color"
                    disabled={availableColors.length === 0}
                  >
                    <MenuItem value="">All Colors</MenuItem>
                    {availableColors.map((color) => (
                      <MenuItem key={color} value={color}>
                        {color}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Box sx={{ display: 'flex', gap: '8px' }}>
              <Button variant="text" size="small" onClick={clearFilters} color="primary">
                Clear Filters
              </Button>
              <Typography variant="caption" sx={{ alignSelf: 'center', marginLeft: '8px', color: 'textSecondary' }}>
                Showing {filteredVehicles.length} vehicle(s)
              </Typography>
            </Box>
          </Card>
        )}

        {/* Vehicle Grid */}
        {filteredVehicles.length === 0 ? (
          <Card sx={{ padding: '40px', textAlign: 'center' }}>
            <Typography variant="h6" color="textSecondary">
              No vehicles found with the selected filters. Please try different filters.
            </Typography>
          </Card>
        ) : (
          <Grid container spacing={3}>
            {filteredVehicles.map((vehicle) => (
              <Grid item xs={12} sm={6} md={4} key={vehicle.id}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
                    },
                  }}
                >
                  {/* Vehicle Image */}
                  <Box
                    component="img"
                    src={vehicle.image}
                    alt={vehicle.name}
                    sx={{
                      height: 200,
                      width: '100%',
                      objectFit: 'cover',
                    }}
                  />

                  <CardContent sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                      <div>
                        <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold' }}>
                          {vehicle.name}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {vehicle.brand}
                        </Typography>
                      </div>
                      <Chip label={vehicle.type} size="small" color="primary" variant="outlined" />
                    </Box>

                    <Typography variant="body2" sx={{ marginBottom: '12px', color: 'textSecondary' }}>
                      {vehicle.description}
                    </Typography>

                    {/* Features */}
                    <Box sx={{ marginBottom: '12px' }}>
                      <Typography variant="caption" sx={{ fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>
                        Features:
                      </Typography>
                      <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: '4px' }}>
                        {vehicle.features.slice(0, 2).map((feature, idx) => (
                          <Chip key={idx} label={feature} size="small" variant="outlined" />
                        ))}
                      </Stack>
                    </Box>

                    {/* Available Variants */}
                    <Box sx={{ marginBottom: '16px', backgroundColor: '#f3f4f6', padding: '8px', borderRadius: '4px' }}>
                      <Typography variant="caption" sx={{ fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>
                        Variants: {vehicle.variants.length}
                      </Typography>
                      <Stack direction="row" spacing={0.5} sx={{ flexWrap: 'wrap', gap: '4px' }}>
                        {vehicle.variants.map((v, idx) => (
                          <Chip
                            key={idx}
                            label={`${v.fuelType} - ${v.color}`}
                            size="small"
                            variant="filled"
                            sx={{ backgroundColor: '#e5e7eb', color: '#374151', height: '24px' }}
                          />
                        ))}
                      </Stack>
                    </Box>

                    {/* Price */}
                    <Box sx={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #e5e7eb' }}>
                      <Typography variant="body2" color="textSecondary" sx={{ marginBottom: '4px' }}>
                        Starting from
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#059669' }}>
                        ₹{Math.round(vehicle.basePricePerDay * vehicle.brandMultiplier)} / day
                      </Typography>
                    </Box>
                  </CardContent>

                  <Box sx={{ padding: '16px', paddingTop: '0' }}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      size="large"
                      startIcon={<ShoppingCartIcon />}
                      onClick={() => handleOpenDialog(vehicle)}
                      sx={{ textTransform: 'none', fontSize: '1rem' }}
                    >
                      Reserve Vehicle
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      {/* Vehicle Reservation Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
          Reserve {selectedVehicle?.name}
        </DialogTitle>
        <DialogContent sx={{ paddingTop: '20px' }}>
          {selectedVehicle && (
            <Box>
              {/* Vehicle Details */}
              <Box sx={{ marginBottom: '20px', padding: '16px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', marginBottom: '8px' }}>
                  Vehicle Details:
                </Typography>
                <Typography variant="body2">
                  <strong>Brand:</strong> {selectedVehicle.brand}
                </Typography>
                <Typography variant="body2">
                  <strong>Type:</strong> {selectedVehicle.type}
                </Typography>
                <Typography variant="body2">
                  <strong>Category:</strong> {selectedVehicle.category}
                </Typography>
              </Box>

              {/* Variant Selection */}
              {getVariantsForVehicle(selectedVehicle.id).length > 0 && (
                <Box sx={{ marginBottom: '20px' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold', marginBottom: '12px' }}>
                    Select Variant:
                  </Typography>
                  <FormControl fullWidth>
                    <Select
                      value={selectedVariant?.id || ''}
                      onChange={(e) => {
                        const variant = getVariantsForVehicle(selectedVehicle.id).find(
                          (v) => v.id === e.target.value
                        );
                        setSelectedVariant(variant);
                      }}
                    >
                      {getVariantsForVehicle(selectedVehicle.id).map((variant) => (
                        <MenuItem key={variant.id} value={variant.id}>
                          {variant.fuelType} - {variant.color} (₹{variant.pricePerDay}/day)
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              )}

              {/* Variant Details */}
              {selectedVariant && (
                <Box sx={{ marginBottom: '20px', padding: '12px', backgroundColor: '#ecfdf5', borderRadius: '4px', border: '1px solid #d1fae5' }}>
                  <Typography variant="body2">
                    <strong>Fuel Type:</strong> {selectedVariant.fuelType}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Color:</strong> {selectedVariant.color}
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: '1.1rem', fontWeight: 'bold', marginTop: '8px', color: '#059669' }}>
                    ₹{selectedVariant.pricePerDay} per day
                  </Typography>
                </Box>
              )}

              {/* Date Selection */}
              <Box sx={{ marginBottom: '20px' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', marginBottom: '12px' }}>
                  Rental Dates:
                </Typography>
                <TextField
                  fullWidth
                  label="Start Date"
                  type="date"
                  value={dates.startDate}
                  onChange={(e) => setDates({ ...dates, startDate: e.target.value })}
                  InputLabelProps={{ shrink: true }}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="End Date"
                  type="date"
                  value={dates.endDate}
                  onChange={(e) => setDates({ ...dates, endDate: e.target.value })}
                  InputLabelProps={{ shrink: true }}
                  margin="normal"
                />
              </Box>

              {/* Price Preview */}
              {dates.startDate && dates.endDate && selectedVariant && (
                <Box sx={{ padding: '12px', backgroundColor: '#eff6ff', borderRadius: '4px', border: '1px solid #bfdbfe' }}>
                  <Typography variant="body2" color="textSecondary">
                    Duration:{' '}
                    {Math.max(
                      1,
                      Math.ceil(
                        (new Date(dates.endDate) - new Date(dates.startDate)) /
                          (1000 * 60 * 60 * 24)
                      )
                    )}{' '}
                    days
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#059669', marginTop: '8px' }}>
                    Total: ₹
                    {Math.max(
                      1,
                      Math.ceil(
                        (new Date(dates.endDate) - new Date(dates.startDate)) /
                          (1000 * 60 * 60 * 24)
                      )
                    ) * selectedVariant.pricePerDay}
                  </Typography>
                </Box>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ padding: '16px' }}>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddToCart} variant="contained" color="primary" disabled={!selectedVariant || !dates.startDate || !dates.endDate}>
            Add to Cart
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default BrowseRentalsPage;

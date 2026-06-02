import React, { useState } from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, Button, TextField, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PeopleIcon from '@mui/icons-material/People';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SearchIcon from '@mui/icons-material/Search';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import StarIcon from '@mui/icons-material/Star';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import ElectricScooterIcon from '@mui/icons-material/ElectricScooter';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';

import toyotaImg from '../assets/images/toyota.jpg';
import hondaImg from '../assets/images/hondaCity.jpg';
import royalImg from '../assets/images/royalBike.jpg';
import activaImg from '../assets/images/hondaScooter.jpg';



function HomePage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  // Featured Vehicles
  const featuredVehicles = [
    {
      id: 1,
      name: 'Toyota Fortuner',
      category: 'Premium SUV',
      price: '₹4,000/day',
      image: toyotaImg,
      rating: 4.9,
      reviews: 148,
      description: '7-seater luxury SUV'
    },
    {
      id: 2,
      name: 'Honda City',
      category: 'Sedan',
      price: '₹2,500/day',
      image: hondaImg,
      rating: 4.7,
      reviews: 125,
      description: 'Compact & efficient'
    },
    {
      id: 3,
      name: 'Royal Enfield Classic',
      category: 'Cruise Bike',
      price: '₹800/day',
      image: royalImg,
      rating: 4.8,
      reviews: 256,
      description: 'Classic cruiser style'
    },
    {
      id: 4,
      name: 'Honda Activa',
      category: 'Scooter',
      price: '₹400/day',
      image: activaImg,
      rating: 4.6,
      reviews: 387,
      description: 'Popular & reliable'
    },
  ];

  const features = [
    {
      title: 'Browse Vehicles',
      description: 'Explore our diverse fleet of vehicles - cars, bikes, scooters, buses & rickshaws',
      icon: <DirectionsCarIcon sx={{ fontSize: 48, color: '#fff' }} />,
      path: '/browse-rentals',
      bgColor: '#0891b2',
    },
    {
      title: 'Manage Customers',
      description: 'Add and manage customer information easily',
      icon: <PeopleIcon sx={{ fontSize: 48, color: '#fff' }} />,
      path: '/add-customer',
      bgColor: '#059669',
    },
    {
      title: 'Record Rentals',
      description: 'Track vehicle rental bookings and dates',
      icon: <EmojiObjectsIcon sx={{ fontSize: 48, color: '#fff' }} />,
      path: '/add-rental',
      bgColor: '#f59e0b',
    },
    {
      title: 'Analytics Dashboard',
      description: 'Visualize revenue trends and rental analytics',
      icon: <TrendingUpIcon sx={{ fontSize: 48, color: '#fff' }} />,
      path: '/analytics',
      bgColor: '#10b981',
    },
  ];

  const vehicleTypes = [
    {
      type: 'Cars',
      count: '5+',
      icon: <DirectionsCarIcon sx={{ fontSize: 48, color: '#059669' }} />,
      description: 'Sedans, SUVs, Electric'
    },
    {
      type: 'Bikes',
      count: '3+',
      icon: <TwoWheelerIcon sx={{ fontSize: 48, color: '#059669' }} />,
      description: 'Cruisers, Sport Bikes'
    },
    {
      type: 'Scooters',
      count: '3+',
      icon: <ElectricScooterIcon sx={{ fontSize: 48, color: '#059669' }} />,
      description: 'Automatic, Electric'
    },
    {
      type: 'Buses',
      count: '3+',
      icon: <DirectionsBusIcon sx={{ fontSize: 48, color: '#059669' }} />,
      description: 'AC, Luxury Coach'
    },
  ];

  const handleSearch = () => {
    if (searchQuery) {
      navigate(`/browse-rentals?search=${searchQuery}`);
    }
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #059669 0%, #0891b2 100%)',
          color: 'white',
          py: 8,
          mb: 6,
          borderRadius: '10px',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
             Smart Vehicle Rental Platform
          </Typography>
          <Typography variant="h6" paragraph sx={{ mb: 4, opacity: 0.9 }}>
            Rent diverse vehicles for every need. Cars, bikes, scooters, buses & rickshaws with competitive pricing and flexible rental plans.
          </Typography>

          {/* Search Bar */}
          <Paper
            sx={{
              display: 'flex',
              alignItems: 'center',
              p: 1,
              backgroundColor: 'rgba(255,255,255,0.95)',
              maxWidth: '600px',
            }}
          >
            <SearchIcon sx={{ color: '#059669', ml: 2 }} />
            <TextField
              fullWidth
              placeholder="Search vehicles, brands, or type..."
              variant="standard"
              size="small"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              sx={{
                ml: 2,
                '& .MuiInput-root': { color: '#333' },
                '& .MuiInput-underline:before': { borderBottom: 'none' },
              }}
            />
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#059669',
                color: 'white',
                mr: 1,
                textTransform: 'none',
              }}
              onClick={handleSearch}
            >
              Search
            </Button>
          </Paper>
        </Container>
      </Box>

      <Container maxWidth="lg">
        {/* Featured Vehicles Section */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', mb: 1 }}>
            Featured Vehicles
          </Typography>
          <Typography variant="body1" color="textSecondary" paragraph sx={{ mb: 4 }}>
            Explore our most popular vehicle rentals across different categories
          </Typography>

          <Grid container spacing={3} sx={{ mb: 6 }}>
            {featuredVehicles.map((vehicle) => (
              <Grid item xs={12} sm={6} md={3} key={vehicle.id}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 20px rgba(0,0,0,0.15)',
                    },
                  }}
                  onClick={() => navigate('/browse-rentals')}
                >
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
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="body2" color="primary" sx={{ fontWeight: '600', mb: 1 }}>
                      {vehicle.category}
                    </Typography>
                    <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                      {vehicle.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" paragraph>
                      {vehicle.description}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <StarIcon sx={{ fontSize: 18, color: '#fbbf24', mr: 0.5 }} />
                      <Typography variant="body2" sx={{ fontWeight: '600' }}>
                        {vehicle.rating}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" sx={{ ml: 1 }}>
                        ({vehicle.reviews} reviews)
                      </Typography>
                    </Box>
                    <Typography variant="h6" sx={{ color: '#059669', fontWeight: 'bold' }}>
                      {vehicle.price}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ textAlign: 'center' }}>
            <Button
              variant="contained"
              size="large"
              sx={{
                backgroundColor: '#059669',
                color: 'white',
                px: 4,
                py: 1.5,
                textTransform: 'none',
                fontSize: '16px',
              }}
              onClick={() => navigate('/browse-rentals')}
            >
              Browse All Vehicles →
            </Button>
          </Box>
        </Box>

        {/* Vehicle Types Section */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', mb: 1 }}>
            Vehicle Categories
          </Typography>
          <Typography variant="body1" color="textSecondary" paragraph sx={{ mb: 4 }}>
            Choose from diverse vehicle types for your journey
          </Typography>

          <Grid container spacing={3}>
            {vehicleTypes.map((vtype, idx) => (
              <Grid item xs={12} sm={6} md={3} key={idx}>
                <Card
                  sx={{
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                    }
                  }}
                  onClick={() => navigate('/browse-rentals')}
                >
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Box sx={{ mb: 1 }}>
                      {vtype.icon}
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                      {vtype.type}
                    </Typography>
                    <Typography variant="body2" color="primary" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                      {vtype.count} Options
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {vtype.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* How It Works Section */}
        <Box sx={{ mb: 8, textAlign: 'center' }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', mb: 1 }}>
            How Our Vehicle Rental Works
          </Typography>
          <Typography variant="body1" color="textSecondary" paragraph sx={{ mb: 4 }}>
            Simple steps to rent your perfect vehicle
          </Typography>

          <Grid container spacing={3}>
            {[
              { number: '1', title: 'Browse', desc: 'Find the vehicle you need' },
              { number: '2', title: 'Select Variant', desc: 'Choose fuel type & color' },
              { number: '3', title: 'Checkout', desc: 'Complete payment securely' },
              { number: '4', title: 'Drive', desc: 'Enjoy your rental journey' },
            ].map((step, idx) => (
              <Grid item xs={12} sm={6} md={3} key={idx}>
                <Box>
                  <Box
                    sx={{
                      width: '60px',
                      height: '60px',
                      backgroundColor: '#059669',
                      color: 'white',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '28px',
                      fontWeight: 'bold',
                      margin: '0 auto 16px',
                    }}
                  >
                    {step.number}
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {step.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {step.desc}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Features Grid */}
        <Box sx={{ mb: 8 }}>
          <Grid container spacing={3}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    background: 'linear-gradient(135deg, #f5f7ff 0%, #f0f4ff 100%)',
                    border: 'none',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
                    },
                  }}
                >
                  <CardContent sx={{ textAlign: 'center', flex: 1 }}>
                    <Box sx={{ marginBottom: '16px' }}>
                      <Box
                        sx={{
                          width: '80px',
                          height: '80px',
                          background: 'linear-gradient(135deg, ' + feature.bgColor + ', ' + feature.bgColor + '99)',
                          borderRadius: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: '0 auto',
                          boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                        }}
                      >
                        {feature.icon}
                      </Box>
                    </Box>
                    <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold', mb: 1 }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" paragraph>
                      {feature.description}
                    </Typography>
                    <Button
                      variant="contained"
                      onClick={() => navigate(feature.path)}
                      sx={{
                        marginTop: '12px',
                        backgroundColor: feature.bgColor,
                        '&:hover': {
                          backgroundColor: feature.bgColor,
                          opacity: 0.9,
                        }
                      }}
                    >
                      {feature.title}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Footer Info */}
        <Box sx={{ backgroundColor: '#f5f5f5', padding: '24px', borderRadius: '8px', marginTop: '32px', textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
            🚀 Get Started Today
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Start browsing our vehicles, manage your rentals, and track your business revenue all in one place!
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Button 
              variant="contained" 
              onClick={() => navigate('/browse-rentals')}
              sx={{ 
                backgroundColor: '#059669',
                mr: 2,
                textTransform: 'none',
                fontSize: '16px',
              }}
            >
              Browse Vehicles
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default HomePage;

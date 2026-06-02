import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Menu, MenuItem, Badge, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

function Navbar() {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
  };

  return (
    <AppBar 
      position="static" 
      sx={{ 
        background: 'linear-gradient(90deg, #059669 0%, #0891b2 100%)',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      }}
    >
      <Toolbar>
        <AnalyticsIcon sx={{ marginRight: '12px', fontSize: '28px' }} />
        <Typography 
          variant="h6" 
          component={Link} 
          to="/" 
          sx={{ 
            flexGrow: 1, 
            textDecoration: 'none', 
            color: 'white',
            fontWeight: 'bold',
            fontSize: '20px',
          }}
        >
          RentalHub
        </Typography>

        <Box sx={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          {/* Public Navigation */}
          <Button color="inherit" component={Link} to="/" sx={{ textTransform: 'none', fontWeight: 500 }}>
            Home
          </Button>
          <Button color="inherit" component={Link} to="/browse-rentals" sx={{ textTransform: 'none', fontWeight: 500 }}>
            Browse Vehicles
          </Button>

          {/* Protected Navigation - Only shows when logged in */}
          {user && (
            <>
              <Button color="inherit" component={Link} to="/add-customer" sx={{ textTransform: 'none', fontWeight: 500 }}>
                Add Customer
              </Button>
              <Button color="inherit" component={Link} to="/add-rental" sx={{ textTransform: 'none', fontWeight: 500 }}>
                New Rental
              </Button>
              <Button color="inherit" component={Link} to="/view-data" sx={{ textTransform: 'none', fontWeight: 500 }}>
                Records
              </Button>
              <Button color="inherit" component={Link} to="/analytics" sx={{ textTransform: 'none', fontWeight: 500 }}>
                Analytics
              </Button>
            </>
          )}

          {/* Cart Icon */}
          <IconButton 
            color="inherit" 
            component={Link} 
            to="/checkout"
            sx={{ ml: 2 }}
          >
            <Badge badgeContent={cartItems.length} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          {/* User Menu */}
          {user ? (
            <>
              <IconButton 
                color="inherit" 
                onClick={handleMenuOpen}
                sx={{ ml: 1 }}
              >
                <AccountCircleIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem disabled sx={{ fontWeight: 'bold', color: '#059669' }}>
                  {user.name}
                </MenuItem>
                <MenuItem disabled sx={{ fontSize: '12px', color: '#666' }}>
                  {user.email}
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <LogoutIcon sx={{ mr: 1 }} /> Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button 
                color="inherit" 
                component={Link} 
                to="/login"
                sx={{ textTransform: 'none', fontWeight: 500, ml: 2 }}
              >
                Login
              </Button>
              <Button 
                variant="contained"
                component={Link} 
                to="/signup"
                sx={{ 
                  backgroundColor: 'white', 
                  color: '#059669',
                  textTransform: 'none',
                  fontWeight: 'bold',
                  ml: 1,
                  '&:hover': {
                    backgroundColor: '#f0f0f0',
                  }
                }}
              >
                Sign Up
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;

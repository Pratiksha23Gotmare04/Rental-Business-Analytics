import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Menu,
  MenuItem,
  Badge,
} from '@mui/material';
import { Link } from 'react-router-dom';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import { useCart } from '../context/CartContext';

function UpdatedNavbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleCloseMenu();
    navigate('/login');
  };

  if (!user) {
    return (
      <AppBar position="static">
        <Toolbar>
          <AnalyticsIcon sx={{ marginRight: '12px', fontSize: '28px' }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Rental Booking System
          </Typography>
          <Box sx={{ display: 'flex', gap: '8px' }}>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/signup">
              Sign Up
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    );
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <AnalyticsIcon sx={{ marginRight: '12px', fontSize: '28px' }} />
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          Rental Booking System
        </Typography>

        <Box sx={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          {/* Customer Navigation */}
          {user.role === 'user' && (
            <>
              <Button color="inherit" component={Link} to="/browse-rentals">
                Browse Rentals
              </Button>
              <Button color="inherit" component={Link} to="/checkout">
                <Badge badgeContent={cartItems.length} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </Button>
              <Button color="inherit" component={Link} to="/policies">
                Policies
              </Button>
            </>
          )}

          {/* Admin Navigation */}
          {user.role === 'admin' && (
            <>
              <Button color="inherit" component={Link} to="/add-customer">
                Add Customer
              </Button>
              <Button color="inherit" component={Link} to="/add-rental">
                Add Rental
              </Button>
              <Button color="inherit" component={Link} to="/view-data">
                View Data
              </Button>
              <Button color="inherit" component={Link} to="/analytics">
                Analytics
              </Button>
            </>
          )}

          {/* User Menu */}
          <Button
            color="inherit"
            onClick={handleOpenMenu}
            startIcon={<AccountCircleIcon />}
          >
            {user.name}
          </Button>

          <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={handleCloseMenu}>
            <MenuItem disabled>
              <Typography variant="body2">{user.role === 'admin' ? 'Admin' : 'Customer'}</Typography>
            </MenuItem>
            <MenuItem onClick={handleLogout} startIcon={<LogoutIcon />}>
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default UpdatedNavbar;

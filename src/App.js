import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, CssBaseline, ThemeProvider, createTheme, Box } from '@mui/material';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { VehicleProvider } from './context/VehicleContext';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import AddCustomerPage from './components/AddCustomerPage';
import AddRentalPage from './components/AddRentalPage';
import ViewDataPage from './components/ViewDataPage';
import AnalyticsPage from './components/AnalyticsPage';
import BrowseRentalsPage from './components/BrowseRentalsPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import CheckoutPage from './components/CheckoutPage';
import PaymentPage from './components/PaymentPage';

const theme = createTheme({
  palette: {
    primary: {
      main: '#059669',
    },
    secondary: {
      main: '#0891b2',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

// Protected Route Component for authenticated users
const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>Loading...</Box>;
  }

  if (!user) {
    return <LoginPage />;
  }

  return children;
};

function AppContent() {
  const [customers, setCustomers] = useState([
    { id: 1, name: 'John Doe', phone: '123-456-7890', address: '123 Main St' },
    { id: 2, name: 'Jane Smith', phone: '234-567-8901', address: '456 Oak Ave' },
  ]);

  const [rentals, setRentals] = useState([
    { id: 1, customerId: 1, vehicleName: 'Toyota Fortuner', vehicleType: 'Car', brand: 'Toyota', fuelType: 'Diesel', color: 'White', startDate: '2024-01-10', endDate: '2024-01-12', cost: 12000 },
    { id: 2, customerId: 2, vehicleName: 'Honda City', vehicleType: 'Car', brand: 'Honda', fuelType: 'Petrol', color: 'Red', startDate: '2024-01-15', endDate: '2024-01-17', cost: 5000 },
    { id: 3, customerId: 1, vehicleName: 'Royal Enfield Classic', vehicleType: 'Bike', brand: 'Royal Enfield', fuelType: 'Petrol', color: 'Black', startDate: '2024-02-05', endDate: '2024-02-07', cost: 1600 },
  ]);

  const addCustomer = (newCustomer) => {
    const customer = {
      id: customers.length > 0 ? Math.max(...customers.map(c => c.id)) + 1 : 1,
      ...newCustomer,
    };
    setCustomers([...customers, customer]);
  };

  const addRental = (newRental) => {
    const rental = {
      id: rentals.length > 0 ? Math.max(...rentals.map(r => r.id)) + 1 : 1,
      ...newRental,
      cost: calculateRentalCost(newRental.startDate, newRental.endDate, newRental.pricePerDay),
    };
    setRentals([...rentals, rental]);
  };

  const calculateRentalCost = (startDate, endDate, pricePerDay = 2500) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return Math.max(1, days) * pricePerDay;
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" style={{ marginTop: '24px', marginBottom: '24px' }}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/browse-rentals" element={<BrowseRentalsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Protected Routes - Require Authentication */}
          <Route
            path="/add-customer"
            element={
              <ProtectedRoute>
                <AddCustomerPage onAddCustomer={addCustomer} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-rental"
            element={
              <ProtectedRoute>
                <AddRentalPage customers={customers} onAddRental={addRental} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/view-data"
            element={
              <ProtectedRoute>
                <ViewDataPage customers={customers} rentals={rentals} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <ProtectedRoute>
                <AnalyticsPage rentals={rentals} customers={customers} />
              </ProtectedRoute>
            }
          />

          {/* E-Commerce Routes */}
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment"
            element={
              <ProtectedRoute>
                <PaymentPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Container>
    </>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AuthProvider>
          <VehicleProvider>
            <CartProvider>
              <AppContent />
            </CartProvider>
          </VehicleProvider>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;

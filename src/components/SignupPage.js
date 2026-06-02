import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

function SignupPage() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.fullName || !formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const result = signup(formData.fullName, formData.email, formData.password);
      if (result.success) {
        navigate('/');
      } else {
        setError(result.message);
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
        }}
      >
        <Paper sx={{ padding: '40px', maxWidth: '100%', boxShadow: 3 }}>
          <Box sx={{ textAlign: 'center', marginBottom: '32px' }}>
            <PersonAddIcon sx={{ fontSize: 48, color: '#059669', marginBottom: '16px' }} />
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#059669' }}>
              Create Account
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Join us to start booking rentals
            </Typography>
          </Box>

          {error && <Alert severity="error" sx={{ marginBottom: '16px' }}>{error}</Alert>}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              margin="normal"
              required
              placeholder="John Doe"
            />

            <TextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              required
              placeholder="your.email@example.com"
            />

            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              required
              placeholder="At least 6 characters"
            />

            <TextField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              margin="normal"
              required
              placeholder="Re-enter password"
            />

            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              sx={{ marginTop: '24px' }}
              type="submit"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          <Typography sx={{ textAlign: 'center', marginTop: '16px', color: 'textSecondary' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#059669', textDecoration: 'none', fontWeight: 'bold' }}>
              Sign In Here
            </Link>
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
}

export default SignupPage;

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
  Card,
  CardContent,
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const result = login(formData.email, formData.password);
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
        {/* Demo Credentials Card */}
        <Card sx={{ marginBottom: '24px', width: '100%', backgroundColor: '#e3f2fd' }}>
          <CardContent>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', marginBottom: '8px' }}>
              📌 Demo Credentials:
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: '4px' }}>
              <strong>Admin:</strong> admin@rental.com / admin123
            </Typography>
            <Typography variant="body2">
              <strong>User:</strong> user@rental.com / user123
            </Typography>
          </CardContent>
        </Card>

        <Paper sx={{ padding: '40px', maxWidth: '100%', boxShadow: 3 }}>
          <Box sx={{ textAlign: 'center', marginBottom: '32px' }}>
            <LockIcon sx={{ fontSize: 48, color: '#059669', marginBottom: '16px' }} />
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#059669' }}>
              Welcome Back
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Sign in to your rental account
            </Typography>
          </Box>

          {error && <Alert severity="error" sx={{ marginBottom: '16px' }}>{error}</Alert>}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              required
              placeholder="Enter your email"
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
              placeholder="Enter your password"
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
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>

          <Typography sx={{ textAlign: 'center', marginTop: '16px', color: 'textSecondary' }}>
            Don't have an account?{' '}
            <Link to="/signup" style={{ color: '#059669', textDecoration: 'none', fontWeight: 'bold' }}>
              Sign Up Here
            </Link>
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
}

export default LoginPage;

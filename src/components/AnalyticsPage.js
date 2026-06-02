import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

function AnalyticsPage({ rentals, customers }) {
  // Prepare Revenue Chart Data
  const revenueByItem = {};
  rentals.forEach((rental) => {
    if (!revenueByItem[rental.item]) {
      revenueByItem[rental.item] = 0;
    }
    revenueByItem[rental.item] += rental.cost;
  });

  const revenueData = Object.entries(revenueByItem).map(([item, cost]) => ({
    name: item,
    revenue: cost,
  }));

  // Prepare Rental Trends Data (by month)
  const rentalsByMonth = {};
  rentals.forEach((rental) => {
    const date = new Date(rental.startDate);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    if (!rentalsByMonth[monthKey]) {
      rentalsByMonth[monthKey] = { count: 0, revenue: 0 };
    }
    rentalsByMonth[monthKey].count += 1;
    rentalsByMonth[monthKey].revenue += rental.cost;
  });

  const trendData = Object.entries(rentalsByMonth)
    .sort()
    .map(([month, data]) => ({
      month,
      rentals: data.count,
      revenue: data.revenue,
    }));

  // Prepare Customer Rental Count Data
  const customerRentals = {};
  rentals.forEach((rental) => {
    if (!customerRentals[rental.customerId]) {
      const customer = customers.find(c => c.id === rental.customerId);
      customerRentals[rental.customerId] = { name: customer?.name || 'Unknown', count: 0 };
    }
    customerRentals[rental.customerId].count += 1;
  });

  const customerData = Object.values(customerRentals).slice(0, 5); // Top 5 customers

  // Colors for pie chart
  const COLORS = ['#059669', '#0891b2', '#ff9800', '#4caf50', '#2196f3', '#9c27b0'];

  // Summary Stats
  const totalRevenue = rentals.reduce((sum, r) => sum + r.cost, 0);
  const averageRental = rentals.length > 0 ? (totalRevenue / rentals.length).toFixed(2) : 0;
  const totalRentals = rentals.length;
  const averageRevenuePerDay = rentals.length > 0 ? (totalRevenue / rentals.length).toFixed(2) : 0;

  return (
    <Container maxWidth="lg">
      <Box sx={{ marginTop: '32px', marginBottom: '32px' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', marginBottom: '24px' }}>
          Analytics & Reports
        </Typography>

        {/* Summary Cards */}
        <Grid container spacing={2} sx={{ marginBottom: '32px' }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ backgroundColor: '#e3f2fd' }}>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Total Revenue
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#059669' }}>
                  ₹{totalRevenue}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ backgroundColor: '#f3e5f5' }}>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Total Rentals
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#9c27b0' }}>
                  {totalRentals}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ backgroundColor: '#e8f5e9' }}>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Avg. Per Rental
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#4caf50' }}>
                  ₹{averageRental}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ backgroundColor: '#fff3e0' }}>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Avg. Daily Rate
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#ff9800' }}>
                  ₹{averageRevenuePerDay}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Charts */}
        <Grid container spacing={3}>
          {/* Revenue Chart */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ padding: '16px' }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Revenue by Item
              </Typography>
              {revenueData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => `₹${value}`} />
                    <Bar dataKey="revenue" fill="#059669" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <Typography color="textSecondary" sx={{ textAlign: 'center', marginTop: '32px' }}>
                  No rental data available
                </Typography>
              )}
            </Paper>
          </Grid>

          {/* Rental Trends Chart */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ padding: '16px' }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Rental Trends
              </Typography>
              {trendData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => value} />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="rentals" 
                      stroke="#2196f3" 
                      strokeWidth={2}
                      name="Number of Rentals"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#4caf50" 
                      strokeWidth={2}
                      name="Revenue (₹)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <Typography color="textSecondary" sx={{ textAlign: 'center', marginTop: '32px' }}>
                  No rental data available
                </Typography>
              )}
            </Paper>
          </Grid>

          {/* Customer Rental Distribution */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ padding: '16px' }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Rentals by Customer
              </Typography>
              {customerData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={customerData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, count }) => `${name}: ${count}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {customerData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value} rentals`} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <Typography color="textSecondary" sx={{ textAlign: 'center', marginTop: '32px' }}>
                  No customer data available
                </Typography>
              )}
            </Paper>
          </Grid>

          {/* Revenue Growth Chart */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ padding: '16px' }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Revenue Distribution by Item
              </Typography>
              {revenueData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={revenueData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, revenue }) => `${name}: ₹${revenue}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="revenue"
                    >
                      {revenueData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `₹${value}`} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <Typography color="textSecondary" sx={{ textAlign: 'center', marginTop: '32px' }}>
                  No revenue data available
                </Typography>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default AnalyticsPage;

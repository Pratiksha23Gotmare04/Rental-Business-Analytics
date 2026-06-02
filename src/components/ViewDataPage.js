import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Tab,
  Card,
  CardContent,
} from '@mui/material';

function TabPanel(props) {
  const { children, value, index } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function ViewDataPage({ customers, rentals }) {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const getCustomerName = (customerId) => {
    const customer = customers.find(c => c.id === parseInt(customerId));
    return customer ? customer.name : 'Unknown';
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ marginTop: '32px' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', marginBottom: '24px' }}>
          View Data
        </Typography>

        <Paper sx={{ width: '100%' }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="data tabs"
            sx={{ borderBottom: '1px solid #e0e0e0' }}
          >
            <Tab label={`Customers (${customers.length})`} id="tab-0" aria-controls="tabpanel-0" />
            <Tab label={`Rentals (${rentals.length})`} id="tab-1" aria-controls="tabpanel-1" />
            <Tab label="Summary" id="tab-2" aria-controls="tabpanel-2" />
          </Tabs>

          {/* Customers Tab */}
          <TabPanel value={tabValue} index={0}>
            {customers.length === 0 ? (
              <Typography color="textSecondary">No customers found. Add a customer to get started.</Typography>
            ) : (
              <TableContainer>
                <Table>
                  <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Phone</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Address</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {customers.map((customer) => (
                      <TableRow key={customer.id} hover>
                        <TableCell>{customer.id}</TableCell>
                        <TableCell>{customer.name}</TableCell>
                        <TableCell>{customer.phone}</TableCell>
                        <TableCell>{customer.address}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </TabPanel>

          {/* Rentals Tab */}
          <TabPanel value={tabValue} index={1}>
            {rentals.length === 0 ? (
              <Typography color="textSecondary">No rentals found. Add a rental to get started.</Typography>
            ) : (
              <TableContainer>
                <Table>
                  <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Customer</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Item</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Start Date</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>End Date</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Cost</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rentals.map((rental) => (
                      <TableRow key={rental.id} hover>
                        <TableCell>{rental.id}</TableCell>
                        <TableCell>{getCustomerName(rental.customerId)}</TableCell>
                        <TableCell>{rental.item}</TableCell>
                        <TableCell>{new Date(rental.startDate).toLocaleDateString()}</TableCell>
                        <TableCell>{new Date(rental.endDate).toLocaleDateString()}</TableCell>
                        <TableCell>₹{rental.cost}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </TabPanel>

          {/* Summary Tab */}
          <TabPanel value={tabValue} index={2}>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Total Customers
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#059669' }}>
                    {customers.length}
                  </Typography>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Total Rentals
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#059669' }}>
                    {rentals.length}
                  </Typography>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Total Revenue
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#059669' }}>
                    ₹{rentals.reduce((sum, r) => sum + r.cost, 0)}
                  </Typography>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Average Rental Cost
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#059669' }}>
                    ₹{rentals.length > 0 ? (rentals.reduce((sum, r) => sum + r.cost, 0) / rentals.length).toFixed(2) : 0}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </TabPanel>
        </Paper>
      </Box>
    </Container>
  );
}

export default ViewDataPage;

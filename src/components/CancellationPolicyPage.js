import React from 'react';
import { Container, Paper, Typography, Box, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CancelIcon from '@mui/icons-material/Cancel';

function CancellationPolicyPage() {
  const policies = [
    {
      title: 'General Cancellation Policy',
      content: `We understand that plans change. That's why we offer flexible cancellation options.
      
• Free Cancellation: Cancel up to 48 hours before your rental period starts for a full refund.
• 50% Refund: Cancel 24-48 hours before your rental period for a 50% refund of the rental cost.
• No Refund: Cancellations made within 24 hours of the rental start date are non-refundable.
• Extension Changes: You can modify your rental dates at no extra charge if done 72 hours before the rental period.`,
    },
    {
      title: 'Damages & Security Deposits',
      content: `We want to ensure all rental items are returned in good condition.

• Security Deposit: A security deposit of 20% of the rental price is required for all bookings.
• Damage Assessment: Items will be inspected upon return for any damage.
• Normal Wear & Tear: Minor wear and tear is acceptable and won't affect your deposit.
• Damage Charges: Any damage beyond normal use will be charged separately.
• Deposit Refund: Your deposit will be refunded within 5-7 business days if no damage is found.`,
    },
    {
      title: 'Late Return Policy',
      content: `We appreciate your business, but timely returns help us serve other customers.

• Grace Period: 2 hours free grace period after the scheduled return time.
• Late Fees: ₹25 per hour or part thereof after the grace period.
• Extended Rental: Contact us to extend your rental at the regular daily rate + 20% rush fee.
• Maximum Late Fee: Late fees cannot exceed 50% of the original rental cost.
• Item Lockout: Items not returned within 48 hours will be reported as missing.`,
    },
    {
      title: 'Lost or Unreturned Items',
      content: `In the unlikely event an item isn't returned, here's our policy:

• Replacement Cost: You will be charged the full replacement cost of the item.
• Insurance Claim: If you have damage waiver insurance, we'll help file a claim.
• Report Timeline: Items must be reported as lost within 24 hours of expected return.
• Police Report: For high-value items, a police report may be required.
• Recovery Options: We'll work with you to resolve the situation fairly.`,
    },
    {
      title: 'Refund Processing',
      content: `We process refunds promptly and securely.

• Processing Time: Refunds are processed within 5-7 business days.
• Original Payment Method: Refunds are returned to your original payment method.
• Bank Processing: Your bank may take an additional 2-3 business days.
• Partial Refunds: Calculate as: (Full rental price - Days used) for mid-rental cancellations.
• Tracking: You'll receive email confirmation of your refund with reference number.`,
    },
    {
      title: 'Special Circumstances',
      content: `We understand life happens. Here are exceptions to our standard policy:

• Weather Emergency: Full refund if rental cannot be safely used due to extreme weather.
• Equipment Failure: If rental equipment is defective, full refund within 2 hours of discovery.
• Medical Emergency: Documentation required for medical-related cancellations.
• Relocation: If you relocate unexpectedly, we'll refund minus 10% processing fee.
• Force Majeure: Natural disasters or government restrictions qualify for full refunds.`,
    },
  ];

  return (
    <Container maxWidth="md">
      <Box sx={{ marginTop: '32px', marginBottom: '32px' }}>
        <Box sx={{ textAlign: 'center', marginBottom: '32px' }}>
          <CancelIcon sx={{ fontSize: 48, color: '#ff9800', marginBottom: '16px' }} />
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#059669' }}>
            Cancellation & Return Policy
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Please read our comprehensive cancellation and return policy below
          </Typography>
        </Box>

        <Paper sx={{ padding: '24px', marginBottom: '24px', backgroundColor: '#fff3cd', border: '1px solid #ffc107' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '8px', color: '#856404' }}>
            📋 Quick Summary
          </Typography>
          <Typography variant="body2" sx={{ color: '#856404' }}>
            • <strong>Free Cancellation:</strong> Up to 48 hours before rental<br />
            • <strong>50% Refund:</strong> 24-48 hours before rental<br />
            • <strong>Late Return:</strong> ₹25/hour after 2-hour grace period<br />
            • <strong>Security Deposit:</strong> 20% of rental price (refundable)
          </Typography>
        </Paper>

        <Box>
          {policies.map((policy, index) => (
            <Accordion key={index} defaultExpanded={index === 0}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {policy.title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography
                  component="div"
                  sx={{
                    whiteSpace: 'pre-wrap',
                    lineHeight: '1.8',
                    color: 'textSecondary',
                  }}
                >
                  {policy.content}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>

        <Paper sx={{ padding: '24px', marginTop: '32px', backgroundColor: '#e8f5e9', border: '1px solid #4caf50' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '12px', color: '#2e7d32' }}>
            ✓ We're Here to Help
          </Typography>
          <Typography variant="body2" sx={{ color: '#2e7d32', marginBottom: '12px' }}>
            Have questions about our cancellation policy? Contact our support team:
          </Typography>
          <Typography variant="body2" sx={{ color: '#2e7d32' }}>
            <strong>Email:</strong> support@rental.com<br />
            <strong>Phone:</strong> 1-800-RENTAL-1<br />
            <strong>Hours:</strong> Monday-Friday, 9 AM - 6 PM EST
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
}

export default CancellationPolicyPage;

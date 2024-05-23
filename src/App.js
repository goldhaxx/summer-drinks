// src/App.js
import React, { useState } from 'react';  // Import useState from React
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import Logo from './Logo'; // Import the Logo component

function App() {
  const [currentTemp, setCurrentTemp] = useState('');
  const [drinksConsumed, setDrinksConsumed] = useState('');
  const [adjustedTotal, setAdjustedTotal] = useState(null);

  const calculateAdjustedTotal = () => {
    const temp = parseFloat(currentTemp);
    const drinks = parseFloat(drinksConsumed);
    if (isNaN(temp) || isNaN(drinks)) {
      alert('Please enter valid numbers');
      return;
    }
    const pi = Math.PI;
    const total = ((81 - temp) * pi / 81) * drinks;
    setAdjustedTotal(total);
  };

  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
        <Logo /> {/* Add the Logo component here */}
        <Typography variant="h4" gutterBottom>
          Summer Drinks Calculator
        </Typography>
        <TextField
          label="Current Temperature (°F)"
          variant="outlined"
          value={currentTemp}
          onChange={(e) => setCurrentTemp(e.target.value)}
          margin="normal"
          fullWidth
        />
        <TextField
          label="Number of Drinks Consumed"
          variant="outlined"
          value={drinksConsumed}
          onChange={(e) => setDrinksConsumed(e.target.value)}
          margin="normal"
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          onClick={calculateAdjustedTotal}
          sx={{ mt: 2 }}
        >
          Calculate
        </Button>
        {adjustedTotal !== null && (
          <Typography variant="h6" mt={2}>
            Adjusted Summer Drink Total: {adjustedTotal.toFixed(2)}
          </Typography>
        )}
      </Box>
    </Container>
  );
}

export default App;

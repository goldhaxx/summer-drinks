// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box, Grid, Link } from '@mui/material';
import Logo from './Logo';
import './App.css'; // Import the new CSS file

function App() {
  const [currentTemp, setCurrentTemp] = useState('');
  const [drinksConsumed, setDrinksConsumed] = useState('');
  const [adjustedTotal, setAdjustedTotal] = useState(null);
  const [loadingTemp, setLoadingTemp] = useState(false);
  const [showCustomInput, setShowCustomInput] = useState(false);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          const { latitude, longitude } = position.coords;
          fetchTemperature(latitude, longitude);
        }, error => {
          console.error("Error fetching geolocation", error);
          alert("Error fetching geolocation. Please ensure location services are enabled.");
        });
      } else {
        alert('Geolocation is not supported by this browser.');
      }
    };

    const fetchTemperature = async (lat, lon) => {
      setLoadingTemp(true);
      try {
        const response = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&temperature_unit=fahrenheit`);
        setCurrentTemp(response.data.current_weather.temperature);
      } catch (error) {
        alert('Error fetching temperature data');
      }
      setLoadingTemp(false);
    };

    getLocation();
  }, []);

  const calculateAdjustedTotal = (drinks) => {
    const temp = parseFloat(currentTemp);
    if (isNaN(temp) || isNaN(drinks)) {
      alert('Please enter valid numbers');
      return;
    }
    const pi = Math.PI;
    const total = ((81 - temp) * pi / 81) * drinks;
    setAdjustedTotal(total);
  };

  const handleDrinkButtonClick = (value) => {
    setDrinksConsumed(value);
    calculateAdjustedTotal(value);
    setShowCustomInput(false);
  };

  const handleCustomInputChange = (event) => {
    const value = event.target.value;
    setDrinksConsumed(value);
    calculateAdjustedTotal(value);
  };

  return (
    <Container className="container" maxWidth="sm">
      <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
        <Logo />
        <Typography variant="h4" gutterBottom>
          Summer Drinks Calculator
        </Typography>
        {loadingTemp ? (
          <Typography variant="h6" gutterBottom>
            Loading temperature...
          </Typography>
        ) : (
          <TextField
            label="Current Temperature (°F)"
            variant="outlined"
            value={currentTemp}
            onChange={(e) => setCurrentTemp(e.target.value)}
            margin="normal"
            fullWidth
          />
        )}
        <Typography variant="h6" gutterBottom mt={2}>
          How many drinks have you had?
        </Typography>
        <Grid container spacing={1}>
          {[...Array(10).keys()].map((_, index) => (
            <Grid item xs={4} sm={2} key={index}>
              <Button
                className="drink-button"
                fullWidth
                onClick={() => handleDrinkButtonClick(index + 1)}
              >
                {index + 1}
              </Button>
            </Grid>
          ))}
          <Grid item xs={4} sm={2}>
            <Button
              className="other"
              fullWidth
              onClick={() => setShowCustomInput(true)}
            >
              Other
            </Button>
          </Grid>
        </Grid>
        {showCustomInput && (
          <>
            <Typography variant="h6" gutterBottom mt={2}>
              More than 10? Legend.
            </Typography>
            <TextField
              label="Number of Drinks Consumed"
              variant="outlined"
              value={drinksConsumed}
              onChange={handleCustomInputChange}
              margin="normal"
              fullWidth
            />
          </>
        )}
        {adjustedTotal !== null && (
          <>
            <Typography variant="h4" mt={2}>
              Adjusted Summer Drink Total: {adjustedTotal.toFixed(2)}
            </Typography>
            <Typography variant="body2" mt={2}>
              The theorem used to calculate this was peer reviewed following a rigorous academic study which can be found here: 
              <Link href="https://www.instagram.com/reel/C7Rh1xQuBRS/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" target="_blank" rel="noopener">
                Pythagoras Beerum
              </Link>
            </Typography>
          </>
        )}
      </Box>
    </Container>
  );
}

export default App;

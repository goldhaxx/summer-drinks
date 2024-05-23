// src/Logo.js
import React from 'react';
import { Box } from '@mui/material';
import logo from './assets/logo512.png'; // Adjust the path if needed

const Logo = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
      <img src={logo} alt="Logo" style={{ width: '100%', maxWidth: '200px', height: 'auto' }} />
    </Box>
  );
};

export default Logo;

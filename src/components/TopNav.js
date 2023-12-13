import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import Logo from '../components/estimCarLogo.gif';
import { useNavigate } from 'react-router-dom';

const TopNavbar = () => {
  const navigate = useNavigate();

  const goToHome = () => navigate('/estimer_voiteure');
  const goToNeuf = () => navigate('/vehicule-neuf');
  const goToOccasion = () => navigate('/vehicule-occasion');

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Logo and "estimCar" */}
        <div
          onClick={goToHome}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
        >
          <img src={Logo} alt="Logo" style={{ width: '60px', marginRight: '10px' }} />
          <Typography variant="h6" component="div" sx={{  color: 'inherit' }}>
            EstimCar
          </Typography>
        </div>

        {/* Buttons */}
        <div>
          <Button color="inherit" onClick={goToNeuf}>
            Neuf
          </Button>
          <Button color="inherit" onClick={goToOccasion}>
            Occasion
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default TopNavbar;

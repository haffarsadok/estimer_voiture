import React, { useState } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BgVideo from '../components/backgroundVideo.mp4';
import { Wave1 } from './examples.js';
import '../components/StepperButtonsStyle.css'
const StepperButtons = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const navigate = useNavigate();

  const handleNouveauClick = () => {
    setSelectedOption('nouveau');
    navigate('/nouveau');
  };

  const handleUtiliserClick = () => {
    setSelectedOption('utiliser');
    navigate('/utiliser');
  };

  return (
    <div >
      {selectedOption === '' && (
        <div>
          <video
            src={BgVideo}
            autoPlay
            muted
            loop
            className='video-bg'
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              top: '0',
              zIndex: '-1',
              objectFit: 'cover'
            }}
          />
          <div
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)', // Center horizontally and vertically
            }}
          >
            <Wave1 style={{ marginBottom: '20px', color: 'blue', textAlign: '' }} />

            <div style={{ textAlign: 'center' }}>
              <Button variant="contained" className='btn-stepper' onClick={handleNouveauClick} style={{ margin: '10px' }}>
                Nouveau
              </Button>
              
              <Button variant="contained" className='btn-stepper'onClick={handleUtiliserClick} style={{ margin: '10px' }}>
                Utiliser
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StepperButtons;

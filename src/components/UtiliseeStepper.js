// components/UtiliseeStepper.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import carLoaderGif from './carloader.gif';
import '../App.css';
import {
  Box,
  Button,
  CssBaseline,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions, // Import TextField for input
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';

const steps = ['Marque/\nModèle', 'Identification', 'Caractéristiques', 'Etat du véhicule', 'Info', 'Finaliser'];

const brands = ['Renault', 'VOLKSWAGEN'];

const models = {
  Renault: ['CLIO', 'MEGANE SEDAN'],
  VOLKSWAGEN: ['POLO', 'Golf'],
};


// This function estimates the car price based on the formData object.
function estimateCarPrice(formData) {
  let price;
  const yearModel = parseInt(formData.yearModel);
  const marque = formData.marque.trim(); // Trim any whitespace
  const model = formData.model.trim(); // Trim any whitespace

  if (yearModel === 2018 && marque === "Renault" && model === "CLIO") {
    price = 49000;
  } else if (yearModel === 2019 && marque === "Renault" && model === "CLIO") {
    price = 51000;
  } else if (yearModel === 2020 && marque === "Renault" && model === "CLIO") {
    price = 53000;
  } else if (yearModel === 2021 && marque === "Renault" && model === "CLIO") {
    price = 55000;
  }else if (yearModel === 2022 && marque === "Renault" && model === "CLIO") {
    price = 40000;
  }

  console.log("Price after if block:", price);


  // Apply a standard depreciation rate of 5% per year
  const currentYear = new Date().getFullYear();

  const age = Number(currentYear) - formData.yearModel;

  price -= price * 0.05 * Number(age);


  // Mileage adjustment (assuming high mileage lowers the price more)
  price -= formData.mileage * 0.1;

  // Adjustments based on car features
  const featureAdjustments = {
    'carrosserie': {
      'Compacte': 0,
      'Citadine': 0,
      'SUV': +1000
    },
    'energie': {
      'Essence': 0,
      'Diesel': 500,
      'Electrique': 2000
    },
    'boite': {
      'Manuelle': 0,
      'Auto': 0,
      'Manuelle/Auto': 1500
    },
    'nombrePlaces': {
      '2': 0,
      '5': 0,
      '8': 1000,
      '9': 1500
    },
    'nombrePortes': {
      '3': 0,
      '5': 0
    },
    'puissanceFiscale': {
      '5 CV': 0,
      '8 CV': 500,
      '10 CV': 1000
    },
    'couleur': {
      'Noir': 0,
      'Blanc': 0,
      'Metalic': 500,
      'Autre': 0
    },
    'pneuAvant': {
      'Excellent': 0,
      '-50% usure': -200,
      '+50% usure': -400,
      'A changer': -1000
    },
    'pneuArriere': {
      'Excellent': 0,
      '-50% usure': -200,
      '+50% usure': -400,
      'A changer': -1000
    },
    'interieurVehicule': {
      'neuf': 1000,
      'bon': 500,
      'moyen': 0,
      'mauvais': -1000
    },
    'exterieurVehicule': {
      'neuf': 1000,
      'micro-rayures': -250,
      'rayures': -500,
      'degats': -1000
    }
  };

  // Apply feature adjustments
  Object.keys(featureAdjustments).forEach((feature) => {
    const value = formData[feature];
    if (value && featureAdjustments[feature][value] !== undefined) {
      price += featureAdjustments[feature][value];
    }
  });

  // Handle accidents
  if (formData.vehiculeAccidente === 'oui') {
    price -= 5000; // Flat decrease for accident
    if (formData.rebuild === 'oui') {
      price += 1000; // Adjustment for rebuild
    } else {
      price -= 2000; // Adjustment for non-rebuild
    }
    if (formData.enMarche === 'oui') {
      price += 1000; // Adjustment if the car is operational
    } else {
      price -= 2000; // Adjustment if the car is not opertional
    }
    if (formData.moteur === 'oui') {
      price -= 1500; // Substantial reduction for engine damage
    }
    // Deduct for damages on sides or rear
    price -= formData.droite === 'oui' ? 1000 : 0;
    price -= formData.gauche === 'oui' ? 1000 : 0;
    price -= formData.arriere === 'oui' ? 1000 : 0;
  }

  // Ensure price does not go below a certain threshold

  return Math.max(price, 1000); // Set the minimum possible price to avoid negative values
}

const UtiliseeStepper = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showAdditionalStep, setShowAdditionalStep] = useState(false);
  const [EstimPrice, setEstimPrice] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    marque: '',
    model: '',
    monthYear: null,
    yearModel: 0,
    mileage: 0,
    carrosserie: '',
    energie: '',
    boite: '',
    nombrePlaces: '',
    nombrePortes: '',
    puissanceFiscale: '',
    couleur: '',
    pneuAvant: '',
    pneuArriere: '',
    interieurVehicule: '',
    exterieurVehicule: '',
    vehiculeAccidente: '',
    rebuild: 'oui',
    enMarche: 'oui',
    moteur: 'non',
    droite: 'non',
    gauche: 'non',
    arriere: 'non',
  });
  const [openDialog, setOpenDialog] = useState(false);

  const handleEstimate = () => {
    setLoading(true);

    setTimeout(() => {
      const estimatedPrice = estimateCarPrice(formData);
      setEstimPrice(estimatedPrice);
      setLoading(false); // Stop loading
      setOpenDialog(true); // Open the dialog after the process is complete
    }, 5000);
  };


  const handleNext = () => {


    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };


  const handleBack = () => {

    setActiveStep((prevActiveStep) => prevActiveStep - 1);

  };
  const handleAutomobileLien = () => {
    // Replace the condition with the actual model names you have
    if (formData.marque === 'Renault' && formData.model === 'CLIO' && formData.yearModel === 2021 && formData.vehiculeAccidente === "non") {
      window.open('https://www.automobile.tn/fr/occasion/s=keyword!renault%20clio@year_min!2021@year_max!2021@sort!-year');
    } if (formData.marque === 'Renault' && formData.model === 'CLIO' && formData.yearModel === 2022 && formData.vehiculeAccidente === "non") {
      window.open('https://www.automobile.tn/fr/occasion/s=keyword!renault%20clio@year_min!2022@year_max!2022@sort!-year');
    } else if (formData.marque === 'Renault' && formData.model === 'CLIO' && formData.yearModel === 2020 && formData.vehiculeAccidente === "non") {
      window.open('https://www.automobile.tn/fr/occasion/s=keyword!renault%20clio@year_min!2020@year_max!2020@sort!-year');
    } else if (formData.marque === 'Renault' && formData.model === 'CLIO' && formData.yearModel === 2019 && formData.vehiculeAccidente === "non") {
      window.open('https://www.automobile.tn/fr/occasion/s=keyword!renault%20clio@year_min!2019@year_max!2019@sort!-year');
    } else if (formData.marque === 'Renault' && formData.model === 'CLIO' && formData.yearModel === 2021 && formData.vehiculeAccidente === "oui") {
      window.open('https://www.automobile.tn/fr/occasion/s=keyword!renault%20clio@year_min!2021@year_max!2021@sort!-year');
    } else if (formData.marque === 'Renault' && formData.model === 'CLIO' && formData.yearModel === 2022 && formData.vehiculeAccidente === "oui") {
      window.open('https://www.autolive.be/fr/vehicule-accidente/vehicule-accidente-a-vendre/pt_id:76,206/vehicle_brand_model:4561,4564,4561-4564/reg_year:2022,2022');
    } else if (formData.marque === 'Renault' && formData.model === 'CLIO' && formData.yearModel === 2020 && formData.vehiculeAccidente === "oui") {
      window.open('https://www.autolive.be/fr/vehicule-accidente/vehicule-accidente-a-vendre/pt_id:76,206/vehicle_brand_model:4561,4564,4561-4564/reg_year:2020,2020');
    } else if (formData.marque === 'Renault' && formData.model === 'CLIO' && formData.yearModel === 2019 && formData.vehiculeAccidente === "oui") {
      window.open('https://www.autolive.be/fr/vehicule-accidente/vehicule-accidente-a-vendre/pt_id:76,206/vehicle_brand_model:4561,4564,4561-4564/reg_year:2019,2019');
    } else if (formData.marque === 'Renault' && formData.model === 'CLIO' && formData.yearModel === 2021 && formData.vehiculeAccidente === "oui") {
      window.open('https://www.autolive.be/fr/vehicule-accidente/vehicule-accidente-a-vendre/pt_id:76,206/vehicle_brand_model:4561,4564,4561-4564/reg_year:2021,2021');
    } 
  };
  const handleDialogClose = () => {
    setOpenDialog(false)
    setActiveStep(steps.length - 1)
  };
  const handleDialogOK = () => {
    setOpenDialog(false);

    setFormData({
      marque: '',
      model: '',
      monthYear: null,
      yearModel: 0,
      mileage: 0,
      carrosserie: '',
      energie: '',
      boite: '',
      nombrePlaces: '',
      nombrePortes: '',
      puissanceFiscale: '',
      couleur: '',
      pneuAvant: '',
      pneuArriere: '',
      interieurVehicule: '',
      exterieurVehicule: '',
      vehiculeAccidente: '',
      rebuild: 'oui',
      enMarche: 'oui',
      moteur: 'non',
      droite: 'non',
      gauche: 'non',
      arriere: 'non',

    });
    setActiveStep(0);
    setEstimPrice(null);
    navigate('/estimer_voiteure'); // Navigate to the root URL
  };
  dayjs.extend(localizedFormat);
  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={10}>
      <CssBaseline />
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box width={500}>

        {activeStep === steps.length ? (
          <div style={{ marginTop: '20px' }}>
            <Typography><strong>Your Car : </strong></Typography>
            <Grid container spacing={3} style={{ marginTop: '20px' }}>
              <Grid item xs={6} >
                {/* Left column */}

                <Typography variant="body1" gutterBottom>
                  <strong>Marque :</strong> {formData.marque}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Modèle :</strong> {formData.model}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Année :</strong> {formData.yearModel}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Kilométrage :</strong> {formData.mileage}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Mise en circulation :</strong> {dayjs(formData.monthYear).format('DD/MM/YYYY')}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Carrosserie :</strong> {formData.carrosserie}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Énergie:</strong> {formData.energie}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Boîte:</strong> {formData.boite}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>nombre Places:</strong> {formData.nombrePlaces}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>nombre Portes:</strong> {formData.nombrePortes}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Puissance Fiscale:</strong> {formData.puissanceFiscale}
                </Typography>

                <Typography variant="body1" gutterBottom>
                  <strong>Couleur:</strong> {formData.couleur}
                </Typography>

              </Grid>
              <Grid item xs={6}>
                {/* Right column */}

                <Typography variant="body1" gutterBottom>
                  <strong>Etat Pneu Avant:</strong> {formData.pneuAvant}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Etat Pneu Arrière:</strong> {formData.pneuArriere}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Etat interieur Vehicule:</strong> {formData.interieurVehicule}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Etat exterieur Vehicule:</strong> {formData.exterieurVehicule}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>vehicule Accidente:</strong> {formData.vehiculeAccidente}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>vehicule Réparée:</strong> {formData.rebuild}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>vehicule en Marche:</strong> {formData.enMarche}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Moteur accidenté:</strong> {formData.moteur}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>coté droite accidenté:</strong> {formData.droite}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>coté gauche accidenté:</strong> {formData.gauche}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>coté Arrière accidenté:</strong> {formData.arriere}
                </Typography>

              </Grid>
            </Grid>
            <Button onClick={handleEstimate} variant="contained" color="primary" >
              Estimer
            </Button>
            {loading && (
              <div className="loader-overlay">
                <img src={carLoaderGif} alt="Loading..." />
              </div>
            )}

            <Dialog open={openDialog} onClose={handleDialogClose}>
              <DialogTitle>Estimated Price</DialogTitle>
              <DialogContent>
                <Typography variant='h6'>The estimated price of the {formData.marque}</Typography>
                <Typography variant='h6'>model :{formData.model} </Typography>
                <Typography variant='h5'> Price is :{EstimPrice} DT</Typography>


              </DialogContent>
              <DialogActions>
                <Button onClick={handleAutomobileLien} color="primary">
                  Check Price
                </Button>
                <Button onClick={handleDialogClose} color="primary">
                  Return
                </Button>
                <Button onClick={handleDialogOK} color="primary">
                  OK

                </Button>
              </DialogActions>
            </Dialog>
          </div>
        ) : (
          <div style={{ marginTop: '60px' }} >
            {/* Step 1: Marque/ Model */}
            {activeStep === 0 && (
              <Box>
                <FormControl fullWidth variant="outlined" style={{ marginTop: '16px' }}>
                  <InputLabel id="marque-label">Marque</InputLabel>
                  <Select
                    labelId="marque-label"
                    id="marque"
                    label="Marque"
                    value={formData.marque}
                    onChange={(e) => setFormData({ ...formData, marque: e.target.value, model: '' })}
                  >
                    {brands.map((brand) => (
                      <MenuItem key={brand} value={brand}>
                        {brand}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth variant="outlined" style={{ marginTop: '16px', marginBottom: '16px' }}>
                  <InputLabel id="model-label">Modèle</InputLabel>
                  <Select
                    labelId="model-label"
                    id="model"
                    label="Modèle"
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    disabled={!formData.marque}
                  >
                    {models[formData.marque]?.map((model) => (
                      <MenuItem key={model} value={model}>
                        {model}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            )}
            {/* Step 2: identifications */}
            {activeStep === 1 && (
              <Box>
                <FormControl fullWidth variant="outlined" style={{ marginTop: '16px' }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Date 1ère mise en circulation"
                      inputFormat="DD/MM/YYYY"
                      id="monthYear"
                      value={formData.monthYear}
                      onChange={(date) => setFormData({ ...formData, monthYear: date })}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </FormControl>
                <FormControl fullWidth variant="outlined" style={{ marginTop: '16px' }}>
                  <InputLabel id="yearModel-label">Année modèle</InputLabel>
                  <Select
                    labelId="yearModel-label"
                    id="yearModel"
                    label="Annéemodèle"
                    value={formData.yearModel}
                    onChange={(e) => setFormData({ ...formData, yearModel: Number(e.target.value) })}
                  >
                    {/* Add years from 2000 to 2024 */}
                    {Array.from({ length: 4 }, (_, index) => 2019 + index).map((year) => (
                      <MenuItem key={year} value={year}>
                        {year}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth variant="outlined" style={{ marginTop: '16px', marginBottom: '16px' }}>
                  <TextField
                    label="Kilométrage"
                    id="mileage"
                    type="text"
                    value={formData.mileage}
                    onChange={(e) => setFormData({ ...formData, mileage: Number(e.target.value) })}
                    InputProps={{ endAdornment: 'KM' }}
                  />
                </FormControl>
              </Box>
            )}
            {/* Step 3: Caractéristiques */}
            {activeStep === 2 && (
              <div style={{ marginTop: '25px' }}>
                {/* Carrosserie */}
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="carrosserie-label">Carrosserie</InputLabel>
                  <Select
                    labelId="carrosserie-label"
                    id="carrosserie"
                    label="Carrosserie"
                    value={formData.carrosserie}
                    onChange={(e) => setFormData({ ...formData, carrosserie: e.target.value })}
                  >
                    {['Compacte', 'Citadine', 'SUV'].map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {/* Energie */}
                <FormControl fullWidth variant="outlined" style={{ marginTop: '16px' }}>
                  <InputLabel id="energie-label">Energie</InputLabel>
                  <Select
                    labelId="energie-label"
                    id="energie"
                    label="Energie"
                    value={formData.energie}
                    onChange={(e) => setFormData({ ...formData, energie: e.target.value })}
                  >
                    {/* Add the possible energies of cars */}
                    <MenuItem value="Essence">Essence</MenuItem>
                    <MenuItem value="Diesel">Diesel</MenuItem>
                    <MenuItem value="Electrique">Electrique</MenuItem>
                    <MenuItem value="Hybride">Hybride</MenuItem>
                    <MenuItem value="GBL">GBL</MenuItem>
                    <MenuItem value="Bioéthanol">Bioéthanol</MenuItem>
                    <MenuItem value="Autres">Autres</MenuItem>
                    <MenuItem value="GNV">GNV</MenuItem>
                    {/* Add more if needed */}
                  </Select>
                </FormControl>
                {/* Boîte */}
                <FormControl fullWidth variant="outlined" style={{ marginTop: '16px' }}>
                  <InputLabel id="boite-label">Boîte</InputLabel>
                  <Select
                    labelId="boite-label"
                    id="boite"
                    label="Boîte"
                    value={formData.boite}
                    onChange={(e) => setFormData({ ...formData, boite: e.target.value })}
                  >
                    {['Manuelle', 'Auto', 'Manuelle/Auto'].map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* Nombre de Places */}
                <FormControl fullWidth variant="outlined" style={{ marginTop: '16px' }}>
                  <InputLabel id="nombre-places-label">Nombre de Places</InputLabel>
                  <Select
                    labelId="nombre-places-label"
                    id="nombre-places"
                    label="Nombre de Places"
                    value={formData.nombrePlaces}
                    onChange={(e) => setFormData({ ...formData, nombrePlaces: e.target.value })}
                  >
                    {['2', '5', '8', '9'].map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* Nombre de Portes */}
                <FormControl fullWidth variant="outlined" style={{ marginTop: '16px' }}>
                  <InputLabel id="nombre-portes-label">Nombre de Portes</InputLabel>
                  <Select
                    labelId="nombre-portes-label"
                    id="nombre-portes"
                    label="Nombre de Portes"
                    value={formData.nombrePortes}
                    onChange={(e) => setFormData({ ...formData, nombrePortes: e.target.value })}
                  >
                    {['3', '5'].map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {/* Puissance Fiscale */}
                <FormControl fullWidth variant="outlined" style={{ marginTop: '16px' }}>
                  <InputLabel id="puissance-fiscale-label">Puissance Fiscale</InputLabel>
                  <Select
                    labelId="puissance-fiscale-label"
                    id="puissance-fiscale"
                    label="Puissance Fiscale"
                    value={formData.puissanceFiscale}
                    onChange={(e) => setFormData({ ...formData, puissanceFiscale: e.target.value })}
                  >
                    {['5 CV', '8 CV', '10 CV'].map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {/* Couleur */}
                <FormControl fullWidth variant="outlined" style={{ marginTop: '16px' }}>
                  <InputLabel id="couleur-label">Couleur</InputLabel>
                  <Select
                    labelId="couleur-label"
                    id="couleur"
                    label="Couleur"
                    value={formData.couleur}
                    onChange={(e) => setFormData({ ...formData, couleur: e.target.value })}
                  >
                    {['Noir', 'Blanc', 'Metalic', 'Autre'].map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            )}
            {/* Step 4: Etat Véhicule */}
            {activeStep === 3 && (
              <div style={{ marginTop: '16px' }}>
                {/* Pneu Avant  */}
                <FormControl fullWidth variant="outlined" style={{ marginTop: '16px', marginBottom: '16px' }}>
                  <InputLabel id="pneuAvant-label">Pneu Avant</InputLabel>
                  <Select
                    labelId="pneuAvant-label"
                    id="pneuAvant"
                    label="pneuAvant"
                    value={formData.pneuAvant}
                    onChange={(e) => setFormData({ ...formData, pneuAvant: e.target.value })}
                  >
                    {['Excellent', '-50% usure', '+50% usure', 'A changer'].map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* Pneu Arriere  */}
                <FormControl fullWidth variant="outlined" style={{ marginTop: '16px', marginBottom: '16px' }}>
                  <InputLabel id="pneuArriere-label">Pneu arriére</InputLabel>
                  <Select
                    labelId="pneuArriere-label"
                    id="pneuArriere"
                    label="pneuArriere"
                    value={formData.pneuArriere}
                    onChange={(e) => setFormData({ ...formData, pneuArriere: e.target.value })}
                  >
                    {['Excellent', '-50% usure', '+50% usure', 'A changer'].map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {/* interieurVehicule*/}
                <FormControl component="fieldset">
                  <Typography variant="body1" style={{ marginRight: '35px', marginTop: '10px' }}>
                    <strong> Intérieur du Véhicule :</strong>
                  </Typography>
                  <RadioGroup
                    aria-label="interieurVehicule"
                    name="interieurVehicule"
                    value={formData.interieurVehicule}
                    onChange={(e) => setFormData({ ...formData, interieurVehicule: e.target.value })}
                    style={{ flexDirection: 'row', }}
                  >
                    <FormControlLabel value="neuf" control={<Radio />} label="Neuf" />
                    <FormControlLabel value="bon" control={<Radio />} label="Bon" />
                    <FormControlLabel value="moyen" control={<Radio />} label="Moyen" />
                    <FormControlLabel value="mauvais" control={<Radio />} label="Mauvais" />
                  </RadioGroup>
                </FormControl>
                {/* exterieurVehicule */}
                <FormControl component="fieldset">
                  <Typography variant="body1" style={{ marginTop: '10px' }}>
                    <strong> Extérieur du Véhicule :</strong>
                  </Typography>
                  <RadioGroup
                    aria-label="exterieurVehicule-label"
                    name="exterieurVehicule"
                    value={formData.exterieurVehicule}
                    onChange={(e) => setFormData({ ...formData, exterieurVehicule: e.target.value })}
                    style={{ flexDirection: 'row' }}
                  >
                    <FormControlLabel value="neuf" control={<Radio />} label="Neuf" />
                    <FormControlLabel value="micro-rayures" control={<Radio />} label="Micro-Rayures" />
                    <FormControlLabel value="rayures" control={<Radio />} label="Rayures" />
                    <FormControlLabel value="degats" control={<Radio />} label="Dégats" />
                  </RadioGroup>
                </FormControl>


              </div>
            )}
            {/* Step 5: Info */}
            {activeStep === 4 && (
              <div style={{ marginTop: '30px' }}>
                <FormControl component="fieldset">
                  <Typography variant="h6" style={{ marginBottom: '5px' }}>
                    Véhicule a fait un accident ?
                  </Typography>
                  <RadioGroup
                    aria-label="vehiculeAccidente"
                    name="vehiculeAccidente"
                    value={formData.vehiculeAccidente}
                    onChange={(e) => {
                      setFormData({ ...formData, vehiculeAccidente: e.target.value });
                      setShowAdditionalStep(e.target.value === 'oui');
                    }}
                    style={{ flexDirection: 'row' }}
                  >
                    <FormControlLabel value="oui" control={<Radio />} label="Oui" />
                    <FormControlLabel value="non" control={<Radio />} label="Non" />
                  </RadioGroup>
                </FormControl>

                {/* Additional Step */}
                {showAdditionalStep && (
                  <div>
                    <Typography variant="h6" style={{ marginBottom: '0px' }}>
                      Véhicule Rebuild ?
                    </Typography>
                    <RadioGroup
                      aria-label="moreDetails"
                      name="moreDetails"
                      value={formData.rebuild}
                      onChange={(e) => setFormData({ ...formData, rebuild: e.target.value })}
                      style={{ flexDirection: 'row', marginTop: '0px' }}
                    >

                      <FormControlLabel value="oui" control={<Radio />} label="Oui" />
                      <FormControlLabel value="non" control={<Radio />} label="Non" />
                    </RadioGroup>
                    <Typography variant="h6" style={{ marginBottom: '0px' }}>
                      Véhicule En Marche ?
                    </Typography>
                    <RadioGroup
                      aria-label="moreDetails"
                      name="moreDetails"
                      value={formData.enMarche}
                      onChange={(e) => setFormData({ ...formData, enMarche: e.target.value })}
                      style={{ flexDirection: 'row', marginTop: '0px' }}
                    >

                      <FormControlLabel value="oui" control={<Radio />} label="Oui" />
                      <FormControlLabel value="non" control={<Radio />} label="Non" />
                    </RadioGroup>
                    <Typography variant="h6" style={{ marginBottom: '0px' }}>
                      Accident moteur?
                    </Typography>
                    <RadioGroup
                      aria-label="moreDetails"
                      name="moreDetails"
                      value={formData.moteur}
                      onChange={(e) => setFormData({ ...formData, moteur: e.target.value })}
                      style={{ flexDirection: 'row', marginTop: '0px' }}
                    >

                      <FormControlLabel value="oui" control={<Radio />} label="Oui" />
                      <FormControlLabel value="non" control={<Radio />} label="Non" />
                    </RadioGroup>
                    <Typography variant="h6" style={{ marginBottom: '0px' }}>
                      Accident Coté gauche de véhicule?
                    </Typography>
                    <RadioGroup
                      aria-label="moreDetails"
                      name="moreDetails"
                      value={formData.gauche}
                      onChange={(e) => setFormData({ ...formData, gauche: e.target.value })}
                      style={{ flexDirection: 'row', marginTop: '0px' }}
                    >

                      <FormControlLabel value="oui" control={<Radio />} label="Oui" />
                      <FormControlLabel value="non" control={<Radio />} label="Non" />
                    </RadioGroup>
                    <Typography variant="h6" style={{ marginBottom: '0px' }}>
                      Accident Coté droite de véhicule?
                    </Typography>
                    <RadioGroup
                      aria-label="moreDetails"
                      name="moreDetails"
                      value={formData.droite}
                      onChange={(e) => setFormData({ ...formData, droite: e.target.value })}
                      style={{ flexDirection: 'row', marginTop: '0px' }}
                    >

                      <FormControlLabel value="oui" control={<Radio />} label="Oui" />
                      <FormControlLabel value="non" control={<Radio />} label="Non" />
                    </RadioGroup>
                    <Typography variant="h6" style={{ marginBottom: '0px' }}>
                      Accident Coté Arriére de véhicule?
                    </Typography>
                    <RadioGroup
                      aria-label="moreDetails"
                      name="moreDetails"
                      value={formData.arriere}
                      onChange={(e) => setFormData({ ...formData, arriere: e.target.value })}
                      style={{ flexDirection: 'row', marginTop: '0px' }}
                    >

                      <FormControlLabel value="oui" control={<Radio />} label="Oui" />
                      <FormControlLabel value="non" control={<Radio />} label="Non" />
                    </RadioGroup>

                  </div>
                )}
              </div>
            )}
            {activeStep === steps.length - 1 ? (
              <div>

                <div style={{ marginTop: '20px' }}>
                  <Typography><strong>Your Car : </strong></Typography>
                  <Grid container spacing={3} style={{ marginTop: '20px' }}>
                    <Grid item xs={6} >
                      {/* Left column */}

                      <Typography variant="body1" gutterBottom>
                        <strong>Marque :</strong> {formData.marque}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        <strong>Modèle :</strong> {formData.model}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        <strong>Année :</strong> {formData.yearModel}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        <strong>Kilométrage :</strong> {formData.mileage}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        <strong>Mise en circulation :</strong> {dayjs(formData.monthYear).format('DD/MM/YYYY')}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        <strong>Carrosserie :</strong> {formData.carrosserie}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        <strong>Énergie:</strong> {formData.energie}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        <strong>Boîte:</strong> {formData.boite}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        <strong>nombre Places:</strong> {formData.nombrePlaces}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        <strong>nombre Portes:</strong> {formData.nombrePortes}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        <strong>Puissance Fiscale:</strong> {formData.puissanceFiscale}
                      </Typography>

                      <Typography variant="body1" gutterBottom>
                        <strong>Couleur:</strong> {formData.couleur}
                      </Typography>

                    </Grid>
                    <Grid item xs={6}>
                      {/* Right column */}

                      <Typography variant="body1" gutterBottom>
                        <strong>Etat Pneu Avant:</strong> {formData.pneuAvant}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        <strong>Etat Pneu Arrière:</strong> {formData.pneuArriere}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        <strong>Etat interieur Vehicule:</strong> {formData.interieurVehicule}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        <strong>Etat exterieur Vehicule:</strong> {formData.exterieurVehicule}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        <strong>vehicule Accidente:</strong> {formData.vehiculeAccidente}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        <strong>vehicule Réparée:</strong> {formData.rebuild}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        <strong>vehicule en Marche:</strong> {formData.enMarche}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        <strong>Moteur accidenté:</strong> {formData.moteur}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        <strong>coté droite accidenté:</strong> {formData.droite}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        <strong>coté gauche accidenté:</strong> {formData.gauche}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        <strong>coté Arrière accidenté:</strong> {formData.arriere}
                      </Typography>

                    </Grid>
                  </Grid>

                </div>


                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                    <Button onClick={handleBack} variant="contained" color="primary">
                      Retour
                    </Button>
                    <Button onClick={handleNext} variant="contained" color="primary">
                      Finaliser
                    </Button>
                  </div>
                </div>

              </div>

            ) : (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '50px' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} variant="contained" color="primary" disabled={activeStep === 0}>
                    Retour
                  </Button>
                )}
                <Button
                  onClick={handleNext}
                  variant="contained"
                  color="primary"
                  disabled={
                    (activeStep === 0 && (!formData.marque || !formData.model)) ||
                    (activeStep === 1 && (!formData.monthYear || !formData.yearModel || !formData.mileage)) ||
                    (activeStep === 2 && (!formData.carrosserie || !formData.energie || !formData.boite || !formData.nombrePlaces || !formData.nombrePortes || !formData.puissanceFiscale || !formData.couleur)) ||
                    (activeStep === 3 && (!formData.pneuAvant || !formData.pneuArriere || !formData.interieurVehicule || !formData.exterieurVehicule)) ||
                    (activeStep === 4 && ((!formData.vehiculeAccidente) || (formData.vehiculeAccidente === 'oui' && (!formData.rebuild || !formData.enMarche || !formData.moteur || !formData.gauche || !formData.droite || !formData.arriere))))
                  }
                >
                  {activeStep === steps.length - 1 ? 'Finaliser' : 'Suivant'}
                </Button>
              </div>

            )}








          </div>
        )}


      </Box>
    </Box>
  );
};

export default UtiliseeStepper;

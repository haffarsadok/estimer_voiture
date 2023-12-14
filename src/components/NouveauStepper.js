// components/NouveauStepper.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import carLoaderGif from './carloader.gif';
import '../App.css';
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Box,
  CssBaseline,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,

} from '@mui/material';

const steps = [
  'Marque/\nModèle',
  'Caractéristiques',
  'Motorisation',
  'Transmission',
  'Sécurité',
  'Équipements',
  'Finaliser',
];
const brands = ['Renault', 'VOLKSWAGEN'];


const models = {
  Renault: ['CLIO 1.0 L SCE LIFE PLUS', 'MEGANE SEDAN 1.3 L TCE 140', 'MEGANE SEDAN 1.3 L TCE 140 BVA'],
  VOLKSWAGEN: ['POLO 1.0 L TSI DRIVE', 'POLO 1.0 L TSI Life'],
};

const NouveauStepper = () => {




  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [estimatedPrice, setEstimatedPrice] = useState(null);
  const [formData, setFormData] = useState({
    marque: '',
    model: '',
    carrosserie: '',
    nombrePlaces: '',
    nombrePortes: '',
    cylindres: '',
    energie: '',
    puissanceFiscale: '',
    boite: '',
    nombreRapports: '',
    abs: '',
    airbags: '',
    controlePressionPneus: '',
    connectivite: '',
    ecran: '',
    volant: '',
    climatisation: '',
    directionAssistee: '',
    regulateurVitesse: '',
    volantReglable: '',
    vitresElectriques: '',
  });
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  function predict_price(formData) {
    
    if (formData.marque === 'VOLKSWAGEN' && formData.model === 'POLO 1.0 L TSI Life') {
      console.log("kifkif")
    }else {
      console.log("mich kifkif")
    }
    let base_price;
    if (formData.marque === 'Renault' && formData.model === 'CLIO 1.0 L SCE LIFE PLUS') {
      base_price = 46500;
    } else if (formData.marque === 'Renault' && formData.model === 'MEGANE SEDAN 1.3 L TCE 140') {
      base_price = 67000;
    } else if (formData.marque === 'Renault' && formData.model === 'MEGANE SEDAN 1.3 L TCE 140 BVA') {
      base_price = 68700;
    } else if (formData.marque === 'VOLKSWAGEN' && formData.model === 'POLO 1.0 L TSI DRIVE') {
      base_price = 62910;
    }else if (formData.marque === 'VOLKSWAGEN' && formData.model === 'POLO 1.0 L TSI Life') {
      base_price = 69050;
    }
    // Base price in Tunisian Dinar as provided
    const adjustments = {
      carrosserie: { 'Compacte': 1.03, 'Citadine': 1.00, 'Berline': 1.1 },
      nombrePlaces: { '2': 1.02, '5': 1.05, '8': 1.08, '9': 1.09 },
      nombrePortes: { '3': 1.03, '5': 1.05 },
      cylindres: { '3': 1.03, '4': 1.04, '5': 1.05, '6': 1.06, '8': 1.08, '12': 1.12, '16': 1.16 },
      energie: { 'Essence': 1.00, 'Diesel': 1.05, 'Electrique': 1.20, 'Hybride': 1.15, 'GBL': 1.10, 'Bioéthanol': 1.00, 'Autres': 0.95, 'GNV': 1.00 },
      puissanceFiscale: { '5 CV': 0, '8 CV': 8000, '10 CV': 10000 },
      boite: { 'Manuelle': 0, 'Auto': 5000, 'Manuelle/Auto': 10000 },
      nombreRapports: { '5': 500, '6': 1000, '7': 2000, '8': 3000, '9': 4000 },
      airbags: { 'Aucun': 0, 'Frontaux': 500, 'Latéraux': 500, 'Frontaux Latéraux': 1000 },
      abs: { 'oui': 500, 'non': 0 },
      pressionPneus: { 'oui': 500, 'non': 0 },
      connectivite: { 'oui': 500, 'non': 0 },
      ecran: { 'oui': 500, 'non': 0 },
      volant: { 'Multi-fonctions': 1000, 'Simple': 0 },
      climatisation: { 'oui': 1000, 'non': 0 },
      directionAssistee: { 'oui': 1000, 'non': 0 },
      regulateurVitesse: { 'oui': 500, 'non': 0 },
      volantReglable: { 'oui': 500, 'non': 0 },
      vitresElec: { 'Aucun': 0, 'Avant': 500, 'Avant Arrières': 1000 }
    };
    let price = base_price;
    console.log('After base price:', price);
    price *= adjustments.carrosserie[formData.carrosserie];
    console.log('After carrouserie price:', price);
    price *= adjustments.nombrePlaces[formData.nombrePlaces];
    console.log('After nbrplaces price:', price);
    price *= adjustments.nombrePortes[formData.nombrePortes];
    console.log('After nbrPort price:', price);
    price *= adjustments.cylindres[formData.cylindres];
    console.log('After cylendre price:', price);
    price *= adjustments.energie[formData.energie];
    console.log('After energie price:', price);

    price += adjustments.puissanceFiscale[formData.puissanceFiscale];
    console.log('After puisfisc price:', price);
    price += adjustments.boite[formData.boite];
    console.log('After boite price:', price);
    price += adjustments.nombreRapports[formData.nombreRapports];
    console.log('After rapport price:', price);
    price += adjustments.abs[formData.abs];
    console.log('After abs price:', price);
    price += adjustments.airbags[formData.airbags];
    console.log('After airbags price:', price);


    price += adjustments.pressionPneus[formData.controlePressionPneus];
    console.log('After pneu price:', price);
    price += adjustments.connectivite[formData.connectivite];
    console.log('After connectivite price:', price);
    price += adjustments.ecran[formData.ecran];
    console.log('After ecran price:', price);
    price += adjustments.volant[formData.volant];
    console.log('After volant price:', price);
    price += adjustments.climatisation[formData.climatisation];
    console.log('After clima price:', price);
    price += adjustments.directionAssistee[formData.directionAssistee];
    console.log('After direction price:', price);
    price += adjustments.regulateurVitesse[formData.regulateurVitesse];
    console.log('After regulateur price:', price);
    price += adjustments.volantReglable[formData.volantReglable];
    console.log('After volantReglable price:', price);
    price += adjustments.vitresElec[formData.vitresElectriques];
    console.log('After vitre elec price:', price);



    return Math.round(price); // Optional: round the price to the nearest whole number
  }

  const handleEstimate = () => {
    setLoading(true);
    setTimeout(() => {
      const price = predict_price(formData);
      setEstimatedPrice(price); // Update the state with the calculated price
      setLoading(false); // Stop loading
      setOpenDialog(true); // Open the dialog to show the estimated price


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
    if (formData.marque === 'Renault' && formData.model === 'CLIO 1.0 L SCE LIFE PLUS') {
      window.open('https://www.automobile.tn/fr/neuf/renault/clio/1.0-l-sce-life-plus');
    } else if (formData.marque === 'Renault' && formData.model === 'MEGANE SEDAN 1.3 L TCE 140') {
      window.open('https://www.automobile.tn/fr/neuf/renault/megane-sedan/1.3-l-tce-140');
    } else if (formData.marque === 'Renault' && formData.model === 'MEGANE SEDAN 1.3 L TCE 140 BVA') {
      window.open('https://www.automobile.tn/fr/neuf/renault/megane-sedan/1.3-l-tce-140-bva');
    }else if (formData.marque === 'VOLKSWAGEN' && formData.model === 'POLO 1.0 L TSI DRIVE') {
      window.open('https://www.automobile.tn/fr/neuf/volkswagen/polo/1.0-l-drive');
    }else if (formData.marque === 'VOLKSWAGEN' && formData.model === 'POLO 1.0 L TSI Life') {
      window.open('https://www.automobile.tn/fr/neuf/volkswagen/polo/1.0-l-life');
    } else {
      // Handle other conditions or provide a default action
      console.log('No matching condition for redirection.');
      
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
      carrosserie: '',
      nombrePlaces: '',
      nombrePortes: '',
      cylindres: '',
      energie: '',
      puissanceFiscale: '',
      boite: '',
      nombreRapports: '',
      abs: '',
      airbags: '',
      controlePressionPneus: '',
      connectivite: '',
      ecran: '',
      volant: '',
      climatisation: '',
      directionAssistee: '',
      regulateurVitesse: '',
      volantReglable: '',
      vitresElectriques: '',

    });
    setActiveStep(0);
    setEstimatedPrice(null);
    navigate('/estimer_voiteure'); // Navigate to the root URL
  };




  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={10}>
      <CssBaseline />
      <Stepper activeStep={activeStep} alternativeLabel >
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
                  <strong>Carrosserie :</strong> {formData.carrosserie}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Nombre de Places :</strong> {formData.nombrePlaces}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Nombre de Portes :</strong> {formData.nombrePortes}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Nombre de Cylindres :</strong> {formData.cylindres}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Climatisation :</strong> {formData.climatisation}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Direction Assistee :</strong> {formData.directionAssistee}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Regulateur Vitesse :</strong> {formData.regulateurVitesse}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Volant Reglable :</strong> {formData.volantReglable}
                </Typography>

              </Grid>
              <Grid item xs={6}>
                {/* Right column */}
                <Typography variant="body1" gutterBottom>
                  <strong>Énergie:</strong> {formData.energie}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Puissance Fiscale:</strong> {formData.puissanceFiscale}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Boîte:</strong> {formData.boite}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Nombre de Rapports:</strong> {formData.nombreRapports}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>ABS:</strong> {formData.abs}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Airbags:</strong> {formData.airbags}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Controle Pression des Pneus:</strong> {formData.controlePressionPneus}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Connectivite :</strong> {formData.connectivite}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Ecran :</strong> {formData.ecran}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Volant :</strong> {formData.volant}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Vitres Electriques :</strong> {formData.vitresElectriques}
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
                <Typography variant='h5'> Price is :{estimatedPrice} DT</Typography>


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
          <div style={{ marginTop: '60px' }}>
            {activeStep === 0 && (
              <>
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
              </>
            )}

            {/* Step 2: Caractéristiques */}
            {activeStep === 1 && (
              <div style={{ marginTop: '16px' }}>
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
                    {['Compacte', 'Citadine', 'Berline'].map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* Nombre de Places */}
                <FormControl fullWidth variant="outlined" style={{ marginTop: '16px', marginBottom: '16px' }}>
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
                <FormControl fullWidth variant="outlined">
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
              </div>
            )}

            {/* Step 3: Motorisation */}
            {activeStep === 2 && (
              <div style={{ marginTop: '16px' }}>
                {/* Nombre de Cylindres */}
                <FormControl fullWidth variant="outlined" style={{ marginRight: '16px' }}>
                  <InputLabel id="cylindres-label">Nombre de Cylindres</InputLabel>
                  <Select
                    labelId="cylindres-label"
                    id="cylindres"
                    label="Nombre de Cylindres"
                    value={formData.cylindres}
                    onChange={(e) => setFormData({ ...formData, cylindres: e.target.value })}
                  >
                    {['3', '4', '5', '6', '8', '12', '16'].map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* Energie */}
                <FormControl fullWidth variant="outlined" style={{ marginTop: '16px', marginBottom: '16px' }}>
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

                {/* Puissance Fiscale */}
                <FormControl fullWidth variant="outlined">
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
              </div>
            )}

            {/* Step 4: Transmission */}
            {activeStep === 3 && (
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '16px' }}>
                {/* Boîte */}
                <FormControl fullWidth variant="outlined" style={{ marginRight: '16px' }}>
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

                {/* Nombre de Rapports */}
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="nombre-rapports-label">Nombre de Rapports</InputLabel>
                  <Select
                    labelId="nombre-rapports-label"
                    id="nombre-rapports"
                    label="Nombre de Rapports"
                    value={formData.nombreRapports}
                    onChange={(e) => setFormData({ ...formData, nombreRapports: e.target.value })}
                  >
                    {['5', '6', '7'].map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            )}


            {/* Step 5: Équipements de Sécurité */}
            {activeStep === 4 && (
              <div style={{ marginTop: '16px' }}>
                {/* Équipements de Sécurité */}

                {/* Radio Group for "oui" and "non" */}
                <FormControl component="fieldset">
                  <Typography variant="body1" style={{ marginRight: '35px', marginTop: '10px' }}>
                    <strong> ABS :</strong>
                  </Typography>
                  <RadioGroup
                    aria-label="abs"
                    name="abs"
                    value={formData.abs}
                    onChange={(e) => setFormData({ ...formData, abs: e.target.value })}
                    style={{ flexDirection: 'row', marginLeft: '40px' }}
                  >
                    <FormControlLabel value="oui" control={<Radio />} label="Oui" />
                    <FormControlLabel value="non" control={<Radio />} label="Non" />
                  </RadioGroup>
                </FormControl>

                {/* Airbags */}
                <FormControl fullWidth variant="outlined" style={{ marginTop: '16px', marginBottom: '16px' }}>
                  <InputLabel id="airbags-label">Airbags</InputLabel>
                  <Select
                    labelId="airbags-label"
                    id="airbags"
                    label="Airbags"
                    value={formData.airbags}
                    onChange={(e) => setFormData({ ...formData, airbags: e.target.value })}
                  >
                    {['Aucun', 'Frontaux', 'Latéraux', 'Frontaux Latéraux'].map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* Contrôle de Pression des Pneus */}
                <FormControl component="fieldset">
                  <Typography variant="body1" style={{ marginRight: '35px', marginTop: '10px' }}>
                    <strong> Controle Pression Pneus :</strong>
                  </Typography>
                  <RadioGroup
                    aria-label="controlePressionPneus"
                    name="controlePressionPneus"
                    value={formData.controlePressionPneus}
                    onChange={(e) => setFormData({ ...formData, controlePressionPneus: e.target.value })}
                    style={{ flexDirection: 'row', marginLeft: '40px' }}
                  >
                    <FormControlLabel value="oui" control={<Radio />} label="Oui" />
                    <FormControlLabel value="non" control={<Radio />} label="Non" />
                  </RadioGroup>
                </FormControl>
              </div>
            )}

            {/* Step 6: Équipements */}
            {activeStep === 5 && (
              <div style={{ marginTop: '16px' }}>
                {/* Connectivité */}
                <FormControl component="fieldset">
                  <Typography variant="body1" style={{ marginTop: '10px' }}>
                    <strong> CONNECTIVITÉ :</strong>
                  </Typography>
                  <RadioGroup
                    aria-label="connectivite"
                    name="connectivite"
                    value={formData.connectivite}
                    onChange={(e) => setFormData({ ...formData, connectivite: e.target.value })}
                    style={{ flexDirection: 'row' }}
                  >
                    <FormControlLabel value="oui" control={<Radio />} label="Oui" />
                    <FormControlLabel value="non" control={<Radio />} label="Non" />
                  </RadioGroup>
                </FormControl>

                {/* Écran */}
                <FormControl component="fieldset" style={{ marginLeft: '100px' }}>
                  <Typography variant="body1" style={{ marginTop: '10px' }}>
                    <strong> ECRAN :</strong>
                  </Typography>
                  <RadioGroup
                    aria-label="ecran"
                    name="ecran"
                    value={formData.ecran}
                    onChange={(e) => setFormData({ ...formData, ecran: e.target.value })}
                    style={{ flexDirection: 'row' }}
                  >
                    <FormControlLabel value="oui" control={<Radio />} label="Oui" />
                    <FormControlLabel value="non" control={<Radio />} label="Non" />
                  </RadioGroup>
                </FormControl>

                {/* Volant */}
                <FormControl fullWidth variant="outlined" style={{ marginTop: '20px' }}>
                  <InputLabel id="volant-label">Volant</InputLabel>
                  <Select
                    labelId="volant-label"
                    id="volant"
                    label="Volant"
                    value={formData.volant}
                    onChange={(e) => setFormData({ ...formData, volant: e.target.value })}
                  >
                    {['Multi-fonctions', 'Simple'].map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* Climatisation */}
                <FormControl component="fieldset" >
                  <Typography variant="body1" style={{ marginTop: '10px' }}>
                    <strong> CLIMATISATION :</strong>
                  </Typography>
                  <RadioGroup
                    aria-label="climatisation"
                    name="climatisation"
                    value={formData.climatisation}
                    onChange={(e) => setFormData({ ...formData, climatisation: e.target.value })}
                    style={{ flexDirection: 'row' }}
                  >
                    <FormControlLabel value="oui" control={<Radio />} label="Oui" />
                    <FormControlLabel value="non" control={<Radio />} label="Non" />
                  </RadioGroup>
                </FormControl>

                {/* Direction Assistée */}
                <FormControl component="fieldset" style={{ marginLeft: '100px' }}>
                  <Typography variant="body1" style={{ marginTop: '10px' }}>
                    <strong> DIRECTION ASSISTÉE :</strong>
                  </Typography>
                  <RadioGroup
                    aria-label="directionAssistee"
                    name="directionAssistee"
                    value={formData.directionAssistee}
                    onChange={(e) => setFormData({ ...formData, directionAssistee: e.target.value })}
                    style={{ flexDirection: 'row' }}
                  >
                    <FormControlLabel value="oui" control={<Radio />} label="Oui" />
                    <FormControlLabel value="non" control={<Radio />} label="Non" />
                  </RadioGroup>
                </FormControl>

                {/* Régulateur de Vitesse */}
                <FormControl component="fieldset" >
                  <Typography variant="body1" style={{ marginTop: '10px' }}>
                    <strong> RÉGULATEUR DE VITESSE :</strong>
                  </Typography>
                  <RadioGroup
                    aria-label="regulateurVitesse"
                    name="regulateurVitesse"
                    value={formData.regulateurVitesse}
                    onChange={(e) => setFormData({ ...formData, regulateurVitesse: e.target.value })}
                    style={{ flexDirection: 'row' }}
                  >
                    <FormControlLabel value="oui" control={<Radio />} label="Oui" />
                    <FormControlLabel value="non" control={<Radio />} label="Non" />
                  </RadioGroup>
                </FormControl>

                {/* Volant Réglable */}
                <FormControl component="fieldset" style={{ marginLeft: '30px' }}>
                  <Typography variant="body1" style={{ marginRight: '35px', marginTop: '10px' }}>
                    <strong> VOLANT RÉGLABLE :</strong>
                  </Typography>
                  <RadioGroup
                    aria-label="volantReglable"
                    name="volantReglable"
                    value={formData.volantReglable}
                    onChange={(e) => setFormData({ ...formData, volantReglable: e.target.value })}
                    style={{ flexDirection: 'row' }}
                  >
                    <FormControlLabel value="oui" control={<Radio />} label="Oui" />
                    <FormControlLabel value="non" control={<Radio />} label="Non" />
                  </RadioGroup>
                </FormControl>

                {/* Vitres Électriques */}
                <FormControl fullWidth variant="outlined" style={{ marginTop: '16px' }}>
                  <InputLabel id="vitres-electriques-label">Vitres Électriques</InputLabel>
                  <Select
                    labelId="vitres-electriques-label"
                    id="vitres-electriques"
                    label="Vitres Électriques"
                    value={formData.vitresElectriques}
                    onChange={(e) => setFormData({ ...formData, vitresElectriques: e.target.value })}
                  >
                    {['Aucun', 'Avant', 'Avant Arrières'].map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            )}
            {activeStep === steps.length - 1 ? (
              <div>
                <div>

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
                        <strong>Carrosserie :</strong> {formData.carrosserie}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        <strong>Nombre de Places :</strong> {formData.nombrePlaces}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        <strong>Nombre de Portes :</strong> {formData.nombrePortes}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        <strong>Nombre de Cylindres :</strong> {formData.cylindres}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        <strong>Climatisation :</strong> {formData.climatisation}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        <strong>Direction Assistee :</strong> {formData.directionAssistee}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        <strong>Regulateur Vitesse :</strong> {formData.regulateurVitesse}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        <strong>Volant Reglable :</strong> {formData.volantReglable}
                      </Typography>

                    </Grid>
                    <Grid item xs={6}>
                      {/* Right column */}
                      <Typography variant="body1" gutterBottom>
                        <strong>Énergie:</strong> {formData.energie}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        <strong>Puissance Fiscale:</strong> {formData.puissanceFiscale}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        <strong>Boîte:</strong> {formData.boite}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        <strong>Nombre de Rapports:</strong> {formData.nombreRapports}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        <strong>ABS:</strong> {formData.abs}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        <strong>Airbags:</strong> {formData.airbags}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        <strong>Controle Pression des Pneus:</strong> {formData.controlePressionPneus}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        <strong>Connectivite :</strong> {formData.connectivite}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        <strong>Ecran :</strong> {formData.ecran}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        <strong>Volant :</strong> {formData.volant}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        <strong>Vitres Electriques :</strong> {formData.vitresElectriques}
                      </Typography>
                    </Grid>
                  </Grid>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                  <Button onClick={handleBack} variant="contained" color="primary">
                    Retour
                  </Button>
                  <Button onClick={handleNext} variant="contained" color="primary">
                    Finaliser
                  </Button>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '106px' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} variant="contained" color="primary" >
                    Retour
                  </Button>
                )}
                <Button
                  onClick={handleNext}
                  variant="contained"
                  color="primary"
                  disabled={
                    !formData.marque ||
                    (activeStep === 0 && !formData.model) ||
                    (activeStep === 1 && (!formData.carrosserie || !formData.nombrePlaces || !formData.nombrePortes)) ||
                    (activeStep === 2 && (!formData.cylindres || !formData.energie || !formData.puissanceFiscale)) ||
                    (activeStep === 3 && (!formData.boite || !formData.nombreRapports)) ||
                    (activeStep === 4 && (!formData.abs || !formData.airbags || !formData.controlePressionPneus)) ||
                    (activeStep === 5 &&
                      (!formData.connectivite ||
                        !formData.ecran ||
                        !formData.volant ||
                        !formData.climatisation ||
                        !formData.directionAssistee ||
                        !formData.regulateurVitesse ||
                        !formData.volantReglable ||
                        !formData.vitresElectriques))
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

export default NouveauStepper;

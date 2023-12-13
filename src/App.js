// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StepperButtons from './components/StepperButtons';
import NouveauStepper from './components/NouveauStepper';
import UtiliseeStepper from './components/UtiliseeStepper';
import VehiculeNeuf from './components/VehiculeNeuf';
import VehiculeOccasion from './components/VehiculeOccasion';
import RenaultPage from './components/RenaultPage';
import TopNav from './components/TopNav'; // Import the TopNav component
//import visitSound from './components/carsound.mp3'
function App() {
 

  return (
    <Router>
      <TopNav />
      <Routes>
        <Route path="/estimer_voiteure" element={<StepperButtons />} />
        <Route path="/nouveau" element={<NouveauStepper />} />
        <Route path="/utiliser" element={<UtiliseeStepper />} />
        <Route path="/vehicule-neuf" element={<VehiculeNeuf />} />
        <Route path="/vehicule-occasion" element={<VehiculeOccasion />} />
        <Route path="/vehicule-neuf/renault" element={<RenaultPage />} />
      </Routes>
    </Router>
  );
}

export default App;

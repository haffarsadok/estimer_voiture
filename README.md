# EstimCar 🚗

A comprehensive React-based web application for estimating car prices in Tunisia, supporting both new and used vehicles with advanced pricing algorithms.

## 🌟 Overview

EstimCar is designed to provide accurate vehicle price estimations for the Tunisian market. The application features two distinct estimation modes: one for new vehicles with manufacturer specifications, and another for used vehicles that considers depreciation, condition, and accident history.

## ✨ Key Features

### Dual Estimation System
- **New Vehicle Estimation**: Price calculation for brand new cars based on specifications
- **Used Vehicle Estimation**: Comprehensive valuation including condition assessment and depreciation

### Supported Vehicle Brands
- **Renault**: CLIO variants, MEGANE SEDAN models
- **Volkswagen**: POLO variants, Golf models

### Advanced Pricing Factors

#### New Vehicle Pricing Algorithm
- Base manufacturer pricing (in Tunisian Dinar)
- Body type multipliers (Compact: 1.03x, Citadine: 1.00x, Berline: 1.1x)
- Seating capacity adjustments (2-9 seats)
- Engine specifications (cylinders, fuel type, power)
- Transmission type (Manual, Automatic, CVT)
- Safety features (ABS, Airbags, Tire pressure monitoring)
- Comfort features (AC, Power steering, Cruise control)
- Technology features (Connectivity, Display, Multi-function steering)

#### Used Vehicle Pricing Algorithm
- **Depreciation Model**: 5% annual depreciation from purchase year
- **Mileage Impact**: 0.1 TND deduction per kilometer
- **Condition Assessment**:
  - Tire condition (Excellent to needs replacement)
  - Interior condition (New to poor: -1000 to +1000 TND)
  - Exterior condition (New to damaged: -1000 to +1000 TND)
- **Accident History Processing**:
  - Base accident penalty: -5000 TND
  - Rebuild status adjustments
  - Operational status considerations
  - Specific damage area deductions (engine, sides, rear)

## 🛠️ Technology Stack

- **Frontend Framework**: React.js
- **UI Library**: Material-UI (MUI)
- **Routing**: React Router DOM
- **Date Management**: Day.js
- **Animations**: React Animated Text
- **Styling**: CSS-in-JS with Material-UI theming

## 🚀 Installation & Setup

### Prerequisites
- Node.js (version 14.0 or higher)
- npm or yarn package manager

### Getting Started

1. **Clone the repository**
```bash
git clone https://github.com/haffarsadok/estimer_voiteure.git
cd estimer_voiteure
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm start
```

4. **Access the application**
Open [http://localhost:3000/estimer_voiteure](http://localhost:3000/estimer_voiteure) in your browser

## 📱 User Guide

### Estimating New Vehicle Prices

1. **Navigation**: Click on "Véhicule Neuf" in the top navigation
2. **Brand & Model Selection**: Choose from available manufacturers and specific model variants
3. **Specifications Input**: 
   - Select body type (Compact/Citadine/Berline)
   - Choose seating capacity and door count
   - Specify engine details (cylinders, fuel type, power)
4. **Features Selection**:
   - Safety systems (ABS, Airbags)
   - Comfort options (AC, Power steering)
   - Technology features (Display, Connectivity)
5. **Price Calculation**: Click "Estimer" to get instant pricing

### Estimating Used Vehicle Prices

1. **Navigation**: Click on "Véhicule Occasion" in the top navigation  
2. **Basic Information**:
   - Select brand and model
   - Enter manufacture year and current mileage
3. **Vehicle Specifications**:
   - Body type, seating, transmission details
   - Engine and fuel type information
4. **Condition Assessment**:
   - Tire condition (front and rear)
   - Interior condition rating
   - Exterior condition evaluation
5. **Accident History**: 
   - Report any accident involvement
   - Specify damage areas and repair status
6. **Final Estimation**: Review all details and generate price estimate

## 🏗️ Project Architecture

```
src/
├── components/
│   ├── NouveauStepper.js      # New vehicle estimation component
│   ├── UtiliseeStepper.js     # Used vehicle estimation component  
│   ├── TopNav.js              # Navigation bar component
│   ├── examples.js            # Animated text components
│   └── estimCarLogo.gif       # Application logo
├── App.js                     # Main application router
├── index.js                   # React application entry point
└── assets/                    # Static assets and images
```

## 💰 Pricing Details

### Base Prices (Tunisian Dinar - TND)
- **Renault CLIO 1.0 L SCE LIFE PLUS**: 46,500 TND
- **Renault MEGANE SEDAN 1.3 L TCE 140**: 67,000 TND  
- **Renault MEGANE SEDAN 1.3 L TCE 140 BVA**: 68,700 TND
- **Volkswagen POLO 1.0 L TSI DRIVE**: 62,910 TND
- **Volkswagen POLO 1.0 L TSI Life**: 69,050 TND

### Adjustment Examples
- **Electric vehicles**: +20% premium
- **Hybrid vehicles**: +15% premium  
- **Diesel engines**: +5% premium
- **Automatic transmission**: +5,000-10,000 TND
- **Premium features**: 500-2,000 TND each

## 🎨 User Interface Features

- **Stepper Navigation**: Multi-step forms with progress indication
- **Responsive Design**: Optimized for desktop and mobile devices
- **Loading Animations**: Custom car-themed loading indicators
- **Results Dialog**: Clear price presentation with vehicle summary
- **Form Validation**: Real-time input validation and error handling

## 🔄 Development Workflow

### Available Scripts

```bash
# Start development server
npm start

# Build for production
npm run build

# Run test suite  
npm test

# Eject from Create React App (one-way operation)
npm run eject
```

### Code Structure Guidelines
- Components use functional syntax with React Hooks
- Material-UI components for consistent styling
- Centralized pricing logic in dedicated functions
- Form state management with useState hooks

## 🤝 Contributing

We welcome contributions to improve EstimCar! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Contribution Guidelines
- Follow existing code style and conventions
- Add appropriate comments for complex logic
- Test new features thoroughly
- Update documentation as needed

## 🔮 Future Roadmap

- [ ] **Expanded Vehicle Database**: Add more brands and models
- [ ] **Market Data Integration**: Real-time pricing updates
- [ ] **User Accounts**: Save estimation history and preferences  
- [ ] **Mobile Application**: Native iOS and Android apps
- [ ] **AI-Powered Estimates**: Machine learning price predictions
- [ ] **Dealer Integration**: Connect with local car dealerships
- [ ] **Financing Calculator**: Loan and payment estimations

## 📊 Technical Specifications

- **Minimum Price Protection**: 1,000 TND floor value
- **Depreciation Rate**: 5% annual standard rate
- **Mileage Factor**: 0.1 TND per kilometer deduction
- **Accident Base Penalty**: 5,000 TND reduction
- **Feature Price Range**: 500-10,000 TND adjustments


## 📄 License

This project is available under the MIT License. See the LICENSE file for full details.

## 👨‍💻 Author & Maintainer

**Haffar Sadok**
- GitHub: [@haffarsadok](https://github.com/haffarsadok)
- Project: [EstimCar Repository](https://github.com/haffarsadok/estimer_voiteure)

## 🙏 Acknowledgments

- Material-UI team for excellent React components
- React community for continuous innovation
- Contributors and testers who help improve the application

---

**EstimCar** - *Accurate vehicle price estimation for the Tunisian automotive market* 🇹🇳

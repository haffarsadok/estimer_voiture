import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/BrandStyless.css'
const CustomDialog = ({ isOpen, onClose, brandName }) => (
  <div className={`custom-dialog ${isOpen ? 'open' : ''}`}>
    <div>
      <p>{`Will be added soon`}</p>
      <p>{brandName}</p>
      <button onClick={onClose}>Close</button>
    </div>
  </div>
);

const brands = [
    {
      name: "Alfa Romeo",
      png: "https://catalogue.automobile.tn/marques/1.png?t=15",
      webp: "https://catalogue.automobile.tn/marques/1.webp?t=15",
      path: "/neuf/alfa-romeo",
    },
    {
      name: "Audi",
      png: "https://catalogue.automobile.tn/marques/2.png?t=15",
      webp: "https://catalogue.automobile.tn/marques/2.webp?t=15",
      path: "/neuf/audi",
    },
    {
      name: "Bestune",
      png: "https://catalogue.automobile.tn/marques/1669.png?t=15",
      webp: "https://catalogue.automobile.tn/marques/1669.webp?t=15",
      path: "/neuf/bestune",
    },
    {
      name: "Chevrolet",
      png: "https://catalogue.automobile.tn/marques/4.png?t=15",
      webp: "https://catalogue.automobile.tn/marques/4.webp?t=15",
      path: "/fr/neuf/chevrolet",
    },
    {
      name: "Citroën",
      png: "https://catalogue.automobile.tn/marques/5.png?t=15",
      webp: "https://catalogue.automobile.tn/marques/5.webp?t=15",
      path: "/fr/neuf/citroen",
    },
    {
      name: "BMW",
      png: "https://catalogue.automobile.tn/marques/3.png?t=15",
      webp: "https://catalogue.automobile.tn/marques/3.webp?t=15",
      path: "/neuf/bmw",
    },
    {
        name: "Byd",
        png: "https://catalogue.automobile.tn/marques/1656.png?t=15",
        webp: "https://catalogue.automobile.tn/marques/1656.webp?t=15",
        path: "/byd"
      },
      
      {
        name: "Ford",
        png: "https://catalogue.automobile.tn/marques/6.png?t=15",
        webp: "https://catalogue.automobile.tn/marques/6.webp?t=15",
        path: "/neuf/ford"
      },
      {
        name: "Kia",
        png: "https://catalogue.automobile.tn/marques/7.png?t=15",
        webp: "https://catalogue.automobile.tn/marques/7.webp?t=15",
        path: "/neuf/kia"
      },
      {
        name: "Honda",
        png: "https://catalogue.automobile.tn/marques/188.png?t=15",
        webp: "https://catalogue.automobile.tn/marques/188.webp?t=15",
        path: "/neuf/honda"
      },
      
      {
        name: "Changan",
        png: "https://catalogue.automobile.tn/marques/1655.webp?t=15",
        webp: "https://catalogue.automobile.tn/marques/1655.webp?t=15",
        path: "/neuf/changan",
      },
      {
        name: "Chery",
        png: "https://catalogue.automobile.tn/marques/1544.webp?t=15",
        webp: "https://catalogue.automobile.tn/marques/1544.webp?t=15",
        path: "/neuf/chery",
      },
      {
        name: "Jeep",
        png: "https://catalogue.automobile.tn/marques/690.webp?t=15",
        webp: "https://catalogue.automobile.tn/marques/690.webp?t=15",
        path: "/neuf/jeep",
      },
      {
        name: "Volkswagen",
        png: "https://catalogue.automobile.tn/marques/15.webp?t=15",
        webp: "https://catalogue.automobile.tn/marques/15.webp?t=15",
        path: "/neuf/volkswagen",
      },
      {
        name: "Land Rover",
        png: "https://catalogue.automobile.tn/marques/137.webp?t=15",
        webp: "https://catalogue.automobile.tn/marques/137.webp?t=15",
        path: "/neuf/land-rover",
      },{
        name: "Porche",
        png: "https://catalogue.automobile.tn/marques/125.webp?t=15",
        webp: "https://catalogue.automobile.tn/marques/125.webp?t=15",
        path: "/neuf/porche",
      },
      {
        name: "Renault",
        png: "https://catalogue.automobile.tn/marques/13.webp?t=15",
        webp: "https://catalogue.automobile.tn/marques/13.webp?t=15",
        path: "/vehicule-neuf/renault",
      },
      {
        name: "Jaguar",
        png: "https://catalogue.automobile.tn/marques/144.webp?t=15",
        webp: "https://catalogue.automobile.tn/marques/144.webp?t=15",
        path: "/neuf/jaguar",
      },
      
      {
        name: "Nissan",
        png: "https://catalogue.automobile.tn/marques/10.png?t=15",
        webp: "https://catalogue.automobile.tn/marques/10.webp?t=15",
        path: "/neuf/nissan",
      },
      {
        name: "Mazda",
        png: "https://catalogue.automobile.tn/marques/8.png?t=15",
        webp: "https://catalogue.automobile.tn/marques/8.webp?t=15",
        path: "/neuf/mazda",
      },
      {
        name: "MarcedesBenz",
        png: "https://catalogue.automobile.tn/marques/9.png?t=15",
        webp: "https://catalogue.automobile.tn/marques/9.webp?t=15",
        path: "/neuf/marcedes-benz",
      },
     
      {
        name: "Volvo",
        png: "https://catalogue.automobile.tn/marques/60.png?t=15",
        webp: "https://catalogue.automobile.tn/marques/60.webp?t=15",
        path: "/neuf/volvo",
      },
      {
        name: "Peugeot",
        png: "https://catalogue.automobile.tn/marques/12.png?t=15",
        webp: "https://catalogue.automobile.tn/marques/12.webp?t=15",
        path: "/neuf/peugeot",
      },{
        name: "Wallyscar",
        png: "https://catalogue.automobile.tn/marques/1476.png?t=15",
        webp: "https://catalogue.automobile.tn/marques/1476.webp?t=15",
        path: "/neuf/wallyscar",
      },
  ];

  const VehiculeNeuf = () => {
    const navigate = useNavigate();
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState(null);
  
    const closeDialog = () => {
      setDialogOpen(false);
      setSelectedBrand(null);
    };
  
    const handleBrandClick = (path, name) => {
      if (name !== 'Renault') {
        setSelectedBrand(name);
        setDialogOpen(true);
      } else {
        navigate(path);
      }
    };
  
    return (
      <div className="container">
        <div className="block-title">
          <h3>Les voitures neuves</h3>
          <h4>par marque</h4>
          <div className="title-separator"></div>
        </div>
        <div className="brands-list">
          {brands.map(brand => (
            <div key={brand.name} onClick={() => handleBrandClick(brand.path, brand.name)}>
              <picture>
                <source type="image/webp" srcSet={brand.webp} />
                <source type="image/png" srcSet={brand.png} />
                <img src={brand.png} alt={brand.name} />
              </picture>
            </div>
          ))}
        </div>
        <CustomDialog isOpen={isDialogOpen} onClose={closeDialog} brandName={selectedBrand} />
      </div>
    );
  };
  
  export default VehiculeNeuf;
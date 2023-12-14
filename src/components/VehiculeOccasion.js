// VehiculeOccasion.js
import React from 'react';
import '../components/VehiculeOcaStyle.css';
import iconAn from '../components/an.png'
import iconboite from '../components/boite.png'
import iconenergie from '../components/energie.png'
import iconkilometrage from '../components/kilometrage.png'

const VehiculeOccasion = () => {
  const vehiculePubItems = [
    {
      imageUrl: "https://catalogue.automobile.tn/max/2022/04/46752.webp?t=1699275968",
      modelName: "Renault Clio",
      price: "44 500",
      user_url: 'https://imageshack.com/i/pnrkB1swj',
      user_name: "Haffar Sadok",
      description: "Citadine, 5 cv, transmission Traction, Affichage tête haute, Autoradio, Autoradio CD, Autoradio CD/Mp3, Bluetooth, Connectivité Aux, usb, iPod, Sièges réglables en hauteur, Vitres teintées, Volant/levier de vitesse en cuir, Volant multi-fonctions, 3 appuis têtes arrières, Volant réglable hauteur/profondeur",
      kilometrage: "82 000",
      model: "2020",
      marque: "Renault",
      energie: "Essence",
      boite: "Manuelle"
    },
    // Add more items as needed
  ];

  return (
    <div>
      {vehiculePubItems.map((item, index) => (
        <div key={index} className="card">
          <div className="image-container">
            <img src={item.imageUrl} alt={item.modelName} />
          </div>
          <div className="info-container">
            <div className="top-right">
              <p>{item.price} DT</p>
            </div>
            <h2>{item.modelName}</h2>
            <div className="owner-info">
              <img src={item.user_url} alt={item.user_name} className="owner-image" />
              <p>{item.user_name}</p>
            </div>
            <p>Description: {item.description}</p>
            <div className="details-container">
              <div className="details">
                <div className="detail-item">
                  <div className="icon-text-container">
                    <img src={iconkilometrage} alt="Kilometrage" />
                    <p>Kilometrage</p>
                  </div>
                  <p>{item.kilometrage} KM</p>
                </div>
                <div className="detail-item">
                  <div className="icon-text-container">
                    <img src={iconAn} alt="Model" />
                    <p>Année</p>
                  </div>
                  <p>{item.model}</p>
                </div>
                <div className="detail-item">
                  <div className="icon-text-container">
                    <img src={iconenergie} alt="Energie" />
                    <p>Energie</p>
                  </div>
                  <p>{item.energie}</p>
                </div>
                <div className="detail-item">
                  <div className="icon-text-container">
                    <img src={iconboite} alt="Boite" />
                    <p>Boite Vitesse</p>
                  </div>
                  <p>{item.boite}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VehiculeOccasion;

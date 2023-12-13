import React from "react";
import { Wave} from "react-animated-text";

const exampleStyle = {
  
  fontSize: "100px",
  color:"white"
};







export const Wave1 = () => (
  <div style={exampleStyle}>
    <Wave text="Estim Car" effect="fadeOut" effectChange={1.0}  />

    
  </div>
);



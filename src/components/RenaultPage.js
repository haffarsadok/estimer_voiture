// RenaultPage.js
import React from 'react';
import { Container, Grid, Card, CardContent, CardMedia, Typography } from '@mui/material';
import './RenaultPageStyle.css'
  

const RenaultPage = () => {

    const renaultItems = [
        {
          url: "/fr/neuf/renault/megane/1.3-l-tce-140",
          imageUrl: "	https://catalogue.automobile.tn/max/2023/09/46987.webp?t=1699275932",
          modelName: "Renault Megane",
          price: "94,950 DT",
        },
        {
          url: "/fr/neuf/renault/megane-sedan",
          imageUrl: "	https://catalogue.automobile.tn/max/2023/09/46988.webp?t=1699275860",
          modelName: "Renault Megane Sedan",
          price: "101,650 DT",
          
        },
        {
          url: "/fr/neuf/renault/clio/1.0-l-sce-life-plus",
          imageUrl: "https://catalogue.automobile.tn/max/2022/04/46752.webp?t=1699275968",
          modelName: "Renault Clio",
          price: "60,900 DT",
          
        },
        {
          url: "/fr/neuf/renault/austral/1.3-l",
          imageUrl: "https://catalogue.automobile.tn/max/2023/04/46921.webp?t=1699275886",
          modelName: "Renault Austral",
          price: "139,900 DT",
        },
        {
          url: "/fr/neuf/renault/express-van/diesel",
          imageUrl: "	https://catalogue.automobile.tn/max/2022/06/46765.webp?t=1700469770",
          modelName: "Renault Express Van",
          price: "58,550 DT",
        },
        {
          url: "/fr/neuf/renault/master",
          imageUrl: "	https://catalogue.automobile.tn/max/2022/09/46805.webp?t=1696844522",
          modelName: "Renault Master",
          price: "84,900 DT",
        },{
          url: "/fr/neuf/renault/megane/1.3-l-tce-140",
          imageUrl: "	https://catalogue.automobile.tn/max/2023/09/46987.webp?t=1699275932",
          modelName: "Renault Megane",
          price: "94,950 DT",
        },
        {
          url: "/fr/neuf/renault/megane-sedan",
          imageUrl: "	https://catalogue.automobile.tn/max/2023/09/46988.webp?t=1699275860",
          modelName: "Renault Megane Sedan",
          price: "101,650 DT",
          
        },
        {
          url: "/fr/neuf/renault/clio/1.0-l-sce-life-plus",
          imageUrl: "https://catalogue.automobile.tn/max/2022/04/46752.webp?t=1699275968",
          modelName: "Renault Clio",
          price: "60,900 DT",
          
        },
        {
          url: "/fr/neuf/renault/austral/1.3-l",
          imageUrl: "https://catalogue.automobile.tn/max/2023/04/46921.webp?t=1699275886",
          modelName: "Renault Austral",
          price: "139,900 DT",
        },
        {
          url: "/fr/neuf/renault/express-van/diesel",
          imageUrl: "	https://catalogue.automobile.tn/max/2022/06/46765.webp?t=1700469770",
          modelName: "Renault Express Van",
          price: "58,550 DT",
        },
        {
          url: "/fr/neuf/renault/master",
          imageUrl: "	https://catalogue.automobile.tn/max/2022/09/46805.webp?t=1696844522",
          modelName: "Renault Master",
          price: "84,900 DT",
        },{
          url: "/fr/neuf/renault/megane/1.3-l-tce-140",
          imageUrl: "	https://catalogue.automobile.tn/max/2023/09/46987.webp?t=1699275932",
          modelName: "Renault Megane",
          price: "94,950 DT",
        },
        {
          url: "/fr/neuf/renault/megane-sedan",
          imageUrl: "	https://catalogue.automobile.tn/max/2023/09/46988.webp?t=1699275860",
          modelName: "Renault Megane Sedan",
          price: "101,650 DT",
          
        },
        {
          url: "/fr/neuf/renault/clio/1.0-l-sce-life-plus",
          imageUrl: "https://catalogue.automobile.tn/max/2022/04/46752.webp?t=1699275968",
          modelName: "Renault Clio",
          price: "60,900 DT",
          
        },
        {
          url: "/fr/neuf/renault/austral/1.3-l",
          imageUrl: "https://catalogue.automobile.tn/max/2023/04/46921.webp?t=1699275886",
          modelName: "Renault Austral",
          price: "139,900 DT",
        },
        {
          url: "/fr/neuf/renault/express-van/diesel",
          imageUrl: "	https://catalogue.automobile.tn/max/2022/06/46765.webp?t=1700469770",
          modelName: "Renault Express Van",
          price: "58,550 DT",
        },
        {
          url: "/fr/neuf/renault/master",
          imageUrl: "	https://catalogue.automobile.tn/max/2022/09/46805.webp?t=1696844522",
          modelName: "Renault Master",
          price: "84,900 DT",
        }
        // Add more items as needed
      ];
      return (
        <Container className="renault-container">
      <Grid container spacing={3}>
        {renaultItems.map((item, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <Card className='box'
            >
              <CardMedia
                component="img"
                alt={item.modelName}
                height="140"
                image={item.imageUrl}
                style={{ objectFit: 'contain' }}
              />
              <CardContent style={{ flex: 1 }}>
                <Typography variant="h6">{item.modelName}</Typography>
                <Typography variant="body2" className="price">
                  A partir de {item.price}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
      );
    };
    
    export default RenaultPage;
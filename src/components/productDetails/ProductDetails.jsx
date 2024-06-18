import React, { useState, useEffect } from 'react';
import './productDetails.css';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useMediaQuery } from '@mui/material';
import { DNA } from 'react-loader-spinner' 
import Nabvar from '../navbar/Nabvar';
import ScrollTop from '../scrollTop/ScrollTop';

function ProductDetails() {
  const { productId } = useParams();
  const apiKey = import.meta.env.VITE_GOV_API_KEY;
  const [productDetails, setProductDetails] = useState(null);
  const [value, setValue] = useState(0);
  const matches = useMediaQuery('(min-width:645px)');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const url = `https://api.fda.gov/drug/event.json?api_key=${apiKey}&search=medicinalproduct=${productId}`;

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          const productIndex = data.results[0].patient.drug.findIndex(drug => drug.medicinalproduct === productId);
          if (productIndex !== -1) {
            console.log("data:", data.results[0].patient.drug[productIndex]);
            setProductDetails(data.results[0].patient.drug[productIndex]);
          } else {
            console.error("No details of the product found");
          }
        } else {
          console.error("No results found");
        }
      } catch (error) {
        console.error("Error while fetching data:", error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            {children}
          </Box>
        )}
      </div>
    );
  }

  return (
    <>
    <Nabvar />
    <div className='details-container-main'>
      <h1 className='details-title'>PRODUCT DETAILS:</h1>
      {productDetails ? (
        <>
          <div className='details-title-container'>
            <h2 className='medicinal-title'>Medicinal Product</h2>
            <p className='medicinal-product'>{productDetails.medicinalproduct}</p>
          </div>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs 
              value={value} 
              onChange={handleChange} 
              aria-label="basic tabs example"
              className='tabs-container'
              orientation={matches ? 'horizontal' : 'vertical'}
            >
              <Tab label="Product Type" {...a11yProps(0)} className='tabs-details'/>
              <Tab label="Generic Name" {...a11yProps(1)} className='tabs-details'/>
              <Tab label="Brand Name" {...a11yProps(2)} className='tabs-details'/>
              <Tab label="Manufacturers" {...a11yProps(3)} className='tabs-details'/>
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            {productDetails.openfda && productDetails.openfda.product_type && productDetails.openfda.product_type.length > 0 ? (
              productDetails.openfda.product_type.map((type, index) => (
                <p key={index}>- {type}</p>
              ))
            ) : (
              <p>No product type found</p>
            )}
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            {productDetails.openfda && productDetails.openfda.generic_name && productDetails.openfda.generic_name.length > 0 ? (
              productDetails.openfda.generic_name.map((name, index) => (
                <p key={index}>- {name}</p>
              ))
            ) : (
              <p>No generic names found</p>
            )}
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            {productDetails.openfda && productDetails.openfda.brand_name && productDetails.openfda.brand_name.length > 0 ? (
              productDetails.openfda.brand_name.map((name, index) => (
                <p key={index}>- {name}</p>
              ))
            ) : (
              <p>No brand names registered.</p>
            )}
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            {productDetails.openfda && productDetails.openfda.manufacturer_name && productDetails.openfda.manufacturer_name.length > 0 ? (
              productDetails.openfda.manufacturer_name.map((name, index) => (
                <p key={index}>- {name}</p>
              ))
            ) : (
              <p>No manufacturers registered</p>
            )}
          </CustomTabPanel>
        </>
      ) : (
        <div className="loader-container">
          <DNA
            className="dna-loader"
            visible={true}
            height="80"
            width="80"
            ariaLabel="dna-loading"
            wrapperStyle={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '20vh',
              width: '20vw',
            }}
            wrapperClass="dna-wrapper"
          />
      </div>
      )}
    </div>
    <ScrollTop />
  </>
  );
}

export default ProductDetails;
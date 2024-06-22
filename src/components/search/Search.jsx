import React, { useState } from 'react';
import './search.css';
import { IoSearchSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Nabvar from '../navbar/Nabvar';
import ScrollTop from '../scrollTop/ScrollTop';

const Search = () => {
  const [inputValue, setInputValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchData = async (drugName) => {
    if (!drugName.trim()) {
      setErrorMessage('Please enter a valid drug name');
      return;
    }

    setErrorMessage('');
    const apiKey = import.meta.env.VITE_GOV_API_KEY;
    const uppercaseDrugName = drugName.toUpperCase();
    const url = `https://api.fda.gov/drug/event.json?api_key=${apiKey}&search=generic_name=${uppercaseDrugName}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        if(response.status === 404) {
          setErrorMessage('No data found for the drug');
        } else {
          throw new Error('No API response');
        }
      }
      const data = await response.json();
      if (!data.results || data.results.length === 0) {
        setErrorMessage('Please enter a valid drug name');
        setSearchResults([]);
        setInputValue('');
        return;
      }
      setSearchResults(data.results);
      setInputValue('');
    } catch (error) {
      setErrorMessage('Please enter a valid drug name');
      setInputValue('');
    }
  };

  return (
    <>
      <Nabvar />
      <div className='search-container'>
        <h1 className='title-search'>SEARCH BY MEDICINAL PRODUCT</h1>
        <div className="search">
          <div className="input-button-container">
            <input 
              className='search-input'
              type="text" 
              placeholder="Search..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)} 
            />
            <Button 
              variant='contained'
              className='search-button'
              onClick={() => fetchData(inputValue)}>
                <IoSearchSharp />
            </Button>
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
        <div className="search-results">
          {searchResults.map((result, index) => (
            <div key={index} className="search-result">
              {result.patient.drug.map((drug, drugIndex) => (
                <div key={drugIndex} className='search-result-container'>
                  <Link to={{
                    pathname: `/details/${drug.medicinalproduct}`,
                    state: { drugIndex } 
                  }}>
                    <p className='search-result-name'>- {drug.medicinalproduct}</p>
                  </Link>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <ScrollTop />
    </>
  );
}

export default Search;
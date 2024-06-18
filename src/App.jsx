import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Search from './components/search/Search';
import ProductDetails from './components/productDetails/ProductDetails';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Search />} exact />
        <Route path="/details/:productId" element={<ProductDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
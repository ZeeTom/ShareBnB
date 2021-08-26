import './App.css';
import React, { useState, useEffect } from 'react';
import Listings from './Listings';
import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

function App() {
  const [listings, setListings] = useState([]);
  
  useEffect(function () {
    async function fetchListings() {
      const listings = await axios.get(`${BASE_URL}/listings`);
      setListings(listings.data.listings);
    }
    fetchListings();
  }, []);

  return (
    <div className="App">
      <Listings listings={listings}/>
    </div>
  );
}

export default App;

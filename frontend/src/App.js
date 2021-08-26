import "./App.css";
import React, { useState, useEffect } from "react";
import Listings from "./Listings";
import axios from "axios";
import AddListingForm from "./AddListingForm";

const BASE_URL = "http://localhost:3001";

function App() {
  const [listings, setListings] = useState([]);

  useEffect(function () {
    async function fetchListings() {
      const listings = await axios.get(`${BASE_URL}/listings`);
      setListings(listings.data.listings);
    }
    fetchListings();
  }, []);

  async function addListing(listingData) {
    console.log("listing data is", listingData);
    const newListing = await axios.post(`${BASE_URL}/listings`, listingData);
    setListings((oldListings) => [...oldListings, newListing]);
  }

  return (
    <div className="App">
      {/* <Listings listings={listings}/> */}
      <AddListingForm add={addListing} />
    </div>
  );
}

export default App;

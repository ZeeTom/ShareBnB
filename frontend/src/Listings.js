import React, { useState } from 'react';

function Listings({ listings }) {
  console.log(listings);
  return (
    <div>
      {listings.map(l => <img src={l.image} alt={l.title}/>)}
    </div>
  ) 
}

export default Listings
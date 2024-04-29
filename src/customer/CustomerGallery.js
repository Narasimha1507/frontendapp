import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./customerregistration.css"
import "./customergallery.css"
import { useNavigate } from 'react-router-dom';
import config from '../config'

export default function CustomerGallery() {
  const navigate = useNavigate();
  const [arts, setArts] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  const fetchArts = async () => {
    try {
      const response = await axios.get(`${config.url}/viewarts`);
      setArts(response.data);
      setLoading(false); // Set loading to false when data is fetched
    } catch (error) {
      console.error(error.message);
      setLoading(false); // Set loading to false on error
    }
  };

  const viewart = async (artId) => {
    try {
      navigate(`/viewart/${artId}`)
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    fetchArts();
  }, []);

  return (
    <div className='gallery'>
      <h1 style={{ color: "black" }}>Explore Exquisite Artworks: Immerse Yourself in Epic Creations.</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="cards1">
          {arts.length === 0 ? (
            <h1>No arts found.</h1>
          ) : (
            arts.map((art, index) => (
              <div className='card' key={index} onClick={() => viewart(art.artId)}>
                <img src={`${config.url}/artimage/${art.file}`} alt="art" style={{ width: '400px', height: '250px' }} />
                <p id='gal'><u>Category</u> : {art.category}</p>
                <p id='gal'><u>Title</u> :{art.title}</p>
                <p id='gal'><u>Description</u> : {art.description}</p>
                <p id='gal'><u>Price</u> : {art.price}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}
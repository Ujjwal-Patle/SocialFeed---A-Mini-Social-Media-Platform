import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ImageSearch.css";

const UNSPLASH_KEY = import.meta.env.VITE_IMAGE_API_KEY; 

const ImageSearch = () => {
  const [query, setQuery] = useState("social media"); 
  const [images, setImages] = useState([]);

  const searchImages = async (e) => {
    if (e) e.preventDefault(); 
    if (!query) return;

    try {
      const response = await axios.get(`https://api.unsplash.com/search/photos`, {
        params: { query, per_page: 12 },
        headers: {
          Authorization: `Client-ID ${UNSPLASH_KEY}`,
        },
      });
      setImages(response.data.results);
    } catch (err) {
      console.error("Error fetching images:", err);
    }
  };

  // 🔹 Auto-run search on first load
  useEffect(() => {
    searchImages();
  }, []);

  return (
    <div className="image-search-container">
      <form onSubmit={searchImages} className="search-bar">
        <input
          type="text"
          placeholder="Search images..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <div className="image-grid">
        {images.map((img) => (
          <div key={img.id} className="image-card">
            <img src={img.urls.small} alt={img.alt_description} />
            <p>{img.alt_description || "Untitled"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSearch;

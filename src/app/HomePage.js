"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

// Get your API key from https://unsplash.com/developers
const apiKey = "your_api_key";

// Define a custom component for displaying a photo card
const PhotoCard = ({ photo }) => {
  // Destructure the photo object to get the relevant properties
  const { id, urls } = photo;

  // Return a JSX element that renders the photo and the user name
  return (
    <div key={id} className={styles.photoCard}>
      <img src={urls.regular} alt={user.name} />
    </div>
  );
};

// Define a custom component for displaying the homepage
const HomePage = () => {
  // Define a state variable to store the photos array
  const [photos, setPhotos] = useState([]);

  // Define a state variable to store the loading status
  const [loading, setLoading] = useState(false);

  // Define a state variable to store the error message
  const [error, setError] = useState(null);

  const [inputVal, setInputVal] = useState("");

  // Define a router variable to access the Next.js router
  const router = useRouter();

  // Define a useEffect hook to fetch photos from Unsplash API
  useEffect(() => {
    // Call the fetchPhotos function with the query term from the router query object or "furniture" by default
    fetchPhotos("furniture");
  }, []); // Pass the router query as a dependency to run whenever it changes

  // Define a helper function to fetch photos by query term
  const fetchPhotos = async (query) => {
    // Set the loading status to true
    setLoading(true);

    // Set the error message to null
    setError(null);

    try {
      // Fetch 10 photos from Unsplash API by query term or randomly
      const response = await fetch(
        query
          ? `https://api.unsplash.com/search/photos?query=${query}&per_page=9&client_id=${apiKey}`
          : `https://api.unsplash.com/search/photos?query=furniture&per_page=9&client_id=${apiKey}`
      );

      // Parse the JSON response
      const data = await response.json();

      // Set the photos state variable to the data array or the results array
      setPhotos(query ? data.results : data);
    } catch (error) {
      // Handle any errors
      console.error(error);

      // Set the error message to the error message or a default message
      setError(error.message || "Something went wrong. Please try again.");
    } finally {
      // Set the loading status to false
      setLoading(false);
    }
  };

  // Define a handler function for the search form submission
  const handleSearchSubmit = (event) => {
    // Prevent the default browser behavior of reloading the page
    event.preventDefault();

    // Get the current value of the search input element
    const query = event.target.elements.query.value;
    fetchPhotos(query);
  };

  // Return a JSX element that renders the photos array as cards and a search form
  return (
    <div className={styles.homePage}>
      <h1 className={styles.brand}>Furniture Catalog </h1>
      <form onSubmit={handleSearchSubmit} className={styles.formdata}>
        <input
          type="text"
          name="query"
          placeholder="Search Furniture"
          className={styles.inputsearch}
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
        />
        <button
          type="submit"
          className={styles.searchButton}
          disabled={!inputVal}
        >
          Search
        </button>
      </form>
      <div className={styles.center}>
        {loading ? (
                <h1 className={styles.brand}>Loading...</h1>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className={styles.photoGrid}>
            {photos.map((photo) => (
              <PhotoCard photo={photo} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;

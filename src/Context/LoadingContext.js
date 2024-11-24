// src/Context/LoadingContext.js
import React, { createContext, useContext, useState } from 'react'; // Importing necessary React functions

// Create Context for loading state
export const LoadingContext = createContext(); // Initialize a new context for loading

// Create the LoadingProvider component
export const LoadingProvider = ({ children }) => {
  // State to manage loading status, initialized to true
  const [loading, setLoading] = useState(true); 

  // Function to start loading and automatically stop it after 3 seconds
  const triggerLoading = () => {
    setLoading(true); // Set loading to true when triggered
    setTimeout(() => {
      setLoading(false); // Set loading to false after 3 seconds
    }, 3000); // 3000 milliseconds = 3 seconds
  };

  return (
    // Provide the loading state and trigger function to the context consumers
    <LoadingContext.Provider value={{ loading, triggerLoading }}>
      {children} {/* Render child components that can access this context */}
    </LoadingContext.Provider>
  );
};
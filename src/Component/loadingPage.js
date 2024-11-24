// src/Component/LoadingPage.js
import React from 'react'; // Import React library
import Spinner from 'react-spinner-material'; // Import Spinner component for loading indication
import { useLoading } from '../Context/LoadingContext'; // Import useLoading hook to access loading state

const LoadingPage = () => {
  const { loading } = useLoading(); // Access loading state from LoadingContext

  // If not loading, return null to prevent rendering the loading page
  if (!loading) return null; 

  return (
    <div className="loading-page"> {/* Main container for the loading page */}
      <Spinner 
        size={120} // Set size of the spinner
        spinnerColor="#333" // Set color of the spinner
        spinnerWidth={2} // Set width of the spinner
        visible={true} // Ensure the spinner is visible
      />
      <p>Loading...</p> {/* Display loading text */}
    </div>
  );
};

export default LoadingPage; // Export the LoadingPage component for use in other parts of the application
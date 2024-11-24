import React from 'react'; // Importing React
import { BrowserRouter as Router } from 'react-router-dom'; // Importing BrowserRouter for routing functionality
import { UserProvider } from './Context/userContext'; // Importing UserProvider for managing user state
import { ProductProvider } from './Context/productContext'; // Importing ProductProvider for managing product state
import { AppRoutes } from './AppRoutes'; // Importing the AppRoutes component for defining application routes
import { ToastContainer } from 'react-toastify'; // Importing ToastContainer for displaying toast notifications
import { LoadingProvider } from './Context/LoadingContext'; // Importing LoadingProvider for managing loading state

const App = () => {
  return (
    <Router> {/* Wrapping the application in Router for routing */}
      <LoadingProvider> {/* Wrapping the app with LoadingProvider for loading state management */}
        <UserProvider> {/* Wrapping the app with UserProvider for user state management */}
          <ProductProvider> {/* Wrapping the app with ProductProvider for product state management */}
            <ToastContainer /> {/* Component to display toast notifications */}
            <AppRoutes /> {/* Rendering the application routes */}
          </ProductProvider>
        </UserProvider>
      </LoadingProvider>
    </Router>
  );
};

export default App; // Exporting the App component as the default export
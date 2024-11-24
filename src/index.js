// Import the createRoot function from React DOM for rendering the app
import { createRoot } from "react-dom/client"; 

// Import the main CSS file for styling the application
import './index.css'; 

// Import the main App component
import App from "./App"; 

// Import the CSS for the React Toastify library for notifications
import 'react-toastify/dist/ReactToastify.css';

// Get the root DOM element where the React app will be rendered
const rootElement = document.getElementById("root");

// Create a root instance for rendering the React application
const root = createRoot(rootElement);

// Render the App component inside the root element
root.render(<App />);
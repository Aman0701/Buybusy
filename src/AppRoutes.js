import React from 'react'; // Importing React
import { Routes, Route } from 'react-router-dom'; // Importing Routes and Route components for routing

import { Login } from './pages/login'; // Importing the Login page component
import { Signup } from './pages/signup'; // Importing the Signup page component
import { Product } from './pages/product'; // Importing the Product page component
import { Cart } from './pages/cart'; // Importing the Cart page component
import { MyOrders } from './pages/myOrdres'; // Importing the My Orders page component

export const AppRoutes = () => {
    return (
        <Routes> {/* Defining the routing structure of the application */}
            <Route path="/" element={<Product />} /> {/* Route for the home page that renders the Product component */}
            <Route path="/signin" element={<Login />} /> {/* Route for the sign-in page that renders the Login component */}
            <Route path="/signup" element={<Signup />} /> {/* Route for the sign-up page that renders the Signup component */}
            <Route path="/product" element={<Product />} /> {/* Route for the product page that renders the Product component */}
            <Route path="/cart" element={<Cart />} /> {/* Route for the cart page that renders the Cart component */}
            <Route path='/myorders' element={<MyOrders />} /> {/* Route for the my orders page that renders the MyOrders component */}
        </Routes>
    );
};
import React, { useContext, useEffect, useState } from "react"; // Importing necessary React hooks
import { Navbar } from "../Component/Navbar"; // Importing Navbar component
import { Filter } from "../Component/filter"; // Importing Filter component for product filtering
import { ProductContext } from "../Context/productContext"; // Importing ProductContext to access products and cart functions
import Spinner from 'react-spinner-material'; // Importing Spinner component for loading indication
import { LoadingContext } from "../Context/LoadingContext"; // Importing LoadingContext to manage loading state

export const Product = () => {
    const { filteredProducts, addToCart, fetchCart } = useContext(ProductContext); // Accessing filtered products, addToCart, and fetchCart from ProductContext
    const [searchQuery, setSearchQuery] = useState(""); // State for search input
    const [searchResults, setSearchResults] = useState([]); // State for filtered products based on search query
    const { loading, triggerLoading } = useContext(LoadingContext); // Accessing loading state and triggerLoading function from LoadingContext

    useEffect(() => {
        triggerLoading(); // Trigger loading state when the component mounts
    }, []);

    useEffect(() => {
        fetchCart(); // Fetch cart items when the component mounts
    }, [fetchCart]);

    useEffect(() => {
        // Filter products based on the search query
        const results = filteredProducts.filter((item) =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) // Check if product title includes the search query
        );
        setSearchResults(results); // Update search results state
    }, [searchQuery, filteredProducts]); // Run this effect whenever searchQuery or filteredProducts changes

    return (
        <>
            <Navbar /> {/* Rendering the Navbar component */}

            {loading ?
                // If loading is true, show a spinner
                <div className="spinner">
                    <Spinner radius={120} color={"#333"} stroke={2} visible={true} />
                </div> : 
                <>
                    <div className="search-bar"> {/* Search input for filtering products */}
                        <input
                            type="text"
                            placeholder="Search By Name" // Placeholder text for search input
                            value={searchQuery} // Controlled input for search query
                            onChange={(e) => setSearchQuery(e.target.value)} // Update search query state on input change
                        />
                    </div>

                    <Filter /> {/* Rendering Filter component for additional filtering options */}
                    <div className="products"> {/* Container for displaying products */}
                        {searchResults.map((item) => (
                            // Mapping through search results to display each product
                            <div key={item.id} className="singleProductCard"> {/* Unique key for each product card */}
                                <img src={item.images} alt="product" /> {/* Displaying product image */}
                                <h3>{item.title}</h3> {/* Displaying product title */}
                                <h2>₹{(item.price * 100).toFixed(0)}</h2> {/* Displaying product price */}
                                <button onClick={() => addToCart(item)}>Add To Cart</button> {/* Button to add product to cart */}
                            </div>
                        ))}
                        {searchResults.length === 0 && <p>No products found for "{searchQuery}".</p>} {/* Message if no products match the search query */}
                    </div>
                </>}
        </>
    );
};
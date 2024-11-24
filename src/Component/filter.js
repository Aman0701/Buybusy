import React, { useContext, useEffect } from "react"; // Import React and necessary hooks
import { ProductContext } from "../Context/productContext"; // Import the ProductContext for managing product filters

export const Filter = () => {
    // Destructure filters and setFilters from ProductContext
    const { filters, setFilters } = useContext(ProductContext);

    // useEffect to reset filters to default values when the component unmounts
    useEffect(() => {
        return () => {
            setFilters({ price: Infinity, categories: [] }); // Reset filters to default values
        };
    }, [setFilters]); // Dependency array includes setFilters to avoid stale closure

    // Handler for price range input change
    const handlePriceChange = (e) => {
        setFilters({ ...filters, price: Number(e.target.value) }); // Update price in filters
    };

    // Handler for category checkbox change
    const handleCategoryChange = (e) => {
        const category = e.target.value; // Get the category from the checkbox
        const newCategories = e.target.checked
            ? [...filters.categories, category] // Add category if checked
            : filters.categories.filter((cat) => cat !== category); // Remove category if unchecked

        setFilters({ ...filters, categories: newCategories }); // Update categories in filters
    };

    return (
        <div className="filter"> {/* Main filter container */}
            <h2>Filter</h2> {/* Filter section title */}
            <p>Price : {filters.price === Infinity ? "75000" : filters.price}</p> {/* Display current price or default value */}
            <input 
                type="range" 
                className="priceRange" 
                min={1} 
                max={200000} 
                value={filters.price} 
                onChange={handlePriceChange} // Handle price change
            />
            <h2>Category</h2> {/* Category section title */}
            {["SmartPhone", "laptops", "fragrances", "skincare", "groceries", "home-decoration"].map((category) => (
                <div key={category} className="category"> {/* Category checkbox container */}
                    <input
                        type="checkbox"
                        value={category} // Set checkbox value to category
                        checked={filters.categories.includes(category)} // Check if category is selected
                        onChange={handleCategoryChange} // Handle category change
                    />
                    <span>{category}</span> {/* Display category name */}
                </div>
            ))}
        </div>
    );
};
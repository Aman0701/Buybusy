import React, { useContext } from "react"; // Importing React and useContext hook from React
import { ProductContext } from "../Context/productContext"; // Importing ProductContext to access product-related state

export const TotalPrice = () => {
    // Using the useContext hook to access the total price, handlePurchase function, and purchasing state from ProductContext
    const { total, handlePurchase, isPurchasing } = useContext(ProductContext); 

    return (
        <div className="purchase"> {/* Container for the purchase section */}
            <p>Total Price: ₹{total}</p> {/* Displaying the total price */}
            <button onClick={handlePurchase}> {/* Button to trigger the purchase function */}
                {isPurchasing ? "Purchasing..." : "Purchase"} {/* Conditional rendering of button text based on purchasing state */}
            </button>
        </div>
    );
};

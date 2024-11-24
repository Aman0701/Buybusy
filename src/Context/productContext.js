import React, { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./userContext"; // Import UserContext to access user data
import { ItemList } from "../ItemList"; // Import ItemList for available products
import { db } from "../firebaseinit"; // Import Firestore database initialization
import { useNavigate } from "react-router-dom"; // Import hook for navigation
import { doc, getDoc, updateDoc } from "firebase/firestore"; // Import Firestore functions
import { showToast } from "../Component/toast"; // Import toast notification function

// Create a context for product-related state and actions
export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    // State variables
    const [filters, setFilters] = useState({ price: Infinity, categories: [] }); // Filters for products
    const [cart, setCart] = useState([]); // State to hold the cart items
    const [total, setTotal] = useState(0); // State to hold the total price of items in the cart
    const [purchases, setPurchases] = useState([]); // State to hold user's purchase history
    const [isPurchasing, setIsPurchasing] = useState(false); // Flag to indicate if a purchase is in progress
    const navigate = useNavigate(); // Hook for navigation
    const { user } = useContext(UserContext); // Get user context

    // Function to add a product to the cart
    const addToCart = async (product) => {
        if (!user) {   
            navigate("/signin"); // Redirect to sign-in if user is not logged in
            return; // Exit the function if user is not logged in
        }
        
        const userRef = doc(db, "Users", user.id); // Reference to user's document in Firestore
        const userDoc = await getDoc(userRef); // Fetch user document
        
        if (userDoc.exists()) {
            const userData = userDoc.data(); // Get user data
            let cart = userData.cart || []; // Get current cart or initialize as empty array

            const existingProduct = cart.find(item => item.id === product.id); // Check if product is already in cart

            if (existingProduct) {
                // If product exists, update its quantity
                const updatedCart = cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
                await updateDoc(userRef, { cart: updatedCart }); // Update Firestore with new cart
                showToast("Cart updated Successfully!!"); // Show success message
            } else {
                // If product is new, add it to the cart
                const updatedCart = [...cart, {
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    quantity: 1,
                    images: product.images
                }];
                await updateDoc(userRef, { cart: updatedCart }); // Update Firestore with new cart
                showToast(`${product.title} added Successfully to cart !!`); // Show success message
            }
            fetchCart(); // Refresh cart state
        }
    }

    // Function to remove a product from the cart
    const removeFromCart = async (product) => {
        if (!user) {   
            navigate("/signin"); // Redirect to sign-in if user is not logged in
            return; // Exit the function if user is not logged in
        }
        
        const userRef = doc(db, "Users", user.id); // Reference to user's document in Firestore
        const userDoc = await getDoc(userRef); // Fetch user document
        
        if (userDoc.exists()) {
            const userData = userDoc.data(); // Get user data
            let cart = userData.cart || []; // Get current cart

            // Filter out the product to be removed
            const updatedCart = cart.filter(item => item.id !== product.id);
            await updateDoc(userRef, { cart: updatedCart }); // Update Firestore with new cart
            showToast(`${product.title} removed Successfully from cart !!`); // Show success message
            fetchCart(); // Refresh cart state
        }
    }

    // Function to increase the quantity of a product in the cart
    const increaseQuantity = async (product) => {
        if (!user) {   
            navigate("/signin"); // Redirect to sign-in if user is not logged in
            return; // Exit the function if user is not logged in
        }
        
        const userRef = doc(db, "Users", user.id); // Reference to user's document in Fire store
        const userDoc = await getDoc(userRef); // Fetch user document
        
        if (userDoc.exists()) {
            const userData = userDoc.data(); // Get user data
            let cart = userData.cart || []; // Get current cart

            const existingProduct = cart.find(item => item.id === product.id); // Check if product exists in cart

            if (existingProduct) {
                // Update the quantity of the existing product
                const updatedCart = cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
                await updateDoc(userRef, { cart: updatedCart }); // Update Firestore with new cart
                fetchCart(); // Refresh cart state
            }
        }
    }

    // Function to decrease the quantity of a product in the cart
    const decreaseQuantity = async (product) => {
        if (!user) {   
            navigate("/signin"); // Redirect to sign-in if user is not logged in
            return; // Exit the function if user is not logged in
        }
        
        const userRef = doc(db, "Users", user.id); // Reference to user's document in Firestore
        const userDoc = await getDoc(userRef); // Fetch user document
        
        if (userDoc.exists()) {
            const userData = userDoc.data(); // Get user data
            let cart = userData.cart || []; // Get current cart

            const existingProduct = cart.find(item => item.id === product.id); // Check if product exists in cart

            if (existingProduct) {
                // Update the quantity of the existing product
                const updatedCart = cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item);
                const finalCart = updatedCart.filter(item => item.quantity > 0); // Remove items with zero quantity

                await updateDoc(userRef, { cart: finalCart }); // Update Firestore with new cart
                fetchCart(); // Refresh cart state
            }
        }
    }

    // Function to fetch the user's cart from Firestore
    const fetchCart = async () => {
        if (!user) {
            return; // Exit if user is not logged in
        }

        const userRef = doc(db, "Users", user.id); // Reference to user's document in Firestore
        const userDoc = await getDoc(userRef); // Fetch user document

        if (userDoc.exists()) {
            const userData = userDoc.data(); // Get user data

            if (userData.cart) {
                setCart(userData.cart); // Set cart state
                calculateTotal(userData.cart); // Calculate total price
            } else {
                setCart([]); // Set cart to empty if no items
            }
        }
    };

    // Function to calculate the total price of items in the cart
    const calculateTotal = (cart) => { 
        const totalAmount = cart.reduce((acc, item) => {
            return acc + (item.price * 100 * item.quantity); // Calculate total price
        }, 0);

        setTotal(totalAmount); // Update total state
    }

    // Function to handle the purchase process
    const handlePurchase = async () => {
        if (!user) {
            navigate("/signin"); // Redirect to sign-in if user is not logged in
            return; // Exit the function if user is not logged in
        }

        setIsPurchasing(true); // Set purchasing flag to true

        setTimeout(async () => {
            const userRef = doc(db, "Users", user.id); // Reference to user's document in Firestore

            try {
                const userDoc = await getDoc(userRef); // Fetch user data

                if (userDoc.exists()) {
                    const userData = userDoc.data(); // Get user data

                    if (userData.cart && userData.cart.length > 0) {
                        const date = new Date(); // Get current date and time
                        const purchaseDate = date.toISOString(); // Format date

                        // Create a purchase object with cart items and date
                        const purchase = {
                            date: purchaseDate,
                            items: userData.cart,
                        };

                        const purchases = userData.purchases || []; // Get existing purchases
                        purchases.push(purchase); // Add new purchase to history

                        // Update the user document: clear cart and store new purchase
                        await updateDoc(userRef, {
                            cart: [], // Empty the cart
                            purchases: purchases, // Store the new purchase
                        });

                        console.log("Purchase Successful", purchase); // Log purchase
                        setCart([]); // Clear cart in app state
                        showToast("Your purchase was successful!"); // Notify user
                        navigate('/myorders'); // Redirect to orders page
                    } else {
                        showToast("Your cart is empty!", "error"); // Notify if cart is empty
                    }
                } else {
                    showToast("User  not found.", "error"); // Notify if user not found
                }
            } catch (error) {
                showToast("There was an error processing your purchase.", "error"); // Handle errors
            } finally {
                setIsPurchasing(false); // Reset purchasing flag
            }
        }, 2000); // Simulate delay for purchase processing
    };

    // Function to fetch user's purchase history
    const fetchPurchase = async () => {
        if (!user) {
            navigate("/signin"); // Redirect to sign-in if user is not logged in
            return; // Exit the function if user is not logged in
        }

        const userRef = doc(db, "Users", user.id); // Reference to user's document in Firestore
        const userDoc = await getDoc(userRef); // Fetch user document

        if (userDoc.exists()) {
            const userData = userDoc.data(); // Get user data
            console.log(userData); // Log user data
            
            if (userData.purchases && userData.purchases.length > 0) {
                setPurchases(userData.purchases); // Set purchases state
                console.log(purchases); // Log purchases
            }
        }
    }

    // Effect to fetch cart and purchases when user changes
    useEffect(() => {
        if (user) {
            fetchCart(); // Fetch cart when user is logged in
            fetchPurchase(); // Fetch purchase history when user is logged in
        }
    }, [user]); // Dependency array to run effect when user changes

    // Filter products based on selected filters
    const filteredProducts = ItemList.products.filter((product) => {
        const inPriceRange = filters.price === Infinity || product.price * 100 <= filters.price; // Check price filter
        const inCategory = filters.categories.length === 0 || filters.categories.some((category) => product.category === category); // Check category filter

        return inPriceRange && inCategory; // Return true if product meets both filters
    });

    // Provide context values to children components
    return (
        <ProductContext.Provider value={{ 
            filteredProducts, 
            filters, 
            setFilters, 
            cart, 
            addToCart, 
            fetchCart, 
            total, 
            removeFromCart, 
            increaseQuantity, 
            decreaseQuantity, 
            handlePurchase, 
            purchases, 
            isPurchasing 
        }}>
            {children} {/* Render Children Component */}
        </ProductContext.Provider>
    );
}

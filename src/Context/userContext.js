import { createContext, useState, useEffect } from "react";

// Create a UserContext to provide user-related state and actions
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser ] = useState(null); // State to hold user information
    const [login, setLogin] = useState(false); // State to track login status

    useEffect(() => {
        // Check if user is already logged in when the component mounts
        const storedUserName = localStorage.getItem("userName"); // Get stored username from local storage
        const storedUserEmail = localStorage.getItem("userEmail"); // Get stored email from local storage
        const storedUserId = localStorage.getItem("id"); // Get stored user ID from local storage
        const storedLoginStatus = localStorage.getItem("isLoggedIn"); // Get stored login status

        // If user is logged in, update the user state and login status
        if (storedLoginStatus === "true" && storedUserName && storedUserEmail) {
            setUser ({ id: storedUserId, name: storedUserName, email: storedUserEmail }); // Set user state
            setLogin(true); // Update login state to true
        } else {
            setLogin(false); // Set login state to false if not logged in
        }
    }, []); // Run this effect only once when the component mounts

    useEffect(() => {
        // Effect to listen for changes in local storage
        const handleStorageChange = () => {
            const loggedIn = localStorage.getItem("isLoggedIn") === "true"; // Check if user is logged in
            setLogin(loggedIn); // Update login state based on local storage
        };

        // Add event listener to listen for storage changes
        window.addEventListener("storage", handleStorageChange);

        // Cleanup function to remove the event listener when the component unmounts
        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []); // Run this effect only once when the component mounts

    // Provide user state and actions to children components
    return (
        <UserContext.Provider value={{ user, setUser , login, setLogin }}>
            {children} {/* Render children components*/}
        </UserContext.Provider>
    );
}
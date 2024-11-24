import React, { useRef } from "react"; // Importing React and useRef hook
import { Navbar } from "../Component/Navbar"; // Importing Navbar component
import { useNavigate } from "react-router-dom"; // Importing useNavigate for navigation
import bcrypt from 'bcryptjs'; // Importing bcrypt for password hashing
import { collection, getDocs, query, where } from "firebase/firestore"; // Importing Firestore functions
import { db } from "../firebaseinit"; // Importing Firebase initialization
import { useContext } from "react"; // Importing useContext for context management
import { UserContext } from "../Context/userContext"; // Importing UserContext for user state management
import { showToast } from "../Component/toast"; // Importing showToast function for displaying messages
import { LoadingContext } from "../Context/LoadingContext"; // Importing LoadingContext for loading state management
import Spinner from 'react-spinner-material'; // Importing Spinner component for loading indication

export const Login = () => {
    const navigate = useNavigate(); // Initializing navigation
    const emailRef = useRef(null); // Creating a reference for the email input
    const passwordRef = useRef(null); // Creating a reference for the password input
    const { setUser , setLogin } = useContext(UserContext); // Accessing user state management functions
    const { loading } = useContext(LoadingContext); // Accessing loading state

    // Function to handle redirection to the signup page
    const handleRedirect = () => {
        navigate('/signup');
    }

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Preventing default form submission behavior
        const email = emailRef.current.value; // Getting the email value
        const password = passwordRef.current.value; // Getting the password value

        // Checking if both email and password are provided
        if (email && password) {
            const userRef = collection(db, "Users"); // Getting reference to the Users collection
            const q = query(userRef, where("email", "==", email)); // Creating a query to find the user by email

            const querySnapshot = await getDocs(q); // Executing the query

            // Checking if the email is not registered
            if (querySnapshot.empty) {
                showToast("Email Not Registered", "error"); // Show error message
            } else {
                const userDoc = querySnapshot.docs[0]; // Getting the user document
                const userData = userDoc.data(); // Getting user data
                const passwordMatch = await bcrypt.compare(password, userData.password); // Comparing provided password with stored hash

                // Checking if the password matches
                if (passwordMatch) {
                    setLogin(true); // Setting login state to true
                    setUser ({ id: userDoc.id, name: userData.name, email: userData.email }); // Setting user data
                    // Storing user data in localStorage
                    localStorage.setItem("userName", userData.name);
                    localStorage.setItem("userEmail", userData.email);
                    localStorage.setItem("id", userDoc.id);
                    localStorage.setItem("isLoggedIn", "true");
                    showToast("Login Successful!!", "success"); // Show success message
                    navigate('/product'); // Redirecting to the product page
                } else {
                    showToast("Invalid Password", "error"); // Show error message for invalid password
                }
            }
        }
    }

    return (
        <>
            <Navbar /> {/* Rendering the Navbar component */}
            {loading ?
                // If loading is true, show a spinner
                <div className="spinner">
                    <Spinner radius={120} color={"#333"} stroke={2} visible={true} />
                </div>
                :
                <div className="login"> {/* Login form container */}
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}> {/* Form submission handler */}
                        <input type="email" placeholder="Enter Email" ref={emailRef} required /> {/* Email input */}
                        <input type="password" placeholder="Password" ref={passwordRef} required /> {/* Password input */}
                        <button type="submit">Sign In</button> {/* Submit button */}
                    </form>
                    <p onClick={handleRedirect}>Or SignUp instead</p> {/* Redirect to signup */}
                </div>}
        </>
    )
}
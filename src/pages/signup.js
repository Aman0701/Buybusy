import React, { useRef } from "react"; // Importing React and useRef hook
import { db } from "../firebaseinit"; // Importing the initialized Firebase database
import { addDoc, collection, getDocs, query, where } from "firebase/firestore"; // Importing Firestore functions for database operations
import bcrypt from 'bcryptjs'; // Importing bcrypt for password hashing
import { Navbar } from "../Component/Navbar"; // Importing Navbar component
import { useNavigate } from "react-router-dom"; // Importing useNavigate for navigation
import { showToast } from "../Component/toast"; // Importing showToast function for displaying messages

export const Signup = () => {
    const nameRef = useRef(null); // Creating a reference for the name input
    const emailRef = useRef(null); // Creating a reference for the email input
    const passwordRef = useRef(null); // Creating a reference for the password input
    const navigate = useNavigate(); // Initializing navigation

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Preventing default form submission behavior
        const name = nameRef.current.value; // Getting the name value
        const email = emailRef.current.value; // Getting the email value
        const password = passwordRef.current.value; // Getting the password value

        // Validating password length
        if (password.length < 8 || password.length > 15) {
            showToast("Password must be between 8 and 15 characters.", "error"); // Show error message
            return; // Exit the function if validation fails
        }

        // Checking if name, email, and password are provided
        if (name && email && password) {
            const userRef = collection(db, "Users"); // Getting reference to the Users collection
            const q = query(userRef, where("email", '==', email)); // Creating a query to check if email is already registered
            const querySnapshot = await getDocs(q); // Executing the query

            // Checking if the email is already registered
            if (!querySnapshot.empty) {
                showToast("Email Already Registered", "info"); // Show info message if email exists
            } else {
                // Hashing the password before storing it
                const hashedPassword = await bcrypt.hash(password, 12);
                // Adding the new user to the Users collection
                await addDoc(collection(db, "Users"), {
                    name, // Set the user's name
                    email, // Set the user's email
                    password: hashedPassword, // Set the hashed password
                });

                // Clearing input fields after successful signup
                nameRef.current.value = null;
                emailRef.current.value = null;
                passwordRef.current.value = null;
                showToast("SignUp Successful!!"); // Show success message
                navigate('/signin'); // Redirecting to the sign-in page
            }
        }
    }

    return (
        <>
            <Navbar /> {/* Rendering the Navbar component */}
            <div className="login"> {/* Container for the signup form */}
                <h1>Sign Up</h1>
                <form onSubmit={handleSubmit}> {/* Form submission handler */}
                    <input type="text" placeholder="Enter Name" ref={nameRef} required /> {/* Input for name */}
                    <input type="email" placeholder="Enter Email" ref={emailRef} required /> {/* Input for email */}
                    <input type="password" placeholder="Password" ref={passwordRef} minLength={8} maxLength={15} required /> {/* Input for password */}
                    <button type="submit">Sign Up</button> {/* Submit button for the form */}
                </form>
            </div>
        </>
    );
};
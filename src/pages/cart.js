import React, { useContext } from "react";  // Importing React and useContext hook
import { Navbar } from "../Component/Navbar";  // Importing Navbar component
import { ProductContext } from "../Context/productContext";  // Importing ProductContext to manage product-related state
import { TotalPrice } from "../Component/totalPrice";  // Importing TotalPrice component to display total cost
import Spinner from 'react-spinner-material'; // Importing Spinner component for loading indication
import { LoadingContext } from "../Context/LoadingContext"; // Importing LoadingContext to manage loading state


export const Cart = () => {

    // Using useContext to access the product context and loading context

    const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useContext(ProductContext);
    const { loading } = useContext(LoadingContext);
    return (
        <>
            <Navbar />  {/* Rendering the Navbar component */}
            {loading ? 
            // If loading is true, show a spinner
            <div className="spinner">
                <Spinner radius={120} color={"#333"} stroke={2} visible={true} />
            </div> 
            : cart.length === 0 ?
            // If the cart is empty, display a message
             <h1>Cart is Empty!</h1> :
                (
                    <>
                        <TotalPrice /> {/* Displaying the total price of items in the cart */}
                        <div className="products">
                        {/* Mapping through the cart items to display each product*/} 
                            {cart.map((item) => (
                                <div key={item.id} className="singleProductCard">
                                    <img src={item.images} alt="product" /> {/* Displaying product image */}
                                    <h3>{item.title}</h3>  {/* Displaying product title */}
                                    <div className="quantity">
                                        <h2>₹{(item.price * 100).toFixed(0)}</h2>  {/* Displaying the price of the product */}
                                        <div>
                                            {/* Button to decrease the quantity of the item */}
                                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABFElEQVR4nO2WT2rCQBTGf5dwUWuK55D2AIVWeg012rN016J00aX7/rmJEU9h4s6IZeAJocTJm0mmZOEH3yaQ/Hhf3rw3cFELdQNMgR8gAXbiRJ7FQNQk8Bp4A3LgWOEDsAT6daFPQKYA/nUKDH2hz1KBK7RY/cyn0kMNaBGurrznGa8t9q4G/N4g9OS55shoutfVuSR5VrMA0JMnNvB3QPCnDbwJCE5s4LTkhQHuuj3T3U5g8xFX3bmC1wGjXrWyueKA4JENHAUaIPuqAWK0CAB+Rbn4y7rb11vgCqXuG4rcrMVHLbQ4t+teBMwdzUtDz9hNvA/UVAd4kc7UVPnh8k816slq+5IplIlXMhzGmiNzEf+tX262pRCJmsimAAAAAElFTkSuQmCC" alt="minus"
                                                onClick={() => decreaseQuantity(item)} />
                                            {item.quantity} {/* Displaying the current quantity of the item */}
                                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABHUlEQVR4nO2WQWrCQBSGv0t0oVXxHFIPIKj0GlWrZ3HXonTRpXutNzHFUxjdNZISeEIIY/Je0iku/OFtwpCP988/bwbuukG1gFdgCwTASSqQbxOg+ZfAR+AdiIC4oM7ACmhXhT4DRwUwWyEwLAudSQdWaLr7aZlOzxWgabi684bS3g7wpLS9rgF/KLu5SLN2oTkykQdwJE5e1dSwfxZwDIzzwF8ewes88N4jOMgDh1fSa5Ur7aEVnPzEqq4V/O3R6t1NhmviEfySB256GiA/RQMk0dID+A3lxe9KtyvtrvRm6wDUUKpnsLzoWhxooem5XfUhkLzRSmmotN1lb5+KegDmkkxNl5+WPdWoIVfbRqbQUWonw2GkOTJ38d/6BZ8CjheXznrAAAAAAElFTkSuQmCC" alt="add"
                                                onClick={() => increaseQuantity(item)} />  {/* Button to increase the quantity of the item */}

                                        </div>
                                    </div>
                                    <button id="remove" onClick={() => removeFromCart(item)} >Remove From Cart</button> {/* Button to remove the item from the cart */}

                                </div>
                            ))}
                        </div>
                    </>
                )
            }
        </>
    )
}
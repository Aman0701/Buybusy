import React, { useContext } from "react"; // Importing React and useContext hook
import { ProductContext } from "../Context/productContext"; // Importing ProductContext to access purchases
import { Navbar } from "../Component/Navbar"; // Importing Navbar component
import Spinner from 'react-spinner-material'; // Importing Spinner component for loading indication
import { LoadingContext } from "../Context/LoadingContext"; // Importing LoadingContext to manage loading state

export const MyOrders = () => {
  const { purchases } = useContext(ProductContext); // Accessing purchases from ProductContext
  const { loading } = useContext(LoadingContext); // Accessing loading state from LoadingContext

  return (
    <>
      <Navbar /> {/* Rendering the Navbar component */}
      {loading ?
        // If loading is true, show a spinner
        <div className="spinner">
          <Spinner radius={120} color={"#333"} stroke={2} visible={true} />
        </div>
        :
        <div className="order-container"> {/* Container for displaying orders */}
          <h1>Your Orders</h1>
          {purchases.length === 0 ? (
            // If no purchases are found, display a message
            "No purchase Found"
          ) : (
            // Mapping through purchases to display each order
            purchases.map((purchase, index) => {
              // Calculate total price for each purchase
              const totalOrderPrice = purchase.items.reduce(
                (total, item) => total + item.price * item.quantity,
                0
              );

              return (
                <div key={index}> {/* Unique key for each order */}
                  <h2 className="order-date">
                    Ordered On: {purchase.date.split("T")[0]} {/* Displaying order date */}
                  </h2>
                  <table className="order-table"> {/* Table to display order details */}
                    <thead>
                      <tr>
                        <th colSpan={4}>Title</th> {/* Column for item titles */}
                        <th>Price</th> {/* Column for item price */}
                        <th colSpan={2}>Quantity</th> {/* Column for item quantity */}
                        <th colSpan={2}>Total Price</th> {/* Column for total price per item */}
                      </tr>
                    </thead>
                    <tbody>
                      {purchase.items.map((item, idx) => (
                        // Mapping through items in the purchase to display each item
                        <tr key={idx}>
                          <td colSpan={4}>{item.title}</td> {/* Displaying item title */}
                          <td>₹ {item.price * 100}</td> {/* Displaying item price */}
                          <td colSpan={2}>{item.quantity}</td> {/* Displaying item quantity */}
                          <td colSpan={2}>₹ {item.price * item.quantity * 100}</td> {/* Displaying total price for the item */}
                        </tr>
                      ))}
                      {/* Display Total Order Price */}
                      <tr>
                        <td colSpan={7} style={{ textAlign: "right", fontWeight: "bold" }}>
                          Total Order Price: {/* Label for total order price */}
                        </td>
                        <td colSpan={2} style={{ fontWeight: "bold" }}>
                          ₹ {totalOrderPrice * 100} {/* Displaying total order price */}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              );
            })
          )}
        </div>}
    </>
  );
};
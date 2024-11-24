BuyBusy is an intuitive and user-friendly e-commerce platform where users can explore products, manage their shopping carts, and place orders. The app offers a seamless shopping experience with dynamic navigation and responsive design, catering to all device types.



Features 🌟
. Browse Products: Users can explore a catalog of products with detailed information.
. User Authentication: Secure login and logout functionalities.
. Cart Management: Add, update, and remove items from the shopping cart.
. Order History: Track previous orders under the "My Orders" section.
. Responsive UI: Optimized for desktop, tablet, and mobile screens.
. Dynamic Routing: Context-sensitive navigation based on the user's authentication state.
. Loading Indicators: Smooth and responsive page transitions.


Installation and Setup 🚀
Follow the instructions below to run BuyBusy locally:

Prerequisites
Node.js (v14 or higher)
npm or yarn


Steps
Clone the Repository:
   git clone https://github.com/your-username/buybusy.git
   cd buybusy


Install Dependencies:
   npm install


Run the Application:
    npm start


Access the Application: Open your browser and navigate to http://localhost:3000.

Folder Structure 📂

buybusy/
│
├── public/               # Static files and public assets
├── src/
│   ├── components/       # Reusable components (Navbar, ProductCard, etc.)
│   ├── pages/            # Page components (Home, Cart, Orders, etc.)
│   ├── context/          # React contexts for state management
│   ├── assets/           # Images, icons, and static resources
│   ├── App.js            # Main app component
│   ├── index.js          # Entry point for the app
│
├── package.json          # Project metadata and dependencies
└── README.md             # Documentation


Key Components 🔑

. Navbar: Displays navigation links and dynamically adjusts based on login status.
. Product Listing: Shows all available products in the catalog.
. Cart: Allows users to add, remove, and update items.
. Orders: Displays the user's order history once logged in.


State Management 🌐
The app uses React Context for managing global states:

  . AuthContext: Manages user login/logout states and authentication details.
  . CartContext: Handles cart operations, including adding or removing items.
  . LoadingContext: Tracks loading states during transitions and actions.


Navigation 🧭

  . Home Page: Lists all products with options to view details.
  . Login Page: Authenticates the user.
  . Cart Page: Shows items in the user's shopping cart with a checkout option.
  . Orders Page: Displays past purchases for logged-in users.


Built With 🛠️

  . React: Core library for building the user interface.
  . React Router DOM: For handling client-side routing.
  . CSS Modules: Modular CSS for styling components.


Author 👨‍💻
Developed by Aman Agrawal.
Feel free to reach out with suggestions, feedback, or to report issues.

Happy Shopping with BuyBusy! 🎉
# Product Comparison Application

This is a React-based application that fetches product data from multiple local CSV files and displays the products in a searchable and filterable list. The app provides a clean and responsive interface, built using React Bootstrap and Bootstrap CSS, to help users easily browse through a large set of products.

Live Demo deployed with AWS: https://d1q49nrom5koc3.cloudfront.net/
## Screenshots

![Home Page](./public/homepage1)


![Product List](./public/products1)



## Features

- **Fetch Products from CSV Files**: Product data is loaded from local CSV files.
- **Product Listing**: Displays all products in a grid layout, with pagination support.
- **Search Functionality**: Users can search for products by name, category, brand, and other filters.
- **Filters**: Users can filter products based on various criteria (categories, brands, price, etc.).
- **Mobile Responsive**: The app is fully responsive, using Bootstrap’s grid system and components.
- **React Context API**: Centralized state management is handled using `useContext` to manage product and filter states.

## Technologies Used

- **JavaScript (React)**: Core frontend development.
- **React Bootstrap**: For the UI components like grid layouts, cards, and pagination.
- **Bootstrap CSS**: For responsive styling.
- **useContext**: To manage global states like the list of products and filters.
- **CSV Parsing**: Products are fetched from local CSV files.

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://https://github.com/sezginbozdemir/product-comparison
   cd product-comparison
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Run the application**:

   ```bash
   npm start
   ```

   The app will run on [http://localhost:3000](http://localhost:3000).

## How It Works

- **Fetching Products**: On page load, the app fetches product data from multiple CSV files using the `fetch` API and parses them into usable JavaScript objects.
- **State Management**: The React Context API is used to manage and update product lists, filters, and search results.
- **Search and Filter**: The search bar allows users to filter products based on keywords, while category and brand filters help narrow down the results further.
- **Pagination**: For better user experience, the product listing is paginated.

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { FavoritesProvider } from "./context/FavoritesContext";
import { ProductsProvider } from "./context/ProductsContext";
import ProductList from "./components/ProductList";
import Navbar from "./components/Navbar";
import Filter from "./components/Filter";
import Favorites from "./components/Favorites";
import HomePage from "./components/HomePage"; // Import HomePage
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure this line is present to import Bootstrap CSS
import "./App.css"; // Ensure this line is present to import your custom CSS
import { FiltersProvider } from "./context/FiltersContext";

function App() {
  return (
    <ProductsProvider>
      <FiltersProvider>
        <FavoritesProvider>
          <Router>
            <div className="App">
              <Navbar />
              <div className="container mt-4">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route
                    path="/products"
                    element={
                      <>
                        <div className="row">
                          <div className="col-md-3">
                            <Filter />
                          </div>
                          <div className="col-md-9">
                            <ProductList />
                          </div>
                        </div>
                      </>
                    }
                  />
                  <Route path="/favorites" element={<Favorites />} />
                </Routes>
              </div>
            </div>
          </Router>
        </FavoritesProvider>
      </FiltersProvider>
    </ProductsProvider>
  );
}

export default App;

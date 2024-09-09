import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { FavoritesProvider } from "./context/FavoritesContext";
import { ProductsProvider } from "./context/ProductsContext";
import { FiltersProvider } from "./context/FiltersContext";
import { IsMobileProvider } from "./context/IsMobileContext";
import ProductList from "./components/ProductList";
import Navigation from "./components/Navigation";
import Filter from "./components/Filter";
import Favorites from "./components/Favorites";
import HomePage from "./components/HomePage";
import SearchBar from "./components/SearchBar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";
function App() {
  return (
    <IsMobileProvider>
      <ProductsProvider>
        <FiltersProvider>
          <FavoritesProvider>
            <Router>
              <div className="App">
                <Navigation />
                <SearchBar />
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
    </IsMobileProvider>
  );
}

export default App;

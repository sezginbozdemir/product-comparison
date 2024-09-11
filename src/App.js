import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { FavoritesProvider } from "./context/FavoritesContext";
import { ProductsProvider } from "./context/ProductsContext";
import { FiltersProvider } from "./context/FiltersContext";
import { IsMobileProvider } from "./context/IsMobileContext";
import ProductList from "./components/ProductList";
import Navigation from "./components/Navigation";
import Favorites from "./components/Favorites";
import HomePage from "./pages/HomePage";
import Deals from "./pages/Deals";
import Sellers from "./pages/Sellers";
import Vouchers from "./pages/Vouchers";
import SearchBar from "./components/SearchBar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";
function App() {
  return (
    <Router>
      <IsMobileProvider>
        <ProductsProvider>
          <FiltersProvider>
            <FavoritesProvider>
              <div className="App">
                <Navigation />
                <SearchBar />
                <div className="container mt-4">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/deals" element={<Deals />} />
                    <Route path="/sellers" element={<Sellers />} />
                    <Route path="/vouchers" element={<Vouchers />} />
                    <Route path="/products" element={<ProductList />} />
                    <Route path="/favorites" element={<Favorites />} />
                  </Routes>
                </div>
              </div>
            </FavoritesProvider>
          </FiltersProvider>
        </ProductsProvider>
      </IsMobileProvider>
    </Router>
  );
}

export default App;

import React from "react";
import Sellers from "./Sellers";
function HomePage() {
  return (
    <div>
      <h1 className="text-center">Welcome to ShopSmart</h1>
      <p className="text-center">Your one-stop solution for smart shopping!</p>
      <Sellers />
    </div>
  );
}

export default HomePage;

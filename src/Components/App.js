import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./Header";
import Home from "./Home";
import Checkout from "./Checkout";
import { BasketListProvider } from "./BasketListProvider";

export default function App() {
  return (
    <Router>
      <BasketListProvider>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/checkout" element={<Checkout />}>
              hi
            </Route>
            <Route path="/" exact element={<Home />} />
          </Routes>
        </div>
      </BasketListProvider>
    </Router>
  );
}

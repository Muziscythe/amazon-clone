import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./Header";
import Home from "./Home";
import Checkout from "./Checkout";
import Login from "./Login";
import SignUp from "./SignUp";
import { BasketListProvider } from "./BasketListProvider";
import { useAuth } from "./AuthProvider";
import { auth } from "../firebase";
import Payments from "./Payments";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./Orders";

export default function App() {
  const { setUser } = useAuth();
  const stripePromise = loadStripe(
    "pk_test_51K6GY4SDG6DyzIiaEcesCO4wh1qQXOBFRr4xFOk9Zgxtt26FdrSRIdd6go7fCEffLSyl1XwUrFAD2DCoUlTZGgDm00S3FaIs8X"
  );

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log(user);

      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <BasketListProvider>
      <div className="App">
        <Routes>
          <Route
            path="/checkout"
            element={
              <div>
                <Header />
                <Checkout />
              </div>
            }
          />
          <Route
            path="/orders"
            element={
              <div>
                <Header />
                <Orders />
              </div>
            }
          />
          <Route
            path="/payments"
            element={
              <div>
                <Header />
                <Elements stripe={stripePromise}>
                  <Payments />
                </Elements>
              </div>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/"
            element={
              <div>
                <Header />
                <Home />
              </div>
            }
          />
        </Routes>
      </div>
    </BasketListProvider>
  );
}

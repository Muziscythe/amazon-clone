import React, { useContext, useEffect, useState } from "react";
import "./Payments.css";
import { BasketListContext } from "./BasketListProvider";
import { useAuth } from "./AuthProvider";
import CheckoutProduct from "./CheckoutProduct";
import CurrencyFormat from "react-currency-format";
import { useElements, useStripe, CardElement } from "@stripe/react-stripe-js";
import axios from "./axios";
import { useNavigate } from "react-router-dom";

function Payments() {
  const [basketList, setBasketList] = useContext(BasketListContext);
  const { user } = useAuth();
  const elements = useElements();
  const stripe = useStripe();
  const navigate = useNavigate();

  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const [paymentId,setPaymentId] = useState('');
  const [paymentCreated,setPaymentCreated] = useState(null);
  const [amount, setAmount] = useState(null);
  let totalPrice = basketList.reduce((acc, curr) => {
    return acc + curr.price;
  }, 0);

  useEffect(() => {
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        url: `payments/create?total=${totalPrice * 100}`
      });
      setClientSecret(response.data.clientSecret);
      setPaymentId(response.data.id);
      setPaymentCreated(response.data.created);
      setAmount(response.data.amount);
      console.log(response);
    };
    getClientSecret();
  }, [basketList]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)
        }
      })
      .then(({ paymentIntent }) => {
        //paymentIntent == payment Confirmation
        setSuccess(true);
        setError(null);
        setProcessing(false);
        const pushOrdertoDB = async ()=>{
          const res = await axios({
            method: "post",
            url: "payments/complete",
            data:{
              user: user.uid,
              basket: basketList,
              paymentId: paymentId,
              paymentCreated: paymentCreated,
              amount: amount
            }
          });
        }
        pushOrdertoDB();
        navigate("../orders",{replace:true});
      });
      setBasketList([]);

  };

  function handleChange(e) {
    setDisabled(e.empty);
    setError(e.error.message);
  }

  return (
    <div className="payments">
      <h2 className="payments__checkout">
        Checkout Items: {basketList?.length}
      </h2>
      <div className="payments__container">
        <div className="payments__section">
          <div className="payments__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payments__address">
            <p>{user?.email}</p>
            <p>123,4th street, React Nagar</p>
            <p>Tirunelveli, 627002</p>
          </div>
        </div>
        <div className="payments__section">
          <div className="payments__title">
            <h3>Review Items and Delivery</h3>
          </div>
          <div className="payments__review">
            {basketList.map((basket, index) => {
              return (
                <CheckoutProduct
                  id={basket.id}
                  title={basket.title}
                  price={basket.price}
                  rating={basket.rating}
                  imageURL={basket.imageURL}
                />
              );
            })}
          </div>
        </div>
        <div className="payments__section">
          <div className="payments__title">
            <h3>Payment Section</h3>
          </div>
          <div className="payments__details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payments__orderAmount">
                <CurrencyFormat
                  renderText={(value) => (
                    <div>
                      <p>
                        Order total
                        <strong> {value}</strong>
                      </p>
                    </div>
                  )}
                  value={totalPrice}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₹"}
                />
                <button
                  type="submit"
                  disabled={processing || disabled || success}
                  className="payments__paynow"
                >
                  <span>{processing ? <>Processing</> : <>Pay Now</>}</span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payments;

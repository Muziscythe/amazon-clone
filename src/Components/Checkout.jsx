import React, { useContext } from "react";
import "./Checkout.css";
import CheckoutProduct from "./CheckoutProduct";
import Subtotal from "./Subtotal";
import { BasketListContext } from "./BasketListProvider";

function Checkout() {
  const [basketList, setBasketList] = useContext(BasketListContext);

  return (
    <div className="checkout">
      <div className="checkout__left">
        <img
          className="checkout__ad"
          src="https://m.media-amazon.com/images/I/8103v8qbSoL._SX3000_.jpg"
          //src=".images/amazon-clone-ad.PNG"
          alt=""
        />
        <div>
          <h2 className="checkout__title">Your shopping Basket</h2>
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

      <div className="checkout__right">
        <Subtotal />
      </div>
    </div>
  );
}

export default Checkout;

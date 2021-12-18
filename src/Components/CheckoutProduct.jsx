import React, { useContext } from "react";
import "./CheckoutProduct.css";
import { BasketListContext } from "./BasketListProvider";

function CheckoutProduct({ id, title, price, imageURL, rating, hidebutton }) {
  const [basketList, setBasketList] = useContext(BasketListContext);

  function removefromCart() {
    const index = basketList.findIndex((basketItem) => basketItem.id === id);
    setBasketList((prev) => {
      return prev.filter((basketItem, i) => {
        return i !== index;
      });

      // prev.splice(index,1);
    });
  }

  return (
    <div className="checkoutproduct">
      <img
        className="checkoutproduct__image"
        src={imageURL}
        alt="product_image"
      />
      <div className="checkoutproduct__right">
        <div className="checkoutproduct__info">
          <p className="checkoutproduct__title">{title}</p>
          <p className="checkoutproduct__price">
            <small>₹</small>
            <strong>{price}</strong>
          </p>
          <div className="checkoutproduct__rating">
            {Array(rating)
              .fill()
              .map((_, index) => (
                <p>&#9733;</p>
              ))}
          </div>
        </div>
        {!hidebutton && <button onClick={removefromCart} className="">
          Remove from cart
        </button>}
      </div>
    </div>
  );
}

export default CheckoutProduct;

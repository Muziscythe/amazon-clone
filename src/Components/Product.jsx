import React, { useContext } from "react";
import "./Product.css";
import { BasketListContext } from "./BasketListProvider";

function Product({ id, title, price, rating, imageURL }) {
  const [basketList, setBasketList] = useContext(BasketListContext);
  function handleClick() {
    setBasketList((prevList) => {
      return [
        ...prevList,
        {
          id: id,
          title: title,
          price: price,
          rating: rating,
          imageURL: imageURL
        }
      ];
    });
  }

  return (
    <div className="productContainer">
      <div className="product">
        <div className="product__info">
          <p>{title}</p>
          <small>₹</small>
          <strong>{price}</strong>
          <div className="product__rating">
            {Array(rating)
              .fill()
              .map((_, index) => (
                <p>&#9733;</p>
              ))}
          </div>
        </div>
        <img className="product__image" src={imageURL} alt="" />
        <button onClick={handleClick}>Add to basket</button>
      </div>
    </div>
  );
}

export default Product;

import React, { useContext } from "react";
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { BasketListContext } from "./BasketListProvider";

function Subtotal() {
  const [basketList, setBasketList] = useContext(BasketListContext);

  let totalPrice = basketList.reduce((acc, curr) => {
    return acc + curr.price;
  }, 0);

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <div>
            <p>
              Subtotal {basketList?.length} items: <strong>{value}</strong>
            </p>
            <br />
            <small className="subtotal__gift">
              <input type="checkbox" />
              This item contains gift
            </small>
          </div>
        )}
        value={totalPrice}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
      <button>Proceed to CheckOut</button>
    </div>
  );
}

export default Subtotal;

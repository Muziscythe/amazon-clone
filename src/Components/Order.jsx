import React from "react";
import "./Order.css"
import moment from "moment";
import CheckoutProduct from "./CheckoutProduct";

function Order({paymentId,amount,basket,created}){
  return <div className="Order">
    <h3>{paymentId}</h3>
    {/*<p className="Order__created">{moment().unix(created).format("dddd, MMM Do YYYY, h:mm:ss a")}</p>*/}
    {basket.map((item)=>{
      return(
        <CheckoutProduct
        id = {item.id}
        title={item.title}
        price={item.price}
        rating={item.rating}
        imageURL={item.imageURL}
        hidebutton
        />
      );
    })}
    <p className="Order__amount">Order Price: {amount}</p>
  </div>
}

export default Order;

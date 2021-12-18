import React,{useEffect, useState} from "react";
import "./Orders.css";
import Order from "./Order";
import axios from "./axios";
import {useAuth} from "./AuthProvider";

function Orders() {
  const [orders,setOrders] = useState();
  // const [paymentId,setPaymentId] = useState([]);
  // const [basket,setBasket] = useState([]);
  // const [amount, setAmount] = useState([]);
  const {user} = useAuth();

  useEffect(()=>{
    const getOrders = async () =>{
      const response = await axios({
        method: "get",
        url:`/orders/${JSON.stringify(user)}`
      })
      setOrders(response.data);
      // console.log(response.data[0]);
      // console.log(orders);
    }
    getOrders();
  },[]);
  console.log(orders);
  return (
    <div className="orders">
      <h1>Your Orders</h1>
      {orders?.map((order)=>{
        return(
          <Order
            paymentId = {order.paymentId}
            basket = {order.basket}
            amount = {order.amount/100}
            created = {order.created}
          />
        );
      })}
    </div>
  );
}

export default Orders;

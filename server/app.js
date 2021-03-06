require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const stripe = require('stripe')('sk_test_51K6GY4SDG6DyzIiaxNfxyK5cAyT8tkso4rkcNX8m4RhP3smLh9Uy0I1uva00ea86rSNkNqkDeKMgo5VlRv2UAZX2005w99vtME');

const port = process.env.PORT || 5000;
mongoose.connect("mongodb+srv://admin-muzi:Testmuzi@clone1.gun65.mongodb.net/Orders_Amazon_clone", {useNewUrlParser: true});

const app = express();
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
app.use(cors());
const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath));

const basketSchema = new mongoose.Schema({
  id: Number,
  title: String,
  price: Number,
  rating: Number,
  imageURL: String
})
const ordersSchema = new mongoose.Schema({
  paymentId: String,
  basketList: [basketSchema],
  created: Number,
  amount: Number
});
const userOrdersSchema = new mongoose.Schema({
  user: String,
  orders: [ordersSchema]
});
const Order = new mongoose.model("Order",ordersSchema);
const UserOrder = new mongoose.model("UserOrder",userOrdersSchema);


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname,'..', 'build', 'index.html'));
});

app.post("/payments/create",async (req, res) => {
  const total = req.query.total;
  console.log(total);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: 'inr',
  });
  // 201 --- OK created
  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
    id: paymentIntent.id,
    created: paymentIntent.created,
    amount: paymentIntent.amount
  });
  // console.log(paymentIntent);
});

app.post("/payments/complete",async (req, res) => {
  console.log(req.body);
  const userid = req.body.user;
  const basket = req.body.basket;
  const paymentId = req.body.paymentId;
  const paymentCreated = req.body.paymentCreated;
  const amount = req.body.amount;

  const order = new Order({
    basketList: basket,
    paymentId: paymentId,
    created: paymentCreated,
    amount: amount
  });

  UserOrder.findOne({user: userid}, (err,foundUserOrder)=>{
    if(err){
      console.log(err);
    }
    else{
      if(!foundUserOrder){
        const userorder = new UserOrder({
          user : userid,
          orders: order
        });
        userorder.save();
        // console.log("user added");
      }
      else{
        console.log(foundUserOrder);
        foundUserOrder.orders.push(order);
        foundUserOrder.save();
        // console.log("order pushed");
      }
    }
  });
});


app.get("/orders/:user" ,(req,res)=>{
  const user = JSON.parse(req.params.user);
  // console.log(user.uid);
  const userid = user.uid;

  UserOrder.findOne({user: userid}, (err,foundUserOrder)=>{
    if(!err){
      if(foundUserOrder){
        const foundOrder = foundUserOrder.orders.reverse();
        // console.log(foundOrder[0].basketList);
        const orderResponse = [];
        foundOrder.forEach((order) =>{
          const element = {
            paymentId: order.paymentId,
            amount: order.amount,
            basket: order.basketList,
            created: order.created
          };
          orderResponse.push(element);
        });
        // console.log(orderResponse);
        res.send(orderResponse);
            }
      else{
        // console.log("nothing happened");
      }
    }
  })
});

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});

import React from "react";
import "./Home.css";
import Product from "./Product";
import products from "../products";

function Home() {
  return (
    <div className="home">
      <div className="home__container">
        <img
          className="home__image"
          src="https://m.media-amazon.com/images/I/61CX1noQ8nL._SX3000_.jpg"
          alt=""
        />
        <div className="home__row">
          <Product
            key={products[0].id}
            id={products[0].id}
            title={products[0].title}
            price={products[0].price}
            rating={products[0].rating}
            imageURL={products[0].imageURL}
          />
          <Product
            key={products[1].id}
            id={products[1].id}
            title={products[1].title}
            price={products[1].price}
            rating={products[1].rating}
            imageURL={products[1].imageURL}
          />
        </div>
        <div className="home__row">
          <Product
            key={products[2].id}
            id={products[2].id}
            title={products[2].title}
            price={products[2].price}
            rating={products[2].rating}
            imageURL={products[2].imageURL}
          />
          <Product
            key={products[3].id}
            id={products[3].id}
            title={products[3].title}
            price={products[3].price}
            rating={products[3].rating}
            imageURL={products[3].imageURL}
          />
          <Product
            key={products[4].id}
            id={products[4].id}
            title={products[4].title}
            price={products[4].price}
            rating={products[4].rating}
            imageURL={products[4].imageURL}
          />
        </div>
        <div className="home__row">
          <Product
            key={products[5].id}
            id={products[5].id}
            title={products[5].title}
            price={products[5].price}
            rating={products[5].rating}
            imageURL={products[5].imageURL}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;

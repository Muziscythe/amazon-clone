import React, { useState, createContext } from "react";

export const BasketListContext = createContext();

export const BasketListProvider = (props) => {
  const [basketList, setBasketList] = useState([]);

  console.log(basketList);

  return (
    <BasketListContext.Provider value={[basketList, setBasketList]}>
      {props.children}
    </BasketListContext.Provider>
  );
};

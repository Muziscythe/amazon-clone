import React, { useContext } from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Link, useNavigate } from "react-router-dom";
import { BasketListContext } from "./BasketListProvider";
import { useAuth } from "./AuthProvider";

function Header() {
  const [basketList, setBasketList] = useContext(BasketListContext);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  return (
    <div className="header">
      <Link to="/">
        <img
          className="header__logo"
          src="http://www.jitsvinger.co.za/wp-content/uploads/2018/04/Amazon-Logo-1024x373.png"
          alt="logo-img"
        />
      </Link>
      <div className="header__search">
        <input className="header__searchInput" type="text" />
        <SearchIcon className="header__searchIcon" />
      </div>

      <div className="header__navbar">
        <div
          onClick={!user ? () => navigate("/login") : logout}
          className="header__options"
        >
          <div className="firstline__option">
            <span>Hello {user ? user.email : <>guest</>}</span>
          </div>
          <div className="secondline__option">
            <span>{user ? <>Sign Out</> : <>Sign In</>}</span>
          </div>
        </div>

        <div onClick={() => navigate("/orders")} className="header__options">
          <div className="firstline__option">
            <span>Returns</span>
          </div>
          <div className="secondline__option">
            <span>& Orders</span>
          </div>
        </div>

        <div className="header__options">
          <div className="firstline__option">
            <span>Your</span>
          </div>
          <div className="secondline__option">
            <span>Prime</span>
          </div>
        </div>
      </div>
      <Link to="/checkout">
        <div className="header__optionBasket">
          <ShoppingBasketIcon className="header__basketIcon" />
          <span className="secondline__option header__basketCount">
            {basketList?.length}
          </span>
        </div>
      </Link>
    </div>
  );
}

export default Header;

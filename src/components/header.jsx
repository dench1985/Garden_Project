import LogoSvg from "../images/logo.svg";
import CartSvg from "../images/cart.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useMemo, useState } from "react";
import { cartContext } from "..";

export default function Header({ classs }) {
  const nav = useNavigate();

  const { cart } = useContext(cartContext);

   const [menuActive, setMenuActive]= useState(false)
  const len = useMemo(() => {
    let sum = 0;
    for (let i = 0; i < cart.length; i++) {
      sum += cart[i].quantity;
    }
    return sum;
  }, [cart]);
  return (
    <header className={classs}>
      <div className="left">
        <div className="logo">
          <img onClick={() => nav("/")} src={LogoSvg} alt="" />
        </div>
        <button onClick={() => nav("/categories")} className="green-btn">
          Catalog
        </button>
      </div>
      <div className="right">
        <NavLink to="/">Main page</NavLink>
        <NavLink to="/products/all" end>
          All product
        </NavLink>
        <NavLink to="/products/sales">All sales</NavLink>
        <div className="cart">
          <img onClick={() => nav("/cart")} src={CartSvg} alt="" />

          {len > 0 && <div className="cart-count">{len}</div>}
        </div>
        <button className="burger" onClick={()=>setMenuActive(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="31"
            viewBox="0 0 40 31"
            fill="none"
          >
            <rect width="40" height="5" fill="black" />
            <rect y="13" width="40" height="5" fill="black" />
            <rect y="26" width="40" height="5" fill="black" />
          </svg>
        </button>
        <div className={"menu " + (menuActive && "active")}>
          <NavLink to="/">Main page</NavLink>
          <NavLink to="/products/all" end>
            All product
          </NavLink>
          <NavLink to="/products/sales">All sales</NavLink>
          <button className="close" onClick={()=> setMenuActive(false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="35"
              viewBox="0 0 36 35"
              fill="none"
            >
              <rect
                x="0.694336"
                y="31.2744"
                width="44"
                height="5"
                transform="rotate(-45 0.694336 31.2744)"
                fill="black"
              />
              <rect
                x="4.22949"
                y="0.161621"
                width="44"
                height="5"
                transform="rotate(45 4.22949 0.161621)"
                fill="black"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

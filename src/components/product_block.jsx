import { useContext } from "react";
import { SERVER_URL, cartContext } from "..";
import { useNavigate } from "react-router-dom";

export default function ProductBlock({ value }) {
  const nav = useNavigate();

  const { addToCart } = useContext(cartContext);
  return (
    <div className="container-item">
      <div className="thumbnail">
        <img
          src={SERVER_URL + value.image}
          alt=""
          onClick={() => nav("/product/" + value.id)}
        />
        <button onClick={() => addToCart(value)}>Add to cart</button>
      </div>

      <div className="prices">
        <span>{value.discont_price ?? value.price}$</span>

        {value.discont_price && (
          <>
            <span className="og-price">{value.price}$</span>
            <span className="sale">
              -
              {(
                ((value.price - value.discont_price) * 100) /
                value.price
              ).toFixed(2)}
              %
            </span>
          </>
        )}
      </div>

      <div className="title">{value.title}</div>
    </div>
  );
}

import { useContext } from "react";
import Footer from "../components/footer";
import Header from "../components/header";

import { useNavigate } from "react-router-dom";
import { SERVER_URL, cartContext } from "..";

export default function Cart() {
    const nav = useNavigate();

    const { cart, setCart } = useContext(cartContext);

    const quantityHandler = (condition, fn, productIndex, value) => {
        setCart(
            cart.map((obj) => {
                if (condition(obj.quantity, value) && obj.id === productIndex) {
                    fn(obj, value);
                }
                return obj;
            }),
        );
    };

    const orderHandler = () => {
        fetch(SERVER_URL + "/order/send").then(() => alert("ordered!!!!"));
    };

    return (
        <>


















        
            <Header />
            <main>
                <section className="cart">
                    <div className="left">
                        <div className="title">Shopping cart</div>
                        <button onClick={() => nav("/")}>
                            <span>Back to the store</span>
                            <svg
                                width="15"
                                height="15"
                                viewBox="0 0 15 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M4.49653 1.19763C4.37465 1.19763 4.26567 1.27146 4.21879 1.38396C4.17309 1.49763 4.20004 1.62654 4.28793 1.71208L10.0758 7.49998L4.28793 13.2879C4.20942 13.3629 4.17778 13.4754 4.2059 13.5797C4.23286 13.6851 4.31489 13.7672 4.42036 13.7941C4.52465 13.8222 4.63715 13.7906 4.71215 13.7121L10.7122 7.71208C10.8293 7.5949 10.8293 7.40505 10.7122 7.28787L4.71215 1.28787C4.6559 1.22927 4.57856 1.19763 4.49653 1.19763Z"
                                    fill="black"
                                />
                            </svg>
                        </button>

                        <div className="cart-items">
                            {cart.map((value) => (
                                <div className="item" key={value.id}>
                                    <div className="image">
                                        <img
                                            src={SERVER_URL + value.image}
                                            alt=""
                                        />
                                    </div>

                                    <div className="title-wrapper">
                                        <div className="title">
                                            {value.title}
                                        </div>
                                        <div className="quantity">
                                            <button
                                                onClick={() =>
                                                    quantityHandler(
                                                        (q) => q > 1,
                                                        (obj) => obj.quantity--,
                                                        value.id,
                                                    )
                                                }
                                            >
                                                <svg
                                                    width="18"
                                                    height="18"
                                                    viewBox="0 0 18 2"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <rect
                                                        width="18"
                                                        height="2"
                                                        fill="black"
                                                    />
                                                </svg>
                                            </button>
                                            <input
                                                type="text"
                                                value={value.quantity}
                                                onInput={(event) =>
                                                    quantityHandler(
                                                        (_, v) =>
                                                            v >= 1 && v <= 99,
                                                        (obj, v) =>
                                                            (obj.quantity = v),
                                                        value.id,
                                                        Number(
                                                            event.target.value,
                                                        ),
                                                    )
                                                }
                                            />
                                            <button
                                                onClick={() => {
                                                    quantityHandler(
                                                        (q) => q < 99,
                                                        (obj) => obj.quantity++,
                                                        value.id,
                                                    );
                                                }}
                                            >
                                                <svg
                                                    width="18"
                                                    height="18"
                                                    viewBox="0 0 18 18"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <rect
                                                        y="8"
                                                        width="18"
                                                        height="2"
                                                        fill="black"
                                                    />
                                                    <rect
                                                        x="8"
                                                        y="18"
                                                        width="18"
                                                        height="2"
                                                        transform="rotate(-90 8 18)"
                                                        fill="black"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="price">
                                        {value.discont_price ?? value.price}
                                        <div className="dolar">$</div>
                                    </div>

                                    {value.discont_price && (
                                        <div className="discount-price">
                                            {value.price}$
                                        </div>
                                    )}

                                    <button
                                        className="remove"
                                        onClick={() =>
                                            setCart(
                                                cart.filter(
                                                    (x) => x.id !== value.id,
                                                ),
                                            )
                                        }
                                    >
                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 16 16"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M1.6438 0.799988L0.800049 1.64374L7.17505 7.99999L0.800049 14.3562L1.6438 15.2L8.03755 8.84374L14.4125 15.2L15.2563 14.3562L8.8813 7.99999L15.2563 1.64374L14.4125 0.799988L8.03755 7.15624L1.6438 0.799988Z"
                                                fill="black"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="right">
                        <div className="box">
                            <div className="title">Order details</div>
                            <div className="total">
                                <div>Total</div>
                                <div className="price">
                                    {cart
                                        .reduce(
                                            (sum, x) =>
                                                (x.discont_price ?? x.price) *
                                                    x.quantity +
                                                sum,
                                            0,
                                        )
                                        .toFixed(2)}
                                    <div className="dolar">$</div>
                                </div>
                            </div>
                            <input type="text" placeholder="Phone number" />
                            <button onClick={orderHandler}>Order</button>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

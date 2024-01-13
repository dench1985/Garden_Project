import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import "./index.css";
import Categories from "./pages/categories";
import Products from "./pages/products";
import Product from "./pages/product";
import Cart from "./pages/cart";
import NotFound from "./pages/notFound";
import { createContext, useEffect, useState } from "react";

export const cartContext = createContext();
export const SERVER_URL = "http://localhost:3333";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

function App() {
    const [cart, setCart] = useState(
        JSON.parse(localStorage.getItem("cart")) ?? [],
    );

    const addToCart = (product) => {
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].id === product.id) {
                cart[i].quantity++;
                setCart([...cart]);
                return;
            }
        }

        setCart([...cart, { ...product, quantity: 1 }]);
    };

    useEffect(() => {       
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    return (
        <cartContext.Provider value={{ cart, setCart, addToCart }}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/categories" element={<Categories />} />
                    <Route
                        path="/products/:categoryId"
                        element={<Products />}
                    />
                    <Route path="/product/:id" element={<Product />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </cartContext.Provider>
    );
}

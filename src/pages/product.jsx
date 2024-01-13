import Header from "../components/header";
import Footer from "../components/footer";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { SERVER_URL, cartContext } from "..";
import NotFound from "./notFound";

export default function Product() {
    const { id } = useParams();

    const { addToCart } = useContext(cartContext);
    const [product, setProduct] = useState({});

    useEffect(() => {
        fetch(SERVER_URL + "/products/" + id)
            .then((x) => x.json())
            .then((x) => setProduct(x[0]));
    }, [id]);

    if (!product) {
        return <NotFound />;
    }

    return (
        <>
            <Header />

            <main>
                <section className="goods">
                    <div className="title">{product.title}</div>
                    <div className="product">
                        <div className="left">
                            <img src={SERVER_URL + product.image} alt="" />
                        </div>
                        <div className="right">
                            <div className="price">
                                <span>
                                    {product.discont_price ?? product.price}$
                                </span>

                                {product.discont_price && (
                                    <>
                                        <span className="default">
                                            {product.price}$
                                        </span>
                                        <span className="sale">
                                            -
                                            {(
                                                ((product.price -
                                                    product.discont_price) *
                                                    100) /
                                                product.price
                                            ).toFixed(2)}
                                            %
                                        </span>
                                    </>
                                )}
                            </div>

                            <button onClick={() => addToCart(product)}>
                                Add to cart
                            </button>

                            <div className="dotted-line" />

                            <div className="description">
                                <div className="description-title">
                                    Description
                                </div>
                                {product.description}
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}


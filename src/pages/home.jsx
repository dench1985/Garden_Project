import { useNavigate } from "react-router-dom";
import Footer from "../components/footer";
import Header from "../components/header";
import HeroImagePng from "../images/Image 2.svg";
import GnomikPng from "../images/gnomik.png";
import { useEffect, useState } from "react";
import { SERVER_URL } from "..";
import ProductBlock from "../components/product_block";
import CategoriesBlock from "../components/categories_block";

export default function Home() {
  const nav = useNavigate();

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(SERVER_URL + "/categories/all")
      .then((x) => x.json())
      .then((data) => setCategories(data));

    fetch(SERVER_URL + "/products/all")
      .then((x) => x.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <>
      <Header />
      <main>
        <section className="group-hero">
          <div className="left">
            <div className="title">
              Sale <br />
              <span>New season</span>
            </div>
            <div className="btns">
              <button onClick={() => nav("/products/sales")}>Sale</button>
            </div>
          </div>
          <div className="right">
            <img src={HeroImagePng} alt="" />
          </div>
        </section>

        <section className="categories">
          <div className="top">
            <div className="title">Catalog </div>
            <button onClick={() => nav("/categories")}>All categories</button>
          </div>
          <div className="bottom">
            {categories.slice(0, 4).map((value) => (
              <CategoriesBlock key={value.id} category={value} />
            ))}
          </div>
        </section>

        <section className="sales">
          <div className="left">
            <img src={GnomikPng} alt="" />
          </div>
          <form
            className="right"
            onSubmit={(event) => {
              event.preventDefault();

              fetch(SERVER_URL + "/sale/send", {
                method: "POST",
              }).then(() => alert("ok!"));
            }}
          >
            <div className="title">
              <div className="title-top">
                <span>5%</span> off
              </div>
              <div className="title-bottom">on the first order</div>
            </div>
            <input type="text" placeholder="+49" required />
            <button>Get a discount</button>
          </form>
        </section>

        <section className="stock">
          <div className="stock-item">Sale</div>
          <div className="stock-container">
            {products
              .filter((x) => x.discont_price)
              .slice(0, 4)
              .map((value) => (
                <ProductBlock key={value.id} value={value} />
              ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

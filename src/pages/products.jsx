import { useParams } from "react-router-dom";
import Footer from "../components/footer";
import Header from "../components/header";
import { SERVER_URL } from "..";
import { useEffect, useState } from "react";
import NotFound from "./notFound";
import ProductBlock from "../components/product_block";

const s_options = [
  { value: "default", title: "by default" },
  { value: "asc", title: "0 > 100" },
  { value: "desc", title: " 100 > 0" },
];

export default function Products() {
  const { categoryId } = useParams();

  const [products, setProducts] = useState([]);
  const [filtered_Product, setFiltered_Product] = useState(products);
  const [discount, setDiscount] = useState(false);
  const [title, setTitle] = useState("");

  const [sortOption, setSortOtion] = useState(s_options[0].value);
  const [priceRange, setPriceRage] = useState({ min: 0, max: 100 });

  useEffect(() => {
    let url = SERVER_URL + "/categories/" + categoryId;
    if (categoryId === "all" || categoryId === "sales") {
      url = SERVER_URL.concat("/products/", "all");
    }

    fetch(url)
      .then((x) => x.json())
      .then((productsFromServer) =>
        setProducts(() => {
          if (categoryId === "all") {
            setTitle("All products");
          } else if (categoryId === "sales") {
            setTitle("Products with sale");
            return productsFromServer.filter((prod) => prod.discont_price);
          } else {
            setTitle(productsFromServer.category.title);
          }
          return productsFromServer.data ?? productsFromServer;
        })
      );
  }, [categoryId]);

  useEffect(() => {
    setFiltered_Product(() => {
      const filtered = products.filter((p) => {
        const price = p.discont_price ?? p.price;
        const inRange = price >= priceRange.min && price <= priceRange.max;

        if (discount) {
          return p.discont_price && inRange;
        }
        return inRange;
      });

      if (sortOption !== s_options[0].value) {
        filtered.sort((a, b) => {
          const x = a.discont_price ?? a.price;
          const y = b.discont_price ?? b.price;
          return sortOption === s_options[1].value ? x - y : y - x;
        });
      }
      return filtered;
    });
  }, [priceRange, products, discount, sortOption]);

  if (products.status === "ERR") {
    return <NotFound />;
  }

  return (
    <>
      <Header />
      <main>
        <section className="stock">
          <div className="stock-item">{title}</div>
          <div className="filters">
            <div className="price">
              <span>Price</span>
              <input
                type="number"
                value={priceRange.min}
                onInput={(e) =>
                  setPriceRage({
                    ...priceRange,
                    min: Number(e.target.value),
                  })
                }
              />

              <input
                type="number"
                value={priceRange.max}
                onInput={(e) =>
                  setPriceRage({
                    ...priceRange,
                    max: Number(e.target.value),
                  })
                }
              />
            </div>
            {categoryId !== "sales" && (
              <div className="discount">
                <label htmlFor="discount-input">Discounted items</label>
                <input
                  type="checkbox"
                  id="discount-input"
                  checked={discount}
                  onChange={() => setDiscount(!discount)}
                />
              </div>
            )}

            <div className="sort">
              <span>Sorted</span>
              <select
                value={sortOption}
                onChange={(even) => setSortOtion(even.target.value)}
              >
                {s_options.map((value) => (
                  <option key={value.value} value={value.value}>
                    {value.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="stock-container">
            {filtered_Product.map((value) => (
              <ProductBlock key={value.id} value={value} />
            ))}
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}

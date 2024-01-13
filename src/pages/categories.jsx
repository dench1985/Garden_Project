import { useEffect, useState } from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import { SERVER_URL } from "..";
import CategoriesBlock from "../components/categories_block";

export default function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(SERVER_URL + "/categories/all")
      .then((x) => x.json())
      .then((x) => setCategories(x));
  }, []);

  return (
    <>
      <Header />
      <main>
        <section className="categories big">
          <div className="top">
            <div className="title">Categories </div>
          </div>
          <div className="bottom">
            {categories.map((category) => (
              <CategoriesBlock key={category.id} category={category} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

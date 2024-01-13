import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "..";

export default function CategoriesBlock({ category}) {
  const nav = useNavigate();

 
  return (
    <div className="item"     
      
      onClick={() => nav("/products/" + category.id)}
    >
      <img src={SERVER_URL + category.image} alt="" />
      <div className="item-name">{category.title}</div>
    </div>
  );
}

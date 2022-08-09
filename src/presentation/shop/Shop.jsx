import { useParams } from "react-router-dom";
import ShopPage from "./ShopPage";

const Shop = () => {
  var { filter } = useParams();
  console.log(filter)
  return <ShopPage filter={filter}/>;
};

export default Shop;

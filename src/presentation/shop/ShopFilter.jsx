import { useParams } from "react-router-dom";
import ShopPage from "./ShopPage";

const ShopFilter = (filter) => {
  var { filter } = useParams();
  return <ShopPage filter={filter} />;
};



export default ShopFilter;

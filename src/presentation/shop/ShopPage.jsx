import { Component } from "react";
import FooterMap from "../../components/FooterMap";
import NavBar from "../../components/NavBar";
import { getAllProducts, getFilterProducts } from "../../js/products";
import Footer from "../home/Footer";
import $ from "jquery";
import { getUserDetail } from "../../js/auth";
import ShopProductCard from "./ShopProductCard";

class ShopPage extends Component {
  constructor(props) {
    super(props);
    this.data = [];
    this.isLoggedIn = false;
    this.products = [];
  }
  async componentDidMount() {
    var data = await getUserDetail();
    this.isLoggedIn = data["success"];
    this.setState({});
    if (this.props.filter == undefined) {
      this.data = await getAllProducts();
      $(".shop-products").empty();
      for (var i = 0; i < this.data.length; i++) {
        var product = this.data[i];
        var id = product['_id'];
        var img = "products/cleanser.JPG";
        var name = product["name"];
        var price = "Rs " + product["price"];
        this.products.push(
          <ShopProductCard key={i} pid={id} imgurl={img} title={name} price={price} />
        );
        this.setState({});
      }
    } else {
      this.data = await getFilterProducts(this.props.filter);
      $(".shop-products").empty();
      for (var i = 0; i < this.data.length; i++) {
        var product = this.data[i];
        var img = "products/cleanser.JPG";
        var name = product["name"];
        var price = "Rs " + product["price"];
        this.products.push(
          <ShopProductCard key={i} imgurl={img} title={name} price={price} />
        );
        this.setState({});
      }
    }
  }
  render() {
    return (
      <div>
        <section className="shop">
          <NavBar isLoggedIn={this.isLoggedIn} />
          <div className="shop-header">
            <h1>Shop</h1>
          </div>
          <br />
          <h1 className="avaih1">
            Available Products - {this.products.length}
          </h1>
          <div className="shop-products">{this.products}</div>
          <br />
        </section>
        <Footer />
      </div>
    );
  }
}


export default ShopPage;

import { Component } from "react";
import FooterMap from "../../components/FooterMap";
import NavBar from "../../components/NavBar";
import { getAllProducts, getFilterProducts } from "../../js/products";
import Footer from "../home/Footer";
import $ from "jquery";
import { getUserDetail } from "../../js/auth";
import ShopProductCard from "./ShopProductCard";
import { NavLink } from "react-router-dom";
import AllOrders from "../adminPanel/admin_panel_sections/AllOrders";
import uuid from "react-uuid";

class ShopPage extends Component {
  constructor(props) {
    super(props);
    this.data = [];
    this.isLoggedIn = false;
    this.products = [];
    this.images = [];
    this.page =1;
    this.totalProducts = 0;
    this.paginationRow = [];
  }

  async loadProducts(){
    console.log(this.page)
    if (this.props.filter == undefined) {
      var det = await getAllProducts(this.page);
      this.totalProducts = det["total_products"];
      this.data = det["result"];
      this.images = det["images"];
      $(".shop-products").empty();
      for (var i = 0; i < this.data.length; i++) {
        var product = this.data[i];
        var id = product["id"];
        var name = product["name"];
        var price = product["price"];
        this.products.push(
          <ShopProductCard
            key={uuid()}
            pid={id}
            page={this.page}
            images={this.images[i]}
            title={name}
            price={price}
          />
        );
      }
    } else {
      var det = await getFilterProducts(this.props.filter, this.page);
      this.data = det["result"];
      this.totalProducts = det["total_products"];
      this.data = det["result"];
      this.images = det["images"];
      $(".shop-products").empty();
      for (var i = 0; i < this.data.length; i++) {
        var product = this.data[i];
        var id = product["id"];
        var name = product["name"];
        var price = product["price"];
        this.products.push(
          <ShopProductCard
            key={uuid()}
            pid={id}
            page={this.page}
            images={this.images[i]}
            title={name}
            price={price}
          />
        );
      }
    }
    
    this.setState({})
  }
  async componentDidMount() {
    var data = await getUserDetail();
    this.isLoggedIn = data["success"];
    this.setState({});
    this.loadProducts();
    
    this.setState({})
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
          <h1 className="avaih1">Available Products - {this.totalProducts}</h1>
          <div className="shop-products">{this.products}</div>
          <br />
          <div className="pagination-grid">
          <div className="pagination">
            <p className='paginationLink' onClick={()=>{
              if(this.page <= 1){
                
              }
              else{
                this.page = this.page-1;
                this.loadProducts();
              }
            }}>&laquo;</p>
            <p onClick={()=>{
              var pages = parseInt(this.totalProducts / 8);
              if(this.page >= pages){
                
              }
              else{
                this.page++;
                this.loadProducts()
              }
            }} className='paginationLink'>&raquo;</p>
          </div>
          </div>
          <br />
        </section>
        <Footer />
      </div>
    );
  }
}

export default ShopPage;

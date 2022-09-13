import { Component } from "react";
import NavBar from "../../components/NavBar";
import { getAllProducts, getFilterProducts } from "../../js/products";
import Footer from "../home/Footer";
import $ from "jquery";
import { getUserDetail } from "../../js/auth";
import ShopProductCard from "./ShopProductCard";
import uuid from "react-uuid";
import CircularProgress from '@mui/material/CircularProgress';

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
    this.loading = true;
  }

   calculateNumberOfPages(totalItems, itemsPerPage) {
    return Math.ceil(totalItems / itemsPerPage);
}

  async loadProducts(){
    console.log(this.page)
    if (this.props.filter === undefined) {
      var det = await getAllProducts(this.page);
      console.log(det)
      this.totalProducts = det["total_products"];
      this.data = det["result"];
      this.images = det["images"];
      $(".shop-products").empty();
      for (var i = 0; i < this.data.length; i++) {
        var product = this.data[i];
        var id = product["id"];
        var name = product["name"];
        var price = product["price"];
        var cat = product["category"];
        this.products.push(
          <ShopProductCard
            key={uuid()}
            pid={id}
            page={this.page}
            images={this.images[i]}
            title={name}
            price={price}
            productOtherDet={product}
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
            productOtherDet={product}
          />
        );
      }
    }
    this.loading = false;
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
         { !this.loading ? <div className="shop-loaded">
          <br />
          <h1 className="avaih1">Available Products - {this.totalProducts}</h1>
          <div className="shop-products">{this.products}</div>
          <br />
          <div className="pagination-grid">
          <div className="pagination">
            {this.page > 1 ? ( <p className='paginationLink' onClick={()=>{
              if(this.page > 1){
                this.page = this.page-1;
                this.loadProducts();
              }
             
            }}>Previous Page</p>) : ( <div></div>)}
            {this.page < (this.calculateNumberOfPages(parseInt(this.totalProducts), 8)) ? ( <p onClick={()=>{
              var pages = (this.calculateNumberOfPages(parseInt(this.totalProducts), 8));
              if(this.page < pages){
                this.page++;
                this.loadProducts()
              }
            }} className='paginationLink'>Next Page</p>) : ( <div></div>)}
           
            
          </div>
          </div>
          <br />
          </div> : <div style={{
            'height': '400px'
          }} className="loading-l">
          <center><CircularProgress /></center></div>}
        </section>
        <Footer />
      </div>
    );
  }
}

export default ShopPage;

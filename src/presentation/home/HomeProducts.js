import { Component } from "react";
import { NavLink } from "react-router-dom";
import { getAllProducts, getFeaturedProducts } from "../../js/products";
import $ from 'jquery';
import ProductCard from "../../components/productCard";


class HomeProducts extends Component {
  constructor(props){
    super(props);
    this.data = [];
    this.products = [];
  }
  async componentDidMount(){
    var d = await getFeaturedProducts();
    this.data = d['data'];
    console.log(this.data)
    $("#pcards").empty();
    for (var i = 0; i < 4; i++) {
      var product = this.data[i];
      console.log(product)
      var id = product.id;
      var img = "products/exfo.JPG";
      var name = product.name;
      var price = product.price;
      this.products.push(<ProductCard id={id} si={i+1} key={i} imageurl={img} title={name} price={price} />)
    this.setState({});
  }
}

  render() {
    return (
      <section className="home-products">
        <br />
        <div data-aos='fade-up' className="products-intro-text">
        <h2>Bridging the gap between</h2>
        
        <h1>Science backed ingredients and plant extracts.</h1>
        <p>
          Protecting skin's health while battling skin concerns is our forté.{" "}
          <br />
          With the help of our research team, we have made our product safe for
          all skin types.
        </p>
        </div>

        <div data-aos='fade-up' id="pcards" className="pcards">
          {this.products}
        </div>
        <div id="pcards-viewmore">
          {this.products.length > 4 ? <MoreView /> : <div></div>}
        </div>
        <br />
        <br />
      </section>
    );
  }
}

const MoreView = ()=>(
  <NavLink to="/shop">View More</NavLink>
);

export default HomeProducts;

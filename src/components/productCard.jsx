
import { Component } from "react";
import { Link } from "react-router-dom";
import { addToCart } from "../js/products";
class    ProductCard extends Component{
    constructor(props){
        super(props);
    }

    async addToCartReady(){
      var map = {
        productName: this.props.title,
        productPrice: parseInt(this.props.price),
        productImage: this.props.imageurl,
        quantity: 1,
        productId: this.props.id
      }

      var made = await addToCart(map);
      if(made['success']){
        alert('Product added to cart.')
      }
      else{
        alert('Something went wrong')
      }
    }

    render(){
        const to = '/product/'+this.props.id;
        return <div className='pcard'>
        <Link state={{
          page: 0
        }} className="navlinks" to={to}>
        <div className="pcard-top">
        <div className="pcard-header">
          <img src={this.props.imageurl} alt="productImage" />
        </div>
        
        <div className="pcard-det">
          <h5>{this.props.title}</h5>
          <span>Rs {this.props.price}</span>
        </div>
        </div>
        </Link>
       <div className='pcard-bottom'>
         <div onClick={this.addToCartReady.bind(this)} className="pcard-footer">
          <span >Add to Cart</span>
        </div>
       </div>
    </div>
    }
}

export default ProductCard;
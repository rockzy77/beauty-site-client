
import { Component } from "react";
import { Link } from "react-router-dom";
import { addToCart } from "../js/products";
import { toast } from 'react-toastify';
import $ from 'jquery';
import { createCookie, getCookie } from "../js/cookies";
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
        toast.success('Product added to cart.')
      }
      else{
        if(made.message === 'Please Login for access this resource'){
          var cartList = [];
          var dimensions = [];
          var stocks = [];
          if(getCookie('cartList') != ''){
            cartList = JSON.parse(getCookie('cartList'));
            for(var x=0;x<cartList.length;x++){
              if(cartList[x].productId == this.props.id){
                cartList[x].quantity = cartList[x].quantity + 1;
                createCookie('cartList', JSON.stringify(cartList), 1);
                toast.success('Product added to cart.')
                return;
              }
            }


            if(getCookie('dimensions') != ''){
              dimensions = JSON.parse(getCookie('dimensions'));
            }
            if(getCookie('stocks') != ''){
              stocks = JSON.parse(getCookie('stocks'));
            }
            cartList.push(map);
            dimensions.push({
              length: this.props.productOtherDet.length,
              breadth: this.props.productOtherDet.breadth,
              height: this.props.productOtherDet.height,
              weight: this.props.productOtherDet.weight
            });
            stocks.push(this.props.productOtherDet.stock);
            createCookie('cartList', JSON.stringify(cartList), 1);
            createCookie('dimensions', JSON.stringify(dimensions), 1);
            createCookie('stocks', JSON.stringify(stocks), 1);
            toast.success('Product added to cart.')

          }
          else{
            // Cart Scratch
            if(getCookie('dimensions') != ''){
              dimensions = JSON.parse(getCookie('cartList'));
            }
            if(getCookie('stocks') != ''){
              stocks = JSON.parse(getCookie('cartList'));
            }
            cartList.push(map);
            dimensions.push({
              length: this.props.productOtherDet.length,
              breadth: this.props.productOtherDet.breadth,
              height: this.props.productOtherDet.height,
              weight: this.props.productOtherDet.weight
            });
            stocks.push(this.props.productOtherDet.stock);
            createCookie('cartList', JSON.stringify(cartList), 1);
            createCookie('dimensions', JSON.stringify(dimensions), 1);
            createCookie('stocks', JSON.stringify(stocks), 1);
            toast.success('Product added to cart.')
          }
          
        }
        else{
          toast.error('Something went wrong')
        }
        
      }
    }

    render(){
        const to = '/product/'+this.props.id;
        return <div className='pcard'>
        <Link state={{
          page: 1
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
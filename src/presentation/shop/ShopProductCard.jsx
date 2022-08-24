import public_url from "../../js/publicurl";
import { NavLink, useNavigate } from "react-router-dom";
import { Component, useEffect } from "react";
import { addToCart } from "../../js/products";


const ShopProductCard = (props) => {

  async function addToCartReady(){
    var map = {
      productName: props.title,
      productPrice: parseInt(props.price),
      productImage: productImage,
      quantity: 1,
      productId: props.pid
    }
    var made = await addToCart(map);
    if(made['success']){
      alert('Product added to cart.')
    }
    else{
      alert('Something went wrong')
    }
  }

  var productImage = '';

  for(var i=0;i<props.images.length;i++){
    if(props.images[i].name == 'productImage1'){
      productImage = props.images[i].url;
    }
  }
  
       
       return <NavLink className='navlinks' state={{page: props.page}} to={'/product/'+props.pid}>
       <div className="shop-product">
        <div className="shop-product-image">
          <div className="shop-product-image-cont">
            <img src={productImage} alt="" />
          </div>
        </div>
        <div className="shop-product-info">
          <h3>{props.title}</h3>
          <p>Rs {props.price}</p>
          <center>
            <button onClick={(e)=>{
              e.preventDefault();
              addToCartReady();
            }}>Add to Cart</button>
          </center>
        </div>
      </div>
      </NavLink>
};

  export default ShopProductCard;
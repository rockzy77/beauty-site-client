import public_url from "../../js/publicurl";
import { NavLink, useNavigate } from "react-router-dom";
import { Component, useEffect } from "react";


const ShopProductCard = (props) => {
       
       return <NavLink className='navlinks' to={{pathname: '/product/'+props.pid}}>
       <div className="shop-product">
        <div className="shop-product-image">
          <div className="shop-product-image-cont">
            <img src={public_url+props.imgurl} alt="" />
          </div>
        </div>
        <div className="shop-product-info">
          <h3>{props.title}</h3>
          <p>{props.price}</p>
          <center>
            <button>Add to Cart</button>
          </center>
        </div>
      </div>
      </NavLink>
};

  export default ShopProductCard;
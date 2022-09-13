import { Component } from "react";
import { Link } from "react-router-dom";
import { addToCart } from "../js/products";
import { toast } from "react-toastify";
import $ from "jquery";
import { createCookie, getCookie } from "../js/cookies";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../js/myStore";
import trackFB from "../js/fbtrack";


const ProductCard = (props) => {
  var dispatch = useDispatch();
  const data = useSelector((state) => state.theStore.value);

  async function addToCartReady() {
    var map = {
      productName: props.title,
      productPrice: parseInt(props.price),
      productImage: props.imageurl,
      quantity: 1,
      productId: props.id,
    };

    trackFB('AddToCart', {
      content_category: props.category,
      content_ids: [props.id],
      currency: "INR",
      value: parseInt(props.price)
    })

    var made = await addToCart(map);
    if (made["success"]) {
      toast.success("Product added to cart.");
      if (!made.message.includes("quantity")) {
        var cn = 0;
        if (getCookie("cartNumber") !== "") {
          cn = parseInt(getCookie("cartNumber"));
        }
        createCookie("cartNumber", cn + 1, 1);
        dispatch(getData(parseInt(data) + 1));
      }
    } else {
      if (made.message === "Please Login for access this resource") {
        var cartList = [];
        var dimensions = [];
        var stocks = [];
        if (getCookie("cartList") != "") {
          cartList = JSON.parse(getCookie("cartList"));
          for (var x = 0; x < cartList.length; x++) {
            if (cartList[x].productId == props.id) {
              cartList[x].quantity = cartList[x].quantity + 1;
              createCookie("cartList", JSON.stringify(cartList), 1);
              toast.success("Product added to cart.");
              return;
            }
          }

          if (getCookie("dimensions") != "") {
            dimensions = JSON.parse(getCookie("dimensions"));
          }
          if (getCookie("stocks") != "") {
            stocks = JSON.parse(getCookie("stocks"));
          }
          cartList.push(map);
          dimensions.push({
            length: props.productOtherDet.length,
            breadth: props.productOtherDet.breadth,
            height: props.productOtherDet.height,
            weight: props.productOtherDet.weight,
          });
          stocks.push(props.productOtherDet.stock);
          createCookie("cartList", JSON.stringify(cartList), 1);
          createCookie("dimensions", JSON.stringify(dimensions), 1);
          createCookie("stocks", JSON.stringify(stocks), 1);
          toast.success("Product added to cart.");
          var cn = 0;
          if (getCookie("cartNumber") !== "") {
            cn = parseInt(getCookie("cartNumber"));
          }
          createCookie("cartNumber", cn + 1, 1);
          dispatch(getData(parseInt(data) + 1));
        } else {
          // Cart Scratch
          if (getCookie("dimensions") != "") {
            dimensions = JSON.parse(getCookie("cartList"));
          }
          if (getCookie("stocks") != "") {
            stocks = JSON.parse(getCookie("cartList"));
          }
          cartList.push(map);
          dimensions.push({
            length: props.productOtherDet.length,
            breadth: props.productOtherDet.breadth,
            height: props.productOtherDet.height,
            weight: props.productOtherDet.weight,
          });
          stocks.push(props.productOtherDet.stock);
          createCookie("cartList", JSON.stringify(cartList), 1);
          createCookie("dimensions", JSON.stringify(dimensions), 1);
          createCookie("stocks", JSON.stringify(stocks), 1);
          toast.success("Product added to cart.");
          var cn = 0;
          if (getCookie("cartNumber") !== "") {
            cn = parseInt(getCookie("cartNumber"));
          }
          createCookie("cartNumber", cn + 1, 1);
          dispatch(getData(parseInt(data) + 1));
        }
      } else {
        toast.error("Something went wrong");
      }
    }
  }

  const to = "/product/" + props.id;
  return (
    <div className="pcard">
      <Link
        state={{
          page: 1,
        }}
        className="navlinks"
        to={to}
      >
        <div className="pcard-top">
          <div className="pcard-header">
            <img src={props.imageurl} alt="productImage" />
          </div>

          <div className="pcard-det">
            <h5>{props.title}</h5>
            <span>Rs {props.price}</span>
          </div>
        </div>
      </Link>
      <div className="pcard-bottom">
        <div onClick={addToCartReady} className="pcard-footer">
          <span>Add to Cart</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

import { NavLink } from "react-router-dom";
import { addToCart } from "../../js/products";
import { createCookie, getCookie } from "../../js/cookies";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../js/myStore";
import trackFB from "../../js/fbtrack";

const ShopProductCard = (props) => {
  var dispatch = useDispatch();
  const data = useSelector((state) => state.theStore.value);
  async function addToCartReady() {
    console.log(props.productOtherDet);
    var map = {
      productName: props.title,
      productPrice: parseInt(props.price),
      productImage: productImage,
      quantity: 1,
      productId: props.pid,
    };
    
    trackFB('AddToCart', {
      content_category: props.productOtherDet.category,
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
            if (cartList[x].productId == props.pid) {
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

  var productImage = "";

  for (var i = 0; i < props.images.length; i++) {
    if (props.images[i].name === "productImage1") {
      productImage = props.images[i].url;
    }
  }

  return (
    <NavLink
      className="navlinks"
      state={{ page: props.page }}
      to={"/product/" + props.pid}
    >
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
            <button
              onClick={(e) => {
                e.preventDefault();
                addToCartReady();
              }}
            >
              Add to Cart
            </button>
          </center>
        </div>
      </div>
    </NavLink>
  );
};

export default ShopProductCard;

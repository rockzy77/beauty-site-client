import { Component } from "react";
import NavBar from "../../components/NavBar";
import { getUserDetail } from "../../js/auth";
import AboutUs from "./AboutUs";
import Footer from "./Footer";
import HeaderHome from "./HeaderHome.jsx";
import HomeProducts from "./HomeProducts";
import ProductBlurred from "./ProductBlurred";
import Testimonials from "./Testimonials";
import Aos from "aos";
import "aos/dist/aos.css";
import { addToCart } from "../../js/products";
import { deleteCookie, getCookie } from "../../js/cookies";
import { toast } from "react-toastify";

class Home extends Component {
  constructor(props) {
    super(props);
    this.isLoggedIn = false;
  }

  async componentDidMount() {
    Aos.init({ duration: 1500 });
    var data = await getUserDetail();
    this.isLoggedIn = data["success"];
    if(this.isLoggedIn){
        var guestCart = [];
        if (getCookie("cartList") !== "") {
          guestCart = JSON.parse(getCookie("cartList"));
        }
        if (guestCart.length > 0) {
          this.addToCartReady(guestCart);
        }
    }
    this.setState({});
  }

  async addToCartReady(guestCart){
    var cartReturn = [];
    for(var i = 0; i < guestCart.length; i++){
      var cartR =  await addToCart(guestCart[i])
      cartReturn.push(cartR);
    }
    var allTrue = true;
    for(var j = 0; j < cartReturn.length; j++){
      if(!cartReturn[j]['success']){
        allTrue = false;
      }
    }
    if(allTrue){
      toast.success('Items from guest cart were moved to your cart.');
    }
    else{
      toast.error('Some items from guest cart were not added to cart.');
    }
    deleteCookie('cartList');
    deleteCookie('dimensions');
    deleteCookie('stocks');
  }


  render() {
    return (
      <div className="homeSection">
        {/* Nav-Bar */}
        <header>
          <NavBar isLoggedIn={this.isLoggedIn} />

          {/*Header Home-Page */}
          <br />
          <HeaderHome />
        </header>

        {/* Home Products- */}
        <HomeProducts />

        {/* About */}
        <AboutUs />

        {/* Testimonials */}
        <Testimonials />

        {/* ProductBlurred */}
        <ProductBlurred />

        {/* Footer */}
        <Footer />
      </div>
    );
  }
}

export default Home;

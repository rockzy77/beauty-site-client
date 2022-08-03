import { Component } from "react";
import FooterMap from "../components/FooterMap";
import NavBar from "../components/NavBar";
import { getUserDetail } from "../js/auth";
import AboutUs from "./AboutUs";
import LoginScreen from "./authView/login";
import Footer from "./Footer";
import HeaderHome from "./HeaderHome";
import HomeProducts from "./HomeProducts";
import ProductBlurred from "./ProductBlurred";
import Testimonials from "./Testimonials";

class Home extends Component{
    constructor(props){
        super(props);
        this.isLoggedIn = false;
    }

    async componentDidMount(){
        this.isLoggedIn = await getUserDetail();
        this.setState({});
    }
    render(){
        return <div className="homeSection">
                {/* Nav-Bar */}
        <header>
         <NavBar isLoggedIn={this.isLoggedIn}/>
  
          {/*Header Home-Page */}
          <br />
          <br />
          <br />
          <br />
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
  
      {/* <FooterMap/> */}
      <FooterMap />
  
      
      {/* Footer */}
      <Footer />
      </div>
    }
}

export default Home;
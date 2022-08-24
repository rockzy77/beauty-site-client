import { Component } from "react";
import FooterMap from "../../components/FooterMap";
import NavBar from "../../components/NavBar";
import { getUserDetail } from "../../js/auth";
import AboutUs from "./AboutUs";
import LoginScreen from "../authView/login";
import Footer from "./Footer";
import HeaderHome from "./HeaderHome.jsx";
import HomeProducts from "./HomeProducts";
import ProductBlurred from "./ProductBlurred";
import Testimonials from "./Testimonials";
import { loadHomeAnimation } from "../../js/animation";
import Aos from "aos";
import 'aos/dist/aos.css';

class Home extends Component{
    constructor(props){
        super(props);
        this.isLoggedIn = false;
    }

    async componentDidMount(){
        Aos.init({duration: 1500})
        // loadHomeAnimation();
        var data = await getUserDetail();
        this.isLoggedIn = data['success'];
        this.setState({});
    }
    render(){
        return <div className="homeSection">
                {/* Nav-Bar */}
        <header>
         <NavBar isLoggedIn={this.isLoggedIn}/>
  
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
    }
}

export default Home;
import "./App.css";
import "./Product.css";
import "./AuthView.css";
import Testimonials from "./presentation/Testimonials";
import AboutUs from "./presentation/AboutUs";
import NavBar from "./components/NavBar";
import HeaderHome from "./presentation/HeaderHome";
import HomeProducts from "./presentation/HomeProducts";
import ProductBlurred from "./presentation/ProductBlurred";
import Footer from "./presentation/Footer";
import FooterMap from "./components/FooterMap";
import Home from "./presentation/home";
import CookieConsent, { Cookies } from "react-cookie-consent";
import LoginScreen from "./presentation/authView/login";
import { getUserDetail } from "./js/auth";


function App() {
  
  return (
    <div className="App">
      <Home />
      <CookieConsent
  location="bottom"
  buttonText="Accept" 
  cookieName="myAwesomeCookieName2"
  style={{ background: "#2B373B" }}
  buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
  expires={150}
>
  This website uses cookies to enhance the user experience.{" "}
  <span style={{ fontSize: "10px" }}>This bit of text is smaller :O</span>
</CookieConsent>
    </div>


  );
}

export default App;

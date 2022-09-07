import { Component } from "react";
import BackgroundSlider from "react-background-slider";
import { NavLink } from "react-router-dom";
import public_url from "../../js/publicurl";

class HeaderHome extends Component {

  render() {
    return (
      <div id="header-home" className="header-home">
        <BackgroundSlider images={[
          public_url+'products/bg.jpg',
          public_url+'products/bg2.JPG',
          public_url+'products/DSC_4328.JPG'
        ]}
        className="header-home-image"
  duration={5} transition={1} >
        </BackgroundSlider>
       {/* <div id="header-home-image" className="header-home-image">
       
        </div> */}
        <div className="header-home-row">
          <div className="header-home-col1">
            <h1>
              Simple Routine,
              <br />
              Best results.
            </h1>
            <p>
              Simplifying your routine with our multi ingredient focused
              products
            </p>
            <NavLink to="/shop">
              <button>Shop Now</button>
            </NavLink>
          </div>
        </div>
      </div>
    );
  }
}

export default HeaderHome;

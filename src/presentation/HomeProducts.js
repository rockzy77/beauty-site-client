import { Component } from "react";
import { NavLink } from "react-router-dom";

class HomeProducts extends Component {
  render() {
    return (
      <section className="home-products">
        <br />
        <div className="products-intro-text">
        <h2>Bridging the gap between</h2>
        <h1>Science backed ingredients and plant extracts.</h1>
        <p>
          Protecting skin's health while battling skin concerns is our forté.{" "}
          <br />
          With the help of our research team, we have made our product safe for
          all skin types.
        </p>
        </div>

        <div className="pcards">

          <div className="pcard card1">
            <NavLink className="navlinks" to="/product1">
              <div className="pcard-header">
                <img src={process.env.PUBLIC_URL + "bg.jpg"} alt="" />
              </div>
            
            <div className="pcard-det">
              <h5>Skin Prep Cleaner</h5>
              <span>Rs 100</span>
            </div>
            </NavLink>
            <div className="pcard-footer">
              <span>Add to Cart</span>
            </div>
          </div>
          <div className="pcard card1">
            <NavLink className="navlinks" to="/product2">
              <div className="pcard-header">
                <img src={process.env.PUBLIC_URL + "bg.jpg"} alt="" />
              </div>
            </NavLink>
            <div className="pcard-det">
              <h5>Skin Prep Cleaner</h5>
              <span>Rs 100</span>
            </div>
            <div className="pcard-footer">
              <span>Add to Cart</span>
            </div>
          </div>

          <div className="pcard card1">
            <NavLink className="navlinks" to="/product3">
              <div className="pcard-header">
                <img src={process.env.PUBLIC_URL + "bg.jpg"} alt="" />
              </div>
            </NavLink>
            <div className="pcard-det">
              <h5>Skin Prep Cleaner</h5>
              <span>Rs 100</span>
            </div>
            <div className="pcard-footer">
              <span>Add to Cart</span>
            </div>
          </div>

          <div className="pcard card1">
            <NavLink className="navlinks" to="/product4">
              <div className="pcard-header">
                <img src={process.env.PUBLIC_URL + "bg.jpg"} alt="" />
              </div>
            </NavLink>
            <div className="pcard-det">
              <h5>Skin Prep Cleaner</h5>
              <span>Rs 100</span>
            </div>
            <div className="pcard-footer">
              <span>Add to Cart</span>
            </div>
          </div>


        </div>
      </section>
    );
  }
}

export default HomeProducts;

import { Component } from "react";
import NavBar from "../../../components/NavBar";
import $ from "jquery";
import Facts2 from "./facts2";
import Ing2 from "./ing2";
import Htu2 from "./htu2";
import { AiFillStar } from "react-icons/ai";

class Product2 extends Component {
  constructor(props) {
    super(props);
    this.detpage = "facts";
  }

  componentDidMount() {
    $("#facts").on("click", () => {
      this.detpage = "facts";
      $(".factsline").css("background-color", "#777fa8");
      $(".ingline").css("background-color", "transparent");
      $(".htuline").css("background-color", "transparent");
      this.setState({});
    });

    $("#ing").on("click", () => {
      this.detpage = "ing";
      $(".factsline").css("background-color", "transparent");
      $(".ingline").css("background-color", "#777fa8");
      $(".htuline").css("background-color", "transparent");
      this.setState({});
    });

    $("#htu").on("click", () => {
      this.detpage = "htu";
      $(".factsline").css("background-color", "transparent");
      $(".ingline").css("background-color", "transparent");
      $(".htuline").css("background-color", "#777fa8");
      this.setState({});
    });
  }
  render() {
    return (
      <section className="product">
        <NavBar />
        <div className="product-head">
          <h2>Products</h2>
        </div>
        <div className="prow">
          <div class="product-image-col">
            <img src={process.env.PUBLIC_URL + "bg.jpg"} alt="" />
          </div>
          <div className="spacer"></div>
          <div class="product-header-col">
            <h1>GLOW RESTORE SERUM</h1>
            <h5>
              Reduces Hyperpigmentation & Brightens Dull Skin. Protects skin
              barrier.
            </h5>

            <p>
              A lightweight serum containing plant extracts ( watermelon,
              licorice root, Kakadu plum), ceramide, niacinamide, alpha arbutin,
              vitamin c derivative and acetyl glucosamine that helps to restore
              the skin's natural glow and reduces the appearance of
              hyperpigmentation, uneven skin tone, dark spots, fine lines and
              acne marks without irritating the skin's natural barrier.
            </p>

            <div className="tag-row">
              <div>
                <img src={process.env.PUBLIC_URL + "vegan.png"} alt="" /> <br />
                <span>Science-Backed</span>
              </div>

              <div>
                <img src={process.env.PUBLIC_URL + "vegan.png"} alt="" /> <br />
                <span>Non-Spriting</span>
              </div>

              <div>
                <img src={process.env.PUBLIC_URL + "vegan.png"} alt="" /> <br />
                <span>Cruelty Free</span>
              </div>

              <div>
                <img src={process.env.PUBLIC_URL + "vegan.png"} alt="" /> <br />
                <span>Plant Extracts & Vegan</span>
              </div>
            </div>

            <div className="pricencart-row">
              <p>₹550</p>
              <button>Add to Cart</button>
            </div>
          </div>
        </div>
        <br />
        <center>
          <div className="product-det-section">
            <div className="pds-title-row">
              <span id="facts">Facts</span>
              <span id="ing">Ingredients</span>
              <span id="htu">How to use</span>
            </div>
            <center>
              <div className="pds-line">
                <div className="factsline colored"></div>
                <div className="ingline"></div>
                <div className="htuline"></div>
              </div>
            </center>
            {this.detpage === "facts" ? (
              <Facts2 />
            ) : this.detpage === "ing" ? (
              <Ing2 />
            ) : (
              <Htu2 />
            )}
          </div>
        </center>
        <br />

        <div className="product-card-row">
          <div className="productcard">
            <div className="product-card-head">
              <img src={process.env.PUBLIC_URL + "bg.jpg"} alt="" />
            </div>

            <div className="product-card-det">
              <h5>Skin Prep Cleanser</h5>
              <span>Rs 100</span>
            </div>
            <div className="product-card-footer">
              <span>Add to Cart</span>
            </div>
          </div>

          <div className="productcard">
            <div className="product-card-head">
              <img src={process.env.PUBLIC_URL + "bg.jpg"} alt="" />
            </div>

            <div className="product-card-det">
              <h5>Skin Prep Cleanser</h5>
              <span>Rs 100</span>
            </div>
            <div className="product-card-footer">
              <span>Add to Cart</span>
            </div>
          </div>

          <div className="productcard">
            <div className="product-card-head">
              <img src={process.env.PUBLIC_URL + "bg.jpg"} alt="" />
            </div>

            <div className="product-card-det">
              <h5>Skin Prep Cleanser</h5>
              <span>Rs 100</span>
            </div>
            <div className="product-card-footer">
              <span>Add to Cart</span>
            </div>
          </div>
        </div>

        <div className="review-cont">
          <h5>Reviews: </h5>
          <AiFillStar className="star checked"/>
          <AiFillStar  className="star checked"/>
          <AiFillStar  className="star"/>
          <AiFillStar  className="star"/>
          <AiFillStar  className="star"/>
        </div>
      </section>
    );
  }
}

export default Product2;

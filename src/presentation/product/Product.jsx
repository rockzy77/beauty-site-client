import { Component } from "react";
import NavBar from "../../components/NavBar";
import $ from "jquery";
import Facts1 from "./facts1";
import Ing1 from "./ing1";
import Htu1 from "./htu1";
import { AiFillStar } from "react-icons/ai";
import { getUserDetail } from "../../js/auth";
import queryString from 'query-string';
import { getQuery } from "../../js/products";
import { NavLink, useParams } from "react-router-dom";

const Product =()=>{
  var {productId} = useParams();
  console.log(productId);
  return <ProductDet productId={productId}/>
}

class ProductDet extends Component {
  constructor(props) {
    super(props);
    this.detpage = "facts";
    this.isLoggedIn = false;
    this.product = {};
  }

  async componentDidMount() {
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
    var udet = await getUserDetail();
    this.isLoggedIn = udet["success"];
    // this.product = await getPR
    this.setState({});
  }


  render() {
    return <section className="product">
    <NavBar isLoggedIn={this.isLoggedIn} />
    <div className="product-head">
      <h2>Products</h2>
    </div>

    <div className="prow">
      <img src={process.env.PUBLIC_URL + "bg.jpg"} alt="ss" />

      <div className="prdctinfo">
        <h1 className="prdctinfo-header">GLOW RESTORE SERUM</h1>
        <p className="prdctinfo-des">
          Reduces Hyperpigmentation & Brightens Dull Skin. Protects skin
          barrier.
        </p>
        <p className="prdctinfo-span">
          A lightweight serum containing plant extracts ( watermelon,
          licorice root, Kakadu plum), ceramide, niacinamide, alpha arbutin,
          vitamin c derivative and acetyl glucosamine that helps to restore
          the skin's natural glow and reduces the appearance of
          hyperpigmentation, uneven skin tone, dark spots, fine lines and
          acne marks without irritating the skin's natural barrier.
        </p>
        <div className="tag-row-desk">
          <div className="tag">
            <img src={process.env.PUBLIC_URL+'cruelty.png'} alt="" />
            <p>Science-Backed</p>
          </div>

          <div className="tag">
            <img src={process.env.PUBLIC_URL+'cruelty.png'} alt="" />
            <p>Non-Spriting</p>
          </div>

          <div className="tag">
            <img src={process.env.PUBLIC_URL+'cruelty.png'} alt="" />
            <p>Cruelty Free</p>
          </div>

          <div className="tag">
            <img src={process.env.PUBLIC_URL+'cruelty.png'} alt="" />
            <p>Plant Extracts and Vegan</p>
          </div>
        </div>

        <div className="priceandcart-desk">
        <p className="prdctPrice">Rs 550</p>
    <button className="prdctCartBtn">Add to Cart</button>
        </div>
      </div>
    </div>

    <div className="tag-row-mob">
          <div className="tag">
            <img src={process.env.PUBLIC_URL+'cruelty.png'} alt="" />
            <p>Science-Backed</p>
          </div>

          <div className="tag">
            <img src={process.env.PUBLIC_URL+'cruelty.png'} alt="" />
            <p>Non-Spriting</p>
          </div>

          <div className="tag">
            <img src={process.env.PUBLIC_URL+'cruelty.png'} alt="" />
            <p>Cruelty Free</p>
          </div>

          <div className="tag">
            <img src={process.env.PUBLIC_URL+'cruelty.png'} alt="" />
            <p>Plant Extracts and Vegan</p>
          </div>

          
        </div>
        
    
        <div className="priceandcart-mob">
        <p className="prdctPrice">Rs 550</p>
    <button className="prdctCartBtn">Add to Cart</button>
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
          <Facts1 />
        ) : this.detpage === "ing" ? (
          <Ing1 />
        ) : (
          <Htu1 />
        )}
      </div>
    </center>
    <br />

    <div className="product-card-row">
    <div className='productcard'>
        <NavLink className="navlinks" to='/product'>
        <div className="productcard-top">
        <div className="productcard-header">
          <img src={process.env.PUBLIC_URL+'products/cleanser.jpg'} alt="productImage" />
        </div>
        
        <div className="productcard-det">
          <h5>GLOW RESTORE SERUM</h5>
          <span>RS 550</span>
        </div>
        </div>
        </NavLink>
       <div className="productcard-bottom">
         <div className="productcard-footer">
          <span>Add to Cart</span>
        </div>
       </div>
    </div>

    <div className='productcard'>
        <NavLink className="navlinks" to='/product'>
        <div className="productcard-top">
        <div className="productcard-header">
          <img src={process.env.PUBLIC_URL+'products/cleanser.jpg'} alt="productImage" />
        </div>
        
        <div className="productcard-det">
          <h5>GLOW RESTORE SERUM</h5>
          <span>RS 550</span>
        </div>
        </div>
        </NavLink>
       <div className="productcard-bottom">
         <div className="productcard-footer">
          <span>Add to Cart</span>
        </div>
       </div>
    </div>

    <div className='productcard'>
        <NavLink className="navlinks" to='/product'>
        <div className="productcard-top">
        <div className="productcard-header">
          <img src={process.env.PUBLIC_URL+'products/cleanser.jpg'} alt="productImage" />
        </div>
        
        <div className="productcard-det">
          <h5>GLOW RESTORE SERUM</h5>
          <span>RS 550</span>
        </div>
        </div>
        </NavLink>
       <div className="productcard-bottom">
         <div className="productcard-footer">
          <span>Add to Cart</span>
        </div>
       </div>
    </div>
    </div>

    <br />

    <div className="comments-section">
      <br />
      <h3>Comments</h3>
      <p>Latest comments by our customers</p>
      <div className="comment-box">
        <div className="comment-box-head">
          <div className="com-profile-img"></div>
          <div className="com-profile-name">
          <h5>Ali</h5>
          <h6>April 1 2022</h6>
          </div>
        </div>
        <div className="comment-box-det">
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque, aliquid distinctio sed perspiciatis ratione quisquam iste est mollitia, assumenda impedit pariatur similique accusantium libero, soluta obcaecati eum sapiente harum ab.</p>
        </div>
        <div className="review-cont">
      <AiFillStar className="star checked" />
      <AiFillStar className="star checked" />
      <AiFillStar className="star" />
      <AiFillStar className="star" />
      <AiFillStar className="star" />
    </div>
      </div>
      <div className="comment-line"></div>

      <div className="comment-box">
        <div className="comment-box-head">
          <div className="com-profile-img"></div>
          <div className="com-profile-name">
          <h5>Ali</h5>
          <h6>April 1 2022</h6>
          </div>
        </div>
        <div className="comment-box-det">
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque, aliquid distinctio sed perspiciatis ratione quisquam iste est mollitia, assumenda impedit pariatur similique accusantium libero, soluta obcaecati eum sapiente harum ab.</p>
        </div>
        <div className="review-cont">
      <AiFillStar className="star checked" />
      <AiFillStar className="star checked" />
      <AiFillStar className="star" />
      <AiFillStar className="star" />
      <AiFillStar className="star" />
    </div>
      </div>
      <div className="comment-line"></div>

      <div className="comment-box">
        <div className="comment-box-head">
          <div className="com-profile-img"></div>
          <div className="com-profile-name">
          <h5>Ali</h5>
          <h6>April 1 2022</h6>
          </div>
        </div>
        <div className="comment-box-det">
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque, aliquid distinctio sed perspiciatis ratione quisquam iste est mollitia, assumenda impedit pariatur similique accusantium libero, soluta obcaecati eum sapiente harum ab.</p>
        </div>
        <div className="review-cont">
      <AiFillStar className="star checked" />
      <AiFillStar className="star checked" />
      <AiFillStar className="star" />
      <AiFillStar className="star" />
      <AiFillStar className="star" />
    </div>
      </div>
      <div className="comment-line"></div>

      <div className="comment-box">
        <div className="comment-box-head">
          <div className="com-profile-img"></div>
          <div className="com-profile-name">
          <h5>Ali</h5>
          <h6>April 1 2022</h6>
          </div>
        </div>
        <div className="comment-box-det">
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque, aliquid distinctio sed perspiciatis ratione quisquam iste est mollitia, assumenda impedit pariatur similique accusantium libero, soluta obcaecati eum sapiente harum ab.</p>
        </div>
        <div className="review-cont">
      <AiFillStar className="star checked" />
      <AiFillStar className="star checked" />
      <AiFillStar className="star" />
      <AiFillStar className="star" />
      <AiFillStar className="star" />
    </div>
      </div>
      <div className="comment-line"></div>
    </div>

    
  </section>
  }
}




export default Product;

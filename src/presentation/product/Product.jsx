import { Component } from "react";
import NavBar from "../../components/NavBar";
import $ from "jquery";
import Facts1 from "./facts1";
import Ing1 from "./ing1";
import Htu1 from "./htu1";
import { AiFillStar } from "react-icons/ai";
import { getUserDetail } from "../../js/auth";
import ImageGallery from "react-image-gallery";
import { createCookie, getCookie } from "../../js/cookies";
import {
  addToCart,
  createReview,
  getAllProducts,
  getReviews,
  getSingleProduct,
} from "../../js/products";
import { Link, useLocation, useParams } from "react-router-dom";
import public_url from "../../js/publicurl";
import { toast } from "react-toastify";
import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/scss/image-gallery.scss";
import "react-image-gallery/styles/css/image-gallery.css";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../js/myStore";
import trackFB from "../../js/trackFB";

const Product = () => {
  var dispatch = useDispatch();
  const datas = useSelector((state) => state.theStore.value);
  function changeCartNumber() {
    dispatch(getData(datas + 1));
  }
  var { productId } = useParams();
  const location = useLocation();
  const data = location.state != undefined ? location.state : {};
  var page = 1;
  if ("page" in data) {
    page = data.page;
  }
  return (
    <ProductDet
      changeCartNumber={changeCartNumber}
      key={productId}
      page={page}
      productId={productId}
    />
  );
};

class ProductDet extends Component {
  constructor(props) {
    super(props);
    this.detpage = "facts";
    this.isLoggedIn = false;
    this.product = {};
    this.imagesToSlide = [];
    this.recommendedProducts = [];
    this.recommendedPImages = [];
    this.user = {};
    this.tags = [];
    this.plantExtracts = [];
    this.rating = 0;
    this.comments = [];
    this.isAlreadyCommented = false;
  }

  async componentDidMount() {
    var udet = await getUserDetail();
    this.isLoggedIn = udet["success"];
    if (udet["success"]) {
      this.user = udet["user"];
    }
    var det = await getSingleProduct(this.props.productId);
    if (det["success"]) {
      this.product = det["product"];
      var images = det["images"];
      var index = 1;
      for (var i = 0; i < images.length; i++) {
        var mkey = images[i].name;

        this.product[mkey] = images[i]["url"];
        if (mkey.includes("productImage")) {
          this.imagesToSlide.push({
            original: this.product[mkey],
            thumbnail: this.product[mkey],
          });
          index++;
        }
      }
      console.log(this.imagesToSlide);
      if ("tagImage1" in this.product) {
        this.tags.push({
          tagImage: this.product.tagImage1,
          productTagText: this.product.productTagText1,
        });
      }
      if ("tagImage2" in this.product) {
        this.tags.push({
          tagImage: this.product.tagImage2,
          productTagText: this.product.productTagText2,
        });
      }
      if ("tagImage3" in this.product) {
        this.tags.push({
          tagImage: this.product.tagImage3,
          productTagText: this.product.productTagText3,
        });
      }
      if ("tagImage4" in this.product) {
        this.tags.push({
          tagImage: this.product.tagImage4,
          productTagText: this.product.productTagText4,
        });
      }
      if ("plantExtractsImage1" in this.product) {
        this.plantExtracts.push({
          plantExtractsImage: this.product.plantExtractsImage1,
          plantExtractsText: this.product.plantExtractsText1,
          plantExtractsSubText: this.product.plantExtractsSubText1,
        });
      }
      if ("plantExtractsImage2" in this.product) {
        this.plantExtracts.push({
          plantExtractsImage: this.product.plantExtractsImage2,
          plantExtractsText: this.product.plantExtractsText2,
          plantExtractsSubText: this.product.plantExtractsSubText2,
        });
      }
      if ("plantExtractsImage3" in this.product) {
        this.plantExtracts.push({
          plantExtractsImage: this.product.plantExtractsImage3,
          plantExtractsText: this.product.plantExtractsText3,
          plantExtractsSubText: this.product.plantExtractsSubText3,
        });
      }
      if ("plantExtractsImage4" in this.product) {
        this.plantExtracts.push({
          plantExtractsImage: this.product.plantExtractsImage4,
          plantExtractsText: this.product.plantExtractsText4,
          plantExtractsSubText: this.product.plantExtractsSubText4,
        });
      }
    }
    var det2 = await getReviews(this.props.productId);
    if (det2["success"]) {
      this.comments = det2["reviews"];
    }
    this.setState({});
    var det3 = await getAllProducts(this.props.page);
    if (det3["success"]) {
      var productsp = det3["result"];
      for (var j = 0; j < productsp.length; j++) {
        if (this.recommendedProducts.length !== 3) {
          if (productsp[j].id !== this.props.productId) {
            this.recommendedProducts.push(productsp[j]);
          }
        } else {
          continue;
        }
      }
      var pimages = det3["images"];
      console.log(pimages);
      for (var x = 0; x < pimages.length; x++) {
        if (this.recommendedPImages.length !== 3) {
          for (var k = 0; k < pimages[x].length; k++) {
            if (pimages[x][k].ProductId !== this.props.productId) {
              if (pimages[x][k].name === "productImage1") {
                this.recommendedPImages.push(pimages[x][k].url);
              }
            }
          }
        } else {
          continue;
        }
      }
      this.setState({});
    }
  }

  async addToCartReady() {
    var map = {
      productName: this.product.name,
      productPrice: parseInt(this.product.price),
      productImage: this.product.productImage1,
      quantity: 1,
      productId: this.product.id,
    };

   trackFB('AddToCart', {
      content_category: this.product.category,
      content_ids: [this.product.id],
      content_type: 'product',
      currency: "INR",
      value: parseInt(this.product.price)
    })

    console.log(map);
    var made = await addToCart(map);
    if (made["success"]) {
      toast.success("Product added to cart");
      if (!made.message.includes("quantity")) {
        var cn = 0;
        if (getCookie("cartNumber") !== "") {
          cn = parseInt(getCookie("cartNumber"));
        }
        createCookie("cartNumber", cn + 1, 1);
        this.props.changeCartNumber();
      }
    } else {
      if (made.message === "Please Login for access this resource") {
        var cartList = [];
        var dimensions = [];
        var stocks = [];
        if (getCookie("cartList") != "") {
          cartList = JSON.parse(getCookie("cartList"));
          for (var x = 0; x < cartList.length; x++) {
            if (cartList[x].productId == this.product.id) {
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
            length: this.product.length,
            breadth: this.product.breadth,
            height: this.product.height,
            weight: this.product.weight,
          });
          stocks.push(this.product.stock);
          createCookie("cartList", JSON.stringify(cartList), 1);
          createCookie("dimensions", JSON.stringify(dimensions), 1);
          createCookie("stocks", JSON.stringify(stocks), 1);
          toast.success("Product added to cart.");
          var cn = 0;
          if (getCookie("cartNumber") !== "") {
            cn = parseInt(getCookie("cartNumber"));
          }
          createCookie("cartNumber", cn + 1, 1);
          this.props.changeCartNumber();
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
            length: this.product.length,
            breadth: this.product.breadth,
            height: this.product.height,
            weight: this.product.weight,
          });
          stocks.push(this.product.stock);
          createCookie("cartList", JSON.stringify(cartList), 1);
          createCookie("dimensions", JSON.stringify(dimensions), 1);
          createCookie("stocks", JSON.stringify(stocks), 1);
          toast.success("Product added to cart.");
          var cn = 0;
          if (getCookie("cartNumber") !== "") {
            cn = parseInt(getCookie("cartNumber"));
          }
          createCookie("cartNumber", cn + 1, 1);
          this.props.changeCartNumber();
        }
      } else {
        toast.error("Something went wrong");
      }
    }
  }

  addRating(number) {
    var stars = document.getElementsByClassName("new-star");
    for (var i = 0; i < stars.length; i++) {
      stars[i].classList.remove("checked");
    }
    for (var j = 0; j < number; j++) {
      stars[j].classList.add("checked");
    }

    this.rating = number;
  }

  addStar(number, id) {
    var row = [];
    if (number !== 5) {
      for (var i = 0; i < 5; i++) {
        if (i < number) {
          row.push(<AiFillStar className={`stars${id} checked`} />);
        } else {
          row.push(<AiFillStar className={`stars${id}`} />);
        }
      }
    } else {
      for (var i = 0; i < 6; i++) {
        row.push(<AiFillStar className={`stars${id} checked`} />);
      }
    }

    return row;
  }

  render() {
    return (
      <section className="product">
        <NavBar isLoggedIn={this.isLoggedIn} />
        <div className="product-head">
          <h2>Products</h2>
        </div>

        <div className="prow">
          <div className="prow-img-cont">
            <ImageGallery
              showFullscreenButton={false}
              showPlayButton={false}
              id="productMainImage"
              items={this.imagesToSlide}
            />
            <br />

            <div className="issue-span">
              <span>
                The colour and font on the product may differ due to print
                technicality issue
              </span>
            </div>
          </div>

          <div className="prdctinfo">
            <h1 className="prdctinfo-header">{this.product.name}</h1>
            <p className="prdctinfo-des">{this.product.label}</p>
            <p className="prdctinfo-span">{this.product.description}</p>
            <div className="tag-row-desk">
              {this.tags.map(function (item, i) {
                return (
                  <TagRow
                    key={i}
                    tagImage={item.tagImage}
                    productTagText={item.productTagText}
                  />
                );
              })}
            </div>

            <div className="priceandcart-desk">
              <p className="prdctPrice">Rs {this.product.price}</p>
              <button
                onClick={this.addToCartReady.bind(this)}
                className="prdctCartBtn"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        <div className="tag-row-mob">
          {this.tags.map(function (item, i) {
            return (
              <TagRow
                key={i}
                tagImage={item.tagImage}
                productTagText={item.productTagText}
              />
            );
          })}
        </div>

        <div className="priceandcart-mob">
          <p className="prdctPrice">Rs {this.product.price}</p>
          <button
            onClick={this.addToCartReady.bind(this)}
            className="prdctCartBtn"
          >
            Add to Cart
          </button>
        </div>

        <br />
        <center>
          <div className="product-det-section">
            <div className="pds-title-row">
              <span
                onClick={() => {
                  this.detpage = "facts";
                  this.setState({});
                  $(".factsline").css("background-color", "#777fa8");
                  $(".ingline").css("background-color", "transparent");
                  $(".htuline").css("background-color", "transparent");
                }}
                id="facts"
              >
                Facts
              </span>
              <span
                onClick={() => {
                  this.detpage = "ing";
                  this.setState({});
                  $(".factsline").css("background-color", "transparent");
                  $(".ingline").css("background-color", "#777fa8");
                  $(".htuline").css("background-color", "transparent");
                }}
                id="ing"
              >
                Ingredients
              </span>
              <span
                onClick={() => {
                  this.detpage = "htu";
                  this.setState({});
                  $(".factsline").css("background-color", "transparent");
                  $(".ingline").css("background-color", "transparent");
                  $(".htuline").css("background-color", "#777fa8");
                }}
                id="htu"
              >
                How to use
              </span>
            </div>
            <center>
              <div className="pds-line">
                <div className="factsline colored"></div>
                <div className="ingline"></div>
                <div className="htuline"></div>
              </div>
            </center>
            {this.detpage === "facts" ? (
              <Facts1
                name={this.product.name}
                whydoweneed={this.product.whydoweneed}
                benefits={this.product.benefits}
                plantExtracts={this.plantExtracts}
                scienceBacked={{
                  scienceBackedImage: this.product.scienceBackedImage1,
                  scienceBackedText: this.product.scienceBackedText,
                }}
              />
            ) : this.detpage === "ing" ? (
              <Ing1 ingredients={this.product.ingredients} />
            ) : (
              <Htu1 howtouse={this.product.howtouse} />
            )}
          </div>
        </center>
        <br />

        <div className="product-card-row">
          {this.recommendedProducts !== [] ? (
            this.recommendedProducts.map(
              function (item, i) {
                return (
                  <div className="productcard">
                    <Link
                      className="navlinks"
                      state={{
                        page: 1,
                      }}
                      to={"/product/" + item.id}
                    >
                      <div className="productcard-top">
                        <div className="productcard-header">
                          <img
                            src={this.recommendedPImages[i]}
                            alt="productImage"
                          />
                        </div>

                        <div className="productcard-det">
                          <h5>{item.name}</h5>
                          <span>Rs {item.price}</span>
                        </div>
                      </div>
                    </Link>
                    <div className="productcard-bottom">
                      <div
                        onClick={async function () {
                          var map = {
                            productName: item.name,
                            productPrice: parseInt(item.price),
                            productImage: this.recommendedPImages[i],
                            quantity: 1,
                            productId: item.id,
                          };
                          trackFB('AddToCart', {
                            content_category: item.category,
                            content_ids: [item.id],
                            content_type: 'product',
                            currency: "INR",
                            value: parseInt(item.price)
                          })
                          var made = await addToCart(map);
                          if (made["success"]) {
                            toast.success("Product added to cart");
                            if (!made.message.includes("quantity")) {
                              var cn = 0;
                              if (getCookie("cartNumber") !== "") {
                                cn = parseInt(getCookie("cartNumber"));
                              }
                              createCookie("cartNumber", cn + 1, 1);
                              this.props.changeCartNumber();
                            }
                          } else {
                            if (made.message === "Please Login for access this resource") {
                              var cartList = [];
                              var dimensions = [];
                              var stocks = [];
                              if (getCookie("cartList") != "") {
                                cartList = JSON.parse(getCookie("cartList"));
                                for (var x = 0; x < cartList.length; x++) {
                                  if (cartList[x].productId == item.id) {
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
                                  length: item.length,
                                  breadth: item.breadth,
                                  height: item.height,
                                  weight: item.weight,
                                });
                                stocks.push(item.stock);
                                createCookie("cartList", JSON.stringify(cartList), 1);
                                createCookie("dimensions", JSON.stringify(dimensions), 1);
                                createCookie("stocks", JSON.stringify(stocks), 1);
                                toast.success("Product added to cart.");
                                var cn = 0;
                                if (getCookie("cartNumber") !== "") {
                                  cn = parseInt(getCookie("cartNumber"));
                                }
                                createCookie("cartNumber", cn + 1, 1);
                                this.props.changeCartNumber();
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
                                  length: item.length,
                                  breadth: item.breadth,
                                  height: item.height,
                                  weight: item.weight,
                                });
                                stocks.push(item.stock);
                                createCookie("cartList", JSON.stringify(cartList), 1);
                                createCookie("dimensions", JSON.stringify(dimensions), 1);
                                createCookie("stocks", JSON.stringify(stocks), 1);
                                toast.success("Product added to cart.");
                                var cn = 0;
                                if (getCookie("cartNumber") !== "") {
                                  cn = parseInt(getCookie("cartNumber"));
                                }
                                createCookie("cartNumber", cn + 1, 1);
                                this.props.changeCartNumber();
                              }
                            } else {
                              toast.error("Something went wrong");
                            }
                          }
                        
                        }.bind(this)}
                        className="productcard-footer"
                      >
                        <span>Add to Cart</span>
                      </div>
                    </div>
                  </div>
                );
              }.bind(this)
            )
          ) : (
            <div></div>
          )}
        </div>

        <br />

        <div className="comments-section">
          <br />
          <h3>Comments</h3>
          <p>Latest comments by our customers</p>

          {this.comments.length !== 0 ? (
            this.comments.map(
              function (item, i) {
                var date = item.updatedAt.slice(0, 10);
                if (item.userid === this.user.id) {
                  this.isAlreadyCommented = true;
                  this.setState({});
                }
                return (
                  <div key={i}>
                    <div className="comment-box">
                      <div className="comment-box-head">
                        <div className="com-profile-img">
                          <img
                            src={public_url + "userp.png"}
                            alt="User_Profile"
                          />
                        </div>
                        <div className="com-profile-name">
                          <h5>{item.name}</h5>
                          <h6>{date}</h6>
                        </div>
                      </div>
                      <div className="comment-box-det">
                        <p>{item.comment}</p>
                      </div>
                      <div className="review-cont">
                        {this.addStar(item.rating, item.id)}
                      </div>
                    </div>
                    <div className="comment-line"></div>
                  </div>
                );
              }.bind(this)
            )
          ) : (
            <div>
              <p>
                {this.isLoggedIn
                  ? "Be first to post comment on this product"
                  : "Log In to post comment"}
              </p>
            </div>
          )}

          {/* New Comment */}
          {this.isLoggedIn ? (
            <div>
              <div className="new-comment-cont">
                <div className="com-profile-img">
                  <img src={public_url + "userp.png"} alt="User_Profile" />
                </div>
                <div className="com-profile-name">
                  <h5>{this.user.name}</h5>
                </div>
              </div>
              <div className="new-review-cont">
                <AiFillStar
                  onClick={() => {
                    this.addRating(1);
                  }}
                  className="new-star ns1"
                />
                <AiFillStar
                  onClick={() => {
                    this.addRating(2);
                  }}
                  className="new-star ns2"
                />
                <AiFillStar
                  onClick={() => {
                    this.addRating(3);
                  }}
                  className="new-star ns3"
                />
                <AiFillStar
                  onClick={() => {
                    this.addRating(4);
                  }}
                  className="new-star ns4"
                />
                <AiFillStar
                  onClick={() => {
                    this.addRating(5);
                  }}
                  className="new-star ns5"
                />
              </div>

              <div className="commnew">
                <div className="new-comment-box">
                  <textarea
                    placeholder={
                      this.isAlreadyCommented
                        ? "Update your thoughts"
                        : "Post your thoughts"
                    }
                    name="newcomment"
                    id="newcomment"
                    rows="8"
                  ></textarea>
                  <br />
                </div>
                <button
                  onClick={async function () {
                    var comment = document.getElementById("newcomment").value;
                    var rating = this.rating;
                    var made = await createReview(
                      this.product.id,
                      comment,
                      rating
                    );
                    if (made["success"]) {
                      var urevs = made["updatedReviews"];
                      this.comments = urevs;
                      document.getElementById("newcomment").value = "";
                      this.rating = 0;
                      var stars = document.getElementsByClassName("new-star");
                      for (var i = 0; i < stars.length; i++) {
                        stars[i].classList.remove("checked");
                      }
                      this.setState({});
                      toast.success("Comment posted successfully");
                    } else {
                      toast.error("Something went wrong");
                      document.getElementById("newcomment").value = "";
                      this.rating = 0;
                      var stars = document.getElementsByClassName("new-star");
                      for (var i = 0; i < stars.length; i++) {
                        stars[i].classList.remove("checked");
                      }
                      this.setState({});
                    }
                  }.bind(this)}
                  id="newcommpost"
                >
                  {this.isAlreadyCommented ? "Update" : "Post"}
                </button>
                <br />
                <br />
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </section>
    );
  }
}

const TagRow = (props) => {
  return (
    <div className="tag">
      <img src={props.tagImage} alt="TagImage" />
      <p>{props.productTagText}</p>
    </div>
  );
};

export default Product;

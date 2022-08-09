import { Component } from "react";
import $ from "jquery";
import { AiFillStar } from "react-icons/ai";
import queryString from "query-string";
import { NavLink, useParams } from "react-router-dom";
import Facts1 from "../../product/facts1";
import Ing1 from "../../product/ing1";
import Htu1 from "../../product/htu1";
import { IoMdArrowRoundBack } from "react-icons/io";
import { getUserDetail } from "../../../js/auth";
import NavBar from "../../../components/NavBar";
import { updateProductDet } from "../../../js/adminAuth";

class AdminProductDet extends Component {
  constructor(props) {
    super(props);
    this.detpage = "facts";
    this.isLoggedIn = false;
    this.product = {};
    this.toUpdate = {};
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
    return (
      <section className="product">
        <button
          onClick={async () => {
            var made = null;
            made = await updateProductDet(this.toUpdate, "123");
            if (made) {
            } else {
            }
          }}
          className="s_update_button"
        >
          Update ({Object.keys(this.toUpdate).length})
        </button>
        <div className="admin-prow">
          <input
            onChange={() => {
              var image_input = document.getElementById("admin_pimage_upload");
              var upload_image = "";
              const reader = new FileReader();
              reader.addEventListener("load", () => {
                upload_image = reader.result;
                document.getElementById("admin-ping-img").src = upload_image;
              });
              reader.readAsDataURL(image_input.files[0]);
              this.toUpdate['main_image'] = image_input.files[0];
              this.setState({});
            }}
            type="file"
            style={{ display: "none" }}
            name="admin_pimage_upload"
            id="admin_pimage_upload"
          />
          <div className="admin-pimg-cont">
            <img
              id="admin-ping-img"
              onClick={() => {
                document.getElementById("admin_pimage_upload").click();
              }}
              src={process.env.PUBLIC_URL + "products/serum.JPG"}
              alt="ss"
            />
          </div>
          <div className="admin-prdctinfo">
            <h1 className="admin-prdctinfo-header">GLOW RESTORE SERUM</h1>
            <p className="admin-prdctinfo-des">
              Reduces Hyperpigmentation & Brightens Dull Skin. Protects skin
              barrier.
            </p>
            <p className="admin-prdctinfo-span">
              A lightweight serum containing plant extracts ( watermelon,
              licorice root, Kakadu plum), ceramide, niacinamide, alpha arbutin,
              vitamin c derivative and acetyl glucosamine that helps to restore
              the skin's natural glow and reduces the appearance of
              hyperpigmentation, uneven skin tone, dark spots, fine lines and
              acne marks without irritating the skin's natural barrier.
            </p>
            <div className="admin-tag-row-desk">
              <div className="admin-tag">
                <img src={process.env.PUBLIC_URL + "cruelty.png"} alt="" />
                <p>Science-Backed</p>
              </div>

              <div className="admin-tag">
                <img src={process.env.PUBLIC_URL + "cruelty.png"} alt="" />
                <p>Non-Spriting</p>
              </div>

              <div className="admin-tag">
                <img src={process.env.PUBLIC_URL + "cruelty.png"} alt="" />
                <p>Cruelty Free</p>
              </div>

              <div className="admin-tag">
                <img src={process.env.PUBLIC_URL + "cruelty.png"} alt="" />
                <p>Plant Extracts and Vegan</p>
              </div>
            </div>

            <div className="admin-priceandcart-desk">
              <p className="prdctPrice">Rs 550</p>
            </div>
          </div>
        </div>
        <div className="admin-tag-row-mob">
          <div className="admin-tag">
            <img src={process.env.PUBLIC_URL + "cruelty.png"} alt="" />
            <p>Science-Backed</p>
          </div>

          <div className="admin-tag">
            <img src={process.env.PUBLIC_URL + "cruelty.png"} alt="" />
            <p>Non-Spriting</p>
          </div>

          <div className="admin-tag">
            <img src={process.env.PUBLIC_URL + "cruelty.png"} alt="" />
            <p>Cruelty Free</p>
          </div>

          <div className="admin-tag">
            <img src={process.env.PUBLIC_URL + "cruelty.png"} alt="" />
            <p>Plant Extracts and Vegan</p>
          </div>
        </div>
        <div className="admin-priceandcart-mob">
          <p className="prdctPrice">Rs 550</p>
        </div>
        <br />
        <center>
          <div className="admin-product-det-section">
            <div className="admin-pds-title-row">
              <span id="facts">Facts</span>
              <span id="ing">Ingredients</span>
              <span id="htu">How to use</span>
            </div>
            <center>
              <div className="admin-pds-line">
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
        admin-
        <br />
        <div className="admin-comments-section">
          <br />
          <h3>Comments</h3>
          <p>Latest comments by our customers</p>
          <div className="admin-comment-box">
            <div className="admin-comment-box-head">
              <div className="admin-com-profile-img"></div>
              <div className="admin-com-profile-name">
                <h5>Ali</h5>
                <h6>April 1 2022</h6>
              </div>
            </div>
            <div className="admin-comment-box-det">
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque,
                aliquid distinctio sed perspiciatis ratione quisquam iste est
                mollitia, assumenda impedit pariatur similique accusantium
                libero, soluta obcaecati eum sapiente harum ab.
              </p>
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

          <div className="admin-comment-box">
            <div className="admin-comment-box-head">
              <div className="admin-com-profile-img"></div>
              <div className="admin-com-profile-name">
                <h5>Ali</h5>
                <h6>April 1 2022</h6>
              </div>
            </div>
            <div className="admin-comment-box-det">
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque,
                aliquid distinctio sed perspiciatis ratione quisquam iste est
                mollitia, assumenda impedit pariatur similique accusantium
                libero, soluta obcaecati eum sapiente harum ab.
              </p>
            </div>
            <div className="admin-review-cont">
              <AiFillStar className="admin-star checked" />
              <AiFillStar className="admin-star checked" />
              <AiFillStar className="admin-star" />
              <AiFillStar className="admin-star" />
              <AiFillStar className="admin-star" />
            </div>
          </div>
          <div className="comment-line"></div>

          <div className="admin-comment-box">
            <div className="admin-comment-box-head">
              <div className="admin-com-profile-img"></div>
              <div className="admin-com-profile-name">
                <h5>Ali</h5>
                <h6>April 1 2022</h6>
              </div>
            </div>
            <div className="admin-comment-box-det">
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque,
                aliquid distinctio sed perspiciatis ratione quisquam iste est
                mollitia, assumenda impedit pariatur similique accusantium
                libero, soluta obcaecati eum sapiente harum ab.
              </p>
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

          <div className="admin-comment-box">
            <div className="admin-comment-box-head">
              <div className="admin-com-profile-img"></div>
              <div className="admin-com-profile-name">
                <h5>Ali</h5>
                <h6>April 1 2022</h6>
              </div>
            </div>
            <div className="admin-comment-box-det">
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque,
                aliquid distinctio sed perspiciatis ratione quisquam iste est
                mollitia, assumenda impedit pariatur similique accusantium
                libero, soluta obcaecati eum sapiente harum ab.
              </p>
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
    );
  }
}

export default AdminProductDet;

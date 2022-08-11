import { Component } from "react";
import { updateProduct } from "../../../js/adminProduct";

class AdminProductEdit extends Component {
  constructor(props) {
    super(props);
    this.thingsToUpdate = {};
  }

  updateProductsReady() {
    updateProduct(this.thingsToUpdate, '123');
  }

  render() {
    return (
      <div className="adminProductEdit">
        <br />
        <p>Product Image: </p>

        <input
          style={{ display: "none" }}
          onChange={() => {
            const input = document.getElementById("pimginput");
            var upload_image = "";

            const reader = new FileReader();
            reader.addEventListener("load", () => {
              upload_image = reader.result;
              document.getElementById("adminPimgEdit").src = upload_image;
            });
            reader.readAsDataURL(input.files[0]);
            this.thingsToUpdate.productImage1 = input.files[0];
            // this.setState({});
          }}
          type="file"
          name="pimginput"
          id="pimginput"
        />

        <div
          onClick={() => {
            document.getElementById("pimginput").click();
          }}
          className="ad-edit-img-cont"
        >
          <img
            id="adminPimgEdit"
            src={process.env.PUBLIC_URL + "products/serum.JPG"}
            alt="product_image"
          />
        </div>
        <br />
        <br />
        <p>Product Name: </p>
        <input
          type="text"
          name="adpname"
          id="adpname"
          defaultValue='GLOW RESTORE SERUM'
          onChange={() => {
            this.thingsToUpdate.name = document.getElementById('adpname').value;
            // this.setState({});
          }}
        />
        <br />
        <br />
        <p>Product Label: </p>
        <textarea
          name="adplabel"
          id="adplabel"
          cols="30"
          rows="10"
          onChange={() => {
            this.thingsToUpdate.label = document.getElementById('adplabel').value;
            // this.setState({});
          }}
          defaultValue={
            "Reduces Hyperpigmentation & Brightens Dull Skin. Protects skin barrier."
          }
        />
        <br />
        <br />
        <p>Product Description: </p>
        <textarea
          name="adpdes"
          id="adpdes"
          cols="30"
          rows="10"
          onChange={() => {
            this.thingsToUpdate.des = document.getElementById('adpdes').value;
            // this.setState({});
          }}
          defaultValue={
            "A lightweight serum containing plant extracts ( watermelon, licorice root, Kakadu plum), ceramide, niacinamide, alpha arbutin, vitamin c derivative and acetyl glucosamine that helps to restore the skin's natural glow and reduces the appearance of hyperpigmentation, uneven skin tone, dark spots, fine lines and acne marks without irritating the skin's natural barrier."
          }
        />
        <br />
        <br />
        <p>Product Price: </p>
        <input
          type="number"
          onChange={() => {
            this.thingsToUpdate.price = document.getElementById('adpprice').value;
            // this.setState({});
          }}
          name="adpprice"
          defaultValue="550"
          id="adpprice"
        />
        <br />
        <br />
        <p>Product Stock: </p>
        <input
          type="number"
          onChange={() => {
            this.thingsToUpdate.stock = document.getElementById('adpstock').value;
            // this.setState({});
          }}
          name="adpstock"
          defaultValue="40"
          id="adpstock"
        />
        <br />
        <br />
        <p>Product Category: </p>
        <input
          type="text"
          name="adpcat"
          onChange={() => {
            this.thingsToUpdate.category = document.getElementById('adpcat').value;
            // this.setState({});
          }}
          defaultValue="Moisturizer"
          id="adpcat"
        />

        <br />
        <br />
        <p>Product Tags (Add upto 4 tags): </p>
        <div className="product-tag-img-cont">
          <div className="product-tag-edit">
            <img
              id="product-tag-edit-image1"
              onClick={() => {
                document.getElementById("producttag1").click();
              }}
              src={process.env.PUBLIC_URL + "vegan.png"}
              alt=""
            />{" "}
            <br />
            <input
              onChange={() => {
                var input = document.getElementById("producttag1");
                var upload_image = "";
                const reader = new FileReader();
                reader.addEventListener("load", () => {
                  upload_image = reader.result;
                  document.getElementById("product-tag-edit-image1").src =
                    upload_image;
                 
                });
                reader.readAsDataURL(input.files[0]);
                this.thingsToUpdate.tagImage1 = input.files[0];
                // this.setState({});
              }}
              type="file"
              accept="image/*"
              className="producttagimg"
              name="producttag1"
              id="producttag1"
            />
            <input
              type="text"
              className="producttagspan"
              name="producttagspan1"
              onChange={() => {
                this.thingsToUpdate.tags1 = document.getElementById('producttagspan1').value;
                // this.setState({});
              }}
              id="producttagspan1"
              defaultValue="Science Backed"
            />
          </div>

          <div className="product-tag-edit">
            <img
              id="product-tag-edit-image2"
              onClick={() => {
                document.getElementById("producttag2").click();
              }}
              src={process.env.PUBLIC_URL + "vegan.png"}
              alt=""
            />{" "}
            <br />
            <input
              onChange={() => {
                var input = document.getElementById("producttag2");
                var upload_image = "";
                const reader = new FileReader();
                reader.addEventListener("load", () => {
                  upload_image = reader.result;
                  document.getElementById("product-tag-edit-image2").src =
                    upload_image;
                });
                reader.readAsDataURL(input.files[0]);
                this.thingsToUpdate.tagImage2 = input.files[0];
              }}
              type="file"
              accept="image/*"
              className="producttagimg"
              name="producttag2"
              id="producttag2"
            />
            <input
              type="text"
              className="producttagspan"
              name="producttagspan2"
              id="producttagspan2"
              onChange={() => {
                this.thingsToUpdate.tags2 = document.getElementById('producttagspan2').value;;
                // this.setState({});
              }}
              defaultValue="Science Backed"
            />
          </div>

          <div className="product-tag-edit">
            <img
              id="product-tag-edit-image3"
              onClick={() => {
                document.getElementById("producttag3").click();
              }}
              src={process.env.PUBLIC_URL + "vegan.png"}
              alt=""
            />{" "}
            <br />
            <input
              onChange={() => {
                var input = document.getElementById("producttag3");
                var upload_image = "";
                const reader = new FileReader();
                reader.addEventListener("load", () => {
                  upload_image = reader.result;
                  document.getElementById("product-tag-edit-image3").src =
                    upload_image;
                });
                reader.readAsDataURL(input.files[0]);
                this.thingsToUpdate.tagImage3 = input.files[0];
              }}
              type="file"
              accept="image/*"
              className="producttagimg"
              name="producttag3"
              id="producttag3"
            />
            <input
              type="text"
              className="producttagspan"
              name="producttagspan3"
              onChange={() => {
                this.thingsToUpdate.tags3 = document.getElementById('producttagspan3').value;;
                // this.setState({});
              }}
              id="producttagspan3"
              defaultValue="Science Backed"
            />
          </div>

          <div className="product-tag-edit">
            <img
              id="product-tag-edit-image4"
              onClick={() => {
                document.getElementById("producttag4").click();
              }}
              src={process.env.PUBLIC_URL + "vegan.png"}
              alt=""
            />{" "}
            <br />
            <input
              onChange={() => {
                var input = document.getElementById("producttag4");
                var upload_image = "";
                const reader = new FileReader();
                reader.addEventListener("load", () => {
                  upload_image = reader.result;
                  document.getElementById("product-tag-edit-image4").src =
                    upload_image;
                });
                reader.readAsDataURL(input.files[0]);
                this.thingsToUpdate.tagImage4 = input.files[0];
              }}
              type="file"
              accept="image/*"
              className="producttagimg"
              name="producttag4"
              id="producttag4"
            />
            <input
              type="text"
              className="producttagspan"
              name="producttagspan4"
              onChange={() => {
                this.thingsToUpdate.tag4 = document.getElementById('producttagspan4').value;
                // this.setState({});
              }}
              id="producttagspan4"
              defaultValue="Science Backed"
            />
          </div>
        </div>
        <br />
        <br />
        <p>
          <strong>Product Facts</strong>
        </p>
        <p>Why do we need: </p>
        <textarea
          type="text"
          name="adpwhydoweneed"
          onChange={() => {
            this.thingsToUpdate.whydowe = document.getElementById('adpwhydoweneed').value;
            // this.setState({});
          }}
          defaultValue="The job of three serums in one.
          1. Vitamin C derivative (Tetrahexyldecyl Ascorbate)
          2. Niacinamide
          3. Alpha Arbutin
          A power packed formulation of plant extracts and science backed ingredients."
          id="adpwhydoweneed"
        />

        <br />
        <br />
        <p>Benefits: </p>
        <input
          type="text"
          name="adpbenefits"
          onChange={() => {
            this.thingsToUpdate.benefits = document.getElementById('adpbenefits').value;
            // this.setState({});
          }}
          defaultValue="Regulate oil/sebum, Skin Brightening, Rich in antioxidants- protects from pollution and sun exposure, Soothing"
          id="adpbenefits"
        />

        <br />
        <br />
        <p>Plant Extracts: </p>
        <div className="plantext-img-cont">
          <div className="plantext-edit">
            <img
              id="plantext-edit-image1"
              onClick={() => {
                document.getElementById("plantext1").click();
              }}
              src={process.env.PUBLIC_URL + "vegan.png"}
              alt=""
            />{" "}
            <br />
            <input
              onChange={() => {
                var input = document.getElementById("plantext1");
                var upload_image = "";
                const reader = new FileReader();
                reader.addEventListener("load", () => {
                  upload_image = reader.result;
                  document.getElementById("plantext-edit-image1").src =
                    upload_image;
                });
                reader.readAsDataURL(input.files[0]);
                this.thingsToUpdate.plantExtractsImage1 = input.files[0];
              }}
              type="file"
              accept="image/*"
              className="plantextimg"
              name="plantext1"
              id="plantext1"
            />
            <input
              type="text"
              className="plantextspan"
              name="plantextspan1"
              onChange={() => {
                this.thingsToUpdate.plantextstitle1 = document.getElementById('plantextspan1').value;
                // this.setState({});
              }}
              id="plantextspan1"
              defaultValue="Science Backed"
            />
            <br />
            <input
              type="text"
              className="plansubtextspan"
              name="plansubtextspan1"
              onChange={() => {
                this.thingsToUpdate.plantextssubtitle1 = document.getElementById('plansubtextspan1').value;;
                // this.setState({});
              }}
              id="plansubtextspan1"
              defaultValue="Science Backed"
            />
          </div>

          <div className="plantext-edit">
            <img
              id="plantext-edit-image2"
              onClick={() => {
                document.getElementById("plantext2").click();
              }}
              src={process.env.PUBLIC_URL + "vegan.png"}
              alt=""
            />{" "}
            <br />
            <input
              onChange={() => {
                var input = document.getElementById("plantext2");
                var upload_image = "";
                const reader = new FileReader();
                reader.addEventListener("load", () => {
                  upload_image = reader.result;
                  document.getElementById("plantext-edit-image2").src =
                    upload_image;
                });
                reader.readAsDataURL(input.files[0]);
                this.thingsToUpdate.plantExtractsImage2 = input.files[0];
              }}
              type="file"
              accept="image/*"
              className="plantextimg"
              name="plantext2"
              id="plantext2"
            />
            <input
              type="text"
              className="plantextspan"
              name="plantextspan2"
              onChange={() => {
                this.thingsToUpdate.plantextstitle2 = document.getElementById('plantextspan2').value;
                // this.setState({});
              }}
              id="plantextspan2"
              defaultValue="Science Backed"
            />
            <br />
            <input
              type="text"
              className="plansubtextspan"
              name="plansubtextspan2"
              onChange={() => {
                this.thingsToUpdate.plantextssubtitle2 = document.getElementById('plansubtextspan2').value;
                // this.setState({});
              }}
              id="plansubtextspan2"
              defaultValue="Science Backed"
            />
          </div>

          <div className="plantext-edit">
            <img
              id="plantext-edit-image3"
              onClick={() => {
                document.getElementById("plantext3").click();
              }}
              src={process.env.PUBLIC_URL + "vegan.png"}
              alt=""
            />{" "}
            <br />
            <input
              onChange={() => {
                var input = document.getElementById("plantext3");
                var upload_image = "";
                const reader = new FileReader();
                reader.addEventListener("load", () => {
                  upload_image = reader.result;
                  document.getElementById("plantext-edit-image3").src =
                    upload_image;
                });
                reader.readAsDataURL(input.files[0]);
                this.thingsToUpdate.plantExtractsImage3 = input.files[0];
              }}
              type="file"
              accept="image/*"
              className="plantextimg"
              name="plantext3"
              id="plantext3"
            />
            <input
              type="text"
              className="plantextspan"
              name="plantextspan3"
              onChange={() => {
                this.thingsToUpdate.plantextstitle3 = document.getElementById('plantextspan3').value;
                // this.setState({});
              }}
              id="plantextspan3"
              defaultValue="Science Backed"
            />
            <br />
            <input
              type="text"
              className="plansubtextspan"
              onChange={() => {
                this.thingsToUpdate.plantextssubtitle3 = document.getElementById('plansubtextspan3').value;
                // this.setState({});
              }}
              name="plansubtextspan3"
              id="plansubtextspan3"
              defaultValue="Science Backed"
            />
          </div>

          <div className="plantext-edit">
            <img
              id="plantext-edit-image4"
              onClick={() => {
                document.getElementById("plantext4").click();
              }}
              src={process.env.PUBLIC_URL + "vegan.png"}
              alt=""
            />{" "}
            <br />
            <input
              onChange={() => {
                var input = document.getElementById("plantext4");
                var upload_image = "";
                const reader = new FileReader();
                reader.addEventListener("load", () => {
                  upload_image = reader.result;
                  document.getElementById("plantext-edit-image4").src =
                    upload_image;
                });
                reader.readAsDataURL(input.files[0]);
                this.thingsToUpdate.plantExtractsImage4 = input.files[0];
              }}
              type="file"
              accept="image/*"
              className="plantextimg"
              name="plantext4"
              id="plantext4"
            />
            <input
              type="text"
              className="plantextspan"
              name="plantextspan4"
              onChange={() => {
                this.thingsToUpdate.plantextstitle4 =  document.getElementById('plantextspan4').value;
                // this.setState({});
              }}
              id="plantextspan4"
              defaultValue="Science Backed"
            />
            <br />
            <input
              type="text"
              className="plansubtextspan"
              onChange={() => {
                this.thingsToUpdate.plantextssubtitle4 = document.getElementById('plansubtextspan4').value;
                // this.setState({});
              }}
              name="plansubtextspan4"
              id="plansubtextspan4"
              defaultValue="Science Backed"
            />
          </div>
        </div>

        <br />
        <br />
        <p>Science-Backed Ingredients: </p>

        <div className="scienceb_img_cont">
          <img
            id="scienceb_img"
            onClick={() => {
              document.getElementById("sciencebimginput").click();
            }}
            src={process.env.PUBLIC_URL + "serumback.jpg"}
            alt=""
          />{" "}
          <br />
          <input
            onChange={() => {
              var input = document.getElementById("sciencebimginput");
              var upload_image = "";
              const reader = new FileReader();
              reader.addEventListener("load", () => {
                upload_image = reader.result;
                document.getElementById("scienceb_img").src = upload_image;
                
              });
              reader.readAsDataURL(input.files[0]);
              this.thingsToUpdate.scienceBackedImage1 = input.files[0];
            }}
            type="file"
            accept="image/*"
            name="sciencebimginput"
            id="sciencebimginput"
          />
        </div>
        <textarea
          defaultValue="Niacinamide:
Anti-acne and brightening
Vitamin C derivative (Tetrahexyldecyl Ascorbate):
Antioxidant and brightening
Alpha Arbutin:
Brightening
Ceramide:
Skin-repairing
Vitamin B5 (Panthenol):
Hydrating and soothing
Beta-Glucan:
Intensive skin repair"
          onChange={() => {
            this.thingsToUpdate.science_backed = document.getElementById('scienceb_text').value;
            // this.setState({});
          }}
          name="scienceb_text"
          id="scienceb_text"
          type="text"
        />

        <br />
        <br />
        <p>
          <strong>Ingredients: </strong>
        </p>
        <textarea
          defaultValue="Aqua, Niacinamide, Dicaprylyl Carbonate, Propylene glycol, Bambusa Vulgaris(Bamboo) Water, Tetrahexyldecyl Ascorbate(Vitamin-C), Alpha Arbutin, Zinc PCA, Polyglyceryl-4 Caprate, Polyglyceryl-6 Caprylate, Citrullus Lanatus(Watermelon) Fruit Extract, Glycyrrhiza Glabra(Licorice) Root Extract, Laminaria Algae Extract, Terminalia Ferdinandiana(Kakadu Plum) Fruit Extract, Glycerin, Beta Glucan, D-Panthenol, Sodium PCA, Ceramide NP, Ceramide AP, Ceramide EOP, Phytosphingosine, Cholesterol, Phenoxyethanol, Dehydroxanthan Gum, Sodium Lauroyl Lactylate, Carbomer, Xanthan Gum, Triethylene Glycol"
          name="ingredients"
          id="ingredients"
          onChange={() => {
            this.thingsToUpdate.ingredients = document.getElementById('ingredients').value;
          }}
          cols="30"
          rows="10"
        ></textarea>

        <br />
        <br />
        <p>
          <strong>How to use: </strong>
        </p>
        <textarea
          defaultValue="Le's get on the second step of your skincare routine.
Step 1:
Take 2-3 drops.

Step 2:
Apply on clean skin.

Step 3:
Don’t skip the next stage, the moisturizer.

Use it once in the morning and once in the night for faster results."
          name="howtouse"
          id="howtouse"
          onChange={() => {
            this.thingsToUpdate.howtouse = document.getElementById('howtouse').value;
            // this.setState({});
          }}
          type="text"
        />

        <button onClick={()=>{
          this.updateProductsReady()
        }} className="s_update_button">Update</button>
      </div>
    );
  }
}

export default AdminProductEdit;

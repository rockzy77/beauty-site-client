import { Component } from "react";
import { updateProduct } from "../../../js/adminProduct";
import public_url from "../../../js/publicurl";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useParams } from "react-router-dom";
import { getSingleProduct } from "../../../js/products";

const AdminProductEdit = () => {
  const { pid } = useParams();
  return <AdminProductEditPanel pid={pid} />;
};

class AdminProductEditPanel extends Component {
  constructor(props) {
    super(props);
    this.thingsToUpdate = {};
    this.product = {};
  }

  async updateProductsReady() {
    console.log(this.thingsToUpdate)
    var made = await updateProduct(this.thingsToUpdate, this.props.pid);
    if(made['success']){
      alert('Product info updated successfully.')
    }
    else{
      alert(made['message'])
    }
  }

  async componentDidMount() {
    var det = await getSingleProduct(this.props.pid);
    if (det["success"]) {
      var product = det["product"];
      this.product = product;
      var images = det["images"];
      for (var i = 0; i < images.length; i++) {
        var mkey = images[i].name;
        this.product[mkey] = images[i]["url"];
      }
    }
    this.setState({});
  }

  render() {
    return (
      <div className="adminProductEdit">
        <div className="s_mini_nav">
          <h6>Edit Product</h6>
        </div>
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
            this.thingsToUpdate.isProductImage1 = true;
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
            src={this.product.productImage1}
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
          defaultValue={this.product.name}
          onChange={() => {
            this.thingsToUpdate.name = document.getElementById("adpname").value;
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
            this.thingsToUpdate.label =
              document.getElementById("adplabel").value;
            // this.setState({});
          }}
          defaultValue={this.product.label}
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
            this.thingsToUpdate.description = document.getElementById("adpdes").value;
            // this.setState({});
          }}
          defaultValue={this.product.description}
        />
        <br />
        <br />
        <p>Product Price: </p>
        <input
          type="number"
          onChange={() => {
            this.thingsToUpdate.price =
              document.getElementById("adpprice").value;
            // this.setState({});
          }}
          name="adpprice"
          defaultValue={this.product.price}
          id="adpprice"
        />
        <br />
        <br />
        <p>Product Stock: </p>
        <input
          type="number"
          onChange={() => {
            this.thingsToUpdate.stock =
              document.getElementById("adpstock").value;
            // this.setState({});
          }}
          name="adpstock"
          defaultValue={this.product.stock}
          id="adpstock"
        />
        <br />
        <br />
        <p>Product Category: </p>
        <input
          type="text"
          name="adpcat"
          onChange={() => {
            this.thingsToUpdate.category =
              document.getElementById("adpcat").value;
            // this.setState({});
          }}
          defaultValue={this.product.category}
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
              src={
                this.product.tagImage1 != null
                  ? this.product.tagImage1
                  : public_url + "addImage.png"
              }
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
                this.thingsToUpdate.isTagImage1 = true;
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
              placeholder="Add Tag"
              onChange={() => {
                this.thingsToUpdate.productTagText1 =
                  document.getElementById("producttagspan1").value;
                console.log(this.thingsToUpdate)
              }}
              id="producttagspan1"
              defaultValue={
                this.product.productTagText1 != null
                  ? this.product.productTagText1
                  : ""
              }
            />
          </div>

          <div className="product-tag-edit">
            <img
              id="product-tag-edit-image2"
              onClick={() => {
                document.getElementById("producttag2").click();
              }}
              src={
                this.product.tagImage2 != null
                  ? this.product.tagImage2
                  : public_url + "addImage.png"
              }
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
                this.thingsToUpdate.isTagImage2 = true;
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
              placeholder="Add Tag"
              onChange={() => {
                this.thingsToUpdate.productTagText2 =
                  document.getElementById("producttagspan2").value;
                // this.setState({});
              }}
              defaultValue={
                this.product.productTagText2 != null
                  ? this.product.productTagText2
                  : ""
              }
            />
          </div>

          <div className="product-tag-edit">
            <img
              id="product-tag-edit-image3"
              onClick={() => {
                document.getElementById("producttag3").click();
              }}
              src={
                this.product.tagImage3 != null
                  ? this.product.tagImage3
                  : public_url + "addImage.png"
              }
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
                this.thingsToUpdate.isTagImage3 = true;
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
              placeholder="Add Tag"
              onChange={() => {
                this.thingsToUpdate.productTagText3 =
                  document.getElementById("producttagspan3").value;
                // this.setState({});
              }}
              id="producttagspan3"
              defaultValue={
                this.product.productTagText3 != null
                  ? this.product.productTagText3
                  : ""
              }
            />
          </div>

          <div className="product-tag-edit">
            <img
              id="product-tag-edit-image4"
              onClick={() => {
                document.getElementById("producttag4").click();
              }}
              src={
                this.product.tagImage4 != null
                  ? this.product.tagImage4
                  : public_url + "addImage.png"
              }
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
                this.thingsToUpdate.isTagImage4 = true;
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
              placeholder="Add Tag"
              name="producttagspan4"
              onChange={() => {
                this.thingsToUpdate.productTagText4 =
                  document.getElementById("producttagspan4").value;
                // this.setState({});
              }}
              id="producttagspan4"
              defaultValue={
                this.product.productTagText4 != null
                  ? this.product.productTagText4
                  : ""
              }
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
            this.thingsToUpdate.whydoweneed =
              document.getElementById("adpwhydoweneed").value;
            // this.setState({});
          }}
          defaultValue={
            this.product.whydoweneed != null ? this.product.whydoweneed : ""
          }
          id="adpwhydoweneed"
        />

        <br />
        <br />
        <p>Benefits: </p>
        <input
          type="text"
          name="adpbenefits"
          onChange={() => {
            this.thingsToUpdate.benefits =
              document.getElementById("adpbenefits").value;
            // this.setState({});
          }}
          defaultValue={
            this.product.benefits != null ? this.product.benefits : ""
          }
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
              src={
                this.product.plantExtractsImage1 != null
                  ? this.product.plantExtractsImage1
                  : public_url + "addImage.png"
              }
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
                this.thingsToUpdate.isPlantExtractsImage1 = true;
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
              placeholder="Add text"
              onChange={() => {
                this.thingsToUpdate.plantExtractsText1 =
                  document.getElementById("plantextspan1").value;
                // this.setState({});
              }}
              id="plantextspan1"
              defaultValue={
                this.product.plantExtractsText1 != null
                  ? this.product.plantExtractsText1
                  : ""
              }
            />
            <br />
            <input
              type="text"
              className="plansubtextspan"
              placeholder="Add subtext"
              name="plansubtextspan1"
              onChange={() => {
                this.thingsToUpdate.plantExtractsSubText1 =
                  document.getElementById("plansubtextspan1").value;
                // this.setState({});
              }}
              id="plansubtextspan1"
              defaultValue={
                this.product.plantExtractsSubText1 != null
                  ? this.product.plantExtractsSubText1
                  : ""
              }
            />
          </div>

          <div className="plantext-edit">
            <img
              id="plantext-edit-image2"
              onClick={() => {
                document.getElementById("plantext2").click();
              }}
              src={
                this.product.plantExtractsImage2 != null
                  ? this.product.plantExtractsImage2
                  : public_url + "addImage.png"
              }
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
                this.thingsToUpdate.isPlantExtractsImage2 = true;
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
              placeholder="Add text"
              onChange={() => {
                this.thingsToUpdate.plantExtractsText2 =
                  document.getElementById("plantextspan2").value;
                // this.setState({});
              }}
              id="plantextspan2"
              defaultValue={
                this.product.plantExtractsText2 != null
                  ? this.product.plantExtractsText2
                  : ""
              }
            />
            <br />
            <input
              type="text"
              className="plansubtextspan"
              name="plansubtextspan2"
              placeholder="Add subtext"
              onChange={() => {
                this.thingsToUpdate.plantExtractsSubText2 =
                  document.getElementById("plansubtextspan2").value;
                // this.setState({});
              }}
              id="plansubtextspan2"
              defaultValue={
                this.product.plantExtractsSubText2 != null
                  ? this.product.plantExtractsSubText2
                  : ""
              }
            />
          </div>

          <div className="plantext-edit">
            <img
              id="plantext-edit-image3"
              onClick={() => {
                document.getElementById("plantext3").click();
              }}
              src={
                this.product.plantExtractsImage3 != null
                  ? this.product.plantExtractsImage3
                  : public_url + "addImage.png"
              }
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
                this.thingsToUpdate.isPlantExtractsImage3 = true;
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
              placeholder="Add text"
              onChange={() => {
                this.thingsToUpdate.plantExtractsText3 =
                  document.getElementById("plantextspan3").value;
                // this.setState({});
              }}
              id="plantextspan3"
              defaultValue={
                this.product.plantExtractsText3 != null
                  ? this.product.plantExtractsText3
                  : ""
              }
            />
            <br />
            <input
              type="text"
              className="plansubtextspan"
              placeholder="Add subtext"
              onChange={() => {
                this.thingsToUpdate.plantExtractsSubText3 =
                  document.getElementById("plansubtextspan3").value;
                // this.setState({});
              }}
              name="plansubtextspan3"
              id="plansubtextspan3"
              defaultValue={
                this.product.plantExtractsSubText3 != null
                  ? this.product.plantExtractsSubText3
                  : ""
              }
            />
          </div>

          <div className="plantext-edit">
            <img
              id="plantext-edit-image4"
              onClick={() => {
                document.getElementById("plantext4").click();
              }}
              src={
                this.product.plantExtractsImage4 != null
                  ? this.product.plantExtractsImage4
                  : public_url + "addImage.png"
              }
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
                this.thingsToUpdate.isPlantExtractsImage4 = true;
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
              placeholder="Add text"
              onChange={() => {
                this.thingsToUpdate.plantExtractsText4 =
                  document.getElementById("plantextspan4").value;
                // this.setState({});
              }}
              id="plantextspan4"
              defaultValue={
                this.product.plantExtractsText4 != null
                  ? this.product.plantExtractsText4
                  : ""
              }
            />
            <br />
            <input
              type="text"
              className="plansubtextspan"
              placeholder="Add subtext"
              onChange={() => {
                this.thingsToUpdate.plantExtractsSubText4 =
                  document.getElementById("plansubtextspan4").value;
                // this.setState({});
              }}
              name="plansubtextspan4"
              id="plansubtextspan4"
              defaultValue={
                this.product.plantExtractsSubText4 != null
                  ? this.product.plantExtractsSubText4
                  : ""
              }
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
            src={
              this.product.scienceBackedImage1 != null
                ? this.product.scienceBackedImage1
                : public_url + "addImage.png"
            }
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
              this.thingsToUpdate.isScienceBackedImage1 = true;
            }}
            type="file"
            accept="image/*"
            name="sciencebimginput"
            id="sciencebimginput"
          />
        </div>
        <textarea
          defaultValue={
            this.product.scienceBackedText != null
              ? this.product.scienceBackedText
              : ""
          }
          onChange={() => {
            this.thingsToUpdate.scienceBackedText =
              document.getElementById("scienceb_text").value;
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
          defaultValue={
            this.product.ingredients != null ? this.product.ingredients : ""
          }
          name="ingredients"
          id="ingredients"
          onChange={() => {
            this.thingsToUpdate.ingredients =
              document.getElementById("ingredients").value;
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
          defaultValue={
            this.product.howtouse != null ? this.product.howtouse : ""
          }
          name="howtouse"
          id="howtouse"
          onChange={() => {
            this.thingsToUpdate.howtouse =
              document.getElementById("howtouse").value;
            // this.setState({});
          }}
          type="text"
        />

        <br />
        <br />
        <p>Length: </p>
        <input
          type="number"
          name="length"
          id="length"
          defaultValue={
            this.product.length != null ? this.product.length : ""
          }
          onChange={() => {
            this.thingsToUpdate.length =
              document.getElementById("length").value;
            // this.setState({});
          }}
        />

<br />
        <br />
        <p>Breadth: </p>
        <input
          type="number"
          name="breadth"
          id="breadth"
          defaultValue={
            this.product.breadth != null ? this.product.breadth : ""
          }
          onChange={() => {
            this.thingsToUpdate.breadth =
              document.getElementById("breadth").value;
            // this.setState({});
          }}
        />


<br />
        <br />
        <p>Height: </p>
        <input
          type="number"
          name="height"
          id="height"
          defaultValue={
            this.product.height != null ? this.product.height : ""
          }
          onChange={() => {
            this.thingsToUpdate.height =
              document.getElementById("height").value;
            // this.setState({});
          }}
        />

<br />
        <br />
        <p>Weight: </p>
        <input
          type="number"
          name="weight"
          id="weight"
          defaultValue={
            this.product.weight != null ? this.product.weight : ""
          }
          onChange={() => {
            this.thingsToUpdate.heiweightght =
              document.getElementById("weight").value;
            // this.setState({});
          }}
        />



        <button
          onClick={() => {
            this.updateProductsReady();
          }}
          className="s_update_button"
        >
          Update
        </button>
      </div>
    );
  }
}

export default AdminProductEdit;

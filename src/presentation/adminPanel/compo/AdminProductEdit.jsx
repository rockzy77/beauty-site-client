import { Component } from "react";
import { updateProduct } from "../../../js/adminProduct";
import public_url from "../../../js/publicurl";
import { useParams } from "react-router-dom";
import { deleteReview, getReviews, getSingleProduct } from "../../../js/products";
import { AiFillStar } from "react-icons/ai";
import { getUserDetail } from "../../../js/auth";
import { toast } from 'react-toastify';


const AdminProductEdit = () => {
  const { pid } = useParams();
  return <AdminProductEditPanel pid={pid} />;
};

class AdminProductEditPanel extends Component {
  constructor(props) {
    super(props);
    this.thingsToUpdate = {};
    this.product = {};
    this.comments = [];
  }

  async updateProductsReady() {
    
    var made = await updateProduct(this.thingsToUpdate, this.props.pid);
    if(made['success']){
      toast.success('Product info updated successfully.')
    }
    else{
      toast.error('Error: '+made.messages)
    }
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
    var det2 = await getReviews(this.props.pid);
    if (det2["success"]) {
      this.comments = det2["reviews"];
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
          }}
          type="file"
          name="pimginput"
          id="pimginput"
        />

        {/* Product 2 input */}
        <input
          style={{ display: "none" }}
          onChange={() => {
            const input = document.getElementById("pimginput2");
            var upload_image = "";

            const reader = new FileReader();
            reader.addEventListener("load", () => {
              upload_image = reader.result;
              document.getElementById("adminPimgEdit2").src = upload_image;
            });
            reader.readAsDataURL(input.files[0]);
            this.thingsToUpdate.productImage2 = input.files[0];
            this.thingsToUpdate.isProductImage2 = true;
          }}
          type="file"
          name="pimginput2"
          id="pimginput2"
        />

         {/* Product 3 input */}
         <input
          style={{ display: "none" }}
          onChange={() => {
            const input = document.getElementById("pimginput3");
            var upload_image = "";

            const reader = new FileReader();
            reader.addEventListener("load", () => {
              upload_image = reader.result;
              document.getElementById("adminPimgEdit3").src = upload_image;
            });
            reader.readAsDataURL(input.files[0]);
            this.thingsToUpdate.productImage3 = input.files[0];
            this.thingsToUpdate.isProductImage3 = true;
          }}
          type="file"
          name="pimginput3"
          id="pimginput3"
        />

         {/* Product 4 input */}
         <input
          style={{ display: "none" }}
          onChange={() => {
            const input = document.getElementById("pimginput4");
            var upload_image = "";

            const reader = new FileReader();
            reader.addEventListener("load", () => {
              upload_image = reader.result;
              document.getElementById("adminPimgEdit4").src = upload_image;
            });
            reader.readAsDataURL(input.files[0]);
            this.thingsToUpdate.productImage4 = input.files[0];
            this.thingsToUpdate.isProductImage4 = true;
          }}
          type="file"
          name="pimginput4"
          id="pimginput4"
        />

         {/* Product 5 input */}
         <input
          style={{ display: "none" }}
          onChange={() => {
            const input = document.getElementById("pimginput5");
            var upload_image = "";

            const reader = new FileReader();
            reader.addEventListener("load", () => {
              upload_image = reader.result;
              document.getElementById("adminPimgEdit5").src = upload_image;
            });
            reader.readAsDataURL(input.files[0]);
            this.thingsToUpdate.productImage5 = input.files[0];
            this.thingsToUpdate.isProductImage5 = true;
          }}
          type="file"
          name="pimginput5"
          id="pimginput5"
        />

        <div className="image-edit-grid">

        <div
          onClick={() => {
            document.getElementById("pimginput").click();
          }}
          className="ad-edit-img-cont"
        >
          <img
            id="adminPimgEdit"
            src={this.product.productImage1 !== undefined ? this.product.productImage1 : public_url + "addImage.png"}
            alt="product_image"
          />
        </div>

        <div
          onClick={() => {
            document.getElementById("pimginput2").click();
          }}
          className="ad-edit-img-cont"
        >
          <img
            id="adminPimgEdit2"
            src={this.product.productImage2 !== undefined ? this.product.productImage2 : public_url + "addImage.png"}
            alt="product_image"
          />
        </div>

        <div
          onClick={() => {
            document.getElementById("pimginput3").click();
          }}
          className="ad-edit-img-cont"
        >
          <img
            id="adminPimgEdit3"
            src={this.product.productImage3 !== undefined ? this.product.productImage3 : public_url + "addImage.png"}
            alt="product_image"
          />
        </div>

        <div
          onClick={() => {
            document.getElementById("pimginput4").click();
          }}
          className="ad-edit-img-cont"
        >
          <img
            id="adminPimgEdit4"
            src={this.product.productImage4 !== undefined ? this.product.productImage4 : public_url + "addImage.png"}
            alt="product_image"
          />
        </div>

        <div
          onClick={() => {
            document.getElementById("pimginput5").click();
          }}
          className="ad-edit-img-cont"
        >
          <img
            id="adminPimgEdit5"
            src={this.product.productImage5 !== undefined ? this.product.productImage5 : public_url + "addImage.png"}
            alt="product_image"
          />
        </div>
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
                this.product.tagImage1 !== undefined
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
                
              }}
              id="producttagspan1"
              defaultValue={
                this.product.productTagText1 !== undefined
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
                this.product.tagImage2 !== undefined
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
                this.product.productTagText2 !== undefined
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
                this.product.tagImage3 !== undefined
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
                this.product.productTagText3 != undefined
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
                this.product.tagImage4 !== undefined
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
                this.product.productTagText4 != undefined
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
            this.product.whydoweneed !== undefined ? this.product.whydoweneed : ""
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
            this.product.benefits !== undefined ? this.product.benefits : ""
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
                this.product.plantExtractsImage1 !== undefined
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
                this.product.plantExtractsText1 !== undefined
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
                this.product.plantExtractsSubText1 !== undefined
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
                this.product.plantExtractsImage2 !== undefined
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
                this.product.plantExtractsText2 !== undefined
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
                this.product.plantExtractsSubText2 != undefined
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
                this.product.plantExtractsImage3 !== undefined
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
                this.product.plantExtractsText3 !== undefined
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
                this.product.plantExtractsSubText3 != undefined
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
                this.product.plantExtractsImage4 !== undefined
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
                this.product.plantExtractsText4 !== undefined
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
                this.product.plantExtractsSubText4 !== undefined
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
              this.product.scienceBackedImage1 !== undefined
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
            this.product.scienceBackedText != undefined
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
            this.product.ingredients !== undefined ? this.product.ingredients : ""
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
            this.product.howtouse != undefined ? this.product.howtouse : ""
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
            this.product.length !== undefined ? this.product.length : ""
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
            this.product.breadth !== undefined ? this.product.breadth : ""
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
            this.product.height != undefined ? this.product.height : ""
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
            this.product.weight !== undefined ? this.product.weight : ""
          }
          onChange={() => {
            this.thingsToUpdate.heiweightght =
              document.getElementById("weight").value;
            // this.setState({});
          }}
        />



        <button
          onClick={() => {
            if (Object.keys(this.thingsToUpdate).length === 0) {
              alert("Nothing to update");
            }
            else{
              for (var key in this.thingsToUpdate) {
                if (this.thingsToUpdate[key] === "") {
                  alert("Please fill all fields");
                  return;
                }
              }
              this.updateProductsReady();
            }
            
          }}
          className="s_update_button"
        >
          Update
        </button>
        <div className="comments-sections">
          <br />
          <h3>Comments</h3>

          {this.comments.length !== 0 ? (
            this.comments.map(
              function (item, i) {
                var date = item.updatedAt.slice(0, 10);
                return (
                  <div key={i}>
                    <div className="comment-box">
                      <div className="comment-box-head">
                        <div className="com-profile-img">
                          <img src={public_url + "userp.png"} alt="User_Profile" />
                        </div>
                        <div className="com-profile-name">
                          <h5>{item.name}</h5>
                          <h6>{date}</h6>
                        </div>
                      </div>
                      <div className="comment-box-det">
                        <p className="comment-det">{item.comment}</p>
                      </div>
                      <div className="review-cont">
                        {this.addStar(item.rating, item.id)} <br />
                        <button onClick={async ()=>{
                          var made = await deleteReview(item.ProductId, item.userid);
                          if(made.success){
                            if(i === 0){
                              this.comments.shift();
                            }
                            else{
                              this.comments.splice(i, 0);
                            }
                            this.setState({});

                            toast.success('Review deleted successfully')
                          }
                          else{
                            toast.error('Something went wrong');
                          }
                        }} id='deleteReviewBtn'>Delete</button>
                      </div>
                    </div>
                    <div className="comment-line"></div>
                  </div>
                );
              }.bind(this)
            )
          ) : (
             <div><p>No comments available</p></div>
          )}
          </div>
      </div>
    );
  }
}

export default AdminProductEdit;

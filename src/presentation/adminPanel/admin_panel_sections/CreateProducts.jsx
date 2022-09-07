import { Component } from "react";
import { createProduct } from "../../../js/adminProduct";
import public_url from "../../../js/publicurl";
import { toast } from "react-toastify";
import Compressor from "compressorjs";

class CreateProducts extends Component {
  constructor(props) {
    super(props);
    this.thingsToCreate = {};
    this.maxheight = 2000;
    this.maxwidth = 2000;
  }

  async createProductReady() {
    console.log(this.thingsToCreate);
    var made = await createProduct(this.thingsToCreate);
    if (made["success"]) {
      toast.success("Product successfully created.");
    } else {
      toast.error("Error: " + made.message);
    }
  }

  render() {
    return (
      <div className="adminAddProduct">
        <br />
        <p>Product Image (Required min 1): </p>

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

            // Compress image input
            const image = input.files[0];
            const max_size = 1000000;
            const max_width = this.maxwidth;
            const max_height = this.maxheight;
            const compress_image = new Compressor(image, {
              quality: 0.6,
              maxWidth: max_width,
              maxHeight: max_height,
              convertSize: max_size,
              success: (result) => {
                const file = new File([result], result.name, {
                  type: "image/jpeg",
                });
                reader.readAsDataURL(file);
                this.thingsToCreate.productImage1 = file;
              },
            });
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

            // Compress image input
            const image = input.files[0];
            const max_size = 1000000;
            const max_width = this.maxwidth;
            const max_height = this.maxheight;
            const compress_image = new Compressor(image, {
              quality: 0.6,
              maxWidth: max_width,
              maxHeight: max_height,
              convertSize: max_size,
              success: (result) => {
                const file = new File([result], result.name, {
                  type: "image/jpeg",
                });
                reader.readAsDataURL(file);
                this.thingsToCreate.productImage2 = file;
              },
            });
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
            // Compress image input
            const image = input.files[0];
            const max_size = 1000000;
            const max_width = this.maxwidth;
            const max_height = this.maxheight;
            const compress_image = new Compressor(image, {
              quality: 0.6,
              maxWidth: max_width,
              maxHeight: max_height,
              convertSize: max_size,
              success: (result) => {
                const file = new File([result], result.name, {
                  type: "image/jpeg",
                });
                reader.readAsDataURL(file);
                this.thingsToCreate.productImage3 = file;
              },
            });
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
            // Compress image input
            const image = input.files[0];
            const max_size = 1000000;
            const max_width = this.maxwidth;
            const max_height = this.maxheight;
            const compress_image = new Compressor(image, {
              quality: 0.6,
              maxWidth: max_width,
              maxHeight: max_height,
              convertSize: max_size,
              success: (result) => {
                const file = new File([result], result.name, {
                  type: "image/jpeg",
                });
                reader.readAsDataURL(file);
                this.thingsToCreate.productImage4 = file;
              },
            });
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
             // Compress image input
             const image = input.files[0];
             const max_size = 1000000;
             const max_width = this.maxwidth;
            const max_height = this.maxheight;
             const compress_image = new Compressor(image, {
               quality: 0.6,
               maxWidth: max_width,
               maxHeight: max_height,
               convertSize: max_size,
               success: (result) => {
                 const file = new File([result], result.name, {
                   type: "image/jpeg",
                 });
                 console.log(file);
                 reader.readAsDataURL(file);
                 this.thingsToCreate.productImage5 = file;
               },
             });
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
              src={public_url + "addImage.png"}
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
              src={public_url + "addImage.png"}
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
              src={public_url + "addImage.png"}
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
              src={public_url + "addImage.png"}
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
              src={public_url + "addImage.png"}
              alt="product_image"
            />
          </div>
        </div>
        <br />
        <br />
        <p>Product Name (Required): </p>
        <input
          type="text"
          placeholder="Product Name"
          name="adpname"
          onChange={() => {
            this.thingsToCreate.name = document.getElementById("adpname").value;
          }}
          id="adpname"
        />
        <br />
        <br />
        <p>Product Label (Required): </p>
        <textarea
          name="adplabel"
          placeholder="Product Label"
          id="adplabel"
          onChange={() => {
            this.thingsToCreate.label =
              document.getElementById("adplabel").value;
          }}
          cols="30"
          rows="10"
        />
        <br />
        <br />
        <p>Product Description (Required): </p>
        <textarea
          name="adpdes"
          id="adpdes"
          onChange={() => {
            this.thingsToCreate.description =
              document.getElementById("adpdes").value;
          }}
          placeholder="Product Description"
          cols="30"
          rows="10"
        />
        <br />
        <br />
        <p>Product Price (Required): </p>
        <input
          type="number"
          placeholder="Product Price"
          onChange={() => {
            this.thingsToCreate.price =
              document.getElementById("adpprice").value;
          }}
          name="adpprice"
          id="adpprice"
        />
        <br />
        <br />
        <p>Product Stock (Required): </p>
        <input
          type="number"
          placeholder="Product Stock"
          onChange={() => {
            this.thingsToCreate.stock =
              document.getElementById("adpstock").value;
          }}
          name="adpstock"
          id="adpstock"
        />
        <br />
        <br />
        <p>Product Category (Required): </p>
        <input
          type="text"
          placeholder="Product Category"
          onChange={() => {
            this.thingsToCreate.category =
              document.getElementById("adpcat").value;
          }}
          name="adpcat"
          id="adpcat"
        />

        <br />
        <br />
        <p>Product Tags (Required min 1): </p>
        <div className="product-tag-img-cont">
          <div className="product-tag-edit">
            <img
              id="product-tag-edit-image1"
              onClick={() => {
                document.getElementById("producttag1").click();
              }}
              src={public_url + "addImage.png"}
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
                // Compress image input
                const image = input.files[0];
                const max_size = 1000000;
                const max_width = this.maxwidth;
                const max_height = this.maxheight;
                const compress_image = new Compressor(image, {
                  quality: 0.6,
                  maxWidth: max_width,
                  maxHeight: max_height,
                  convertSize: max_size,
                  success: (result) => {
                    const file = new File([result], result.name, {
                      type: "image/jpeg",
                    });
                    reader.readAsDataURL(file);
                    this.thingsToCreate.tagImage1 = file;
                  },
                });
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
              placeholder="Tag"
              onChange={() => {
                this.thingsToCreate.productTagText1 =
                  document.getElementById("producttagspan1").value;
              }}
              name="producttagspan1"
              id="producttagspan1"
            />
          </div>

          <div className="product-tag-edit">
            <img
              id="product-tag-edit-image2"
              onClick={() => {
                document.getElementById("producttag2").click();
              }}
              src={public_url + "addImage.png"}
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
                 // Compress image input
                 const image = input.files[0];
                 const max_size = 1000000;
                 const max_width = this.maxwidth;
                 const max_height = this.maxheight;
                 const compress_image = new Compressor(image, {
                   quality: 0.6,
                   maxWidth: max_width,
                   maxHeight: max_height,
                   convertSize: max_size,
                   success: (result) => {
                    const file = new File([result], result.name, {
                      type: "image/jpeg",
                    });
                    reader.readAsDataURL(file);
                     this.thingsToCreate.tagImage2 = file;
                   },
                 });
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
              placeholder="Tag"
              onChange={() => {
                this.thingsToCreate.productTagText2 =
                  document.getElementById("producttagspan2").value;
              }}
              id="producttagspan2"
            />
          </div>

          <div className="product-tag-edit">
            <img
              id="product-tag-edit-image3"
              onClick={() => {
                document.getElementById("producttag3").click();
              }}
              src={public_url + "addImage.png"}
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
                 // Compress image input
                 const image = input.files[0];
                 const max_size = 1000000;
                 const max_width = this.maxwidth;
                const max_height = this.maxheight;
                 const compress_image = new Compressor(image, {
                   quality: 0.6,
                   maxWidth: max_width,
                   maxHeight: max_height,
                   convertSize: max_size,
                   success: (result) => {
                    const file = new File([result], result.name, {
                      type: "image/jpeg",
                    });
                    reader.readAsDataURL(file);
                     this.thingsToCreate.tagImage3 = file;
                   },
                 });
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
              placeholder="Tag"
              onChange={() => {
                this.thingsToCreate.productTagText3 =
                  document.getElementById("producttagspan3").value;
              }}
              id="producttagspan3"
            />
          </div>

          <div className="product-tag-edit">
            <img
              id="product-tag-edit-image4"
              onClick={() => {
                document.getElementById("producttag4").click();
              }}
              src={public_url + "addImage.png"}
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
                // Compress image input
                const image = input.files[0];
                const max_size = 1000000;
                const max_width = this.maxwidth;
            const max_height = this.maxheight;
                const compress_image = new Compressor(image, {
                  quality: 0.6,
                  maxWidth: max_width,
                  maxHeight: max_height,
                  convertSize: max_size,
                  success: (result) => {
                    const file = new File([result], result.name, {
                      type: "image/jpeg",
                    });
                    reader.readAsDataURL(file);
                    this.thingsToCreate.tagImage4 = file;
                  },
                });
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
                this.thingsToCreate.productTagText4 =
                  document.getElementById("producttagspan4").value;
              }}
              placeholder="Tag"
              id="producttagspan4"
            />
          </div>
        </div>
        <br />
        <br />
        <p>
          <strong>Product Facts</strong>
        </p>
        <p>Why do we need (Required): </p>
        <textarea
          onChange={() => {
            this.thingsToCreate.whydoweneed =
              document.getElementById("adpwhydoweneed").value;
          }}
          type="text"
          name="adpwhydoweneed"
          id="adpwhydoweneed"
        />

        <br />
        <br />
        <p>Benefits (Required): </p>
        <input
          type="text"
          onChange={() => {
            this.thingsToCreate.benefits =
              document.getElementById("adpbenefits").value;
          }}
          name="adpbenefits"
          id="adpbenefits"
        />

        <br />
        <br />
        <p>Plant Extracts (Required min 1): </p>
        <div className="plantext-img-cont">
          <div className="plantext-edit">
            <img
              id="plantext-edit-image1"
              onClick={() => {
                document.getElementById("plantext1").click();
              }}
              src={public_url + "addImage.png"}
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

                 // Compress image input
                 const image = input.files[0];
                 const max_size = 1000000;
                 const max_width = this.maxwidth;
            const max_height = this.maxheight;
                 const compress_image = new Compressor(image, {
                   quality: 0.6,
                   maxWidth: max_width,
                   maxHeight: max_height,
                   convertSize: max_size,
                   success: (result) => {
                    const file = new File([result], result.name, {
                      type: "image/jpeg",
                    });
                    reader.readAsDataURL(file);
                     this.thingsToCreate.plantExtractsImage1 = file;
                   },
                 });
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
              placeholder="Title"
              onChange={() => {
                this.thingsToCreate.plantExtractsText1 =
                  document.getElementById("plantextspan1").value;
              }}
              name="plantextspan1"
              id="plantextspan1"
            />
            <br />
            <input
              type="text"
              className="plansubtextspan"
              placeholder="Subtitle"
              onChange={() => {
                this.thingsToCreate.plantExtractsSubText1 =
                  document.getElementById("plansubtextspan1").value;
              }}
              name="plansubtextspan1"
              id="plansubtextspan1"
            />
          </div>

          <div className="plantext-edit">
            <img
              id="plantext-edit-image2"
              onClick={() => {
                document.getElementById("plantext2").click();
              }}
              src={public_url + "addImage.png"}
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
                // Compress image input
                 const image = input.files[0];
                 const max_size = 1000000;
                 const max_width = this.maxwidth;
                 const max_height = this.maxheight;
                 const compress_image = new Compressor(image, {
                   quality: 0.6,
                   maxWidth: max_width,
                   maxHeight: max_height,
                   convertSize: max_size,
                   success: (result) => {
                    const file = new File([result], result.name, {
                      type: "image/jpeg",
                    });
                    reader.readAsDataURL(file);
                     this.thingsToCreate.plantExtractsImage2 = file;
                   },
                 });
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
                this.thingsToCreate.plantExtractsText2 =
                  document.getElementById("plantextspan2").value;
              }}
              placeholder="Title"
              id="plantextspan2"
            />
            <br />
            <input
              type="text"
              className="plansubtextspan"
              name="plansubtextspan2"
              onChange={() => {
                this.thingsToCreate.plantExtractsSubText2 =
                  document.getElementById("plansubtextspan2").value;
              }}
              placeholder="Subtitle"
              id="plansubtextspan2"
            />
          </div>

          <div className="plantext-edit">
            <img
              id="plantext-edit-image3"
              onClick={() => {
                document.getElementById("plantext3").click();
              }}
              src={public_url + "addImage.png"}
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
               // Compress image input
               const image = input.files[0];
               const max_size = 1000000;
               const max_width = this.maxwidth;
            const max_height = this.maxheight;
               const compress_image = new Compressor(image, {
                 quality: 0.6,
                 maxWidth: max_width,
                 maxHeight: max_height,
                 convertSize: max_size,
                 success: (result) => {
                  const file = new File([result], result.name, {
                    type: "image/jpeg",
                  });
                  reader.readAsDataURL(file);
                   this.thingsToCreate.plantExtractsImage3 = file;
                 },
               });
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
              onChange={() => {
                this.thingsToCreate.plantExtractsText3 =
                  document.getElementById("plantextspan3").value;
              }}
              name="plantextspan3"
              id="plantextspan3"
              placeholder="Title"
            />
            <br />
            <input
              type="text"
              className="plansubtextspan"
              name="plansubtextspan3"
              placeholder="Subtitle"
              onChange={() => {
                this.thingsToCreate.plantExtractsSubText3 =
                  document.getElementById("plansubtextspan3").value;
              }}
              id="plansubtextspan3"
            />
          </div>

          <div className="plantext-edit">
            <img
              id="plantext-edit-image4"
              onClick={() => {
                document.getElementById("plantext4").click();
              }}
              src={public_url + "addImage.png"}
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
                // Compress image input
                const image = input.files[0];
                const max_size = 1000000;
                const max_width = this.maxwidth;
            const max_height = this.maxheight;
                const compress_image = new Compressor(image, {
                  quality: 0.6,
                  maxWidth: max_width,
                  maxHeight: max_height,
                  convertSize: max_size,
                  success: (result) => {
                    const file = new File([result], result.name, {
                      type: "image/jpeg",
                    });
                    reader.readAsDataURL(file);
                    this.thingsToCreate.plantExtractsImage4 = file;
                  },
                });
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
                this.thingsToCreate.plantExtractsText4 =
                  document.getElementById("plantextspan4").value;
              }}
              placeholder="Title"
              id="plantextspan4"
            />
            <br />
            <input
              type="text"
              className="plansubtextspan"
              name="plansubtextspan4"
              onChange={() => {
                this.thingsToCreate.plantExtractsSubText4 =
                  document.getElementById("plansubtextspan4").value;
              }}
              placeholder="Subtitle"
              id="plansubtextspan4"
            />
          </div>
        </div>

        <br />
        <br />
        <p>Science-Backed Ingredients (Required): </p>

        <div className="scienceb_img_cont">
          <img
            id="scienceb_img"
            onClick={() => {
              document.getElementById("sciencebimginput").click();
            }}
            src={public_url + "addImage.png"}
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
              
              // Compress image input
              const image = input.files[0];
              const max_size = 1000000;
              const max_width = this.maxwidth;
            const max_height = this.maxheight;
              const compress_image = new Compressor(image, {
                quality: 0.6,
                maxWidth: max_width,
                maxHeight: max_height,
                convertSize: max_size,
                success: (result) => {
                  // convert blob to file
                  const file = new File([result], result.name, {
                    type: "image/jpeg",
                  });
                  reader.readAsDataURL(file);
                  this.thingsToCreate.scienceBackedImage1 = file;
                },
              });
            }}
            type="file"
            accept="image/*"
            name="sciencebimginput"
            id="sciencebimginput"
          />
        </div>
        <textarea
          name="scienceb_text"
          onChange={() => {
            this.thingsToCreate.scienceBackedText =
              document.getElementById("scienceb_text").value;
          }}
          id="scienceb_text"
          type="text"
        />

        <br />
        <br />
        <p>
          <strong>Ingredients (Required): </strong>
        </p>
        <textarea
          name="ingredients"
          id="ingredients"
          onChange={() => {
            this.thingsToCreate.ingredients =
              document.getElementById("ingredients").value;
          }}
          cols="30"
          rows="10"
        ></textarea>

        <br />
        <br />
        <p>
          <strong>How to use (Required): </strong>
        </p>
        <textarea
          name="howtouse"
          id="howtouse"
          onChange={() => {
            this.thingsToCreate.howtouse =
              document.getElementById("howtouse").value;
          }}
          type="text"
        />

        <br />
        <br />

        <p>
          <strong>Length: </strong>
        </p>
        <input
          type="number"
          className="length"
          name="length"
          onChange={() => {
            this.thingsToCreate.length =
              document.getElementById("length").value;
          }}
          placeholder="Length"
          id="length"
        />

        <br />
        <br />

        <p>
          <strong>Breadth: </strong>
        </p>
        <input
          type="number"
          className="breadth"
          name="breadth"
          onChange={() => {
            this.thingsToCreate.breadth =
              document.getElementById("breadth").value;
          }}
          placeholder="Breadth"
          id="breadth"
        />

        <br />
        <br />

        <p>
          <strong>Height: </strong>
        </p>
        <input
          type="number"
          className="height"
          name="height"
          onChange={() => {
            this.thingsToCreate.height =
              document.getElementById("height").value;
          }}
          placeholder="Height"
          id="height"
        />

        <br />
        <br />

        <p>
          <strong>Weight: </strong>
        </p>
        <input
          type="number"
          className="weight"
          name="weight"
          onChange={() => {
            this.thingsToCreate.weight =
              document.getElementById("weight").value;
          }}
          placeholder="Weight"
          id="weight"
        />

        <button
          onClick={() => {
            console.log(this.thingsToCreate);
            if (this.thingsToCreate.productImage1 === undefined) {
              alert("Please upload a product image");
              return;
            } else if (
              this.thingsToCreate.label === undefined ||
              this.thingsToCreate.label === ""
            ) {
              alert("Please enter a label");
              return;
            } else if (
              this.thingsToCreate.name === undefined ||
              this.thingsToCreate.name === ""
            ) {
              alert("Please enter a name");
              return;
            } else if (
              this.thingsToCreate.price === undefined ||
              this.thingsToCreate.price === ""
            ) {
              alert("Please enter a price");
              return;
            } else if (
              this.thingsToCreate.description === undefined ||
              this.thingsToCreate.description === ""
            ) {
              alert("Please enter a description");
              return;
            } else if (
              this.thingsToCreate.ingredients === undefined ||
              this.thingsToCreate.ingredients === ""
            ) {
              alert("Please enter ingredients");
              return;
            } else if (
              this.thingsToCreate.howtouse === undefined ||
              this.thingsToCreate.howtouse === ""
            ) {
              alert("Please enter how to use");
              return;
            } else if (
              this.thingsToCreate.length === undefined ||
              this.thingsToCreate.length === ""
            ) {
              alert("Please enter length");
              return;
            } else if (
              this.thingsToCreate.breadth === undefined ||
              this.thingsToCreate.breadth === ""
            ) {
              alert("Please enter breadth");
              return;
            } else if (
              this.thingsToCreate.height === undefined ||
              this.thingsToCreate.height === ""
            ) {
              alert("Please enter height");
              return;
            } else if (
              this.thingsToCreate.weight === undefined ||
              this.thingsToCreate.weight === ""
            ) {
              alert("Please enter weight");
              return;
            } else if (this.thingsToCreate.scienceBackedImage1 === undefined) {
              alert("Please upload a science-backed image");
              return;
            } else if (
              this.thingsToCreate.scienceBackedText === undefined ||
              this.thingsToCreate.scienceBackedText === ""
            ) {
              alert("Please enter science-backed text");
              return;
            } else if (this.thingsToCreate.plantExtractsImage1 === undefined) {
              alert("Please upload a plant extract image");
              return;
            } else if (
              this.thingsToCreate.plantExtractsText1 === undefined ||
              this.thingsToCreate.plantExtractsText1 === ""
            ) {
              alert("Please enter plant extract text");
              return;
            } else if (
              this.thingsToCreate.plantExtractsSubText1 === undefined ||
              this.thingsToCreate.plantExtractsSubText1 === ""
            ) {
              alert("Please enter plant extract subtext");
              return;
            } else if (
              this.thingsToCreate.stock === undefined ||
              this.thingsToCreate.stock === ""
            ) {
              alert("Please enter stock");
              return;
            } else if (
              this.thingsToCreate.category === undefined ||
              this.thingsToCreate.category === ""
            ) {
              alert("Please enter category");
              return;
            } else if (this.thingsToCreate.tagImage1 === undefined) {
              alert("Please upload a tag image 1");
              return;
            } else if (
              this.thingsToCreate.productTagText1 === undefined ||
              this.thingsToCreate.productTagText1 === ""
            ) {
              alert("Please enter tag text 1");
              return;
            } else if (
              this.thingsToCreate.whydoweneed === undefined ||
              this.thingsToCreate.whydoweneed === ""
            ) {
              alert("Please enter why do we need this");
              return;
            } else if (
              this.thingsToCreate.benefits === undefined ||
              this.thingsToCreate.benefits === ""
            ) {
              alert("Please enter benefits");
              return;
            } else {
              this.createProductReady();
            }
          }}
          className="s_update_button"
        >
          Create Product
        </button>
      </div>
    );
  }
}

export default CreateProducts;

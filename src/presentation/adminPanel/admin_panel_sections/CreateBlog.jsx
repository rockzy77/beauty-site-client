import { Component } from "react";
import { blogImages, createBlog, dltBImage } from "../../../js/adminProduct";
import public_url from "../../../js/publicurl";
import { toast } from "react-toastify";
import Compressor from "compressorjs";

class CreateBlog extends Component {
  constructor(props) {
    super(props);
    this.thingstoCreate = {};
    this.imgsToUpload = [];
    this.imgToUpload = '';
    this.maxheight = 2000;
    this.maxwidth = 2000;
  }

  async createBlogReady() {
    var made = await createBlog(this.thingstoCreate);
    if (made["success"]) {
      toast.success("Blog created successfully.");
    } else {
      toast.error("Error: " + made.message);
    }
  }

  render() {
    return (
      <div className="adminProductEdit">
        <div className="s_mini_nav">
          <h6>Create Blog</h6>
        </div>
        <br />
        <p>Blog Image: </p>

        <input
          style={{ display: "none" }}
          onChange={() => {
            const input = document.getElementById("blogimginput");

            var upload_image = "";

            const reader = new FileReader();
            reader.addEventListener("load", () => {
              upload_image = reader.result;
              document.getElementById("adminBlogImg").src = upload_image;
            });
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
                this.thingstoCreate.image = file;
              },
            });
          }}
          type="file"
          name="blogimginput"
          id="blogimginput"
        />

        <div
          onClick={() => {
            document.getElementById("blogimginput").click();
          }}
          className="ad-edit-img-cont"
        >
          <img
            id="adminBlogImg"
            src={public_url + "addImage.png"}
            alt="blog_image"
          />
        </div>
        <br />
        <br />
        <p>Blog Title: </p>
        <input
          type="text"
          name="blogtitle"
          id="blogtitle"
          onChange={() => {
            this.thingstoCreate.title =
              document.getElementById("blogtitle").value;
            // this.setState({});
          }}
        />
        <br />
        <br />
        <p>Blog Subtitle: </p>
        <input
          name="blogsubtitle"
          id="blogsubtitle"
          cols="30"
          rows="10"
          onChange={() => {
            this.thingstoCreate.subtitle =
              document.getElementById("blogsubtitle").value;
            // this.setState({});
          }}
        />

        <br />
        <br />

        <p>Blog Content: </p>
        <textarea
          name="blogcontent"
          id="blogcontent"
          cols="30"
          rows="10"
          style={{
            height: "500px",
          }}
          onChange={() => {
            this.thingstoCreate.content =
              document.getElementById("blogcontent").value;
            // this.setState({});
          }}
        />

        <button
          onClick={async() => {
            if (this.thingstoCreate.image === undefined) {
              alert("Please upload an image.");
            } else if (
              this.thingstoCreate.title === undefined ||
              this.thingstoCreate.title === ""
            ) {
              alert("Please enter a title.");
            } else if (
              this.thingstoCreate.subtitle === undefined ||
              this.thingstoCreate.subtitle === ""
            ) {
              alert("Please enter a subtitle.");
            } else if (
              this.thingstoCreate.content === undefined ||
              this.thingstoCreate.content === ""
            ) {
              alert("Please enter a content.");
            } else {
              this.createBlogReady();
            }
          }}
          className="s_update_button"
        >
          Create Blog
        </button>
      </div>
    );
  }
}

export default CreateBlog;

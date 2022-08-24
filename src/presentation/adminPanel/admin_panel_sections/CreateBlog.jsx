import { Component } from "react";
import { createBlog } from "../../../js/adminProduct";
import public_url from "../../../js/publicurl";

class CreateBlog extends Component {
  constructor(props) {
    super(props);
    this.thingstoCreate = {};
  }

  async createBlogReady() {
    console.log(this.thingstoCreate)
    var made = await createBlog(this.thingstoCreate);
    if (made["success"]) {
      alert("Blog created successfully.");
    } else {
      alert(made["message"]);
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
            reader.readAsDataURL(input.files[0]);
            this.thingstoCreate.image = input.files[0];
            // this.setState({});
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
        <p>Blog Author: </p>
        <input
          name="blogauthor"
          id="blogauthor"
          cols="30"
          rows="10"
          onChange={() => {
            this.thingstoCreate.author =
              document.getElementById("blogauthor").value;
            // this.setState({});
          }}
        />
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
          onChange={() => {
            this.thingstoCreate.content =
              document.getElementById("blogcontent").value;
            // this.setState({});
          }}
        />

        <button
          onClick={() => {
            this.createBlogReady();
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

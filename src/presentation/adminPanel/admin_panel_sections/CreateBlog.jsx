import { Component } from "react";
import { createBlog } from "../../../js/adminProduct";
import public_url from "../../../js/publicurl";
import { toast } from 'react-toastify';


class CreateBlog extends Component {
  constructor(props) {
    super(props);
    this.thingstoCreate = {};
  }

  async createBlogReady() {
    console.log(this.thingstoCreate);
    var made = await createBlog(this.thingstoCreate);
    if (made["success"]) {
      toast.success('Blog created successfully.')
    } else {
      toast.error('Error: '+made.message)
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
            if (this.thingstoCreate.image === undefined) {
              alert("Please upload an image.");
            } else if (this.thingstoCreate.author === undefined || this.thingstoCreate.author === '') {
              alert("Please enter an author.");
            } else if (this.thingstoCreate.title === undefined || this.thingstoCreate.title === '') {
              alert("Please enter a title.");
            } else if (this.thingstoCreate.subtitle === undefined || this.thingstoCreate.subtitle === '') {
              alert("Please enter a subtitle.");
            } else if (this.thingstoCreate.content === undefined || this.thingstoCreate.content === '') {
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

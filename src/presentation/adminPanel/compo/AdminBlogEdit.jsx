import { Component } from "react";
import { getSingleBlog,updateBlog} from "../../../js/adminProduct";
import public_url from "../../../js/publicurl";
import { useParams } from "react-router-dom"; 
import { toast } from 'react-toastify';


const AdminBlogEdit = ()=>{
   const {bid} = useParams();
   return <AdminBlogEditPanel bid={bid} />
}

class AdminBlogEditPanel extends Component {
  constructor(props) {
    super(props);
    this.blog = {};
    this.thingstoUpdate = {};
  }

  async updateBlogReady() {
    var made = await updateBlog(this.thingstoUpdate, this.blog.bid);
    if(made['success']){
        toast.success('Blog info updated successfully.');
    }
    else{
        toast.error('Something went wrong!');
    }
  }

  async componentDidMount(){
    var det = await getSingleBlog(this.props.bid);
    if(det['success']){
      var blog = det['blog'];
      this.blog.bid = blog['id'];
      this.blog.image = blog['image_url'];
      this.blog.title = blog['title'];
      this.blog.subtitle = blog['subtitle'];
      this.blog.content = blog['content'];
      
    }
    this.setState({})
  }

  render() {
    return  (
        <div className="adminProductEdit">
          <div className="s_mini_nav">
            <h6>Edit Blog</h6>
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
              this.thingstoUpdate.image = input.files[0];
              this.thingstoUpdate.isImageUpdate = true;
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
              src={this.blog.image !== undefined ? this.blog.image : public_url+'addImage.png'}
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
            defaultValue={this.blog.title !== undefined ? this.blog.title : ''}
            onChange={() => {
              this.thingstoUpdate.title =
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
            defaultValue={this.blog.subtitle != undefined ? this.blog.subtitle : ''}
            rows="10"
            onChange={() => {
              this.thingstoUpdate.subtitle =
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
            style={{
              'height': '500px'
            }}
            rows="10"
            defaultValue={this.blog.content !== undefined ? this.blog.content : ''}
            onChange={() => {
              this.thingstoUpdate.content =
                document.getElementById("blogcontent").value;
              // this.setState({});
            }}
          />
  
          <button
            onClick={() => {
              if (Object.keys(this.thingstoUpdate).length === 0) {
                alert("Nothing to update");
              }
              else{
                for (var key in this.thingsToUpdate) {
                  if (this.thingsToUpdate[key] === "") {
                    alert("Please fill all fields");
                    return;
                  }
                }
                this.updateBlogReady();
              }
              
              
            }}
            className="s_update_button"
          >
            Update
          </button>
        </div>)
  }
}

export default AdminBlogEdit;

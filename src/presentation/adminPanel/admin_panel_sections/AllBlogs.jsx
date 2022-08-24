import { Component } from "react";
import { GoLinkExternal } from "react-icons/go";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {
  createProduct,
  deleteBlog,
  deleteProduct,
  getAllBlogs,
  getAllProductsAdmin,
  getAlluser,
  updateProduct,
} from "../../../js/adminProduct";
import AdminProductDet from "../compo/AdminProductEdit";

class AllBlogs extends Component {
  constructor(props) {
    super(props);
    this.blogs = [];
    this.blogsrow = [];
    this.backupBlogsRow = [];
    this.searchMethod = "Author";
  }

  
  deleteRow(index){
    this.blogs.splice(index, 1);
    this.blogsrow = [];
    this.backupBlogsRow = [];
    for (var i = 0; i < this.blogs.length; i++) {
      var blog = this.blogs[i];
      var id = blog["id"];
      var author = blog["author"];
      var title = blog["title"];
      var subtitle = blog["subtitle"];
      var created = blog["createdAt"];
      this.blogsrow.push(
        <BlogRow
          key={i}
          si={i + 1}
          bid={id}
          title={title}
          subtitle={subtitle}
          author={author}
          created={created}
          dlt={this.deleteRow.bind(this)}
        />
      );
      this.backupBlogsRow.push(
        <BlogRow
          key={i}
          si={i + 1}
          bid={id}
          title={title}
          subtitle={subtitle}
          author={author}
          created={created}
          dlt={this.deleteRow.bind(this)}
        />
      );
      this.setState({});
    }
  }


  async componentDidMount() {
    var d = await getAllBlogs();
    if (d["success"]) {
      this.blogs = d["blogs"];
      this.setState({});
      for (var i = 0; i < this.blogs.length; i++) {
        var blog = this.blogs[i];
        var id = blog["id"];
        var author = blog["author"];
        var title = blog["title"];
        var subtitle = blog["subtitle"];
        var created = blog["createdAt"];
        this.blogsrow.push(
          <BlogRow
            key={i}
            si={i + 1}
            bid={id}
            title={title}
            subtitle={subtitle}
            author={author}
            created={created}
            dlt={this.deleteRow.bind(this)}
          />
        );
        this.backupBlogsRow.push(
          <BlogRow
            key={i}
            si={i + 1}
            bid={id}
            title={title}
            subtitle={subtitle}
            author={author}
            created={created}
            dlt={this.deleteRow.bind(this)}
          />
        );
        this.setState({});
      }
    }
  }
  render() {
    return (
      <section className="all-users">
        <input
          onChange={() => {
            var backupList = this.backupBlogsRow;
            this.blogsrow = backupList;
            var tempList = [];
            var search = document.getElementById("alluserssearch").value;
            search = search.toLowerCase();

            if (search != "") {
              for (var i = 0; i < this.blogs.length; i++) {
                if (this.searchMethod == "Author") {
                  if (this.blogs[i]["author"].toLowerCase().includes(search)) {
                    tempList.push(this.blogsrow[i]);
                  }
                } else if (this.searchMethod == "Title") {
                  if (this.blogs[i]["title"].toLowerCase().includes(search)) {
                    tempList.push(this.blogsrow[i]);
                  }
                }  else if (this.searchMethod == "Date Created") {
                  if (
                    this.blogs[i]["createdAt"].toLowerCase().includes(search)
                  ) {
                    tempList.push(this.blogsrow[i]);
                  }
                }
              }
              this.blogsrow = tempList;
              this.setState({});
            } else {
              var backupList = this.backupBlogsRow;
              this.blogsrow = backupList;
              this.setState({});
            }
          }}
          type="text"
          name="searchContent"
          placeholder={`Search for blogs using ${this.searchMethod}`}
          id="alluserssearch"
        />
        <span className="checkbox-span">Search Using: </span>
        <select
          onChange={() => {
            this.searchMethod = document.getElementById("searchusing").value;
            this.setState({});
          }}
          name="searchusing"
          id="searchusing"
        >
          <option value="Author">Author</option>
          <option value="Title">Title</option>
          <option value="Date Created">Date Created</option>
        </select>
        <br />
        <br />
        <div className="all-u-table">
          <table>
            <thead>
              <tr>
                <th>SI NO</th>
                <th>Author</th>
                <th>Title</th>
                <th>Subtitle</th>
                <th>Created At</th>
                <th>Actions</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{this.blogsrow}</tbody>
          </table>
        </div>
      </section>
    );
  }
}

const BlogRow = (props) => {
  var date = props.created.slice(0, 10);
  var time = props.created.slice(11, 16);
  var navigate = useNavigate();
  return (
    <tr>
      <td>{props.si}</td>
      <td>{props.author}</td>
      <td>{props.title}</td>

      <td>{props.subtitle}</td>
      <td>{date + " " + time}</td>
      <td>
        <MdModeEdit
          className="allusersredirect"
          onClick={() => {
            navigate("/admin_panel/updateBlog/" + props.bid);
          }}
        />
        <MdDelete
          onClick={async function () {
            var confirm = window.confirm("Do you want to delete this blog?");
            if (confirm) {
              var made = await deleteBlog(props.bid);
              if (made["success"]) {
                props.dlt(props.si - 1);
                alert("Blog was deleted");
              } else {
                alert("Something went wrong");
              }
            }
          }}
          className="alluserdlt"
        />
      </td>
    </tr>
  );
};

export default AllBlogs;

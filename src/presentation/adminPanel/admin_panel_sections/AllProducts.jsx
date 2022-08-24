import { Component } from "react";
import { GoLinkExternal } from "react-icons/go";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {
  createProduct,
  deleteProduct,
  getAllProductsAdmin,
  updateProduct,
} from "../../../js/adminProduct";
import public_url from "../../../js/publicurl";
import AdminProductDet from "../compo/AdminProductEdit";

class AllProducts extends Component {
  constructor(props) {
    super(props);
    this.products = [];
    this.productrow = [];
    this.backupProductsRow = [];
  }

  deleteRow(index){
    this.products.splice(index, 1);
    this.productrow = [];
    this.backupProductsRow = [];
    for (var i = 0; i < this.products.length; i++) {
      var product = this.products[i];
      var id = product["id"];
      var name = product["name"];
      var price = product["price"];
      var stock = product["stock"];
      this.productrow.push(
        <ProductRow
          key={i}
          si={i + 1}
          pid={id}
          pname={name}
          price={price}
          stock={stock}
          dlt={this.deleteRow.bind(this)}
        />
      );
      this.backupProductsRow.push(
        <ProductRow
          key={i}
          si={i + 1}
          pid={id}
          pname={name}
          price={price}
          stock={stock}
          dlt={this.deleteRow.bind(this)}
        />
      );
      this.setState({});
    }
  }


  async componentDidMount() {
    var d = await getAllProductsAdmin();
    if (d["success"]) {
      this.products = d["products"];
      this.backupProducts = d["products"];
      for (var i = 0; i < this.products.length; i++) {
        var product = this.products[i];
        var id = product["id"];
        var name = product["name"];
        var price = product["price"];
        var stock = product["stock"];
        this.productrow.push(
          <ProductRow
            key={i}
            si={i + 1}
            pid={id}
            pname={name}
            stock={stock}
            price={price}
            dlt={this.deleteRow.bind(this)}
          />
        );
        this.backupProductsRow.push(
          <ProductRow
            key={i}
            si={i + 1}
            pid={id}
            pname={name}
            stock={stock}
            price={price}
            dlt={this.deleteRow.bind(this)}
          />
        );
        this.setState({});
      }
    }
  }

  render() {
    return (
      <div className="all-products">
        <div>
          <input
            onChange={() => {
              
              var backupList = this.backupProductsRow;
              this.productrow = backupList;
              var tempList = [];
              var search = document.getElementById("allproductssearch").value;
              search = search.toLowerCase();

              if (search != "") {
                for (var i = 0; i < this.products.length; i++) {
                  if (this.products[i]["name"].toLowerCase().includes(search)) {
                    tempList.push(this.productrow[i]);
                  }
                }
                this.productrow = tempList;
                this.setState({});
              } else {
                var backupList = this.backupProductsRow;
                this.productrow = backupList;
                this.setState({});
              }
            }}
            type="text"
            name="searchContent"
            placeholder="Search For Product"
            id="allproductssearch"
          />
          <br />
          <br />
          <div className="all-p-table">
            <table>
              <thead>
                <tr>
                  <th>SI NO</th>
                  <th>Product Id</th>
                  <th>Product Name</th>
                  <th>Product Price</th>
                  <th>Product Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>{this.productrow}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

const ProductRow = (props) => {
  var navigate = useNavigate();
  return (
    <tr>
      <td>{props.si}</td>
      <td>{props.pid}</td>
      <td>{props.pname}</td>
     
      <td>Rs {props.price}</td>
      <td>{props.stock}</td>
      <td>
        <MdModeEdit
          className="allproductredirect"
          onClick={() => {
            navigate("/admin_panel/updateProduct/" + props.pid);
          }}
        />
        <MdDelete
          onClick={async function () {
            var confirm = window.confirm('Do you want to delete this product?');
            if(confirm){
              var made = await deleteProduct(props.pid);
            if (made['success']) {
              props.dlt(props.si-1)
              alert("Product was deleted");
            } else {
              alert("Something went wrong");
            }
          }
            }
            }
          className="allproductdlt"
        />
      </td>
    </tr>
  );
};

export default AllProducts;

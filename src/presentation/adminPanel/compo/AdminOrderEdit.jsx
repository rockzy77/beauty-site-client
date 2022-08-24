import { Component } from "react";
import {
  getSingleBlog,
  getSingleuser,
  updateBlog,
  updateProduct,
  updateuserInfo,
} from "../../../js/adminProduct";
import public_url from "../../../js/publicurl";
import { useParams } from "react-router-dom";
import $ from "jquery";

const AdminOrderEdit = () => {
  const { orderId } = useParams();
  return <AdminOrderEditPanel oid={orderId} />;
};

class AdminOrderEditPanel extends Component {
  constructor(props) {
    super(props);
    this.order = {};
    this.thingstoUpdate = {};
  }

  async updateBlogReady() {
    var made = await updateBlog(this.thingstoUpdate, this.order.bid);
    if (made["success"]) {
      alert("Blog info updated successfully.");
    } else {
      alert("Somethign went wrong!");
    }
  }

  async componentDidMount() {
    // var det = await getSingleBlog(this.props.bid);
    // if(det['success']){
    //   var order = det['blog'];
    //   this.order.bid = order['id'];
    //   this.order.author = order['author'];
    //   this.order.image = order['image_url'];
    //   this.order.title = order['title'];
    //   this.order.subtitle = order['subtitle'];
    //   this.order.content = order['content'];
    // }
    // this.setState({})
  }

  render() {
    return (
      <div className="adminProductEdit">
        <div className="s_mini_nav">
          <h6>Edit Order</h6>
        </div>
        <br />
        <p>Shipping Address: </p>
        <input
          name="address"
          id="address"
          cols="30"
          // defaultValue={this.order.author != null ? this.order.author : ''}
          rows="10"
          onChange={() => {
            if (this.order.shipping_is_billing == 1) {
                this.thingstoUpdate.billing_address =
                document.getElementById("address").value;
            }
            else{
                this.thingstoUpdate.shipping_address =
                document.getElementById("address").value;
            }
          }}
        />
        <br />
        <br />
        <p>Shipping Address 2: </p>
        <input
          name="address2"
          id="address2"
          cols="30"
          // defaultValue={this.order.author != null ? this.order.author : ''}
          rows="10"
          onChange={() => {
            if (this.order.shipping_is_billing == 1) {
                this.thingstoUpdate.billing_address_2 =
                document.getElementById("address2").value;
            }
            else{
                this.thingstoUpdate.shipping_address_2 =
                document.getElementById("address2").value;
            }
          }}
        />

<br />
        <br />
        <p>Shipping City: </p>
        <input
          name="city"
          id="city"
          cols="30"
          // defaultValue={this.order.author != null ? this.order.author : ''}
          rows="10"
          onChange={() => {
            if (this.order.shipping_is_billing == 1) {
                this.thingstoUpdate.billing_city =
                document.getElementById("city").value;
            }
            else{
                this.thingstoUpdate.shipping_city =
                document.getElementById("city").value;
            }
          }}
        />
        
        <br />
        <br />
        <p>Shipping Pincode: </p>
        <input
          name="pincode"
          id="pincode"
          cols="30"
          // defaultValue={this.order.author != null ? this.order.author : ''}
          rows="10"
          onChange={() => {
            if (this.order.shipping_is_billing == 1) {
                this.thingstoUpdate.billing_pincode =
                document.getElementById("pincode").value;
            }
            else{
                this.thingstoUpdate.shipping_pincode =
                document.getElementById("pincode").value;
            }
          }}
        />

<br />
        <br />
        <p>Shipping State: </p>
        <input
          name="state"
          id="state"
          cols="30"
          // defaultValue={this.order.author != null ? this.order.author : ''}
          rows="10"
          onChange={() => {
            if (this.order.shipping_is_billing == 1) {
                this.thingstoUpdate.billing_state =
                document.getElementById("state").value;
            }
            else{
                this.thingstoUpdate.shipping_state =
                document.getElementById("state").value;
            }
          }}
        />

<br />
        <br />
        <p>Shipping Email: </p>
        <input
          name="semail"
          id="semail"
          cols="30"
          // defaultValue={this.order.author != null ? this.order.author : ''}
          rows="10"
          onChange={() => {
            if (this.order.shipping_is_billing == 1) {
                this.thingstoUpdate.billing_email =
                document.getElementById("semail").value;
            }
            else{
                this.thingstoUpdate.shipping_email =
                document.getElementById("semail").value;
            }
          }}
        />

<br />
        <br />
        <p>Shipping Phone: </p>
        <input
          name="sphone"
          id="sphone"
          cols="30"
          // defaultValue={this.order.author != null ? this.order.author : ''}
          rows="10"
          onChange={() => {
            if (this.order.shipping_is_billing == 1) {
                this.thingstoUpdate.billing_phone =
                document.getElementById("sphone").value;
            }
            else{
                this.thingstoUpdate.shipping_phone =
                document.getElementById("sphone").value;
            }
          }}
        />

        <button
          onClick={() => {
            this.updateBlogReady();
          }}
          className="s_update_button"
        >
          Update
        </button>
      </div>
    );
  }
}

export default AdminOrderEdit;

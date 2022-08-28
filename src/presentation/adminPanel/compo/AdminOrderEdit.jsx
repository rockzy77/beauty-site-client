import { Component } from "react";
import {
  updateOrder
} from "../../../js/adminProduct";
import { useParams } from "react-router-dom";
import { getSingleOrder } from "../../../js/products";
import { toast } from 'react-toastify';


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

  async updateOrderReady() {

    if (
      document.getElementById("baddress").value === "" ||
      document.getElementById("bcity").value === "" ||
      document.getElementById("bpincode").value === "" ||
      document.getElementById("bstate").value === "" ||
      document.getElementById("bcountry").value === "" ||
      document.getElementById("bphone").value === "" ||
      document.getElementById("bemail").value === ""
    ) {
      alert("Please fill all the billing details");
      return;
    } else {
      if ("billing_phone" in this.thingstoUpdate) {
        if (this.thingstoUpdate["billing_phone"].length !== 10 || isNaN(this.thingstoUpdate["billing_phone"])) {
          alert("Please enter a valid phone number");
          return;
        }
      }

      if ("billing_email" in this.thingstoUpdate) {
        if (!this.thingstoUpdate["billing_email"].includes("@")) {
          alert("Please enter a valid email");
          return;
        }
      }

      if ("billing_pincode" in this.thingstoUpdate) {
        if (this.thingstoUpdate["billing_pincode"].length !== 6 || isNaN(this.thingstoUpdate["billing_pincode"])) {
          alert("Please enter a valid pincode");
          return;
        }
      }

      if (!document.getElementById("billingisshipping").checked) {
        if (
          document.getElementById("saddress").value === "" ||
          document.getElementById("scity").value === "" ||
          document.getElementById("spincode").value === "" ||
          document.getElementById("sstate").value === "" ||
          document.getElementById("scountry").value === "" ||
          document.getElementById("sphone").value === "" ||
          document.getElementById("semail").value === ""
        ) {
          alert("Please fill all the shipping details");
          return;
        }
        else{
          if ("shipping_phone" in this.thingstoUpdate) {
            if (this.thingstoUpdate["shipping_phone"].length !== 10 || isNaN(this.thingstoUpdate["shipping_phone"])) {
              alert("Please enter a valid phone number");
              return;
            }
          }
    
          if ("shipping_email" in this.thingstoUpdate) {
            if (!this.thingstoUpdate["shipping_email"].includes("@")) {
              alert("Please enter a valid email");
              return;
            }
          }
    
          if ("shipping_pincode" in this.thingstoUpdate) {
            if (this.thingstoUpdate["shipping_pincode"].length !== 6 || isNaN(this.thingstoUpdate["shipping_pincode"])) {
              alert("Please enter a valid pincode");
              return;
            }
          }
        }
      }
    }

    this.thingstoUpdate.order_id = this.props.oid;

    var det = await updateOrder(this.thingstoUpdate);
    if(det["success"]){
      toast.success('Order updated successfully')
    }
    else{
      toast.error('Error: '+det["message"])
    }
  }

  async componentDidMount() {
    var det = await getSingleOrder(this.props.oid);
    if (det["success"]) {
      this.order = det["order_details"];
    }
    this.setState({});
  }

  render() {
    return (
      <div className="adminProductEdit">
        <div className="s_mini_nav">
          <h6>Edit Order</h6>
        </div>
        <br />
        <p>Pickup Location: </p>
        <input
          name="plocation"
          id="plocation"
          placeholder="Enter Pickup Location"
          cols="30"
          defaultValue={this.order.pickup_location}
          rows="10"
          onChange={() => {
            this.thingstoUpdate.pickup_location =
              document.getElementById("plocation").value;
          }}
        />
        <br />
        <br />
        <p>Billing Address: </p>
        <input
          name="baddress"
          id="baddress"
          placeholder="Enter Billing Address"
          cols="30"
          defaultValue={this.order.billing_address}
          rows="10"
          onChange={() => {
            this.thingstoUpdate.billing_address =
              document.getElementById("baddress").value;
          }}
        />
        <br />
        <br />
        <p>Billing Address 2: </p>
        <input
          name="baddress2"
          id="baddress2"
          cols="30"
          placeholder="Enter Billing Address 2"
          defaultValue={this.order.billing_address_2}
          rows="10"
          onChange={() => {
            this.thingstoUpdate.billing_address_2 =
              document.getElementById("baddress2").value;
          }}
        />

        <br />
        <br />
        <p>Billing City: </p>
        <input
          name="bcity"
          id="bcity"
          placeholder="Enter Billing City"
          cols="30"
          defaultValue={this.order.billing_city}
          rows="10"
          onChange={() => {
            this.thingstoUpdate.billing_city =
              document.getElementById("bcity").value;
          }}
        />

        <br />
        <br />
        <p>Billing Pincode: </p>
        <input
          name="bpincode"
          id="bpincode"
          placeholder="Enter Billing Pincode"
          cols="30"
          defaultValue={this.order.billing_pincode}
          rows="10"
          onChange={() => {
            this.thingstoUpdate.billing_pincode =
              document.getElementById("bpincode").value;
          }}
        />

        <br />
        <br />
        <p>Billing State: </p>
        <select
          onChange={() => {
            this.thingstoUpdate.billing_state =
              document.getElementById("bstate").value;
          }}
          name="bstate"
          id="bstate"
        >
          <option
            defaultValue={this.order.billing_state}
            value="Andhra Pradesh"
          >
            Andhra Pradesh
          </option>
          <option value="Arunachal Pradesh">Arunachal Pradesh</option>
          <option value="Assam">Assam</option>
          <option value="Bihar">Bihar</option>
          <option value="Chhattisgarh">Chhattisgarh</option>
          <option value="Goa">Goa</option>
          <option value="Gujarat">Gujarat</option>
          <option value="Haryana">Haryana</option>
          <option value="Himachal Pradesh">Himachal Pradesh</option>
          <option value="Jharkhand">Jharkhand</option>
          <option value="Karnataka">Karnataka</option>
          <option value="Kerala">Kerala</option>
          <option value="Madhya Pradesh">Madhya Pradesh</option>
          <option value="Maharashtra">Maharashtra</option>
          <option value="Manipur">Manipur</option>
          <option value="Meghalaya">Meghalaya</option>
          <option value="Mizoram">Mizoram</option>
          <option value="Nagaland">Nagaland</option>
          <option value="Odisha">Odisha</option>
          <option value="Punjab">Punjab</option>
          <option value="Rajasthan">Rajasthan</option>
          <option value="Sikkim">Sikkim</option>
          <option value="Tamil Nadu">Tamil Nadu</option>
          <option value="Tripura">Tripura</option>
          <option value="Uttar Pradesh">Uttar Pradesh</option>
          <option value="Uttarakhand">Uttarakhand</option>
          <option value="West Bengal">West Bengal</option>
        </select>

        <br />
        <br />
        <p>Billing Country: </p>
        <input
          name="bcountry"
          id="bcountry"
          cols="30"
          defaultValue={this.order.billing_country}
          rows="10"
          onChange={() => {
            this.thingstoUpdate.billing_country =
              document.getElementById("bcountry").value;
          }}
        />

        <br />
        <br />
        <p>Billing Email: </p>
        <input
          name="bemail"
          id="bemail"
          cols="30"
          defaultValue={this.order.billing_email}
          rows="10"
          onChange={() => {
            this.thingstoUpdate.billing_email =
              document.getElementById("bemail").value;
          }}
        />

        <br />
        <br />
        <p>Billing Phone: </p>
        <input
          name="bphone"
          id="bphone"
          cols="30"
          defaultValue={this.order.billing_phone}
          rows="10"
          onChange={() => {
            this.thingstoUpdate.billing_phone =
              document.getElementById("bphone").value;
          }}
        />

        <br />
        <br />
        <input
          defaultChecked
          onChange={() => {
            if (!document.getElementById("billingisshipping").checked) {
              this.thingstoUpdate.shipping_is_billing = 0;
              document.getElementById("shipping-cont").style.display = "block";
            } else {
              this.thingstoUpdate.shipping_is_billing = 1;
              document.getElementById("shipping-cont").style.display = "none";
            }
          }}
          id="billingisshipping"
          type="checkbox"
          name=""
        />
        <span className="shippingsbillingspan">
          Use Billing address as Shipping address
        </span>

        <div id="shipping-cont">
          <br />
          <p>Shipping Address: </p>
          <input
            name="saddress"
            id="saddress"
            placeholder="Enter Shipping Address"
            cols="30"
            defaultValue={this.order.shipping_address}
            rows="10"
            onChange={() => {
              this.thingstoUpdate.shipping_address =
                document.getElementById("saddress").value;
            }}
          />
          <br />
          <br />
          <p>Shipping Address 2: </p>
          <input
            name="saddress2"
            id="saddress2"
            cols="30"
            placeholder="Enter Shipping Address 2"
            defaultValue={this.order.shipping_address_2}
            rows="10"
            onChange={() => {
              this.thingstoUpdate.shipping_address_2 =
                document.getElementById("saddress2").value;
            }}
          />

          <br />
          <br />
          <p>Shipping City: </p>
          <input
            name="scity"
            id="scity"
            placeholder="Enter Shipping City"
            cols="30"
            defaultValue={this.order.shipping_city}
            rows="10"
            onChange={() => {
              this.thingstoUpdate.shipping_city =
                document.getElementById("scity").value;
            }}
          />

          <br />
          <br />
          <p>Shipping Pincode: </p>
          <input
            name="spincode"
            id="spincode"
            placeholder="Enter Shipping Pincode"
            cols="30"
            defaultValue={this.order.shipping_pincode}
            rows="10"
            onChange={() => {
              this.thingstoUpdate.shipping_pincode =
                document.getElementById("spincode").value;
            }}
          />

          <br />
          <br />
          <p>Shipping State: </p>
          <select
            onChange={() => {
              this.thingstoUpdate.shipping_state =
                document.getElementById("sstate").value;
            }}
            name="sstate"
            id="sstate"
          >
            <option
              defaultValue={this.order.shipping_state}
              value="Andhra Pradesh"
            >
              Andhra Pradesh
            </option>
            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
            <option value="Assam">Assam</option>
            <option value="Bihar">Bihar</option>
            <option value="Chhattisgarh">Chhattisgarh</option>
            <option value="Goa">Goa</option>
            <option value="Gujarat">Gujarat</option>
            <option value="Haryana">Haryana</option>
            <option value="Himachal Pradesh">Himachal Pradesh</option>
            <option value="Jharkhand">Jharkhand</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Kerala">Kerala</option>
            <option value="Madhya Pradesh">Madhya Pradesh</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Manipur">Manipur</option>
            <option value="Meghalaya">Meghalaya</option>
            <option value="Mizoram">Mizoram</option>
            <option value="Nagaland">Nagaland</option>
            <option value="Odisha">Odisha</option>
            <option value="Punjab">Punjab</option>
            <option value="Rajasthan">Rajasthan</option>
            <option value="Sikkim">Sikkim</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Tripura">Tripura</option>
            <option value="Uttar Pradesh">Uttar Pradesh</option>
            <option value="Uttarakhand">Uttarakhand</option>
            <option value="West Bengal">West Bengal</option>
          </select>

          <br />
          <br />
          <p>Shipping Country: </p>
          <input
            name="scountry"
            id="scountry"
            cols="30"
            defaultValue={this.order.shipping_country}
            rows="10"
            onChange={() => {
              this.thingstoUpdate.shipping_country =
                document.getElementById("scountry").value;
            }}
          />

          <br />
          <br />
          <p>Shipping Email: </p>
          <input
            name="semail"
            id="semail"
            cols="30"
            defaultValue={this.order.shipping_email}
            rows="10"
            onChange={() => {
              this.thingstoUpdate.shipping_email =
                document.getElementById("semail").value;
            }}
          />

          <br />
          <br />
          <p>Shipping Phone: </p>
          <input
            name="sphone"
            id="sphone"
            cols="30"
            defaultValue={this.order.shipping_phone}
            rows="10"
            onChange={() => {
              this.thingstoUpdate.shipping_phone =
                document.getElementById("sphone").value;
            }}
          />

          <br />
          <br />
        </div>
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
              this.updateOrderReady();
            }
            
            
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

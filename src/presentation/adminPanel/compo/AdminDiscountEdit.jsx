import { Component } from "react";
import {
  getSingleDiscount,
  updateDiscount
} from "../../../js/adminProduct";
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';


const AdminDiscountEdit = () => {
  const { name } = useParams();
  return <AdminDiscountEditPanel name={name} />;
};

class AdminDiscountEditPanel extends Component {
  constructor(props) {
    super(props);
    this.discount = {};
    this.thingstoUpdate = {};
  }

  async updateDiscountReady() {
    var made = await updateDiscount(this.thingstoUpdate, this.discount.name);
    if (made["success"]) {
      toast.success('Discount info updated successfully.');
    } else {
      toast.error('Something went wrong!');
    }
  }

  async componentDidMount() {
    var det = await getSingleDiscount(this.props.name);
    if (det["success"]) {
      var discount = det["discount"];
      this.discount.name = discount["name"];
      this.discount.is_percent = discount["is_percent"];
      this.discount.discount_percent = discount["discount_percent"];
      this.discount.discount_amount = discount["discount_amount"];
      this.discount.condition_amount = discount["condition_amount"];
      this.discount.limit = discount["limit"];
      if (this.discount.is_percent === 1) {
        document.getElementById("isPerc").checked = true;
        document.getElementById("disperccont").style.display = "block";
        document.getElementById("disamountccont").style.display = "none";
      }
    }
    this.setState({});
  }

  render() {
    return (
      <div className="createDiscount">
        <div className="s_mini_nav">
          <h6>Edit Discount</h6>
        </div>

        <br />
        <br />
        <p>Discount name (Required): </p>
        <input
          name="disname"
          type="text"
          readOnly
          placeholder="Discount Name"
          defaultValue={this.discount.name !== undefined ? this.discount.name : ""}
          id="disname"
          onChange={() => {
            this.thingstoUpdate.name = document.getElementById("disname").value;
            // this.setState({});
          }}
        />

        <br />
        <br />
        <input
          onChange={() => {
            if (document.getElementById("isPerc").checked) {
              this.thingstoUpdate.is_percent = 1;
              document.getElementById("disperccont").style.display = "block";
              document.getElementById("disamountccont").style.display = "none";
            } else {
              this.thingstoUpdate.is_percent = 0;
              document.getElementById("disperccont").style.display = "none";
              document.getElementById("disamountccont").style.display = "block";
            }
          }}
          type="checkbox"
          name="isPerc"
          id="isPerc"
        />
        <span>Percentage Discount</span>

        <div style={{ display: "none" }} id="disperccont">
          <br />
          <p>Discount Percentage (Required): </p>
          <input
            name="disperc"
            type="number"
            defaultValue={
              this.discount.discount_percent !== undefined
                ? this.discount.discount_percent
                : ""
            }
            id="disperc"
            placeholder="Discount Percentage"
            onChange={() => {
              this.thingstoUpdate.discount_percent = parseInt(
                parseInt(document.getElementById("disperc").value)
              );
              // this.setState({});
            }}
          />
        </div>
        <div id="disamountccont">
          <br />
          <p>Discount Amount (Required): </p>
          <input
            name="disamount"
            type="number"
            placeholder="Discount Amount"
            defaultValue={
              this.discount.discount_amount !== undefined
                ? this.discount.discount_amount
                : ""
            }
            id="disamount"
            onChange={() => {
              this.thingstoUpdate.discount_amount = parseInt(
                parseInt(document.getElementById("disamount").value)
              );
              // this.setState({});
            }}
          />
        </div>

        <br />
        <p>Condition Amount (Required): </p>
        <input
          name="condamount"
          type="number"
          placeholder="Condition Amount"
          defaultValue={
            this.discount.condition_amount !== undefined
              ? this.discount.condition_amount
              : ""
          }
          id="condamount"
          onChange={() => {
            this.thingstoUpdate.condition_amount = parseInt(
              parseInt(document.getElementById("condamount").value)
            );
            // this.setState({});
          }}
        />

        <br />
        <br />
        <p>Limit (Required): </p>
        <input
          name="limit"
          type="number"
          defaultValue={this.discount.limit !== undefined ? this.discount.limit : ""}
          placeholder="No of times coupon can be used"
          id="limit"
          onChange={() => {
            this.thingstoUpdate.limit = parseInt(
              parseInt(document.getElementById("limit").value)
            );
            // this.setState({});
          }}
        />

        <button
          onClick={() => {
            if (Object.keys(this.thingstoUpdate).length === 0) {
              alert("Nothing to update");
            }
            else{
              for (var key in this.thingstoUpdate) {
                if (this.thingstoUpdate[key] === "") {
                  alert("Please fill all fields");
                  return;
                }
              }
              this.updateDiscountReady();
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

export default AdminDiscountEdit;

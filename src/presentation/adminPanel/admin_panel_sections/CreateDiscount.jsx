import { Component } from "react";
import { createDiscount } from "../../../js/adminProduct";
import { toast } from 'react-toastify';


class CreateDiscounts extends Component {
  constructor(props) {
    super(props);
    this.thingstoCreate = {
      is_percent: 0,
    };
  }

  async createDiscountsReady() {
    if (this.thingstoCreate.is_percent === 1) {
      if (this.thingstoCreate.discount_amount !== undefined) {
        delete this.thingstoCreate.discount_amount;
      }
    } else {
      if (this.thingstoCreate.discount_percent !== undefined) {
        delete this.thingstoCreate.discount_percent;
      }
    }

    var made = await createDiscount(this.thingstoCreate);
    if (made["success"]) {
      toast.success("Discount created successfully")
    } else {
      toast.error('Error: '+made.message)
    }
  }

  render() {
    return (
      <section className="createDiscount">
        <br />
        <br />
        <p>Discount name (Required): </p>
        <input
          name="disname"
          type="text"
          placeholder="Discount Name"
          id="disname"
          onChange={() => {
            this.thingstoCreate.name = document.getElementById("disname").value;
            // this.setState({});
          }}
        />

        <br />
        <br />
        <input
          onChange={() => {
            if (document.getElementById("isPerc").checked) {
              this.thingstoCreate.is_percent = 1;
              document.getElementById("disperccont").style.display = "block";
              document.getElementById("disamountccont").style.display = "none";
            } else {
              this.thingstoCreate.is_percent = 0;
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
            id="disperc"
            placeholder="Discount Percentage"
            onChange={() => {
              this.thingstoCreate.discount_percent = parseInt(
                document.getElementById("disperc").value
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
            id="disamount"
            onChange={() => {
              this.thingstoCreate.discount_amount = parseInt(
                document.getElementById("disamount").value
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
          id="condamount"
          onChange={() => {
            this.thingstoCreate.condition_amount = parseInt(
              document.getElementById("condamount").value
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
          placeholder="No of times coupon can be used"
          id="limit"
          onChange={() => {
            this.thingstoCreate.limit = parseInt(
              document.getElementById("limit").value
            );
            // this.setState({});
          }}
        />

        <button
          onClick={() => {
            if (this.thingstoCreate.name === undefined) {
              alert("Please enter a name for the discount");
              return;
            }  else if (this.thingstoCreate.condition_amount === undefined) {
              alert("Please enter a condition amount");
              return;
            } 
            else if (this.thingstoCreate.limit === undefined) {
              alert("Please enter a limit");
              return;
            }
            else if (this.thingstoCreate.is_percent === 1) {
              if (this.thingstoCreate.discount_percent === undefined) {
                alert("Please enter a percentage discount");
                return;
              }
            } else if (this.thingstoCreate.is_percent === 0) {
              if (this.thingstoCreate.discount_amount === undefined) {
                alert("Please enter a amount discount");
                return;
              }
            }
              this.createDiscountsReady()
            

           
          }}
          className="s_update_button"
        >
          Create Discount
        </button>
      </section>
    );
  }
}

export default CreateDiscounts;

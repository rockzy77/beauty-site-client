import { Component } from "react";
import { GiConsoleController } from "react-icons/gi";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import NavBar from "../../components/NavBar";
import {
  applyDiscount,
  createShipRocketOrder,
  discountUse,
  getOrderId,
  verifyOrder,
} from "../../js/payment";

const Checkout = (props) => {
  const location = useLocation();
  const data = location.state;
  console.log(data);
  const amount = data.amount;
  const cart_items = data.cart_data;
  const totalHeight = data.totalHeight;
  const totalLength = data.totalLength;
  const totalBreadth = data.totalBreadth;
  const totalWeight = data.totalWeight;
  var navigate = useNavigate();
  var razorpay_payment_id = "";
  var razorpay_order_id = "";
  var razorpay_signature = "";
  var orderId;
  var currency;
  var delivery = data.shipping;
  var promotionApplied = "";
  var isPromotionApplied = true;
  var discountglobal = 0;
  var totalAmount = data.totalAmount;

  async function completeOrder(orderMethod) {
    var idone = Math.floor(100000 + Math.random() * 900000);
    var idtwo = Math.floor(100000 + Math.random() * 900000);
    var idthree = Math.floor(100000 + Math.random() * 900000);
    var o_items = [];
    var d = new Date(),
      dformat =
        [d.getFullYear(), d.getMonth() + 1, d.getDate()].join("-") +
        " " +
        [d.getHours(), d.getMinutes()].join(":");
    for(var i=0;i<cart_items.length;i++){
      var item = {
        name: cart_items[i].productName,
        sku: cart_items[i].productId,
        selling_price: cart_items[i].productPrice.toString(),
        units: cart_items[i].quantity.toString(),
      }
      console.log(item);
      o_items.push(item);
    }    
    var orderMap = {
      order_id: idone.toString() + idtwo.toString() + idthree.toString(),
      order_date: dformat,
      pickup_location: "Bhanu",
      billing_customer_name: document.getElementById("billing-fname").value,
      billing_last_name: document.getElementById("billing-lname").value,
      billing_address: document.getElementById("billing-addr").value,
      billing_address_2: document.getElementById("billing-addr2").value,
      billing_city: document.getElementById("billing-city").value,
      billing_pincode: document.getElementById("billing-pincode").value,
      billing_state: document.getElementById("billing-state").value,
      billing_country: document.getElementById("billing-country").value,
      billing_email: document.getElementById("billing-email").value,
      billing_phone: document.getElementById("billing-phone").value,
      order_items: o_items,
      payment_method: orderMethod,
      sub_total: parseInt(parseInt(totalAmount) - parseInt(discountglobal)).toString(),
      length: totalLength.toString(),
      breadth: totalBreadth.toString(),
      height: totalHeight.toString(),
      weight: totalWeight.toString(),
    };
   
    if (document.getElementById("shippingisbilling").checked) {
      orderMap.shipping_is_billing = 1;
    } else {
      orderMap.shipping_is_billing = 0;
      orderMap.shipping_customer_name =
        document.getElementById("shipping-fname").value;
      orderMap.shipping_last_name =
        document.getElementById("shipping-lname").value;
      orderMap.shipping_address =
        document.getElementById("shipping-addr").value;
      orderMap.shipping_address_2 =
        document.getElementById("shipping-addr2").value;
      orderMap.shipping_city = document.getElementById("shipping-city").value;
      orderMap.shipping_pincode =
        document.getElementById("shipping-pincode").value;
      orderMap.shipping_state = document.getElementById("shipping-state").value;
      orderMap.shipping_country =
        document.getElementById("shipping-country").value;
      orderMap.shipping_email = document.getElementById("shipping-email").value;
      orderMap.shipping_phone = document.getElementById("shipping-phone").value;
    }
    console.log(orderMap);
    var made = await createShipRocketOrder(orderMap);
    console.log(made["success"]);
    if (made["success"]) {
      var made = await discountUse(promotionApplied);
      navigate("/succ");
    } else {
      navigate("/fail/order");
    }
  }

  async function displayRazorPay() {
    var orderStatus = await getOrderId(
      parseInt(parseInt(totalAmount) - parseInt(discountglobal))
    );
    if (orderStatus[0] == true) {
      orderId = orderStatus[1].id;
      totalAmount = orderStatus[1].amount;
      currency = orderStatus[1].currency;
    }
    const res = await loadRazorPay();
    if (!res) {
      alert("Razorpay not working rn");
      return;
    }
    var options = {
      key: "rzp_test_j2FX8uDCdlDEyU",
      currency: currency,
      amount: totalAmount.toString(),
      name: "Reap Official",
      description: "Product Payment",
      order_id: orderId,
      handler: async function (response) {
        razorpay_payment_id = response.razorpay_payment_id;
        razorpay_order_id = response.razorpay_order_id;
        razorpay_signature = response.razorpay_signature;
        console.log(razorpay_order_id);
        var success = await verifyOrder(
          razorpay_payment_id,
          razorpay_order_id,
          razorpay_signature
        );
        if (success) {
          completeOrder('Prepaid');
        } else {
          navigate("/fail/payment");
        }
      },
      theme: {
        color: "#777fa8",
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
    document.getElementById("checkpayment").disabled = false;
  }
  function loadRazorPay() {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }
  return (
    <div className="checkout">
      <NavBar isLoggedIn={true} />
      <div className="checkout-row">
        <div className="checkout-form-cont">
          <br />
          <br />
          <br />
          <h3 className="checkoutitle">Reap Official</h3>
          <div className="checkout-form">
            <h5>Billing Address</h5>
            <input
              type="text"
              name="country"
              placeholder="Country/Region"
              id="billing-country"
            />{" "}
            <br />
            <input
              type="text"
              name="fname"
              placeholder="First Name"
              id="billing-fname"
            />{" "}
            <br />
            <input
              type="text"
              name="fname"
              placeholder="Last Name"
              id="billing-lname"
            />{" "}
            <br />
            <input
              type="text"
              name="addr"
              placeholder="Address"
              id="billing-addr"
            />{" "}
            <br />
            <input
              type="text"
              name="addr"
              placeholder="Address 2"
              id="billing-addr2"
            />{" "}
            <br />
            <input
              type="text"
              name="appsuite"
              placeholder="Appartment, suite, etc. (optional)"
              id="billing-appsuite"
            />{" "}
            <br />
            <div className="grid-input">
              <input
                type="text"
                name="city"
                placeholder="City"
                className="inputrow"
                id="billing-city"
              />
              <select name="state" id="billing-state">
                <option value="Andhra Pradesh">Andhra Pradesh</option>
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
              <input
                type="number"
                name="pincode"
                placeholder="PIN Code"
                className="inputrow"
                id="billing-pincode"
              />{" "}
              <br />
            </div>
            <input
              type="phone"
              name="phone"
              placeholder="Phone"
              id="billing-phone"
            />{" "}
            <br />
            <input
              type="email"
              name="phone"
              placeholder="Email"
              id="billing-email"
            />{" "}
            <br />
            <br />
            <div className="shpngisblngcont">
              <input
                defaultChecked
                onChange={(value) => {
                  var checked = value.target.checked;
                  if (checked) {
                    document.getElementById("shipping").style.display = "none";
                  } else {
                    document.getElementById("shipping").style.display = "block";
                  }
                }}
                type="checkbox"
                name="shippingisbilling"
                id="shippingisbilling"
              />
              <span>Use Billing address as Shipping address</span>
            </div>
            <br />
            <div id="shipping">
              <br />
              <h5>Shipping Address</h5>
              <input
                type="text"
                name="country"
                placeholder="Country/Region"
                id="shipping-country"
              />{" "}
              <br />
              <input
                type="text"
                name="fname"
                placeholder="First Name"
                id="shipping-fname"
              />{" "}
              <br />
              <input
                type="text"
                name="fname"
                placeholder="Last Name"
                id="shipping-lname"
              />{" "}
              <br />
              <input
                type="text"
                name="addr"
                placeholder="Address"
                id="shipping-addr"
              />{" "}
              <br />
              <input
                type="text"
                name="addr"
                placeholder="Address 2"
                id="shipping-addr2"
              />{" "}
              <br />
              <input
                type="text"
                name="appsuite"
                placeholder="Appartment, suite, etc. (optional)"
                id="shipping-appsuite"
              />{" "}
              <br />
              <div className="grid-input">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  className="inputrow"
                  id="shipping-city"
                />
                <select name="state" id="shipping-state">
                <option value="Andhra Pradesh">Andhra Pradesh</option>
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
                <input
                  type="number"
                  name="pincode"
                  placeholder="PIN Code"
                  className="inputrow"
                  id="shipping-pincode"
                />{" "}
                <br />
              </div>
              <input
                type="phone"
                name="phone"
                placeholder="Phone"
                id="shipping-phone"
              />{" "}
              <br />
              <input
                type="email"
                name="phone"
                placeholder="Email"
                id="shipping-email"
              />{" "}
              <br />
              <br />
            </div>
          </div>
        </div>

        <div className="checkout-discount-cont">
          <br />
          <br />
          <br />
          <h3>Have a discount code?</h3>
          <br />
          <input type="text" id="discountvalue" placeholder="Discount Code" />
          <button
            onClick={async function () {
              promotionApplied = document.getElementById("discountvalue").value;
              if (promotionApplied != "") {
                var made = await applyDiscount(promotionApplied);
                if (made["success"]) {
                  var discount = made["discount"];
                  isPromotionApplied = true;
                  promotionApplied = discount.name;
                  if (discount.is_percent == 0) {
                    document.getElementById("discountSpan").innerHTML =
                      "Rs " + discount.discount_amount;
                    document.getElementById("totalAmount").innerHTML =
                      "Rs " +
                      (parseInt(totalAmount) -
                        parseInt(discount.discount_amount));
                    discountglobal = discount.discount_amount;
                    alert("Discount added.");
                  } else {
                    var discountmade = parseInt(
                      (discount.discount_percent / 100) * parseInt(totalAmount)
                    );
                    document.getElementById("discountSpan").innerHTML =
                      "Rs " + discountmade;
                    document.getElementById("totalAmount").innerHTML =
                      "Rs " + (parseInt(totalAmount) - parseInt(discountmade));
                    discountglobal = discountmade;
                    alert("Discount added.");
                  }
                } else {
                  document.getElementById("discountSpan").innerHTML = "Rs 0";
                  document.getElementById("totalAmount").innerHTML =
                    "Rs " + parseInt(totalAmount);
                  document.getElementById("discountvalue").value = "";
                  alert(made["message"]);
                }
              }
            }}
          >
            Apply
          </button>
          <br />
          <br />
          <div className="line"></div>
          <br />
          <div className="amount-box">
            <p>Items: </p>
            <p>{cart_items != undefined ? cart_items.length : 0}</p>
          </div>

          <div className="amount-box">
            <p>Delivery: </p>
            <p>Rs {delivery}</p>
          </div>

          <div className="amount-box">
            <p>Total: </p>
            <p>Rs {parseInt(totalAmount)}</p>
          </div>

          <div className="amount-box promotion-amount">
            <p>Discount: </p>
            <p id="discountSpan">Rs 0</p>
          </div>

          <div className="line"></div>
          <br />
          <div className="amount-box">
            <p>Order Total: </p>
            <p id="totalAmount">Rs {parseInt(totalAmount)}</p>
          </div>
          <br />

          <input
            onChange={() => {
              if (document.getElementById("checkCOD").checked) {
                document.getElementById("completeOrder").style.display =
                  "block";
                document.getElementById("checkpayment").style.display = "none";
              } else {
                document.getElementById("completeOrder").style.display = "none";
                document.getElementById("checkpayment").style.display = "block";
              }
            }}
            type="checkbox"
            name="checkCOD"
            id="checkCOD"
          />
          <span className="checkSpan">Use Cash On Delivery (COD)</span>
          <br />

          <button
            id="completeOrder"
            onClick={() => {
              document.getElementById("completeOrder").disabled = true;
              completeOrder('COD');
            }}
          >
            Complete Order
          </button>

          <button
            id="checkpayment"
            onClick={() => {
              document.getElementById("checkpayment").disabled = true;
              displayRazorPay();
            }}
          >
            Continue to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

import { Link, useLocation, useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
import {
  applyDiscount,
  checkShippingCharge,
  createShipRocketOrder,
  discountUse,
  getOrderId,
  verifyOrder,
} from "../../js/payment";
import { sendMail } from "../../js/sendMail";
import { toast } from "react-toastify";
import $ from "jquery";
import { createCookie } from "../../js/cookies";
import { useDispatch } from "react-redux";
import { getData } from "../../js/myStore";
import trackFB from "../../js/trackFB";

const Checkout = (props) => {
  const location = useLocation();
  var dispatch = useDispatch();
  const data = location.state;
  console.log(data);
  const amount = data.amount;
  const cart_items = data.cart_data;
  const totalHeight = data.totalHeight;
  const totalLength = data.totalLength;
  const totalBreadth = data.totalBreadth;
  const totalWeight = data.totalWeight;
  const morethanthree = data.morethanthree;
  const backupamount = data.backupamount;
  var navigate = useNavigate();
  var razorpay_payment_id = "";
  var razorpay_order_id = "";
  var razorpay_signature = "";
  var orderId;
  var currency;
  var delivery = 0;
  var promotionApplied = "";
  var isPromotionApplied = true;
  var discountglobal = 0;
  var total = data.totalAmount;
  var backupTotalAmount = data.totalAmount;
  var totalAmount = data.totalAmount;
  var inbuiltoffer = morethanthree ? true : false;
  console.log('here==================>')
  console.log(inbuiltoffer);
  console.log(morethanthree);

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
    for (var i = 0; i < cart_items.length; i++) {
      var item = {
        name: cart_items[i].productName,
        sku: cart_items[i].productId,
        selling_price: cart_items[i].productPrice.toString(),
        units: cart_items[i].quantity.toString(),
      };
      console.log(item);
      o_items.push(item);
    }
    var whichOffer = '';
    var whichOfferAmount = 0;
    if(promotionApplied !== ''){
      if(inbuiltoffer){
        whichOffer = 'reapDefault';
        whichOfferAmount = backupamount * 0.1;
      }
      else{
        whichOffer = promotionApplied;
        whichOfferAmount = discountglobal;
      }
    }
    else{
      if(morethanthree){
        whichOffer = 'reapDefault';
        whichOfferAmount = backupamount * 0.1;
      }
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
      sub_total: totalAmount.toString(),
      length: totalLength.toString(),
      breadth: totalBreadth.toString(),
      height: totalHeight.toString(),
      weight: totalWeight.toString(),
      deliveryCharge: delivery.toString(),
      discountCode: whichOffer,
      discountAmount: whichOfferAmount.toString()
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
      if (promotionApplied !== "") {
        var madew = await discountUse(promotionApplied);
      }
      var subject = "Your order has been placed";
      var body = `Your order was successfully placed. \n
      Invoice \n
      ---------------\n
      Order ID: ${orderMap.order_id} \n
      Order Date: ${orderMap.order_date} \n
      No of items: ${orderMap.order_items.length} \n
      Billing Customer Name: ${orderMap.billing_customer_name} \n
      Billing Last Name: ${orderMap.billing_last_name} \n
      Billing Address: ${orderMap.billing_address} \n
      Billing Address 2: ${orderMap.billing_address_2} \n
      Billing City: ${orderMap.billing_city} \n
      Billing Pincode: ${orderMap.billing_pincode} \n
      Billing State: ${orderMap.billing_state} \n
      Billing Country: ${orderMap.billing_country} \n
      Billing Email: ${orderMap.billing_email} \n
      Billing Phone: ${orderMap.billing_phone} \n
      Payment Method: ${orderMap.payment_method} \n
      Total Amount: ${orderMap.sub_total} \n
      ---------------\n
      \n
      Please visit our website to track your order.\n
      Thank you for shopping with us.`;
      await sendMail(subject, body);
      createCookie("cartNumber", 0, 1);
      dispatch(getData(0));
      navigate("/succ");
    } else {
      navigate("/fail/order");
    }
  }

  async function displayRazorPay() {
    var orderStatus = await getOrderId(parseInt(totalAmount));
    if (orderStatus[0] === true) {
      orderId = orderStatus[1].id;
      totalAmount = parseInt(parseInt(orderStatus[1].amount) / 100);
      console.log(totalAmount);
      currency = orderStatus[1].currency;
    }

    const res = await loadRazorPay();
    if (!res) {
      toast.error("Razorpay not working right now");
      return;
    }

    var options = {
      key: "rzp_live_Iamb707ufEa7d1",
      currency: currency,
      amount: totalAmount.toString(),
      name: "Reap Official",
      description: "Product Payment",
      order_id: orderId,
      handler: async function (response) {
        razorpay_payment_id = response.razorpay_payment_id;
        razorpay_order_id = response.razorpay_order_id;
        razorpay_signature = response.razorpay_signature;
        var idone = Math.floor(100000 + Math.random() * 900000);
        var idtwo = Math.floor(100000 + Math.random() * 900000);
        var idthree = Math.floor(100000 + Math.random() * 900000);
        var o_items = [];
        var d = new Date(),
          dformat =
            [d.getFullYear(), d.getMonth() + 1, d.getDate()].join("-") +
            " " +
            [d.getHours(), d.getMinutes()].join(":");
        for (var i = 0; i < cart_items.length; i++) {
          var item = {
            name: cart_items[i].productName,
            sku: cart_items[i].productId,
            selling_price: cart_items[i].productPrice.toString(),
            units: cart_items[i].quantity.toString(),
          };
          o_items.push(item);
        }
        var whichOffer = '';
        var whichOfferAmount = 0;
        if(promotionApplied !== ''){
          if(inbuiltoffer){
            whichOffer = 'reapDefault';
            whichOfferAmount = backupamount * 0.1;
          }
          else{
            whichOffer = promotionApplied;
            whichOfferAmount = discountglobal;
          }
        }
        else{
          if(morethanthree){
            whichOffer = 'reapDefault';
            whichOfferAmount = backupamount * 0.1;
          }
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
          payment_method: "Prepaid",
          sub_total: totalAmount.toString(),
          length: totalLength.toString(),
          breadth: totalBreadth.toString(),
          height: totalHeight.toString(),
          weight: totalWeight.toString(),
          deliveryCharge: delivery.toString(),
          discountCode: whichOffer,
          discountAmount: whichOfferAmount.toString()
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
          orderMap.shipping_city =
            document.getElementById("shipping-city").value;
          orderMap.shipping_pincode =
            document.getElementById("shipping-pincode").value;
          orderMap.shipping_state =
            document.getElementById("shipping-state").value;
          orderMap.shipping_country =
            document.getElementById("shipping-country").value;
          orderMap.shipping_email =
            document.getElementById("shipping-email").value;
          orderMap.shipping_phone =
            document.getElementById("shipping-phone").value;
        }
        var made = await verifyOrder(
          razorpay_payment_id,
          razorpay_order_id,
          razorpay_signature,
          orderMap
        );
        if (made.success) {
          if (promotionApplied !== "") {
            var madew = await discountUse(promotionApplied);
          }
          var subject = "Your order has been placed";
          var body = `Your order was successfully placed. \n
      Invoice \n
      ---------------\n
      Order ID: ${orderMap.order_id} \n
      Order Date: ${orderMap.order_date} \n
      No of items: ${orderMap.order_items.length} \n
      Billing Customer Name: ${orderMap.billing_customer_name} \n
      Billing Last Name: ${orderMap.billing_last_name} \n
      Billing Address: ${orderMap.billing_address} \n
      Billing Address 2: ${orderMap.billing_address_2} \n
      Billing City: ${orderMap.billing_city} \n
      Billing Pincode: ${orderMap.billing_pincode} \n
      Billing State: ${orderMap.billing_state} \n
      Billing Country: ${orderMap.billing_country} \n
      Billing Email: ${orderMap.billing_email} \n
      Billing Phone: ${orderMap.billing_phone} \n
      Payment Method: ${orderMap.payment_method} \n
      Total Amount: ${orderMap.sub_total} \n
      ---------------\n
      \n
      Please visit our website to track your order.\n
      Thank you for shopping with us.`;
          await sendMail(subject, body);
          createCookie("cartNumber", 0, 1);
          dispatch(getData(0));
          navigate("/succ");
        } else {
          if (
            made.message === "The payment was not successful.Please try again!"
          ) {
            navigate("/fail/payment");
          } else {
            navigate("/fail/order");
          }
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
          <br />
          <h3 className="checkoutitle">Reap Official</h3>
          <div className="checkout-form">
            <h5>Billing Address</h5>
            <input
              type="text"
              name="country"
              defaultValue={'India'}
              disabled
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
              placeholder="Last Name (Optional)"
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
              placeholder="Address 2 (Optional)"
              id="billing-addr2"
            />{" "}
            <br />
            <input
              type="text"
              name="appsuite"
              placeholder="Appartment, suite, etc. (Optional)"
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
                <option value="Telangana">Telangana</option>
                <option value="Tripura">Tripura</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Uttarakhand">Uttarakhand</option>
                <option value="West Bengal">West Bengal</option>
              </select>
              <input
                type="number"
                name="pincode"
                placeholder="PIN Code"
                onChange={async (e) => {
                  e.preventDefault();
                  if (document.getElementById("shippingisbilling").checked) {
                    var pincode =
                      document.getElementById("billing-pincode").value;
                    if (pincode.length === 6) {
                      var map = {
                        pickup_postcode: "500087",
                        delivery_postcode: pincode,
                        weight: totalWeight,
                        cod: document.getElementById("checkCOD").checked
                          ? 1
                          : 0,
                      };
                      var made = await checkShippingCharge(map);
                      if (made.success) {
                        delivery = made.result.shipping_charge;
                        totalAmount = backupTotalAmount;
                        totalAmount -= discountglobal;
                        totalAmount += delivery;
                        document.getElementById("shippingSpan").innerHTML =
                          "Rs " + delivery;
                        document.getElementById("totalAmount").innerHTML =
                          "Rs " + totalAmount;
                        document.getElementById("notavail").style.display =
                          "none";
                        document.getElementById(
                          "checkpayment"
                        ).disabled = false;
                        document.getElementById(
                          "completeOrder"
                        ).disabled = false;
                        console.log(made.result);
                      } else {
                        if (
                          made.message ===
                          "Cannot read property 'available_courier_companies' of undefined"
                        ) {
                          document.getElementById("notavail").style.display =
                            "block";
                          document.getElementById(
                            "checkpayment"
                          ).disabled = true;
                          document.getElementById(
                            "completeOrder"
                          ).disabled = true;
                        }
                        console.log(made.message);
                      }
                    }
                  }
                }}
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
              name="email"
              placeholder="Email"
              id="billing-email"
            />{" "}
            <br />
            <br />
            <div className="shpngisblngcont">
              <input
                defaultChecked
                onChange={async (value) => {
                  document.getElementById("checkpayment").disabled = true;
                  document.getElementById("completeOrder").disabled = true;
                  var checked = value.target.checked;
                  if (checked) {
                    document.getElementById("shipping").style.display = "none";
                    var map = {
                      pickup_postcode: "500087",
                      delivery_postcode:
                        document.getElementById("billing-pincode").value,
                      weight: totalWeight,
                      cod: document.getElementById("checkCOD").checked ? 1 : 0,
                    };
                    var made = await checkShippingCharge(map);
                    if (made.success) {
                      delivery = made.result.shipping_charge;
                      totalAmount = backupTotalAmount;
                      totalAmount -= discountglobal;
                      totalAmount += delivery;
                      document.getElementById("shippingSpan").innerHTML =
                        "Rs " + delivery;
                      document.getElementById("totalAmount").innerHTML =
                        "Rs " + totalAmount;
                      document.getElementById("notavail").style.display =
                        "none";
                      document.getElementById("checkpayment").disabled = false;
                      document.getElementById("completeOrder").disabled = false;
                      console.log(made.result);
                    } else {
                      if (
                        made.message ===
                        "Cannot read property 'available_courier_companies' of undefined"
                      ) {
                        document.getElementById("notavail").style.display =
                          "block";
                        document.getElementById("checkpayment").disabled = true;
                        document.getElementById(
                          "completeOrder"
                        ).disabled = true;
                      }
                      console.log(made.message);
                    }
                  } else {
                    document.getElementById("shipping").style.display = "block";
                    var map = {
                      pickup_postcode: "500087",
                      delivery_postcode:
                        document.getElementById("shipping-pincode").value,
                      weight: totalWeight,
                      cod: document.getElementById("checkCOD").checked ? 1 : 0,
                    };
                    var made = await checkShippingCharge(map);
                    if (made.success) {
                      delivery = made.result.shipping_charge;
                      totalAmount = backupTotalAmount;
                      totalAmount -= discountglobal;
                      totalAmount += delivery;
                      document.getElementById("shippingSpan").innerHTML =
                        "Rs " + delivery;
                      document.getElementById("totalAmount").innerHTML =
                        "Rs " + totalAmount;
                      document.getElementById("notavail").style.display =
                        "none";
                      document.getElementById("checkpayment").disabled = false;
                      document.getElementById("completeOrder").disabled = false;
                      console.log(made.result);
                    } else {
                      if (
                        made.message ===
                        "Cannot read property 'available_courier_companies' of undefined"
                      ) {
                        document.getElementById("notavail").style.display =
                          "block";
                        document.getElementById("checkpayment").disabled = true;
                        document.getElementById(
                          "completeOrder"
                        ).disabled = true;
                      }
                      console.log(made.message);
                    }
                  }
                }}
                type="checkbox"
                name="shippingisbilling"
                id="shippingisbilling"
              />
              <span>Use Billing address as Shipping address</span>
            </div>
            <br />
            <br />
            <div id="shipping">
              <br />
              <h5>Shipping Address</h5>
              <input
                type="text"
                name="country"
                placeholder="Country/Region"
                defaultValue={'India'}
                disabled
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
                placeholder="Last Name (Optional)"
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
                placeholder="Address 2 (Optional)"
                id="shipping-addr2"
              />{" "}
              <br />
              <input
                type="text"
                name="appsuite"
                placeholder="Appartment, suite, etc. (Optional)"
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
                  <option value="Telangana">Telangana</option>
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
                  onChange={async (e) => {
                    e.preventDefault();
                    var pincode =
                      document.getElementById("shipping-pincode").value;
                    if (pincode.length === 6) {
                      var map = {
                        pickup_postcode: "500087",
                        delivery_postcode: pincode,
                        weight: totalWeight,
                        cod: document.getElementById("checkCOD").checked
                          ? 1
                          : 0,
                      };
                      var made = await checkShippingCharge(map);
                      if (made.success) {
                        delivery = made.result.shipping_charge;
                        totalAmount = backupTotalAmount;
                        totalAmount -= discountglobal;
                        totalAmount += delivery;
                        document.getElementById("shippingSpan").innerHTML =
                          "Rs " + delivery;
                        document.getElementById("totalAmount").innerHTML =
                          "Rs " + totalAmount;
                        document.getElementById("notavail").style.display =
                          "none";
                        document.getElementById(
                          "checkpayment"
                        ).disabled = false;
                        document.getElementById(
                          "completeOrder"
                        ).disabled = false;
                        console.log(made.result);
                      } else {
                        if (
                          made.message ===
                          "Cannot read property 'available_courier_companies' of undefined"
                        ) {
                          document.getElementById("notavail").style.display =
                            "block";
                          document.getElementById(
                            "checkpayment"
                          ).disabled = true;
                          document.getElementById(
                            "completeOrder"
                          ).disabled = true;
                        }
                        console.log(made.message);
                      }
                    }
                  }}
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
                name="email"
                placeholder="Email"
                id="shipping-email"
              />{" "}
              <br />
              <br />
            </div>
          </div>
        </div>

        <div className="checkout-discount-cont">
          <h3>Have a discount code?</h3>

          <br />
          <input type="text" id="discountvalue" placeholder="Discount Code" />
          <button
            onClick={async function () {
              promotionApplied = document.getElementById("discountvalue").value;
              if (promotionApplied !== "") {
                var made = await applyDiscount(promotionApplied);
                if (made["success"]) {
                  inbuiltoffer = false;
                  if (morethanthree) {
                    $("#disc-l-c").css("display", "block");
                    $("#disc-l-i").css("display", "block");
                  }
                  var discount = made["discount"];
                  isPromotionApplied = true;
                  promotionApplied = discount.name;
                  totalAmount = backupamount;
                  if (discount.is_percent === 0) {
                    discountglobal = discount.discount_amount;
                    totalAmount -= discountglobal;
                    totalAmount += delivery;
                    document.getElementById("discountSpan").innerHTML =
                      "Rs " + discount.discount_amount;
                    document.getElementById("totalAmount").innerHTML =
                      "Rs " + totalAmount;

                    toast.success("Discount added.");
                  } else {
                    var discountmade = parseInt(
                      (discount.discount_percent / 100) * parseInt(totalAmount)
                    );
                    discountglobal = discountmade;
                    totalAmount -= discountglobal;
                    totalAmount += delivery;
                    document.getElementById("discountSpan").innerHTML =
                      "Rs " + discountmade;
                    document.getElementById("totalAmount").innerHTML =
                      "Rs " + totalAmount;

                    toast.success("Discount added.");
                  }
                } else {
                  totalAmount += delivery;
                  document.getElementById("discountSpan").innerHTML = "Rs 0";
                  document.getElementById("totalAmount").innerHTML =
                    "Rs " + parseInt(totalAmount);
                  document.getElementById("discountvalue").value = "";

                  toast.error(made["message"]);
                }
              }
            }}
          >
            Apply
          </button>
          <br />
          <br />
          <div className="line"></div>
          <div className="checkoutCartItems">
            {cart_items.map(function (item, i) {
              return (
                <div className="itemCard">
                  <div className="cardImage">
                    <img src={item.productImage} alt="" />
                    <p>{item.quantity}</p>
                  </div>
                  <div className="itemDes">
                    <h6>{item.productName}</h6>
                    <h6>Price: Rs {item.productPrice}</h6>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="line"></div>
          <br />
          <div className="amount-box">
            <p>Items: </p>
            <p>{cart_items !== undefined ? cart_items.length : 0}</p>
          </div>

          <div className="amount-box">
            <p>Delivery: </p>
            <p id="shippingSpan">Rs 0</p>
          </div>

          <div className="amount-box">
            <p>Total: </p>
            <p>Rs {morethanthree ? backupamount : parseInt(total)}</p>
          </div>

          <div className="amount-box promotion-amount">
            <p>Discount: </p>
            <p id="discountSpan">
              {morethanthree
                ? `Rs ${(backupamount * 10) / 100} (-10%)`
                : "Rs 0"}
            </p>
          </div>

          <label
            id="disc-l-c"
            style={{ display: "none" }}
            htmlFor="discount-radio"
          >
            <input
              defaultChecked
              onChange={async () => {
                if (promotionApplied !== "") {
                  var made = await applyDiscount(promotionApplied);
                  if (made["success"]) {
                    inbuiltoffer = false;
                    var discount = made["discount"];
                    isPromotionApplied = true;
                    promotionApplied = discount.name;
                    totalAmount = backupamount;
                    totalAmount += delivery;
                    if (discount.is_percent === 0) {
                      discountglobal = discount.discount_amount;
                      totalAmount -= discountglobal;
                      document.getElementById("discountSpan").innerHTML =
                        "Rs " + discount.discount_amount;
                      document.getElementById("totalAmount").innerHTML =
                        "Rs " + totalAmount;

                      toast.success("Discount added.");
                    } else {
                      var discountmade = parseInt(
                        (discount.discount_percent / 100) *
                          parseInt(totalAmount)
                      );
                      discountglobal = discountmade;
                      totalAmount -= discountglobal;
                      document.getElementById("discountSpan").innerHTML =
                        "Rs " + discountmade;
                      document.getElementById("totalAmount").innerHTML =
                        "Rs " + totalAmount;

                      toast.success("Discount added.");
                    }
                  } else {
                    document.getElementById("discountSpan").innerHTML = "Rs 0";
                    document.getElementById("totalAmount").innerHTML =
                      "Rs " + parseInt(totalAmount);
                    document.getElementById("discountvalue").value = "";

                    toast.error(made["message"]);
                  }
                }
              }}
              type="radio"
              name="discount-radio"
              id="discount-radio-c"
            />
            <span> </span> Use Coupon Offer
          </label>

          <label
            id="disc-l-i"
            style={{ display: "none" }}
            htmlFor="discount-radio"
          >
            <input
              onChange={() => {
                inbuiltoffer = true;
                totalAmount = backupTotalAmount;
                totalAmount += delivery;
                document.getElementById("discountSpan").innerHTML = `Rs ${
                  (backupamount * 10) / 100
                } (-10%)`;
                document.getElementById("totalAmount").innerHTML =
                  "Rs " + parseInt(totalAmount);
              }}
              type="radio"
              name="discount-radio"
              id="discount-radio-i"
            />
            <span> </span> Use Reap Default Offer
            <br />
            <br />
          </label>

          <div className="line"></div>
          <br />
          <div className="amount-box">
            <p>Order Total: </p>
            <p id="totalAmount">Rs {parseInt(totalAmount)}</p>
          </div>
          <br />

          <input
            onChange={async (e) => {
              // e.preventDefault();
              var pincode = "";
              if (document.getElementById("shippingisbilling").checked) {
                pincode = document.getElementById("billing-pincode").value;
              } else {
                pincode = document.getElementById("shipping-pincode").value;
              }
              document.getElementById("checkpayment").disabled = true;
              document.getElementById("completeOrder").disabled = true;
              if (document.getElementById("checkCOD").checked) {
                var map = {
                  pickup_postcode: "500087",
                  delivery_postcode: pincode,
                  weight: totalWeight,
                  cod: 1,
                };

                var made = await checkShippingCharge(map);
                if (made.success) {
                  delivery = made.result.shipping_charge;
                  totalAmount = backupTotalAmount;
                  totalAmount -= discountglobal;
                  totalAmount += delivery;
                  document.getElementById("shippingSpan").innerHTML =
                    "Rs " + delivery;
                  document.getElementById("totalAmount").innerHTML =
                    "Rs " + totalAmount;
                  document.getElementById("notavail").style.display = "none";
                  document.getElementById("checkpayment").disabled = false;
                  document.getElementById("completeOrder").disabled = false;
                  console.log(made.result);
                } else {
                  if (
                    made.message ===
                    "Cannot read property 'available_courier_companies' of undefined"
                  ) {
                    document.getElementById("notavail").style.display = "block";
                    document.getElementById("checkpayment").disabled = true;
                    document.getElementById("completeOrder").disabled = true;
                  }
                  console.log(made.message);
                }

                //
                document.getElementById("completeOrder").style.display =
                  "block";
                document.getElementById("checkpayment").style.display = "none";
              } else {
                var map = {
                  pickup_postcode: "500087",
                  delivery_postcode: pincode,
                  weight: totalWeight,
                  cod: 0,
                };

                var made = await checkShippingCharge(map);
                if (made.success) {
                  delivery = made.result.shipping_charge;
                  totalAmount = backupTotalAmount;
                  totalAmount -= discountglobal;
                  totalAmount += delivery;
                  document.getElementById("shippingSpan").innerHTML =
                    "Rs " + delivery;
                  document.getElementById("totalAmount").innerHTML =
                    "Rs " + totalAmount;
                  document.getElementById("notavail").style.display = "none";
                  document.getElementById("checkpayment").disabled = false;
                  document.getElementById("completeOrder").disabled = false;
                  console.log(made.result);
                } else {
                  if (
                    made.message ===
                    "Cannot read property 'available_courier_companies' of undefined"
                  ) {
                    document.getElementById("notavail").style.display = "block";
                    document.getElementById("checkpayment").disabled = true;
                    document.getElementById("completeOrder").disabled = true;
                  }
                  console.log(made.message);
                }
                //
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

              trackFB('AddPaymentInfo', {
                content_ids: [cart_items[0].productId],
                content_name: cart_items[0].productName,
                content_type: 'product',
                currency: 'INR',
                value: cart_items[0].productPrice
              });


              if (
                document.getElementById("billing-country").value !== "" &&
                document.getElementById("billing-pincode").value !== "" &&
                document.getElementById("billing-phone").value !== "" &&
                document.getElementById("billing-email").value !== "" &&
                document.getElementById("billing-city").value !== "" &&
                document.getElementById("billing-state").value !== "" &&
                document.getElementById("billing-addr").value !== "" &&
                document.getElementById("billing-fname").value !== ""
              ) {
                if (!document.getElementById("shippingisbilling").checked) {
                  if (
                    (document.getElementById("shipping-country").value =
                      "" &&
                      document.getElementById("shipping-pincode").value != "" &&
                      document.getElementById("shipping-phone").value !== "" &&
                      document.getElementById("shipping-email").value !== "" &&
                      document.getElementById("shipping-city").value !== "" &&
                      document.getElementById("shipping-state").value !== "" &&
                      document.getElementById("shipping-addr").value !== "" &&
                      document.getElementById("shipping-fname").value !== "")
                  ) {
                    if (
                      !isNaN(document.getElementById("shipping-pincode").value)
                    ) {
                      if (
                        !isNaN(
                          document.getElementById("shipping-phone").value
                        ) &&
                        document.getElementById("shipping-phone").value
                          .length === 10
                      ) {
                        if (
                          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
                            document.getElementById("shipping-email").value
                          )
                        ) {
                          document.getElementById(
                            "completeOrder"
                          ).disabled = true;
                          completeOrder("COD");
                        } else {
                          toast.error("Please enter a valid email address");
                          return;
                        }
                      } else {
                        toast.error("Please enter a valid phone number");
                      }
                    } else {
                      toast.error("Please enter a valid pincode");
                    }
                  } else {
                    toast.error("Please fill all the shipping details");
                  }
                } else {
                  if (
                    !isNaN(document.getElementById("billing-pincode").value)
                  ) {
                    if (
                      !isNaN(document.getElementById("billing-phone").value) &&
                      document.getElementById("billing-phone").value.length ===
                        10
                    ) {
                      if (
                        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
                          document.getElementById("billing-email").value
                        )
                      ) {
                        document.getElementById(
                          "completeOrder"
                        ).disabled = true;
                        completeOrder("COD");
                      } else {
                        toast.error("Please enter a valid email address");
                        return;
                      }
                    } else {
                      toast.error("Please enter a valid phone number");
                    }
                  } else {
                    toast.error("Please enter a valid pincode");
                  }
                }
              } else {
                toast.error("Please fill all the billing details.");
              }
            }}
          >
            Complete Order
          </button>

          <button
            id="checkpayment"
            onClick={() => {
              trackFB('AddPaymentInfo', {
                content_ids: [cart_items[0].productId],
                content_name: cart_items[0].productName,
                content_type: 'product',
                currency: 'INR',
                value: cart_items[0].productPrice
              });

               trackFB('InitiateCheckout', {});
              if (
                document.getElementById("billing-country").value !== "" &&
                document.getElementById("billing-pincode").value !== "" &&
                document.getElementById("billing-phone").value !== "=" &&
                document.getElementById("billing-email").value !== "" &&
                document.getElementById("billing-city").value !== "" &&
                document.getElementById("billing-state").value !== "" &&
                document.getElementById("billing-addr").value !== "" &&
                document.getElementById("billing-fname").value !== ""
              ) {
                if (!document.getElementById("shippingisbilling").checked) {
                  if (
                    document.getElementById("shipping-country").value !== "" &&
                    document.getElementById("shipping-pincode").value !== "" &&
                    document.getElementById("shipping-phone").value !== "" &&
                    document.getElementById("shipping-email").value !== "" &&
                    document.getElementById("shipping-city").value !== "" &&
                    document.getElementById("shipping-state").value !== "" &&
                    document.getElementById("shipping-addr").value !== "" &&
                    document.getElementById("shipping-fname").value !== ""
                  ) {
                    if (
                      !isNaN(document.getElementById("shipping-pincode").value)
                    ) {
                      if (
                        !isNaN(
                          document.getElementById("shipping-phone").value
                        ) &&
                        document.getElementById("shipping-phone").value
                          .length === 10
                      ) {
                        if (
                          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
                            document.getElementById("shipping-email").value
                          )
                        ) {
                          document.getElementById(
                            "checkpayment"
                          ).disabled = true;
                          displayRazorPay();
                        } else {
                          toast.error("Please enter a valid email address");
                          return;
                        }
                      } else {
                        toast.error("Please enter a valid phone number");
                      }
                    } else {
                      toast.error("Please enter a valid pincode");
                    }
                  } else {
                    toast.error("Please fill all the shipping details");
                  }
                } else {
                  if (
                    !isNaN(document.getElementById("billing-pincode").value)
                  ) {
                    if (
                      !isNaN(document.getElementById("billing-phone").value) &&
                      document.getElementById("billing-phone").value.length ===
                        10
                    ) {
                      if (
                        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
                          document.getElementById("billing-email").value
                        )
                      ) {
                        document.getElementById("checkpayment").disabled = true;
                        displayRazorPay();
                      } else {
                        toast.error("Please enter a valid email address");
                        return;
                      }
                    } else {
                      toast.error("Please enter a valid phone number");
                    }
                  } else {
                    toast.error("Please enter a valid pincode");
                  }
                }
              } else {
                toast.error("Please fill all the billing details.");
              }
            }}
          >
            Continue to Payment
          </button>
          <p id="notavail">
            *This location is currently unavailable to reach. Please try another
            location.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

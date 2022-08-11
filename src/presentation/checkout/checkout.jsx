import { Component } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../../components/NavBar";
import { getOrderId, verifyOrder } from "../../js/payment";

const Navigate = ()=>{
    var navigate = useNavigate();
    navigate('/')
}

const Checkout = () => {
  const { orderId } = useParams();
  const { amount } = useParams();
  const { currency } = useParams();
  var razorpay_payment_id = "";
  var razorpay_order_id = "";
  var razorpay_signature = "";
  async function displayRazorPay(){
    const res = await loadRazorPay();
    if(!res){
        alert('Razorpay not working rn')
        return
    }
    var options = {
        key: "rzp_live_hRcaO8HMxZdgsx",
        currency: currency,
        amount: amount.toString(),
        name: "Reap Official",
        description: "Product Payment",
        order_id: orderId,
        handler: async function (response) {
          razorpay_payment_id = response.razorpay_payment_id;
          razorpay_payment_id = response.razorpay_order_id;
          razorpay_signature = response.razorpay_signature;
          console.log(razorpay_order_id)
          var success = await verifyOrder(razorpay_payment_id, razorpay_payment_id, razorpay_signature);
          if(success){
            // Navigate();
          }else{
            Navigate();
          }
        },
        theme: {
          color: "#777fa8",
        },
      };
      var rzp1 = new window.Razorpay(options);
      rzp1.open();
  }
  function loadRazorPay() {
    return new Promise(resolve =>{
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        
        script.onload = ()=>{
            resolve(true)
        }
        script.onerror = ()=>{
            resolve(false)
        }
        document.body.appendChild(script);
    })
  }
  return (
    <div className="checkout">
      <NavBar isLoggedIn={true} />
      <br />
      <br />
      <br />
     <center> <h3 className="checkoutitle">Reap Official</h3></center>
     <center> <div className="checkout-form">
        <h5>Contacts information</h5>
        <input type="email" placeholder="Email" /> <br />
        <input type="phone" placeholder="Phone Number" /> <br />
        <br />
        <h5>Shipping Address</h5>
        <input type="text" name="country" placeholder="Country/Region" id="country" /> <br />
        <input type="text" name="fname" placeholder="Full Name" id="fname" /> <br />
        <input type="text" name="addr" placeholder="Address" id="addr" /> <br />
        <input type="text" name="appsuite" placeholder="Appartment, suite, etc. (optional)" id="appsuite" /> <br />
        <div className="grid-input">
        <input type="text" name="city" placeholder="City" className="inputrow" id="city" /> 
        <input type="text" name="state" placeholder="State" className="inputrow" id="state" /> 
        <input type="text" name="pincode" placeholder="PIN Code" className="inputrow" id="pincode" /> <br />
        
        </div>
        <input type="phone" name="phone" placeholder="Phone" id="phone" /> <br />
        <br />
        <button id="checkpayment" onClick={()=>{
            displayRazorPay()
        }}>Continue to Payment</button>
      </div></center>
    </div>
  );
};

export default Checkout;

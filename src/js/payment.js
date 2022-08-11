var url_head = "http://localhost:4000/api/v2/";

const axios = require("axios");

axios.defaults.withCredentials = true;

const config = { headers: { "Content-Type": "application/json" } };

async function getOrderId(amount) {
  var url = url_head + "payment/order";
  try {
    var data = {
      amount: amount*100,
      currency: "INR",
      receipt: "reapofficial",
      payment_capture: "1",
    };
    var response = await axios.post(url, JSON.stringify(data), config);
    var body = await response.data;
    console.log(body);
    return [body.success, body.sub];
  } catch (e) {
    console.log(e);
    return [false];
  }
}

async function verifyOrder(
  razorpay_payment_id,
  razorpay_order_id,
  razorpay_signature
) {
  var url = url_head + "payment/verify";
  try {
    var data = {
      razorpay_order_id: razorpay_order_id,
      razorpay_payment_id: razorpay_payment_id,
      razorpay_signature: razorpay_signature,
    };
    var response = await axios.post(url, JSON.stringify(data), config);
    var body = await response.data;
    return body.success;

  } catch (e) {
    console.log(e);
    return false;
  }
}

export { getOrderId, verifyOrder };

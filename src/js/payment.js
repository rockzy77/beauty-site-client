var url_head = "http://localhost:4000/api/v2/";

const axios = require("axios");

axios.defaults.withCredentials = true;

const config = { headers: { "Content-Type": "application/json" } };

async function getOrderId(amount) {
  var url = url_head + "payment/order";
  try {
    var data = {
      amount: amount * 100,
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
    console.log(data);
    var response = await axios.post(url, JSON.stringify(data), config);
    var body = await response.data;
    console.log(body);
    return body.success;
  } catch (e) {
    console.log(e);
    return { success: false };
  }
}

async function createShipRocketOrder(map) {
  var url = url_head + "createShipRocketOrder";
  try {
    var response = await axios.post(url, JSON.stringify(map), config);
    var body = await response.data;
    console.log(body);
    return body;
  } catch (e) {
    console.log(e);
    var d = await e.response.data;
    return { success: false, message: d["message"] };
  }
}

async function deleteOrder(id) {
  var url = url_head + "admin/deleteOrder";
  try {
    var map = {
      ids: [id]
    }
    var response = await axios.post(url, JSON.stringify(map), config);
    var body = await response.data;
    console.log(body);
    return body;
  } catch (e) {
    console.log(e);
    var d = await e.response.data;
    return { success: false, message: d["message"] };
  }
}

async function applyDiscount(code) {
  var url = url_head + "discount";
  try {
    var map = {
      name: code,
    };
    var response = await axios.post(url, JSON.stringify(map), config);
    var body = await response.data;
    console.log(body);
    return body;
  } catch (e) {
    console.log(e);
    var d = await e.response.data;
    return { success: false, message: d["message"] };
  }
}

async function discountUse(code) {
  var url = url_head + "discount/use";
  try {
    var map = {
      name: code,
    };
    var response = await axios.post(url, JSON.stringify(map), config);
    var body = await response.data;
    console.log(body);
    return body;
  } catch (e) {
    console.log(e);
    var d = await e.response.data;
    return { success: false, message: d["message"] };
  }
}


async function generateReferralDiscount(){
  var url = url_head + "referral/create";
  try {
    var response = await axios.get(url,  config);
    var body = await response.data;
    console.log(body);
    return body;
  } catch (e) {
    console.log(e);
    var d = await e.response.data;
    return { success: false, message: d["message"] };
  }
}

export { getOrderId, verifyOrder, createShipRocketOrder, applyDiscount, discountUse, generateReferralDiscount, deleteOrder};

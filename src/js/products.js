import axios from "axios";

var url_head = "https://server.reapofficial.com/api/v2/";

const config = { headers: { "Content-Type": "application/json" } };

var $ = require("jquery");

async function getQuery(query) {
  const urlParams = new URLSearchParams(window.location.search);
  const param = urlParams.get(query);
  return param;
}

async function getFeaturedProducts(){
  try {
    var url = url_head + "products/featured";

    var response = await axios.get(url, config);

    var data = await response.data;
    return data;
  } catch (e) {
    return { success: false };
  }
}

async function getAllProducts(page) {
  try {
    var url = url_head + "products?page="+page;

    var response = await axios.get(url, config);

    var data = await response.data;
    return data;
  } catch (e) {
    return { success: false };
  }
}

async function getSingleProduct(pid) {
  try {
    var url = url_head + `product/${pid}`;

    var response = await fetch(url);

    var data = await response.json();
    return data;
  } catch (e) {
    return { success: false };
  }
}

async function getFilterProducts(filter, page) {
  try {
    var url = url_head + "products?page="+page+"&category=" + filter;

    var response = await axios.get(url, config);

    var data = await response.data;
    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
    return { success: false };
  }
}

async function getReviews(pid) {
  var url = url_head + `reviews?id=${pid}`;
  try {

    var response = await axios.get(url,config);
    var body = await response.data;
    console.log(body);
    return body;
  } catch (e) {
    console.log(e);
    var d = await e.response.data;
    return { success: false, message: d["message"] };
  }
}

async function createReview(pid, comment, rating) {
  var url = url_head + "product/review";

  try {
    var map = {
      productId: pid,
      comment: comment,
      rating: rating,
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

async function getCartItem(pid, comment, rating) {
  var url = url_head + "cart";

  try {
    var response = await axios.get(url, config);
    var body = await response.data;
    console.log(body);
    return body;
  } catch (e) {
    console.log(e);
    var d = await e.response.data;
    return { success: false, message: d["message"] };
  }
}

async function addToCart(map) {
  var url = url_head + "addToCart";

  try {
    var response = await axios.post(url, JSON.stringify(map),config);
    var body = await response.data;
    console.log(body);
    return body;
  } catch (e) {
    console.log(e);
    var d = await e.response.data;
    return { success: false, message: d["message"] };
  }
}


async function updateCart(cid, quanity){
  var url = url_head + "cart/update/"+cid;

  try {
    var map = {
      quantity: parseInt(quanity)
    }
    var response = await axios.put(url, JSON.stringify(map),config);
    var body = await response.data;
    console.log(body);
    return body;
  } catch (e) {
    console.log(e);
    var d = await e.response.data;
    return { success: false, message: d["message"] };
  }
}

async function deleteCart(cid){
  var url = url_head + "removeCart/"+cid;

  try {
    var response = await axios.delete(url, config);
    var body = await response.data;
    console.log(body);
    return body;
  } catch (e) {
    console.log(e);
    var d = await e.response.data;
    return { success: false, message: d["message"] };
  }
}

async function getOrders(){
    var url = url_head + "orders/me";

    try {
      var response = await axios.get(url, config);
      var body = await response.data;
      console.log(body);
      return body;
    } catch (e) {
      console.log(e);
      var d = await e.response.data;
      return { success: false, message: d["message"] };
  }
}


export { getQuery, getFeaturedProducts,getAllProducts, getSingleProduct, getFilterProducts, createReview, getReviews, getCartItem, addToCart, updateCart, deleteCart, getOrders };

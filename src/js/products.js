var url_head = "http://localhost:4000/api/v2/";

const config = { headers: { "Content-Type": "application/json" } };

var $ = require("jquery");

async function getQuery(query){
  const urlParams = new URLSearchParams(window.location.search);
  const param = urlParams.get(query);
  return param;
}

async function getAllProducts() {
  const urlParams = new URLSearchParams(window.location.search);
  const filter = urlParams.get("filter");
  if (filter != null) {
    return getFilterProducts(filter);
  } else {
    var url = url_head + "products";

    var response = await fetch(url);

    var data = await response.json();

    return data["products"];
  }
}

async function getSingleProduct() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("productid");
  var url = url_head + `product/${id}`;

  var response = await fetch(url);

  var data = await response.json();

  return data["products"];
}

async function getFilterProducts(filter) {
  var url = url_head + "products?category=" + filter;

  var response = await fetch(url);

  var data = await response.json();
  console.log(data)
  return data["products"];
}

async function getReviews(id) {
  var url = url_head + `reviews?id=${id}`;

  var response = await fetch(url);

  var data = await response.json();

  console.log(data);
}

async function createReview(id) {
  var comment = "";
  var rating = "";
  var data = {
    productId: id,
    comment: comment,
    rating: rating,
  };
  var url = url_head + `reviews?id=${id}`;

  var response = await fetch(url, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify(data),
  });

  var data = await response.json();

  console.log(data);
}

export { getQuery,getAllProducts, getFilterProducts };



import url_head from "./serverApi";

const axios = require("axios");

axios.defaults.withCredentials = true;

const config = { headers: { "Content-Type": "application/json" } };

async function createProduct(map) {
  var url = url_head + "product/new";
  const formData = new FormData();
  Object.entries(map).map((item) => {
    formData.append(item[0], item[1]);
  });
  try {
    var response = await axios.post(url, formData, config);
    var body = await response.data;
    return body;
  } catch (e) {
    var d = await e.response.data;
    return { success: false, message: d["message"] };
  }
}

async function deleteProduct(pid) {
  var url = url_head + "product/" + pid;
  try {
    var response = await axios.delete(url, config);
    var body = await response.data;
    return body;
  } catch (e) {
    var d = await e.response.data;
    return { success: false, message: d["message"] };
  }
}

async function updateProduct(updates, pid) {
  var url = url_head + "product/" + pid;
  const formData = new FormData();
  Object.entries(updates).map((item) => {
    formData.append(item[0], item[1]);
  });
  try {
    var response = await axios.put(url, formData, { headers: { "Content-Type": "multipart/form-data" } });
    var body = await response.data;
    return body;
  } catch (e) {
    var d = await e.response.data;
    return { success: false, message: d["message"] };
  }
}

async function getAllProductsAdmin() {
  try {
    var url = url_head + "admin/products";

    var response = await axios.get(url, config);
    var data = await response.data;
    return data;
  } catch (e) {
    var d = await e.response.data;
    return { success: false, message: d["message"] };
  }
}

async function getAlluser() {
  try {
    var url = url_head + "admin/users";

    var response = await axios.get(url, config);

    var data = await response.data;
    return data;
  } catch (e) {
    var d = await e.response.data;
    return { success: false, message: d["message"] };
  }
}

async function getAllOrders() {
  try {
    var url = url_head + "admin/orders";

    var response = await axios.get(url, config);

    var data = await response.data;
    return data;
  } catch (e) {
    var d = await e.response.data;
    return { success: false, message: d["message"] };
  }
}

async function getSingleuser(uid) {
  try {
    var url = url_head + "admin/user/" + uid;

    var response = await axios.get(url, config);

    var data = await response.data;
    return data;
  } catch (e) {
    var d = await e.response.data;
    return { success: false, message: d["message"] };
  }
}

async function updateuserInfo(id, name, email) {
  try {
    var url = url_head + "admin/user/" + id;

    var map = {
      name: name,
      email: email,
    };
    var response = await axios.put(url, JSON.stringify(map), config);

    var data = await response.data;
    return data;
  } catch (e) {
    var d = await e.response.data;
    return { success: false, message: d["message"] };
  }
}

async function deleteUser(id) {
  try {
    var url = url_head + "admin/user/" + id;

    var response = await axios.delete(url, config);

    var data = await response.data;
    return data;
  } catch (e) {
    var d = await e.response.data;
    return { success: false, message: d["message"] };
  }
}

async function createBlog(blog) {
  var url = url_head + "blog/new";
  const formData = new FormData();
  Object.entries(blog).map((item) => {
    formData.append(item[0], item[1]);
  });
  try {
    var response = await axios.post(url, formData, config);
    var body = await response.data;
    return body;
  } catch (e) {
    var d = await e.response.data;
    return { success: false, message: d["message"] };
  }
}



async function blogImages(image){
  var url = url_head + "admin/blgimg";
  const formData = new FormData();
  formData.append('image', image);
  try {
    var response = await axios.post(url, formData, config);
    var body = await response.data;
    console.log(body)
    return body;
  } catch (e) {
    var d = await e.response.data;
    return { success: false, message: d["message"] };
  }
}

async function dltBImage(imageid){
  var url = url_head + "admin/dltimg/" + imageid;
  try {
    var response = await axios.delete(url, config);
    var body = await response.data;
    console.log(body)
    return body;
  } catch (e) {
    var d = await e.response.data;
    return { success: false, message: d["message"] };
  }
}


async function getAllBlogs() {
  var url = url_head + "admin/blogs";
  try {
    var response = await axios.get(url, config);
    var body = await response.data;
    return body;
  } catch (e) {
    
    var d = await e.response.data;
    return { success: false, message: d["message"] };
  }
}

async function getSingleBlog(bid) {
  var url = url_head + "blog/" + bid;
  try {
    var response = await axios.get(url, config);
    var body = await response.data;
    
    return body;
  } catch (e) {
    
    var d = await e.response.data;
    return { success: false, message: d["message"] };
  }
}

async function updateBlog(updates, bid) {
  var url = url_head + "blog/" + bid;
  try {
    if ("image" in updates) {
      const formData = new FormData();
      Object.entries(updates).map((item) => {
        formData.append(item[0], item[1]);
      });
      var response = await axios.put(url, formData, config);
      var body = await response.data;
      
      return body;
    }
    else{
      var response = await axios.put(url, JSON.stringify(updates), config);
      var body = await response.data;
      
      return body;
    }
  } catch (e) {
    
    var d = await e.response.data;
    return { success: false, message: d["message"] };
  }
}

async function deleteBlog(bid) {
  var url = url_head + "blog/" + bid;
  try {
    var response = await axios.delete(url, config);
    var body = await response.data;
    
    return body;
  } catch (e) {
    
    var d = await e.response.data;
    return { success: false, message: d["message"] };
  }
}

async function createDiscount(map) {
  var url = url_head + "admin/discount/create";
  try {
    var response = await axios.post(url, JSON.stringify(map), config);
    var body = await response.data;
    
    return body;
  } catch (e) {
    
    var d = await e.response.data;
    return { success: false, message: d["message"] };
  }
}

async function getAllDiscounts() {
  var url = url_head + "admin/discounts";
  try {
    var response = await axios.get(url, config);
    var body = await response.data;
    
    return body;
  } catch (e) {
    
    var d = await e.response.data;
    return { success: false, message: d["message"] };
  }
}

async function getSingleDiscount(name) {
  var url = url_head + "discount";
  try {
    var map = { name: name };
    var response = await axios.post(url, JSON.stringify(map), config);
    var body = await response.data;
    
    return body;
  } catch (e) {
    
    var d = await e.response.data;
    return { success: false, message: d["message"] };
  }
}

async function updateDiscount(updates, name) {
  var url = url_head + "admin/discount/update";
  try {
    updates.name = name;
    
    var response = await axios.post(url, JSON.stringify(updates), config);
    var body = await response.data;
    
    return body;
  } catch (e) {
    
    var d = await e.response.data;
    return { success: false, message: d["message"] };
  }
}

async function deleteDiscount(name) {
  var url = url_head + "admin/discount/delete";
  try {
    var map = {
      name: name,
    };
    var response = await axios.post(url, JSON.stringify(map), config);
    var body = await response.data;
    
    return body;
  } catch (e) {
    
    var d = await e.response.data;
    return { success: false, message: d["message"] };
  }
}


async function getAllOrdersAdmin() {
  var url = url_head + "admin/orders";
  try {
    var response = await axios.get(url, config);
    var body = await response.data;
    
    return body;
  } catch (e) {
    
    var d = await e.response.data;
    return { success: false, message: d["message"] };
  }
}

async function updateOrder(map){
  var url = url_head + "updateOrder";

  try {
    var response = await axios.post(url, JSON.stringify(map),config);
    var body = await response.data;
    
    return body;
  } catch (e) {
    
    var d = await e.response.data;
    return { success: false, message: d["message"] };
  }
}


async function getTotalOrderDetails(year){
  var url = url_head +'admin/order/total';
  var map = {
    year: year
  };
  try{
    var response = await axios.post(url, JSON.stringify(map) ,config);
    var body = await response.data;
    
    return body;
  }
  catch(e){
    
    var d = await e.response.data;
    return { success: false, message: d["message"] };
  }
}


export {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProductsAdmin,
  getAlluser,
  getSingleuser,
  updateuserInfo,
  getAllOrders,
  createBlog,
  blogImages,
  dltBImage,
  getAllBlogs,
  deleteUser,
  deleteBlog,
  updateBlog,
  getSingleBlog,
  createDiscount,
  getAllDiscounts,
  updateDiscount,
  getSingleDiscount,
  deleteDiscount,
  getAllOrdersAdmin,
  updateOrder,
  getTotalOrderDetails
};

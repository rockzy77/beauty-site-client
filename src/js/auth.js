import url_head from "./serverApi";

const axios = require("axios");

axios.defaults.withCredentials = true;

const config = { headers: { "Content-Type": "application/json" } };

async function loginUser(email, password) {
  var url = url_head + "login";

  try {
      var data = {
        email: email,
        password: password,
      };
      var response = await axios.post(url, JSON.stringify(data), config);
      var body = await response.data;
      return body;
  } catch (e) {
    
    var error = await e.response.data.message;
    return { success: false, message: error };
  }
}

async function googleLoginUser(email) {
  var url = url_head + "googleSignin";
  

  try {
      var data = {
        email: email,
      };
      var response = await axios.post(url, JSON.stringify(data), config);
      var body = await response.data;
      return body;
  } catch (e) {
    
    var error = await e.response.data.message;
    return { success: false, message: error };
  }
}

async function registerUser(data) {
  var url = url_head + "registration";

  try {
    var response = await axios.post(url, JSON.stringify(data), config);
    var body = await response.data;
    return body;
  } catch (e) {
    
    var error = await e.response.data.message;
    return { success: false, message: error };
  }
}

async function googleRegisterUser(data) {
  var url = url_head + "googleSignup";

  try {
    var response = await axios.post(url, JSON.stringify(data), config);
    var body = await response.data;
    return body;
  } catch (e) {
    
    var error = await e.response.data.message;
    return { success: false, message: error };
  }
}

async function logoutUser() {
  var url = url_head + "logout";
  var response = await axios.get(url, config);
  var body = await response.data;
  window.location.replace("/");
}

async function getUserDetail() {
  var url = url_head + "me";
  try {
    var response = await axios.get(url, config);
    const data = await response.data;
    return data;
  } catch (e) {
    return { success: false };
  }
}

async function updateUserInfo(name, email) {
  var url = url_head + "me/update/info";
  var data = {
    name: name,
    email: email,
  };
  var response = await axios.put(url, JSON.stringify(data), config);
  const body = await response.data;
  window.location.replace("/account");
}

async function updatePassword(oldpass, newpass, cnewpass) {
  var url = url_head + "me/update";
  var data = {
    oldPassword: oldpass,
    newPassword: newpass,
    confirmPassword: cnewpass,
  };
  var response = await axios.put(url, JSON.stringify(data), config);
  const body = await response.data;
  
  window.location.replace("/account");
}

async function forgotPassword(email) {
  var url = url_head + "password/forgot";
  try {
    var data = {
      email: email,
    };
    var response = await axios.post(url, JSON.stringify(data), config);
    const body = await response.data;
    
    return body["success"];
  } catch (e) {
    return false;
  }
}

async function resetForgotPassword(pass, cpass, token) {
  var url = url_head + "password/reset/" + token;
  try {
    var data = {
      password: pass,
      confirmPassword: cpass,
    };
    var response = await axios.put(url, JSON.stringify(data), config);
    const body = await response.data;
    
    return body;
  } catch (e) {
    var error = await e.response.data;
    return { success: false, message: error };
  }
}

async function getReferralLink() {
  var url = url_head + "referral/details";
  try {
    var response = await axios.get(url, config);
    var body = await response.data;
    
    return body;
  } catch (e) {
    
    var d = await e.response.data;
    return { success: false, message: d["message"] };
  }
}

export {
  getUserDetail,
  updateUserInfo,
  registerUser,
  loginUser,
  logoutUser,
  updatePassword,
  forgotPassword,
  getReferralLink,
  resetForgotPassword,
  googleLoginUser,
  googleRegisterUser
};

var url_head = "https://ecommerce-backend-0.herokuapp.com/api/v2/";

const axios = require("axios");

axios.defaults.withCredentials = true;

const config = { headers: { "Content-Type": "application/json" } };



async function loginUser() {
  var url = url_head + "login";

  var email = document.getElementById("loginemail");
  var password = document.getElementById("loginpass");
  if (email.value != "" && password.value != "") {
    var data = {
      email: email.value,
      password: password.value,
    };
    var response = await axios.post(url, JSON.stringify(data), config);
    var body = await response.data;
    if (body["success"] == true) {
      console.log(body["token"]);
      window.location.replace("/");
    } else {
      console.log(body["message"]);
    }
  } else {
    alert("Please fill all the fields.");
  }
}

async function registerUser() {
  var url = url_head + "registration";

  var email = document.getElementById("regemail");
  var password = document.getElementById("regpass");
  var cpassword = document.getElementById("regcpass");
  var name = document.getElementById("regname");
  if (
    email.value != "" &&
    password.value != "" &&
    name.value != "" &&
    cpassword.value != ""
  ) {
    if (password.value == cpassword.value) {
      if (password.value.length > 7) {
        var data = {
          name: name.value,
          email: email.value,
          password: password.value,
        };

        var response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        var body = await response.json();
        if (body["success"] == true) {
          alert("Succesfully Registered.");
          window.location.replace("/");
        } else {
          console.log(body["message"]);
        }
      }
    } else {
      alert("Password doesn't match");
    }
  } else {
    alert("Please fill all the fields.");
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
    return {success: false};
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
  console.log(body);
  window.location.replace("/account");
}


async function forgotPassword(email){
  var url = url_head+'password/forgot';
  try{
    var data = {
      email: email
    }
    var response = await axios.post(url, JSON.stringify(data), config);
    const body = await response.data;
    console.log(body);
    return body['success'];
  }
  catch(e){
    return false;
  }
}




export {
  getUserDetail,
  updateUserInfo,
  registerUser,
  loginUser,
  logoutUser,
  updatePassword,
  forgotPassword
};

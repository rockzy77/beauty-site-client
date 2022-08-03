var url_head = "https://ecommerce-backend-0.herokuapp.com/api/v2/";


const axios = require('axios')


async function loginUser() {
  var url = url_head + "login";

  var email = document.getElementById("loginemail");
  var password = document.getElementById("loginpass");
  if (email.value != "" && password.value != "") {
    var data = {
      email: email.value,
      password: password.value,
    };

    var response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    var body = await response.json();
    console.log(body);
    if(body['success'] == true){
        alert('Succesfully LoggedIn.');
        window.location.replace('/')
      }
      else{
        console.log(body['message']);
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
  if (email.value != "" && password.value != "" && name.value != '' && cpassword.value != '') {
    if(password.value == cpassword.value){
        if(password.value.length > 7){
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
              if(body['success'] == true){
                alert('Succesfully Registered.');
                window.location.replace('/')
              }
              else{
                console.log(body['message']);
              }
        }
    }
    else{
        alert('Password doesn\'t match')
    }
  } else {
    alert("Please fill all the fields.");
  }
}

async function logoutUser() {
    var logout = document.getElementById("logout");
    var url = url_head+'logout';
    var response = await fetch(url);
    var body = await response.json();
    console.log(body)
}

async function getUserDetail() {
  var url = url_head + "me";
  var response = await fetch(url);
  const data = await response.json();
  console.log(data['success']);
  console.log(data)
  return data['success'];
}

export { getUserDetail, registerUser, loginUser, logoutUser };

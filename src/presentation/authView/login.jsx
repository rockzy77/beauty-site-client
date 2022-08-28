import { Component } from "react";
import { NavLink } from "react-router-dom";
import {  googleLoginUser, loginUser } from "../../js/auth";
import { FcGoogle } from "react-icons/fc";
import { firebase_app } from "../../js/config/firebaseConfig";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { toast } from 'react-toastify';


class LoginScreen extends Component {
  constructor(props) {
    super(props);
  }

  async googleLogin() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(firebase_app);
    signInWithPopup(auth, provider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        var made = await googleLoginUser(user.email);
        if (made.success) {
            toast.success("Successfully registered");
            
            window.location.href = "/";
          } else {
            if(made.message === undefined){
              toast.error("Something went wrong.")
            }
            else{
              alert(made.message);
            }
          }
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }


  render() {
    return (
      <section className="login">
        <div className="login-row">
          <div className="login-form">
            <br />
            <div className="login-form-container">
              <h1>Welcome Back, Beauty</h1>
              <br />
              <form>
                <input
                  id="loginemail"
                  type="email"
                  name="email"
                  placeholder="Email"
                />{" "}
                <br />
                <input
                  id="loginpass"
                  type="password"
                  name="password"
                  placeholder="Password"
                />{" "}
                <br />
                <input id="loginsubmit" type="button" value="Log In" onClick={async()=>{
                  var email = document.getElementById("loginemail").value;
                  var password = document.getElementById("loginpass").value;
                 
                  if(email !== '' || password !== ''){
                    var udet = await loginUser(email, password);
                    if(udet.success){
                      toast.success('Successfully logged in');
                      window.location.href = "/"
                    }
                    else{
                      toast.error(udet.message)
                    }
                  } else{
                    alert('Please fill all the fields')
                  }
                }} />
                
                 <button
                  onClick={(e) => {
                    e.preventDefault();
                    this.googleLogin();
                  }}
                  id="googlelogin"
                >
                  <FcGoogle className="googleicon" /> LogIn Via Google
                </button> 

                <br />
                <br />
                <p>
                  Not a user?<span> </span>
                  <NavLink className="singuplink" to="/signup">
                     SignUp
                  </NavLink>
                </p>
                <NavLink to='/forgotpassword' className="forgotpassword">Forgot Password</NavLink>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default LoginScreen;

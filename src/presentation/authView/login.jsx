import { Component } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { googleLoginUser, googleRegisterUser, loginUser } from "../../js/auth";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { firebase_app } from "../../js/config/firebaseConfig";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { toast } from "react-toastify";
import { deleteCookie } from "../../js/cookies";

const LoginScreen = (props) => {
  const location = useLocation();
  var checkout_data = {};
  const data =
    location.state !== null
      ? location.state
      : {
          checkout_data: {},
        };
  
  checkout_data = data.checkout_data;
  
  return <LoginScreenCont checkout_data={checkout_data} />;
};

class LoginScreenCont extends Component {
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
        
        var made = await googleLoginUser(user.email);
        if (made.success) {
          toast.success("Successfully logged in");
          
          
          // check if object is empty
          if (Object.keys(this.props.checkout_data).length === 0) {
            window.location.href = "/";
          } else {
            deleteCookie("cartList");
            deleteCookie("dimensions");
            deleteCookie("stocks");
            document.getElementById("checkout_go_btn").click();
          }
        } else {
          if (made.message === "User is not found with this email & password") {
            var map = {
              name: user.displayName,
              email: user.email,
            };
            var made2 = await googleRegisterUser(map);
            if (made2.success) {
              toast.success("Successfully registered");
              if (Object.keys(this.props.checkout_data).length === 0) {
                window.location.href = "/";
              } else {
                deleteCookie("cartList");
                deleteCookie("dimensions");
                deleteCookie("stocks");
                document.getElementById("checkout_go_btn").click();
              }
            } else {
              toast.error(made2.message);
            }
          } else if (made.message === undefined) {
            toast.error("Something went wrong.");
          } else {
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

  async faceBookLogin() {
    const provider = new FacebookAuthProvider();
    const auth = getAuth(firebase_app);
    signInWithPopup(auth, provider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        
        var made = await googleLoginUser(user.email);
        if (made.success) {
          toast.success("Successfully logged in");
          if (Object.keys(this.props.checkout_data).length === 0) {
            window.location.href = "/";
          } else {
            deleteCookie("cartList");
            deleteCookie("dimensions");
            deleteCookie("stocks");
            document.getElementById("checkout_go_btn").click();
          }
        } else {
          if (made.message === "User is not found with this email & password") {
            var map = {
              name: user.displayName,
              email: user.email,
            };
            var made2 = await googleRegisterUser(map);
            if (made2.success) {
              toast.success("Successfully registered");
              if (Object.keys(this.props.checkout_data).length === 0) {
                window.location.href = "/";
              } else {
                deleteCookie("cartList");
                deleteCookie("dimensions");
                deleteCookie("stocks");
                document.getElementById("checkout_go_btn").click();
              }
            } else {
              toast.error(made2.message);
            }
          } else if (made.message === undefined) {
            toast.error("Something went wrong.");
          } else {
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
        const credential = FacebookAuthProvider.credentialFromError(error);
        toast.error(errorMessage);
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
                <input
                  id="loginsubmit"
                  type="button"
                  value="Log In"
                  onClick={async () => {
                    var email = document.getElementById("loginemail").value;
                    var password = document.getElementById("loginpass").value;

                    if (email !== "" || password !== "") {
                      var udet = await loginUser(email, password);
                      if (udet.success) {
                        toast.success("Successfully logged in");
                        if (Object.keys(this.props.checkout_data).length === 0) {
                          window.location.href = "/";
                        } else {
                          deleteCookie("cartList");
                          deleteCookie("dimensions");
                          deleteCookie("stocks");
                          document.getElementById("checkout_go_btn").click();
                        }
                      } else {
                        toast.error(udet.message);
                      }
                    } else {
                      alert("Please fill all the fields");
                    }
                  }}
                />
                <div className="social-login">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      this.googleLogin();
                    }}
                    id="googlelogin"
                  >
                    <FcGoogle className="googleicon" />
                  </button>
                  <br />
                  <br />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      this.faceBookLogin();
                    }}
                    id="googlelogin"
                  >
                    <BsFacebook className="facebookicon" />
                  </button>
                  <NavLink
                    to="/checkout"
                    state={{
                      amount: this.props.checkout_data.amount,
                      totalAmount: this.props.checkout_data.totalAmount,
                      cart_data: this.props.checkout_data.cart_data,
                      totalHeight: this.props.checkout_data.totalHeight,
                      totalLength: this.props.checkout_data.totalLength,
                      totalBreadth: this.props.checkout_data.totalBreadth,
                      totalWeight: this.props.checkout_data.totalWeight,
                      morethanthree: this.props.checkout_data.morethanthree,
                      backupamount: this.props.checkout_data.backupamount,
                    }}
                    id="checkout_go_btn"
                    style={{ display: "none" }}
                  >
                    s
                  </NavLink>
                </div>
                <br />
                <p>
                  Not a user?<span> </span>
                  <NavLink
                    state={{
                      checkout_data: this.props.checkout_data,
                    }}
                    className="singuplink"
                    to="/signup"
                  >
                    SignUp
                  </NavLink>
                </p>
                <NavLink to="/forgotpassword" className="forgotpassword">
                  Forgot Password
                </NavLink>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default LoginScreen;

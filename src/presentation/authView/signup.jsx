import { Component } from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { registerUser, getUserDetail, googleRegisterUser } from "../../js/auth";
import { FcGoogle } from "react-icons/fc";
import { firebase_app } from "../../js/config/firebaseConfig";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { toast } from "react-toastify";
import { BsFacebook } from "react-icons/bs";
import { deleteCookie } from "../../js/cookies";
import trackFB from "../../js/trackFB";

const SingupScreen = (props) => {
  const { referrerCode } = useParams();
  const location = useLocation();
  var checkout_data = {};
  const data =
    location.state !== null
      ? location.state
      : {
          checkout_data: {},
        };
  console.log(data);
  checkout_data = data.checkout_data;
  console.log(checkout_data);
  return (
    <SingupScreenCont
      referrerCode={referrerCode}
      checkout_data={checkout_data}
    />
  );
};

class SingupScreenCont extends Component {
  constructor(props) {
    super(props);
    this.isLoggedIn = false;
  }
  async componentDidMount() {
    var udet = await getUserDetail();
    this.isLoggedIn = udet["success"];
    console.log(this.isLoggedIn);
    this.setState({});
  }

  async register() {
    trackFB("Lead", {});
    var email = document.getElementById("regemail").value;
    var password = document.getElementById("regpass").value;
    var cpassword = document.getElementById("regcpass").value;
    var name = document.getElementById("regname").value;
    var refererCode = document.getElementById("referercode").value;
    //  check if all value is not empty
    if (email !== "" || password !== "" || cpassword !== "" || name !== "") {
      if (password !== cpassword) {
        alert("Passwords do not match");
        return;
      } else if (password.length < 8) {
        alert("Password must be atleast 8 characters");
        return;
      } else {
        var map = {
          email: email,
          password: password,
          cpassword: cpassword,
          name: name,
        };
        if (refererCode !== "") {
          map.referrerCode = refererCode;
        }
        var made = await registerUser(map);
        if (made.success) {
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
          toast.error(made.message);
        }
      }
    } else {
      alert("Please fill all the fields");
    }
  }
  render() {
    return (
      <section className="signup">
        <div className="signup-row">
          <div className="signup-form">
            <br />
            <div className="signup-form-container">
              <h1>Sign up to the beauty world</h1>
              <form method="POST">
                <input
                  type="text"
                  name="name"
                  maxLength={15}
                  id="regname"
                  placeholder="Full Name"
                />{" "}
                <br />
                <input
                  type="email"
                  name="email"
                  id="regemail"
                  placeholder="Email"
                />{" "}
                <br />
                <input
                  type="password"
                  name="password"
                  id="regpass"
                  placeholder="Password"
                />{" "}
                <br />
                <input
                  type="password"
                  name="password"
                  id="regcpass"
                  placeholder="Confirm Password"
                />{" "}
                <br />
                <input
                  type="text"
                  name="referercode"
                  defaultValue={
                    this.props.referrerCode !== undefined
                      ? this.props.referrerCode
                      : ""
                  }
                  id="referercode"
                  placeholder="Referer Code (Optional)"
                />{" "}
                <br />
                <input
                  id="signupsubmit"
                  type="button"
                  value="SignUp"
                  onClick={async () => {
                    this.register();
                  }}
                />
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
                <br />
                <br />
                <span>
                  Already an user?{" "}
                  <NavLink className="singuplink" to="/login">
                    LogIn
                  </NavLink>
                </span>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default SingupScreen;

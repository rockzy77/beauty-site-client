import { Component } from "react";
import { NavLink, useParams } from "react-router-dom";
import { registerUser, getUserDetail, googleRegisterUser } from "../../js/auth";
import { FcGoogle } from "react-icons/fc";
import { firebase_app } from "../../js/config/firebaseConfig";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { toast } from 'react-toastify';


const SingupScreen = (props) => {
  const { referrerCode } = useParams();
  return <SingupScreenCont referrerCode={referrerCode} />;
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

  async googleRegister() {
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
        var map = {
            name: user.displayName,
            email: user.email
        }
        var refererCode = document.getElementById('referercode').value;
        if(refererCode !== ''){
            map.referrerCode = refererCode;
        }
        var made = await googleRegisterUser(map);
        if (made.success) {
            toast.success('Successfully registered');
            window.location.href = "/";
          } else {
            toast.error(made.message)
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

  async register() {
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
          toast.success('Successfully registered');
          window.location.href = "/";
        } else {
          toast.error(made.message)
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
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    this.googleRegister();
                  }}
                  id="googlelogin"
                >
                  <FcGoogle className="googleicon" /> SignUp Via Google
                </button>
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

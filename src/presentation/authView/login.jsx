import { Component } from "react";
import { NavLink } from "react-router-dom";
import { getUserDetail, loginUser } from "../../js/auth";


class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.isLoggedIn = false;
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
                <input type="button" value="Log In" onClick={loginUser} />
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

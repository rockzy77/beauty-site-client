import { Component } from "react";
import $ from "jquery";
import { forgotPassword } from "../../js/auth";
import { NavLink } from "react-router-dom";

class ForgotPassword extends Component {
  render() {
    return (
      <div className="forgotPasswordSection">
        <div className="forgotPassCont">
          <h1>Forgot Password?</h1>
          <p>Dont worry. We will send you a reset link</p>
          <br />
          <label htmlFor="email">
            <strong>Email</strong> <br />
            <input
              type="email"
              placeholder="Enter your email here"
              name="email"
              id="fpassemail"
            />
            </label>
            <br />
            <br />
            <input
              onClick={async () => {
                var fpemail = $("#fpassemail").val();
                if (fpemail !== "") {
                  $(".fpassbtn").prop("disabled", true);
                  var made = await forgotPassword(fpemail);

                  if (made) {
                    $('#fphide').css('display', 'block');
                  } else {
                    $('#errorfphide').css('display', 'block');
                    $(".fpassbtn").prop("disabled", false);
                  }
                }
              }}
              className="fpassbtn"
              type="button"
              value="Reset Password"
            />
            <div id="fphide">
            <p className="fpspan">* A reset link was sent to your email.</p>
            <NavLink className='fplink' to='/login'>Go to Login Page</NavLink>
            </div>
            <div id="errorfphide">
            <p className="errorfpspan">* Something went wrong. Please try again.</p>
            </div>
        </div>
      </div>
    );
  }
}

export default ForgotPassword;

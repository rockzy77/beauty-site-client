import { Component } from "react";
import {  resetForgotPassword } from "../../js/auth";
import { NavLink, useParams } from "react-router-dom";
import { toast } from 'react-toastify';



const ResetPassword = ()=>{
    var {token} = useParams();
    return <ResetPasswordCont token={token}/>
}

class ResetPasswordCont extends Component {
  render() {
    return (
      <div className="resetPasswordSection">
        <div className="resetPassCont">
          <h1>Reset Password</h1>
          <p>Type your new password</p>
          <br />
          <label htmlFor="newpass">
            <strong>New Password</strong> <br />
            <input
              type="newpass"
              placeholder="Enter your new password"
              name="newpass"
              id="newpass"
            />
            </label>
            <br />
            <br />
            <label htmlFor="newpass2">
            <strong>Confirm New Password</strong> <br />
            <input
              type="newpass2"
              placeholder="Confirm your new password"
              name="newpass2"
              id="newpass2"
            />
            </label>
            <br />
            <br />
            <input
              onClick={async () => {
                var newpass = document.getElementById("newpass").value;
                var newpass2 = document.getElementById("newpass2").value;
                if (newpass === newpass2) {
                  if (newpass.length >= 8) {
                    var made = await resetForgotPassword(newpass, newpass2, this.props.token)
                    if(made.success){
                      toast.success('Password changed successfully.');
                      window.location.href = "/"
                    }
                    else{
                      toast.error('Something went wrong!');
                    }
                  } else {
                    toast.error("Password must be atleast 8 characters long")
                  }
                } else {
                  toast.error('Passwords do not match')
                }

              }}
              className="fpassbtn"
              type="button"
              value="Reset Password"
            />
            <div id="fphide">
            <p className="fpspan">Password was changed sucecssfully.</p>
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

export default ResetPassword;

import { Component } from "react";
import { NavLink } from "react-router-dom";
import { registerUser, logoutUser, getUserDetail } from "../../js/auth";

class SingupScreen extends Component{
    constructor(props) {
        super(props);
        this.isLoggedIn = false;
      }
      async componentDidMount() {
        var udet = await getUserDetail();
        this.isLoggedIn = udet["success"];
        console.log(this.isLoggedIn);
        if (this.isLoggedIn == true) {
          window.location.replace("/account");
        }
        this.setState({});
      }
    render(){
        return <section className="signup">
            <div className="signup-row">
                <div className="signup-form">
                    <br />
                    <div className="signup-form-container">
                    <h1>Sign up to the beauty world</h1>
                    <form method="POST" action="https://ecommerce-backend-0.herokuapp.com/api/v2/registration">
                        <input type="text" name="name" maxLength={15} id="regname" placeholder="Full Name" /> <br />
                        <input type="email" name="email" id="regemail" placeholder="Email" /> <br />
                        <input type="password" name="password" id="regpass" placeholder="Password" /> <br />
                        <input type="password" name="password" id="regcpass" placeholder="Confirm Password" /> <br />
                        <input type="text" name="referercode" id="referercode" placeholder="Referer Code (Optional)" /> <br />
                        <input type="button" value="SignUp" onClick={registerUser}/>
                        <span>Already an user? <NavLink className='singuplink' to='/login'>LogIn</NavLink></span>
                    </form>
                    </div>
                </div>
            </div>
        </section>
    }
}


export default SingupScreen;
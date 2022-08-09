import { Component } from "react";
import NavBar from "../../components/NavBar";
import { getUserDetail, logoutUser, updatePassword, updateUserInfo } from "../../js/auth";
import { MdOutlineAccountCircle } from "react-icons/md";
import { FaRegAddressBook } from "react-icons/fa";
import { BsBagCheck } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { BiLogOut } from "react-icons/bi";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

import $ from "jquery";
import { NavLink } from "react-router-dom";

class AccountView extends Component {
  constructor(props) {
    super(props);
    this.isLoggedIn = false;
    this.setting = "pinfo";
    this.userinfo = {
      name: "",
      email: "",
      role: "user"
    };
  }

  async componentDidMount() {
    var udet = await getUserDetail();
    this.isLoggedIn = udet["success"];
    this.userinfo = udet["user"];
    if(this.isLoggedIn == false){
        window.location.replace('/');
    }
    this.setState({});
  }

  changeSetting = (setting) => {
    this.setting = setting;
    $(".pinfo").removeClass("active");
    $(".myorder").removeClass("active");
    $(".accsett").removeClass("active");
    $(`.${setting}`).addClass("active");
    this.setState({});
  };

  handleClick = () => {
    console.log(this.setting);
  };

  render() {
    return (
      <section className="accountView">
        <NavBar isLoggedIn={this.isLoggedIn} />
        <div className="accountPanelRow">
          <div className="accountSidePanel">
            <br />
            <br />
            <br />
            <h1>Account Settings</h1>
            <br />
            <br />
            <button
              onClick={() => {
                this.changeSetting("pinfo");
              }}
              className="active pinfo"
            >
              <MdOutlineAccountCircle className="acc-icon" /> Personal Info
            </button>
            <br />
           
            <button
              onClick={() => {
                this.changeSetting("myorder");
              }}
              className="myorder"
            >
              <BsBagCheck className="acc-icon" /> My Orders
            </button>
            <br />
            <button
              onClick={() => {
                this.changeSetting("accsett");
              }}
              className="accsett"
            >
              <FiSettings className="acc-icon" /> Account Settings
            </button>
            <br />
            <button
              onClick={() => {
                logoutUser();
              }}
              className="logoutbtn"
            >
              <BiLogOut className="acc-icon" /> Log Out
            </button>
            <br />
            <br />
            {this.userinfo.role == 'admin' ? <NavLink className='adminpanelbtn' to='/admin_panel'>
              <MdOutlineAdminPanelSettings className="acc-icon" /> Admin Panel
              </NavLink> : <div></div>}
            
          </div>
          <div className="accountContentPanel">
            <br />
            <br />
            <br />
            <PersonalInfo
              name={this.userinfo["name"]}
              email={this.userinfo["email"]}
            />
          </div>
        </div>
      </section>
    );
  }
}

const PersonalInfo = (props) => (
  (
    <div className="personalInfo">
      <h1>Personal Info</h1>
      <br />
      <form className="personalForm">
        <label htmlFor="name">
          <span className="pformSpan">Name</span> <br />
          <input
            id="pfname"
            maxLength={15}
            defaultValue={props.name}
            type="text"
            name="name"
          />
        </label>
        <label htmlFor="email">
          <span className="pformSpan">Email</span> <br />
          <input
            type="email"
            defaultValue={props.email}
            name="email"
            id="pfemail"
          />
        </label>
        <br />
        <input
          id="pfbtn"
          type="button"
          value="Save"
          onClick={() => {
            var name = $("#pfname").val();
            var email = $("#pfemail").val();
            updateUserInfo(name, email);
          }}
        />
        <br />
        <br />
        <h5>Change Password</h5>
        <input
          type="password"
          placeholder="Current Password"
          name="password"
          id="pfoldpass"
        />


        <br />


        <input
          type="password"
          placeholder="New Password"
          name="password"
          id="pfnewpass"
        /> 


        <input
          type="password"
          placeholder="Confirm New Password"
          name="password"
          id="pfcnewpass"
        />{" "}
        <br />


        <span className="passerror">
            </span> <br />
        <input id="pfpassbtn" type="button" onClick={()=>{
            var oldpass = $("#pfoldpass").val();
            var newpass = $("#pfnewpass").val();
            var cnewpass = $("#pfcnewpass").val();
            updatePassword(oldpass, newpass, cnewpass);
        }} value="Change Password" />
      </form>
    </div>
  )
);

export default AccountView;

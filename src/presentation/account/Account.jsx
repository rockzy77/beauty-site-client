import { Component } from "react";
import NavBar from "../../components/NavBar";
import {
  getReferralLink,
  getUserDetail,
  logoutUser,
  updatePassword,
  updateUserInfo,
} from "../../js/auth";
import { MdOutlineAccountCircle } from "react-icons/md";
import { GiTicket } from "react-icons/gi";
import { BsBagCheck } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { BiLogOut } from "react-icons/bi";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { AiOutlineCopy } from "react-icons/ai";

import $ from "jquery";
import { NavLink } from "react-router-dom";
import public_url from "../../js/publicurl";
import MyOrders from "./MyOrders";
import { getOrders } from "../../js/products";

class AccountView extends Component {
  constructor(props) {
    super(props);
    this.isLoggedIn = false;
    this.setting = "pinfo";
    this.referralLink = "";
    this.referrals = 0;
    this.orderDet = [];
    this.orderItems = [];
    this.orderImages = [];
    this.userinfo = {
      name: "",
      email: "",
      role: "user",
    };
  }

  async componentDidMount() {
    var udet = await getUserDetail();
    this.isLoggedIn = udet["success"];
    this.userinfo = udet["user"];
    var det = await getReferralLink();
    var ord = await getOrders();
    if (det["success"]) {
      this.referralLink = det["referralCode"];
      this.referrals = det["referrals"];
    } 
    if(ord['success']){
      this.orderDet = ord['orders_details'];
      this.orderItems = ord['order_items'];
      this.orderImages = ord['images'];
    }
    this.setState({});
  }

  changeSetting = (setting) => {
    this.setting = setting;
    $(".pinfo").removeClass("active");
    $(".myorder").removeClass("active");
    $(".refer").removeClass("active");
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
                this.changeSetting("refer");
              }}
              className="refer"
            >
              <GiTicket className="acc-icon" /> Refer a friend
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
            {this.userinfo.role == "admin" ? (
              <NavLink className="adminpanelbtn" to="/admin_panel/dashboard">
                <MdOutlineAdminPanelSettings className="acc-icon" /> Admin Panel
              </NavLink>
            ) : (
              <div></div>
            )}
          </div>
          <div className="accountContentPanel">
            <br />
            <br />
            <br />
            {this.setting == "pinfo" ? (
              <PersonalInfo
                name={this.userinfo["name"]}
                email={this.userinfo["email"]}
              />
            ) : this.setting == 'refer' ? (
              <ReferalPrgScreen referralLink={this.referralLink} referrals={this.referrals} />
            ): <MyOrders ordDet={this.orderDet} ordItems={this.orderItems} ordImages={this.orderImages} />}
          </div>
        </div>
      </section>
    );
  }
}

const ReferalPrgScreen = (props) => {
  return (
    <div className="referalPrg">
      <h1>Refer your friends and earn rewards.</h1>
      <p>
        You can now earn up tp 15% discounts by inviting 3 of your friends
      </p>{" "}
      <br />
      <br />
      {/* <img className="referralimg" src={public_url+'referral.png'} alt="" /> */}
      <p>Copy this referral code and send to your friend</p>
      <input
        type="text"
        name="referallink"
        id="referallink"
        defaultValue={props.referralLink}
      />
      <button
        className="copy-text"
        onClick={() => {
          var copyText = document.getElementById("referallink");

          copyText.select();
          copyText.setSelectionRange(0, 99999);

          navigator.clipboard.writeText(copyText.value);
          alert('Referral code copied.')
        }}
      >
        <AiOutlineCopy />
      </button>
      <br />
      <br />
      <br />
      <p style={{'color': '#777fa8'}}>No of refferals: {props.referrals}</p>

      <button>
        Generate Discount
      </button>
    </div>
  );
};

const PersonalInfo = (props) => (
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
      <span className="passerror"></span> <br />
      <input
        id="pfpassbtn"
        type="button"
        onClick={() => {
          var oldpass = $("#pfoldpass").val();
          var newpass = $("#pfnewpass").val();
          var cnewpass = $("#pfcnewpass").val();
          updatePassword(oldpass, newpass, cnewpass);
        }}
        value="Change Password"
      />
    </form>
  </div>
);

export default AccountView;

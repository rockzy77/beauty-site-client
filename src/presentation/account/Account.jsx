import { Component } from "react";
import NavBar from "../../components/NavBar";
import {
  getReferralLink,
  getUserDetail,
  logoutUser,
  updatePassword,
  updateUserInfo,
} from "../../js/auth";
import { MdOutlineAccountCircle, MdSettings } from "react-icons/md";
import { GiTicket } from "react-icons/gi";
import { BsBagCheck } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { BiLogOut } from "react-icons/bi";
import { MdOutlineAdminPanelSettings, MdMenu, MdClose } from "react-icons/md";
import { AiOutlineCopy } from "react-icons/ai";
import $ from "jquery";
import { NavLink } from "react-router-dom";
import public_url from "../../js/publicurl";
import MyOrders from "./MyOrders";
import { getOrders } from "../../js/products";
import { generateReferralDiscount } from "../../js/payment";
import { useEffect } from "react";
import { sendMail } from "../../js/sendMail";
import {  toast } from 'react-toastify';

class AccountView extends Component {
  constructor(props) {
    super(props);
    this.isLoggedIn = false;
    this.setting = "pinfo";
    this.orderDet = [];
    this.isAdmin = false;
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
    if (this.isLoggedIn) {
      console.log(udet);
      this.isAdmin = udet.user.role === "admin";
    }
    this.userinfo = udet["user"];
    var ord = await getOrders();
    if (ord["success"]) {
      this.orderDet = ord["orders_details"];
      this.orderItems = ord["order_items"];
      this.orderImages = ord["images"];
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
        <NavBar isLoggedIn={this.isLoggedIn} isAdmin={this.isAdmin} />
        <div className="accountPanelRow">
          <div id="accountSidePanel" className="accountSidePanel">
            <br />
            <br />
            <br />
            <br />
            <MdMenu
              onClick={() => {
                var width =
                  document.getElementById("accountSidePanel").clientWidth;
                if (width === 55) {
                  $("#accountSidePanel").css("width", "270px");
                  $("#accountSidePanel button").css("width", "240px");
                  $(".acc-span").fadeIn();
                } else {
                  $("#accountSidePanel").css("width", "55px");
                  $("#accountSidePanel button").css("width", "45px");
                  $(".acc-span").fadeOut();
                }
              }}
              className="acc-menu"
            />

            <br />
            <br />
            <div className="admin-panel-nav-buttons">
              <button
                onClick={() => {
                  this.changeSetting("pinfo");
                }}
                className="active pinfo ascont"
              >
                <MdOutlineAccountCircle className="acc-icon" />{" "}
                <span className="acc-span">Personal Info</span>
              </button>

              <button
                onClick={() => {
                  this.changeSetting("myorder");
                }}
                className="myorder"
              >
                <BsBagCheck className="acc-icon" />{" "}
                <span className="acc-span">My Orders</span>
              </button>
              <button
                onClick={() => {
                  this.changeSetting("refer");
                }}
                className="refer"
              >
                <GiTicket className="acc-icon" />{" "}
                <span className="acc-span">Refer a friend</span>
              </button>
              <button
                onClick={() => {
                  logoutUser();
                }}
                className="logoutbtn"
              >
                <BiLogOut className="acc-icon" />
                <span className="acc-span">Log Out</span>
              </button>
              <br />
              <br />
            </div>
          </div>
          <div id="accountContentPanel" className="accountContentPanel">
            <br />
            <br />
            <br />
            <br />
            {this.setting === "pinfo" ? (
              <PersonalInfo
                name={this.userinfo["name"]}
                email={this.userinfo["email"]}
                isGoogleUser={this.userinfo.isGoogleUser}
              />
            ) : this.setting === "refer" ? (
              <ReferalPrgScreen userName={this.userinfo.name} />
            ) : (
              <MyOrders
                ordDet={this.orderDet}
                ordItems={this.orderItems}
                ordImages={this.orderImages}
              />
            )}
          </div>
        </div>
      </section>
    );
  }
}

async function referaldetails() {
  var det = await getReferralLink();
  if (det["success"]) {
    var referrerLink = "https://reapofficial.com/signup/" + det["referralCode"];
    $("#referallink").val(referrerLink);
    var noofreferrals = det.referrals;
    $("#noofrefferal").text("No of referrals: " + noofreferrals);
    if (noofreferrals > 0) {
      $("#generatedisbtn").show();
    }
  }
}

const ReferalPrgScreen = (props) => {
  useEffect(() => {
    var det = referaldetails();
  });
  return (
    <div className="referalPrg">
      <h1>Refer your friends and earn rewards.</h1>
      <p>
        You can now earn up tp 15% discounts by inviting 3 of your friends
      </p>{" "}
      <br />
      <br />
      <p>Copy this referral link and send to your friend</p>
      
      <input type="text" name="referallink" id="referallink" disabled />
      <button
        className="copy-text"
        onClick={() => {
          var copyText = document.getElementById("referallink");

          copyText.select();
          copyText.setSelectionRange(0, 99999);

          navigator.clipboard.writeText(copyText.value);
          alert("Referral link copied.");
        }}
      >
        <AiOutlineCopy />
      </button>
      <br />
      <br />
      <br />
      <p>Referral will be increased when invited user buys a product</p>
      <p id="noofrefferal" style={{ color: "#777fa8" }}></p>
      <button
        id="generatedisbtn"
        style={{ display: "none" }}
        onClick={async () => {
          var made = await generateReferralDiscount();
          if (made.success) {
            toast.success('Referral discount generated.');
            $("#noofrefferal").text("No of referrals: " + 0);
            $("#generatedisbtn").hide();
            var discountcode = made.discount.name;
            var percent = made.discount.discount_percent;
            $('#cong').text(`Congrats, you have acquired ${percent}% discount.`);
            $('#discount-gen').val(discountcode);
            $('.discount-show').show();
            var subject = 'Congratulations, you have acquired a discount';
            var body = `Hello ${props.userName}, you have acquired a discount of ${percent}%. Use this code '${discountcode}' to redeem your discount.`;
            await sendMail(subject, body);
          } else {
            toast.error('Error generating referral discount.');
          }
        }}
      >
        Generate Discount
      </button>
      <br />
      <div style={{'display': 'none'}} className="discount-show">
        <p id="cong"></p>
      <p>Discount Code: </p>
      <input disabled type="text" name="" id="discount-gen" />
      <button
        className="copy-text"
        onClick={() => {
          var copyText = document.getElementById("discount-gen");

          copyText.select();
          copyText.setSelectionRange(0, 99999);

          navigator.clipboard.writeText(copyText.value);
          alert("Discount Code Copied");
        }}
      ><AiOutlineCopy /></button>
      <p>Discount code has been sent to your mail.</p>
      </div>
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
      {props.isGoogleUser !== 'true' ? <div>
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
      </div> : <div></div>}
    </form>
  </div>
);

export default AccountView;

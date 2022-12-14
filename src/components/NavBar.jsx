import React, { Component } from "react";
import { MdAdminPanelSettings, MdOutlineShoppingCart } from "react-icons/md";
import { MdMenu } from "react-icons/md";
import { FiLogIn } from "react-icons/fi";
import $ from "jquery";
import { getUserDetail } from "../js/auth";
import { NavLink } from "react-router-dom";
import public_url from "../js/publicurl";
import { RiAccountCircleFill } from "react-icons/ri";
import ScrollIntoView from "react-scroll-into-view";
import { getCartItem } from "../js/products";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { getData } from "../js/myStore";
import { createCookie, getCookie } from "../js/cookies";


var called = false; 
var calledM = false; 

const CartNumber = () => {
  var dispatch = useDispatch();

  async function getN() {
    called = true;
    const cart = await getCartItem();
    if (cart.success) {
      createCookie("cartNumber", cart.cartData.length, 1);
    } else {
      if (cart.message === "Please Login for access this resource") {
        if (getCookie("cartList") != "") {
          var carts = JSON.parse(getCookie("cartList"));
          createCookie("cartNumber", carts.length, 1);
        } else {
          createCookie("cartNumber", 0, 1);
        }
      } else {
        createCookie("cartNumber", 0, 1);
      }
    }
    
  }

  const data = useSelector((state) => state.theStore.value);
  useEffect(() => {
   if(called === false){
    getN();
   }
   if(getCookie("cartNumber") != ""){
    createCookie("cartNumber", getCookie("cartNumber"), 1);
   }
   else{
    createCookie("cartNumber", 0, 1);
   }
   var cn = getCookie("cartNumber");
    dispatch(getData(cn));
  });
  return (
    <NavLink to="/cart">
      <MdOutlineShoppingCart className="cart-icon cart-icons" />
      <span id="cart-count">{isNaN(data) || data == '' ? 0 : data > 20 ? '20+' : data}</span>
    </NavLink>
  );
};

const CartNumberMobile = () => {
  var dispatch = useDispatch();

  async function getN() {
    calledM = true;
    const cart = await getCartItem();
    if (cart.success) {
      createCookie("cartNumber", cart.cartData.length, 1);
    } else {
      if (cart.message === "Please Login for access this resource") {
        if (getCookie("cartList") != "") {
          var carts = JSON.parse(getCookie("cartList"));
          createCookie("cartNumber", carts.length, 1);
        } else {
          createCookie("cartNumber", 0, 1);
        }
      } else {
        createCookie("cartNumber", 0, 1);
      }
    }
    
  }

  const data = useSelector((state) => state.theStore.value);
  useEffect(() => {
   if(calledM === false){
    getN();
   }
   if(getCookie("cartNumber") != ""){
    createCookie("cartNumber", getCookie("cartNumber"), 1);
   }
   else{
    createCookie("cartNumber", 0, 1);
   }
   var cn = getCookie("cartNumber");
    dispatch(getData(cn));
  });
  return (
    <NavLink to="/cart" id="cart-icon-mob">
      <div className="s">
        <MdOutlineShoppingCart className="nav-menu-btn" />
        <span id="cart-count-mob">{isNaN(data) || data == '' ? 0 : data > 20 ? '20+' : data}</span>
      </div>
    </NavLink>
  );
};

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.logged = false;
    this.cartItems = 0;
  }

  async componentDidMount() {
    var udet = await getUserDetail();
    this.logged = udet["success"];
    // this.cartItems = this.props.cartNumber;
    this.setState({});
  }

  render() {
    var openNav = function () {
      $(".nav-content-mobile").toggleClass("show");
      $(".navBarMobile").toggleClass("fitheight");
    };
    return (
      <div className="navEntry">
        {/* <button onClick={()=>{

        }}>sddd</button> */}
        {/* For desktop */}
        <div className="navDesk">
          <nav className="navBar">
            <img className="navTitle" src={public_url + "logo.png"} alt="" />
            <ul className="side-nav-content">
              <li>
                <CartNumber />

                {this.props.isLoggedIn ? (
                  <NavLink to="/account" className="acc-text">
                    <RiAccountCircleFill className="cart-icon" />
                  </NavLink>
                ) : this.props.isLoggedIn === undefined ? (
                  this.logged ? (
                    <NavLink to="/account" className="acc-text">
                      <RiAccountCircleFill className="cart-icon" />
                    </NavLink>
                  ) : (
                    <NavLink id="loginglink" to="/login" className="acc-text">
                      <FiLogIn className="cart-icon" />
                    </NavLink>
                  )
                ) : (
                  <NavLink id="loginglink" to="/login" className="acc-text">
                    <FiLogIn className="cart-icon" />
                  </NavLink>
                )}

                {this.props.isAdmin ? (
                  <NavLink to="/admin_panel/dashboard">
                    <MdAdminPanelSettings className="cart-icon" />
                  </NavLink>
                ) : (
                  <div></div>
                )}
              </li>
            </ul>

            <ul className="centre-nav-content">
              <li>
                <NavLink to="/" className="acc-text">
                  Home
                </NavLink>
                <ScrollIntoView style={{ display: "none" }} selector="#about">
                  <span id="scrollintoview">About</span>
                </ScrollIntoView>
                <NavLink
                  to="/"
                  onClick={() => {
                    document.getElementById("scrollintoview").click();
                  }}
                  className="acc-text"
                >
                  About
                </NavLink>
                <NavLink to="/shop" className="acc-text">
                  Shop
                </NavLink>
                <NavLink to="/learn" className="acc-text">
                  Learn
                </NavLink>
                <NavLink to="/contactUs" className="acc-text">
                  Contact Us
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>

        {/* For Mobile */}
        <div className="navMobile">
          <nav className="navBarMobile">
            <div className="navBar">
              <img
                className="navTitle"
                src={process.env.PUBLIC_URL + "logo.png"}
                alt=""
              />

              <div className="nav-mob-icon-cont">
                <CartNumberMobile />

                {this.props.isLoggedIn ? (
                  <NavLink to="/account">
                    <div className="s">
                      <RiAccountCircleFill className="nav-menu-btn" />
                    </div>
                  </NavLink>
                ) : this.props.isLoggedIn === undefined ? (
                  this.logged ? (
                    <NavLink to="/account">
                      <div className="s">
                        <RiAccountCircleFill className="nav-menu-btn" />
                      </div>
                    </NavLink>
                  ) : (
                    <NavLink id="loginglink" to="/login">
                      <div className="s">
                        <FiLogIn className="nav-menu-btn" />
                      </div>
                    </NavLink>
                  )
                ) : (
                  <NavLink id="loginglink" to="/login">
                    <div className="s">
                      <FiLogIn className="nav-menu-btn" />
                    </div>
                  </NavLink>
                )}

                <div className="s">
                  <MdMenu
                    onClick={openNav}
                    className="nav-menu-btn menu-menu"
                  />
                </div>
              </div>
            </div>

            <br />
            <br />
            <br />
            <ul className="nav-content-mobile">
              <li>
                <NavLink to="/" className="acc-text-mobile">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/"
                  onClick={() => {
                    document.getElementById("scrollintoview").click();
                  }}
                  className="acc-text-mobile"
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink to="/shop" className="acc-text-mobile">
                  Shop
                </NavLink>
              </li>
              <li>
                <NavLink to="/learn" className="acc-text-mobile">
                  Learn
                </NavLink>
              </li>
              <li>
                <NavLink to="/contactUs" className="acc-text-mobile">
                  Contact Us
                </NavLink>
              </li>
              <li className="adminli">
                {this.props.isAdmin ? (
                  <NavLink
                    className="acc-text-mobile"
                    to="/admin_panel/dashboard"
                  >
                    <MdAdminPanelSettings className="cart-icon" />
                  </NavLink>
                ) : (
                  <div></div>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}

export default NavBar;

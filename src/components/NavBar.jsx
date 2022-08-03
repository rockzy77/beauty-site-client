import React, { Component } from "react";
import { MdOutlineShoppingCart } from "react-icons/md"
import {GrMenu} from 'react-icons/gr';
import $ from 'jquery';
import {getUserDetail} from "../js/auth";

class NavBar extends Component {

  constructor(props){
    super(props);
  }

  render() {
    var openNav = function(){
      console.log('ss');
      $('.nav-bar-panel').toggleClass('show');
    }
    return (
      <div className="navEntry">
    {/* For desktop */}
      <div className="navDesk">
        <nav className="navBar">
        <img
          className="navTitle"
          src={process.env.PUBLIC_URL + "logo.png"}
          alt=""
        />
        <ul className="side-nav-content">
          <li>
            {this.props.isLoggedIn ? <a href="/" className="acc-text">
              Account
            </a> : <a href="/login" className="acc-text">
              LogIn
            </a>}
            {this.props.isLoggedIn ? <a  onClick={getUserDetail}>
              <MdOutlineShoppingCart className="cart-icon" />
            </a> : <div></div>}
          </li>
        </ul>

        <ul className="centre-nav-content">
          <li>
            <a href="/">Home</a>
            <a href="/#about">About</a>
           <a href="/shop">Shop</a>
            <a href="/learn">Learn</a>
          </li>
        </ul>
      </nav>
      </div>



      {/* For Mobile */}
      <div className="navMobile">
      <nav className="navBar">
        <img
          className="navTitle"
          src={process.env.PUBLIC_URL + "logo.png"}
          alt=""
        />
        <GrMenu onClick={openNav} className="nav-menu-btn" />
      </nav>
      <div className="nav-bar-panel">

      </div>
      </div>
      </div>
    );
  }
}

export default NavBar;

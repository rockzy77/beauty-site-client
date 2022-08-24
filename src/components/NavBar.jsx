import React, { Component } from "react";
import { MdOutlineShoppingCart } from "react-icons/md"
import {GrMenu} from 'react-icons/gr';
import $ from 'jquery';
import {getUserDetail} from "../js/auth";
import { NavLink } from "react-router-dom";
import public_url from "../js/publicurl";

class NavBar extends Component {

  constructor(props){
    super(props);
    this.logged = false;
  }

  async componentDidMount(){
    if(this.props.isLoggedIn == undefined){
      var udet = await getUserDetail();
      this.logged = udet['success'];
      this.setState({})
    }
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
          src={public_url + "logo.png"}
          alt=""
        />
        <ul className="side-nav-content">
          <li>
            {this.props.isLoggedIn ? <NavLink to="/account" className="acc-text">
              Account
            </NavLink> : this.props.isLoggedIn == undefined ? this.logged ? <NavLink to="/account" className="acc-text">
              Account
            </NavLink>: <NavLink id="loginglink" to="/login" className="acc-text">LogIn</NavLink>: <NavLink id="loginglink" to="/login" className="acc-text">
              LogIn
            </NavLink>}
            {this.props.isLoggedIn ? <NavLink  to='/cart'>
              <MdOutlineShoppingCart className="cart-icon" />
            </NavLink> : this.props.isLoggedIn == undefined ? this.logged ? <NavLink  to='/cart'>
              <MdOutlineShoppingCart className="cart-icon" /></NavLink> : <div></div>  : <div></div>}
          </li>
        </ul>

        <ul className="centre-nav-content">
          <li>
            <NavLink to="/" className='acc-text'>Home</NavLink>
            <NavLink to="/#about" className='acc-text'>About</NavLink>
           <NavLink to="/shop" className='acc-text'>Shop</NavLink>
            <NavLink to="/learn" className='acc-text'>Learn</NavLink>
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

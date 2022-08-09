import { Component } from "react";
import { FaFacebookSquare } from 'react-icons/fa';
import { AiFillInstagram } from 'react-icons/ai';
import { NavLink } from "react-router-dom";


class Footer extends Component{
    render(){
        return <footer className="container-fluid bg-grey py-5">
        <div className="container">
           <div className="row">
              <div className="col-md-6">
                 <div className="row">
                    <div className="col-md-6 ">
                       <div className="logo-part">
                          <h1>REAP</h1>
                          <p>H.no. 25-60/15, opp.Sbi bank, sree colony, Neredmet x road, Tirumalgiri Ramakrishnapuram, Hyderabad, Telangana, 500056</p>
                          <a href="mailto:contact@reapofficial.com">Email:  contact@reapofficial.com</a><br />
                          <a href="tel:7893250643">Phone: 7893250643</a>
                       </div>
                    </div>
                    <div className="col-md-6 px-4">
                       <h6> About Company</h6>
                       <p>Reap is a proud made in India brand specifically made for Indian skin and weather.</p>
                       <a href="#" className="btn-footer"> Contact Us</a>
                    </div>
                 </div>
              </div>
              <div className="col-md-6">
                 <div className="row">
                    <div className="col-md-6 px-4">
                       <h6> Help us</h6>
                       <div className="row ">
                          <div className="col-md-6">
                             <ul>
                                <li> <NavLink to="/"> Home</NavLink> </li>
                                <li> <NavLink to="/"> About</NavLink> </li>
                                <li> <NavLink to="/shop"> Shop</NavLink> </li>
                                <li> <NavLink to="/learn"> Learn</NavLink> </li>
                             </ul>
                          </div>
                          <div className="col-md-6 px-4">
                             <ul>
                                <li> <NavLink to="/"> Fax</NavLink> </li>
                                <li> <NavLink to="/"> Policy</NavLink> </li>
                                <li> <NavLink to="/"> Refunds</NavLink> </li>
                                <li> <NavLink to="/"> Paypal</NavLink> </li>
                             </ul>
                          </div>
                       </div>
                    </div>
                    <div className="col-md-6 ">
                       <h6> Newsletter</h6> 
                       <div className="social">
                          <a href="https://www.facebook.com/reapskincare"><FaFacebookSquare/></a>
                          <a href="https://www.instagram.com/reap_skincare/"><AiFillInstagram/></a>
                       </div>
                       <br />
                       <p>That's technology limitation of LCD monitors</p>
                    </div>
                 </div>
              </div>
              </div>
           </div>
        </footer>;
    }
}

export default Footer;
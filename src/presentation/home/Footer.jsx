import { Component } from "react";
import { FaFacebookSquare } from 'react-icons/fa';
import { AiFillInstagram } from 'react-icons/ai';
import { NavLink } from "react-router-dom";
import ScrollIntoView from 'react-scroll-into-view'

class Footer extends Component{
    render(){
        return <footer className={"container-fluid bg-grey py-5 "+this.props.classN}>
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
                          <br />
                          <br />
                       </div>
                    </div>
                    <div className="col-md-6 px-4">
                       <h6> About Company</h6>
                       <p>Reap is a proud made in India brand specifically made for Indian skin and weather.</p>
                       <NavLink to="/contactUs" className="btn-footer"> Contact Us</NavLink>
                    </div>
                 </div>
              </div>
              <div className="col-md-6">
                 <div className="row">
                    <div className="col-md-6 px-4">
                       <h6> Help us</h6>
                       <div className="row ">
                       <ScrollIntoView style={{'display': 'none'}} selector="#about">
              <span id="scrollintoview">About</span>
            </ScrollIntoView>
                          <div className="col-md-6">
                             <ul>
                                <li> <NavLink to="/"> Home</NavLink> </li>
                                <li> <NavLink to="/" onClick={()=>{
              document.getElementById('scrollintoview').click();
            }}> About</NavLink> </li>
                                <li> <NavLink to="/shop"> Shop</NavLink> </li>
                                <li> <NavLink to="/learn"> Learn</NavLink> </li>
                             </ul>
                          </div>
                          <div className="col-md-6 px-4">
                             <ul>
                                <li> <a target='_blank' href="https://aishwarya25011999.github.io/termsAndConditions/"> Terms and Conditions</a> </li>
                                <li> <a target='_blank' href="https://aishwarya25011999.github.io/privacyPolicy/"> Privacy</a> </li>
                                <li> <a target='_blank' href="https://aishwarya25011999.github.io/refundPolicy/"> Refunds/Cancellations</a> </li>
                             </ul>
                          </div>
                       </div>
                    </div>
                    <div className="col-md-6 ">
                       <h6> Newsletter</h6> 
                       <div className="social">
                          <a target='_blank' href="https://www.facebook.com/reapskincare"><FaFacebookSquare/></a>
                          <a target='_blank' href="https://www.instagram.com/reap_skincare/"><AiFillInstagram/></a>
                       </div>
                       <br />
                       
                    </div>
                 </div>
              </div>
              </div>
           </div>
        </footer>;
    }
}

export default Footer;
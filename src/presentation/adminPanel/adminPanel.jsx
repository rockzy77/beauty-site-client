import { Component } from "react";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import AllProducts from "./admin_panel_sections/AllProducts";
import Dashboard from "./admin_panel_sections/Dashboard";
import { MdOutlineDashboard } from "react-icons/md";
import { FaBoxOpen } from "react-icons/fa";
import { ImBoxAdd } from "react-icons/im";
import { MdLocalOffer } from "react-icons/md";
import CreateProducts from "./admin_panel_sections/CreateProducts";
import AllUsers from "./admin_panel_sections/User";
import public_url from "../../js/publicurl";

const AdminPanel = () => {
    
   var navigate = useNavigate(); 
  var admin_btns = document.getElementsByClassName("admin_panel_btn");
  for (var i = 0; i < admin_btns.length; i++) {
    admin_btns[i].addEventListener("click", function () {
      for (var j = 0; j < admin_btns.length; j++) {
        admin_btns[j].classList.remove("active");
      }
      this.classList.add("active");
      changeSection(this.innerText);
    });
  }
  const changeSection = (section) => {
    document.getElementById('section-title').innerHTML = 'Admin Panel/ '+section;

  };

  return (
    <section className="adminPanel">
      <div className="adminPanelSideNav">
        <div className="admin-img-head">
          <img src={public_url + "logo.png"} alt="" />
        </div>
        <div className="admin-btn-section">
          <br />
          <button onClick={()=>{
            navigate('dashboard')
          }} className="active admin_panel_btn">Dashboard</button>
          <br />
          <button onClick={()=>{
            navigate('allproducts')
          }}  className="admin_panel_btn">All Products</button>
          <br />
          <button onClick={()=>{
            navigate('createProduct')
          }} className="admin_panel_btn">Create Product</button>
          <br />
          <button onClick={()=>{
            navigate('allOrders')
          }} className="admin_panel_btn">All Orders</button>
          <br />
          <button onClick={()=>{
            navigate('allBlogs')
          }}  className="admin_panel_btn">All Blogs</button>
          <br />
          <button onClick={()=>{
            navigate('createBlog')
          }} className="admin_panel_btn">Create Blog</button>
          <br />
          <button onClick={()=>{
            navigate('allDiscounts')
          }} className="admin_panel_btn">All Discounts</button>
          <br />
          <button onClick={()=>{
            navigate('createDiscount')
          }} className="admin_panel_btn">Create Discount</button>
          <br />
          <button onClick={()=>{
            navigate('allusers')
          }} className="admin_panel_btn">Users</button>

          <br />
        </div>
      </div>
      <div className="adminPanelContent">
        <br />
        <h1 id='section-title' className="section-title">Admin Panel/ Dashboard</h1>
        <Outlet />
      </div>
    </section>
  );
};

export default AdminPanel;

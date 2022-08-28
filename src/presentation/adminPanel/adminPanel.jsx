import { Outlet, useNavigate } from "react-router-dom";
import {
  MdAddBox,
  MdDashboard,
  MdLocalOffer,
  MdMenu,
  MdShoppingBag,
} from "react-icons/md";
import { FaBloggerB, FaUserAlt } from "react-icons/fa";
import { BsCartCheckFill } from "react-icons/bs";
import { IoMdAdd, IoMdCreate } from "react-icons/io";
import $ from "jquery";

const AdminPanel = () => {
  var path = window.location.pathname;
  if (path.toLocaleLowerCase() === "/admin_panel/dashboard") {
    $(".admin_panel_btn").removeClass("active");
    $(".dashboards").addClass("active");
  } else if (path.toLocaleLowerCase() === "/admin_panel/allproducts") {
    $(".admin_panel_btn").removeClass("active");
    $(".allproducts").addClass("active");
  }
  else if (path.toLocaleLowerCase() === "/admin_panel/createproduct") {
    $(".admin_panel_btn").removeClass("active");
    $(".createProduct").addClass("active");
  }
  else if (path.toLocaleLowerCase() === "/admin_panel/allorders") {
    $(".admin_panel_btn").removeClass("active");
    $(".allOrders").addClass("active");
  }
  else if (path.toLocaleLowerCase() === "/admin_panel/allblogs") {
    $(".admin_panel_btn").removeClass("active");
    $(".allBlogs").addClass("active");
  }
  else if (path.toLocaleLowerCase() === "/admin_panel/createblog") {
    $(".admin_panel_btn").removeClass("active");
    $(".createBlog").addClass("active");
  }
  else if (path.toLocaleLowerCase() === "/admin_panel/alldiscounts") {
    $(".admin_panel_btn").removeClass("active");
    $(".allDiscounts").addClass("active");
  }
  else if (path.toLocaleLowerCase() === "/admin_panel/creatediscount") {
    $(".admin_panel_btn").removeClass("active");
    $(".createDiscounts").addClass("active");
  }
  else if (path.toLocaleLowerCase() === "/admin_panel/allusers") {
    $(".admin_panel_btn").removeClass("active");
    $(".allusers").addClass("active");
  }
  var navigate = useNavigate();
  
  const changeSection = (section) => {
    document.getElementById("section-title").innerHTML =
      "Admin Panel/ " + section;
  };

  return (
    <section className="adminPanel">
      <div id="adminPanelSideNav" className="adminPanelSideNav">
        <div className="admin-img-head">
          <MdMenu
            onClick={() => {
              var width =
                document.getElementById("adminPanelSideNav").clientWidth;
              if (width === 55) {
                document.getElementById("adminPanelSideNav").style.width =
                  "260px";
                $(".ad-spans").css("display", "inline-block");
              } else {
                document.getElementById("adminPanelSideNav").style.width =
                  "55px";
                $(".ad-spans").css("display", "none");
              }
            }}
            className="admin-menu"
          />
        </div>
        <div className="admin-btn-section">
          <br />
          <button
            onClick={() => {
              navigate("dashboard");
            }}
            className="active admin_panel_btn dashboards"
          >
            {" "}
            <MdDashboard className="ad-icons" />{" "}
            <span className="ad-spans">Dashboard</span>
          </button>
          <br />
          <button
            onClick={() => {
              navigate("allproducts");
            }}
            className="admin_panel_btn allproducts"
          >
            {" "}
            <MdShoppingBag className="ad-icons" />{" "}
            <span className="ad-spans">All Products</span>
          </button>
          <br />
          <button
            onClick={() => {
              navigate("createProduct");
            }}
            className="admin_panel_btn createProduct"
          >
            <MdAddBox className="ad-icons" />{" "}
            <span className="ad-spans">Create Product</span>
          </button>
          <br />
          <button
            onClick={() => {
              navigate("allOrders");
            }}
            className="admin_panel_btn allOrders"
          >
            <BsCartCheckFill className="ad-icons" />{" "}
            <span className="ad-spans">All Orders</span>
          </button>
          <br />
          <button
            onClick={() => {
              navigate("allBlogs");
            }}
            className="admin_panel_btn allBlogs"
          >
            <FaBloggerB className="ad-icons" />{" "}
            <span className="ad-spans">All Blogs</span>
          </button>
          <br />
          <button
            onClick={() => {
              navigate("createBlog");
            }}
            className="admin_panel_btn createBlog"
          >
            <IoMdCreate className="ad-icons" />{" "}
            <span className="ad-spans">Create Blog</span>
          </button>
          <br />
          <button
            onClick={() => {
              navigate("allDiscounts");
            }}
            className="admin_panel_btn allDiscounts"
          >
            <MdLocalOffer className="ad-icons" />{" "}
            <span className="ad-spans">All Discounts</span>
          </button>
          <br />
          <button
            onClick={() => {
              navigate("createDiscount");
            }}
            className="admin_panel_btn createDiscounts"
          >
            <IoMdAdd className="ad-icons" />{" "}
            <span className="ad-spans">Create Discount</span>
          </button>
          <br />
          <button
            onClick={() => {
              navigate("allusers");
            }}
            className="admin_panel_btn allusers"
          >
            <FaUserAlt className="ad-icons" />{" "}
            <span className="ad-spans">Users</span>
          </button>

          <br />
        </div>
      </div>
      <div className="adminPanelContent">
        <br />
        <h1 id="section-title" className="section-title">
          Admin Panel/ Dashboard
        </h1>
        <Outlet />
      </div>
    </section>
  );
};

export default AdminPanel;

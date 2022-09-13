import "./App.css";
import "./css/Product.css";
import "./css/AuthView.css";
import "./css/AdminPanel.css";
import "./css/Shop.css";
import "./css/AccountView.css";
import "./css/Checkout.css";
import "./css/Cart.css";
import "./css/ContactUs.css";
import "./css/Learn.css";
import "./css/MyOrders.css";
import "./fonts/Gilroy-Light.ttf";
import "./fonts/Gilroy-Regular.ttf";
import "./fonts/Gilroy-Medium.ttf";
import "./fonts/Gilroy-SemiBold.ttf";
import "./fonts/Gilroy-Bold.ttf";
import "./fonts/Gilroy-ExtraBold.ttf";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./presentation/home/home";
import LoginScreen from "./presentation/authView/login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Shop from "./presentation/shop/Shop";
import Product from "./presentation/product/Product";
import SingupScreen from "./presentation/authView/signup";
import AccountView from "./presentation/account/Account";
import ForgotPassword from "./presentation/authView/forgotPasswors";
import AdminPanel from "./presentation/adminPanel/adminPanel";
import ErrorScreen from "./presentation/404/404";
import ProtectedRoute from "./presentation/protectedRoute/protectedRoute";
import Checkout from "./presentation/checkout/checkout";
import Cart from "./presentation/cart/cart";
import PaySuccess from "./presentation/orderCheck/PaySuccess";
import PayFailure from "./presentation/orderCheck/PayFailure";
import Blog from "./presentation/blog/blog";
import SingleBlog from "./presentation/blog/SingleBlog";
import Dashboard from "./presentation/adminPanel/admin_panel_sections/Dashboard";
import AllProducts from "./presentation/adminPanel/admin_panel_sections/AllProducts";
import CreateProducts from "./presentation/adminPanel/admin_panel_sections/CreateProducts";
import AdminProductEdit from "./presentation/adminPanel/compo/AdminProductEdit";
import AllUsers from "./presentation/adminPanel/admin_panel_sections/User";
import AdminuserEdit from "./presentation/adminPanel/compo/AdminUserEdit";
import {  useState } from "react";
import CreateBlog from "./presentation/adminPanel/admin_panel_sections/CreateBlog";
import AllBlogs from "./presentation/adminPanel/admin_panel_sections/AllBlogs";
import AdminBlogEdit from "./presentation/adminPanel/compo/AdminBlogEdit";
import CreateDiscounts from "./presentation/adminPanel/admin_panel_sections/CreateDiscount";
import AllDiscounts from "./presentation/adminPanel/admin_panel_sections/AllDiscounts";
import AdminDiscountEdit from "./presentation/adminPanel/compo/AdminDiscountEdit";
import AllOrders from "./presentation/adminPanel/admin_panel_sections/AllOrders";
import AdminOrderEdit from "./presentation/adminPanel/compo/AdminOrderEdit";
import ResetPassword from "./presentation/authView/resetPassword";
import ContactUs from "./presentation/contactUs/ContactUs";
import {initializeFirebase} from "./js/config/firebaseConfig";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from "./components/NavBar";
import AdminOrderView from "./presentation/adminPanel/compo/AdminOrderView";


const App = () => {
  const [loading, setLoading] = useState(true);
  const spinner = document.getElementById("spinner");
  if (spinner) {
    setTimeout(() => {
      spinner.style.display = "none";
      setLoading(false);
    }, 2000);
  }
  initializeFirebase();
  return (
    !loading  && (<BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/filter_shop/:filter" element={<Shop />} />
        <Route path="product/:productId" element={<Product />} />
        <Route path="contactUs" element={<ContactUs />} />
        <Route
          path="/login"
          element={
            <ProtectedRoute protectMethod="ISLOGIN">
              <LoginScreen />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/signup"
          element={
            <ProtectedRoute protectMethod="ISLOGIN">
              <SingupScreen />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/signup/:referrerCode"
          element={
            <ProtectedRoute protectMethod="ISLOGIN">
              <SingupScreen />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/account"
          element={
            <ProtectedRoute protectMethod="ISNOTLOGIN">
              <AccountView />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/forgotPassword"
          element={
            <ProtectedRoute protectMethod="ISLOGIN">
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reset/password/:token"
          element={
            <ProtectedRoute protectMethod="ISLOGIN">
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin_panel"
          element={
            <ProtectedRoute protectMethod="ISADMIN">
              <AdminPanel />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="allproducts" element={<AllProducts />} />
          <Route path="createProduct" element={<CreateProducts />} />
          <Route path="updateProduct/:pid" element={<AdminProductEdit />} />
          <Route path="allusers" element={<AllUsers />} />
          <Route path="updateUser/:uid" element={<AdminuserEdit />} />
          <Route path="createBlog" element={<CreateBlog />} />
          <Route path="allBlogs" element={<AllBlogs />} />
          <Route path="updateBlog/:bid" element={<AdminBlogEdit />} />
          <Route path="createDiscount" element={<CreateDiscounts />} />
          <Route path="allDiscounts" element={<AllDiscounts />} />
          <Route path="updateDiscount/:name" element={<AdminDiscountEdit />} />
          <Route path="allOrders" element={<AllOrders />} />
          <Route path="updateOrder/:orderId" element={<AdminOrderEdit />} />
          <Route path="viewOrders" element={<AdminOrderView />} />
        </Route>
        <Route
          path="/checkout"
          element={
            // <ProtectedRoute protectMethod="ISNOTLOGIN">
              <Checkout />
            // </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute protectMethod="CART">
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/succ"
          element={
            <ProtectedRoute protectMethod="ISNOTLOGIN">
              <PaySuccess />
            </ProtectedRoute>
          }
        />
        <Route
          path="/fail/:failReason"
          element={
            <ProtectedRoute protectMethod="ISNOTLOGIN">
              <PayFailure />
            </ProtectedRoute>
          }
        />
        <Route path="/learn" element={<Blog />} />
        <Route path="/learn/:blogId" element={<SingleBlog />} />
        <Route path="*" element={<ErrorScreen />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>)
  );
};

export default App;

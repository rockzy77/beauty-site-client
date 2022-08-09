import "./App.css";
import "./Product.css";
import "./AuthView.css";
import "./AdminPanel.css";
import "./Shop.css";
import "./AccountView.css";
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
import ShopPage from "./presentation/shop/ShopPage";
import ShopFilter from "./presentation/shop/ShopFilter";


function App() {
  
  return <BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/shop" element={<Shop />} />
    <Route path="/filter_shop/:filter" element={<ShopFilter />} />
    <Route path="/product/:productId" element={<Product />} />
    <Route path="/login" element={<ProtectedRoute protectMethod='ISLOGIN'>
      <LoginScreen />
    </ProtectedRoute>}></Route>
    <Route path="/signup" element={<ProtectedRoute protectMethod='ISLOGIN'>
      <SingupScreen />
    </ProtectedRoute>}></Route>
    <Route path="/account" element={<ProtectedRoute protectMethod='ISNOTLOGIN'>
      <AccountView />
    </ProtectedRoute>}></Route>
    <Route path="/forgotPassword" element={
      <ProtectedRoute protectMethod='ISLOGIN'><ForgotPassword /></ProtectedRoute>
    } />
    <Route path="/admin_panel" element={
      <ProtectedRoute protectMethod='ISADMIN'>
        <AdminPanel />
      </ProtectedRoute>
    }/>
    <Route path='*' element={<ErrorScreen/>}/>
  </Routes>
</BrowserRouter>
}

export default App;

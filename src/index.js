import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Shop from './presentation/shop/Shop';
import Product1 from './presentation/products/product1/Product1';
import Product2 from './presentation/products/product2/Product2';
import Product3 from './presentation/products/product3/Product3';
import Product4 from './presentation/products/product4/Product4';
import LoginScreen from './presentation/authView/login';
import SingupScreen from './presentation/authView/signup';
import { getUserDetail } from './js/auth';

const root = ReactDOM.createRoot(document.getElementById('root'));

const PageNotFound = () =>(
  <div>
    <h1>PageNotFound</h1>
  </div>
)


   

root.render(
  <React.StrictMode>
    <Router>
      {/* <NavBar/> */}
      <Routes>
      <Route path="/" element={<App />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/product1" element={<Product1 />} />
      <Route path="/product2" element={<Product2 />} />
      <Route path="/product3" element={<Product3 />} />
      <Route path="/product4" element={<Product4 />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/signup" element={<SingupScreen />} />
      <Route path='*' element={PageNotFound}/>
      </Routes>
    </Router>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Shop from './presentation/shop/Shop';
import LoginScreen from './presentation/authView/login';
import SingupScreen from './presentation/authView/signup';
import { getUserDetail } from './js/auth';
import { CookiesProvider } from "react-cookie";
import Product from './presentation/product/Product';
import AccountView from './presentation/account/Account';
import ForgotPassword from './presentation/authView/forgotPasswors';
import AdminPanel from './presentation/adminPanel/adminPanel';

const root = ReactDOM.createRoot(document.getElementById('root'));

const PageNotFound = () =>(
  <div>
    <h1>PageNotFound</h1>
  </div>
)


   

root.render(
  <App/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

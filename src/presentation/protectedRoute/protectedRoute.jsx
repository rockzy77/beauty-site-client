import { getUserDetail } from "../../js/auth";
import { Navigate } from "react-router-dom";
import { Component } from "react";
import Cart from "../cart/cart";
import CartGuest from "../cart/cartGuest";

class ProtectedRoute extends Component {
  constructor(props) {
    super(props);
    this.isLoggedIn = null;
    this.userRole = '';
  }

  async componentDidMount() {
    var data = await getUserDetail();
    this.isLoggedIn = data["success"];
    if(data['success']){
      this.userRole = data['user']['role'];
    }
    this.setState({})
  }
  render() {
   if(this.props.protectMethod === 'ISLOGIN'){
    return this.isLoggedIn !== null ? this.isLoggedIn ? <Navigate to='/' /> : this.props.children : <div></div>
   }
   else if(this.props.protectMethod === 'ISNOTLOGIN'){
    return this.isLoggedIn !== null ? this.isLoggedIn ? this.props.children : <Navigate to='/' /> : <div></div>
   }
   else if(this.props.protectMethod === 'ISADMIN'){
    if(this.isLoggedIn !== null){
      if(this.isLoggedIn){
        if(this.userRole === 'admin'){
          return this.props.children;
        }
        else{
          return <Navigate to='/404' />;
        }
      }
      else{
        return <Navigate to='/404' />;
      }
    }
    else{
      return <div></div>
    }
   }
   else if(this.props.protectMethod === 'CART'){
    return this.isLoggedIn ? this.props.children : <CartGuest />;
   }
  }
}

export default ProtectedRoute;

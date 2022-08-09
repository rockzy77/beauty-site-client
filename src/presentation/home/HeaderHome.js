import { Component } from "react";
import { NavLink } from "react-router-dom";
import { routers } from "../../js/auth";

class HeaderHome extends Component{
    render(){
        return <div id="header-home" className="header-home">
        <div className="header-home-row">
          <div className="header-home-col1">
            <h1>
              Simple Routine,
              <br />
              Best reults.
            </h1>
            <p>
              Simplifying your routine with our multi ingredient focused
              products
            </p>
            <NavLink to='/shop'><button>Shop Now</button></NavLink>
          </div>

        </div>
      </div>;
    }
}

export default HeaderHome;
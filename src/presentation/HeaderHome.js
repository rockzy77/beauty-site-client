import { Component } from "react";

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
            <button>Shop Now</button>
          </div>
          <div className="header-home-col2">
            <img src={process.env.PUBLIC_URL + "bg.jpg"} alt="" />
          </div>
        </div>
      </div>;
    }
}

export default HeaderHome;
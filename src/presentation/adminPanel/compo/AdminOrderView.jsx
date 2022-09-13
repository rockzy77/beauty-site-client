import { extend } from "jquery";
import { Component, useEffect } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useHistory } from "react-router-dom";

const AdminOrderView = () => {
  var navigate = useNavigate();
  var location = useLocation();
  function goback(){
    navigate(-1);
  }
  var data = location.state !== null ? location.state : { orders: [] };
  var orders = [];
orders = data.orders;
var orderid = '';
orderid = data.order_id;

  return <AdminOrderViewPanel goback={goback} orders={orders} orderId={orderid} />
 
};

class AdminOrderViewPanel extends Component{
    constructor(props){
        super(props);
    }
    

    render(){
        return (
            <div className="adminProductEdit all-users">
              <div className="s_mini_nav">
                <span
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => {
                   this.props.goback();
                  }}
                >
                  {" "}
                  <MdKeyboardArrowLeft />{" "}
                </span>
                <h6>Order Items For {this.props.orderId}</h6>
              </div>
              <br />
              <div className="all-u-table"></div>
              <table>
                <thead>
                  <tr>
                    <th>SI NO</th>
                    <th>Product Id</th>
                    <th>Name</th>
                    <th>Units</th>
                    <th>Price Per Unit</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.props.orders.map((order, i) => {
                      return (
                        <tr>
                          <td>{i + 1}</td>
                          <td>{order.sku}</td>
                          <td>{order.name}</td>
                          <td>{order.units}</td>
                          <td>{order.selling_price}</td>
                        </tr>
                      );
                    })
                  
                  }
                  
                </tbody>
              </table>
            </div>
          );
    }
}

export default AdminOrderView;

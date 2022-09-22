import { Component } from "react";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { getAllOrdersAdmin } from "../../../js/adminProduct";
import { deleteOrder } from "../../../js/payment";
import { toast } from "react-toastify";

class AllOrders extends Component {
  constructor(props) {
    super(props);
    this.orders = [];
    this.ordersrow = [];
    this.orderDet = [];
    this.orderImages = [];
    this.backupordersRow = [];
    this.searchMethod = "Order Id";
    this.loading = true;
    this.popOrder = [];
    this.finalOrder = [];
  }

  changePopOrder(orders){
    this.popOrder = orders;
    this.setState({});
  }

  deleteRow(torderid) {
    this.loading = true;
    this.setState({})
    this.ordersrow = [];
    this.backupordersRow = [];
    var orderids = [];
    for (var i = 0; i < this.orders.length; i++) {
      orderids.push(this.orders[i].order_id);
    }
    
    // filter unique order ids
    orderids = orderids.filter((v, i, a) => a.indexOf(v) === i);
  
    for (var j = 0; j < orderids.length; j++) {
      if(orderids[j] !== torderid){
        var orderid = orderids[j];
        var indexes = [];
        var sameOrders = [];
        var snames = "";
        var sprice = 0;
        var sunits = 0;
        for (var x = 0; x < this.orders.length; x++) {
          if (this.orders[x].order_id === orderid) {
            indexes.push(x);
          }
        }
  
        for (var y = 0; y < indexes.length; y++) {
          sameOrders.push(this.orders[indexes[y]]);
          snames =snames + this.orders[indexes[y]].name + ", ";
          sprice =
            sprice +
            parseInt(this.orders[indexes[y]].selling_price) *
              parseInt(this.orders[indexes[y]].units);
         sunits = sunits + parseInt(this.orders[indexes[y]].units);
        }
  
        var orderDet = {};
        for (var k = 0; k < this.orderDet.length; k++) {
          if (this.orderDet[k].order_id === orderid) {
            orderDet = this.orderDet[k];
          }
        }
  
        const torder = JSON.stringify(this.orders[indexes[0]]);
        const order = JSON.parse(torder);
        order.name = snames;
        order.selling_price = sprice;
        order.units = sunits;
        this.finalOrder.push(order);
  
        this.ordersrow.push(
          <OrdersRow
          key={j+1}
            si={j+1}
            order={order}
            orderDet={orderDet}
            sameOrders={sameOrders}
            dlt={this.deleteRow.bind(this)}
            changePopOrder={this.changePopOrder.bind(this)}
          />
        );
        this.backupordersRow.push(
          <OrdersRow
            key={j+1}
            si={j+1}
            order={order}
            orderDet={orderDet}
            sameOrders={sameOrders}
            dlt={this.deleteRow.bind(this)}
            changePopOrder={this.changePopOrder.bind(this)}
          />
        );
      }
    }
  this.loading = false;
  this.setState({});
  }

  async componentDidMount() {
    var d = await getAllOrdersAdmin();
    if (d["success"]) {
      this.orders = d["order_items"];
      this.orderDet = d["orders_details"];
      this.setState({});
      var orderids = [];
      for (var i = 0; i < this.orders.length; i++) {
        orderids.push(this.orders[i].order_id);
      }
      
      // filter unique order ids
      orderids = orderids.filter((v, i, a) => a.indexOf(v) === i);
    
      for (var j = 0; j < orderids.length; j++) {
        var orderid = orderids[j];
        var indexes = [];
        var sameOrders = [];
        var snames = "";
        var sprice = 0;
        var sunits = 0;
        for (var x = 0; x < this.orders.length; x++) {
          if (this.orders[x].order_id === orderid) {
            indexes.push(x);
          }
        }

        for (var y = 0; y < indexes.length; y++) {
          sameOrders.push(this.orders[indexes[y]]);
          snames =snames + this.orders[indexes[y]].name + ", ";
          sprice =
            sprice +
            parseInt(this.orders[indexes[y]].selling_price) *
              parseInt(this.orders[indexes[y]].units);
         sunits = sunits + parseInt(this.orders[indexes[y]].units);
        }

        var orderDet = {};
        for (var k = 0; k < this.orderDet.length; k++) {
          if (this.orderDet[k].order_id === orderid) {
            orderDet = this.orderDet[k];
          }
        }

        const torder = JSON.stringify(this.orders[indexes[0]]);
        const order = JSON.parse(torder);
        order.name = snames;
        order.selling_price = sprice;
        order.units = sunits;
        
        
        this.finalOrder.push(order);
        

        this.ordersrow.push(
          <OrdersRow
          key={j+1}
            si={j+1}
            order={order}
            orderDet={orderDet}
            sameOrders={sameOrders}
            dlt={this.deleteRow.bind(this)}
            changePopOrder={this.changePopOrder.bind(this)}
          />
        );
        this.backupordersRow.push(
          <OrdersRow
          key={j+1}
            si={j+1}
            order={order}
            orderDet={orderDet}
            sameOrders={sameOrders}
            dlt={this.deleteRow.bind(this)}
            changePopOrder={this.changePopOrder.bind(this)}
          />
        );
      }
    }
    
    this.loading = false;
    this.setState({});
  }
  render() {
    return !this.loading ? (
      <section className="all-users">
        <div style={{'display': 'none'}} className="pop-cont">
          
        
        </div>
        <input
          onChange={() => {
            var backupList = this.backupordersRow;
            this.ordersrow = backupList;
            var tempList = [];
            var search = document.getElementById("alluserssearch").value;
            search = search.toLowerCase();

            if (search !== "") {
              if(this.searchMethod !== 'Discount Used'){
                for (var i = 0; i < this.finalOrder.length; i++) {
                  if (this.searchMethod === "Name") {
                    if (this.finalOrder[i]["name"].toLowerCase().includes(search)) {
                      tempList.push(this.ordersrow[i]);
                    }
                  } else if (this.searchMethod === "Date Created") {
                    if (
                      this.finalOrder[i]["updatedAt"].toLowerCase().includes(search)
                    ) {
                      tempList.push(this.ordersrow[i]);
                    }
                  } else if (this.searchMethod === "Order Id") {
                    if (
                      this.finalOrder[i]["order_id"].toLowerCase().includes(search)
                    ) {
                      tempList.push(this.ordersrow[i]);
                    }
                  }
                }
              }
              else{
                  for (var k = 0; k < this.orderDet.length; k++) {
                    if (this.orderDet[k].discountCode.toLowerCase().includes(search)) {
                      tempList.push(this.ordersrow[k]);
                    }
                }
              }

              this.ordersrow = tempList;
              this.setState({});
            } else {
              var backupList = this.backupordersRow;
              this.ordersrow = backupList;
              this.setState({});
            }
          }}
          type="text"
          name="searchContent"
          placeholder={`Search for orders using ${this.searchMethod}`}
          id="alluserssearch"
        />
        <span className="checkbox-span">Search Using: </span>
        <select
          onChange={() => {
            this.searchMethod = document.getElementById("searchusing").value;
            this.setState({});
          }}
          name="searchusing"
          id="searchusing"
        >
          <option value="Order Id">Order Id</option>
          <option value="Name">Name</option>
          <option value="Discount Used">Discount Used</option>
          <option value="Date Created">Date Created</option>
        </select>
        <br />
        <br />
        <div className="all-u-table">
          <table>
            <thead>
              <tr>
                <th>SI NO</th>
                <th>Order Id</th>
                <th>Name</th>
                <th>Units</th>
                <th>Price</th>
                <th>Shipping</th>
                <th>Discount Used</th>
                <th>Discount Amount</th>
                <th>SubTotal</th>
                <th>Billing Name</th>
                <th>Billing Address</th>
                <th>Billing Phone</th>
                <th>Billing Email</th>
                <th>Status</th>
                <th>Created At</th>
                <th>Actions</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{this.ordersrow}</tbody>
          </table>
        </div>
        
      </section>
    ) : (
      <div className="progress-bar">Fetching Data...</div>
    );
  }
}

const OrdersRow = (props) => {
  
  var date = props.order.updatedAt.slice(0, 10);
  var time = props.order.updatedAt.slice(11, 16);
  var navigate = useNavigate();
  var name = props.order.name;
  if(name.length > 20){
    name = name.slice(0, 20) + "...";
  }
  return (
    <tr>
      <td>{props.si}</td>
      <td>{props.order.order_id}</td>
      <td><NavLink style={{
        'color': 'black'
      }} state={{
        orders: props.sameOrders,
        order_id: props.order.order_id
      }} to='/admin_panel/viewOrders'id="toView">{name}</NavLink></td>
      <td>{props.order.units}</td>
      <td>{"Rs "+props.order.selling_price}</td>
      <td>{"Rs "+props.orderDet.deliveryCharge}</td>
      <td>{props.orderDet.discountCode !== '' ? props.orderDet.discountCode : 'Nill'}</td>
      <td>{props.orderDet.discountCode !== '' ? 'Rs '+props.orderDet.discountAmount : 'Nill'}</td>
      <td>{"Rs "+props.orderDet.sub_total}</td>
      <td>
        {props.orderDet.billing_customer_name +
          " " +
          props.orderDet.billing_last_name}
      </td>
      <td>
        {props.orderDet.billing_address +
          ", " +
          props.orderDet.billing_city +
          ", " +
          props.orderDet.billing_state +
          ", " +
          props.orderDet.billing_country +
          ", " +
          props.orderDet.billing_pincode}
      </td>
      <td>{props.orderDet.billing_phone}</td>
      <td>{props.orderDet.billing_email}</td>
      <td>{props.orderDet.current_status}</td>
      <td>{date + " " + time}</td>
      <td>
        <MdModeEdit
          className="allusersredirect"
          onClick={() => {
            navigate("/admin_panel/updateOrder/" + props.order.order_id);
          }}
        />
        <MdDelete
          onClick={async function () {
            var confirm = window.confirm(
              "Do you want to delete this order? Delete method will affect for all the orders under this order id."
            );
            if (confirm) {
              var made = await deleteOrder(props.order.order_id);
              if (made["success"]) {
                props.dlt(props.order.order_id);
                toast.success("Order was deleted");
              } else {
                toast.error("Error: " + made["message"]);
              }
            }
          }}
          className="alluserdlt"
        />
      </td>
    </tr>
  );
};

export default AllOrders;

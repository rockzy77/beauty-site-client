import { Component } from "react";
import { GoLinkExternal } from "react-icons/go";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { deleteBlog, deleteDiscount, getAllBlogs, getAllorders, getAllOrdersAdmin } from "../../../js/adminProduct";
import { deleteOrder } from "../../../js/payment";
import AdminProductDet from "../compo/AdminProductEdit";

class AllOrders extends Component {
  constructor(props) {
    super(props);
    this.orders = [];
    this.ordersrow = [];
    this.orderDet = [];
    this.orderImages = [];
    this.backupordersRow = [];
    this.searchMethod = "Name";
  }

  deleteRow(orderid) {
    this.ordersrow = [];
    this.backupordersRow = [];
    for (var i = 0; i < this.orders.length; i++) {
        var order = this.orders[i];
        var orderDet = {};
        for(var j=0;j<this.orderDet.length;j++){
          if(this.orderDet[j].order_id == orderid){
            this.orderDet[j].current_status = 'CANCELLED';
          }
            if(this.orderDet[j].order_id == this.orders[i].order_id){
                orderDet = this.orderDet[j];
            }
        }
        this.ordersrow.push(
          <OrdersRow
            key={i}
            si={i + 1}
            order={order}
            orderDet={orderDet}
            orderImage={this.orderImages[i]}
            dlt={this.deleteRow.bind(this)}
          />
        );
        this.backupordersRow.push(
            <OrdersRow
            key={i}
            si={i + 1}
            order={order}
            orderDet={orderDet}
            orderImage={this.orderImages[i]}
            dlt={this.deleteRow.bind(this)}
          />
        );
        this.setState({});
      }
  }

  async componentDidMount() {
    var d = await getAllOrdersAdmin();
    if (d["success"]) {
      this.orders = d["order_items"];
      this.orderDet = d['orders_details'];
      this.setState({});
      for (var i = 0; i < this.orders.length; i++) {
        var order = this.orders[i];
        var orderDet = {};
        for(var j=0;j<this.orderDet.length;j++){
            if(this.orderDet[j].order_id == this.orders[i].order_id){
                orderDet = this.orderDet[j];
            }
        }
        this.ordersrow.push(
          <OrdersRow
            key={i}
            si={i + 1}
            order={order}
            orderDet={orderDet}
            dlt={this.deleteRow.bind(this)}
          />
        );
        this.backupordersRow.push(
            <OrdersRow
            key={i}
            si={i + 1}
            order={order}
            orderDet={orderDet}
            dlt={this.deleteRow.bind(this)}
          />
        );
        this.setState({});
      }
    }
  }
  render() {
    return (
      <section className="all-users">
        <input
          onChange={() => {
            var backupList = this.backupordersRow;
            this.ordersrow = backupList;
            var tempList = [];
            var search = document.getElementById("alluserssearch").value;
            search = search.toLowerCase();

            if (search != "") {
              for (var i = 0; i < this.orders.length; i++) {
                if (this.searchMethod == "Name") {
                  if (this.orders[i]["name"].toLowerCase().includes(search)) {
                    tempList.push(this.ordersrow[i]);
                  }
                } else if (this.searchMethod == "Date Created") {
                  if (
                    this.orders[i]["updatedAt"].toLowerCase().includes(search)
                  ) {
                    tempList.push(this.ordersrow[i]);
                  }
                }
                else if (this.searchMethod == "OrderId") {
                    if (
                      this.orders[i]["order_id"].toLowerCase().includes(search)
                    ) {
                      tempList.push(this.ordersrow[i]);
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
          <option value="Name">Name</option>
          <option value="OrderId">Order Id</option>
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
    );
  }
}

const OrdersRow = (props) => {
  var date = props.order.updatedAt.slice(0, 10);
  var time = props.order.updatedAt.slice(11, 16);
  var navigate = useNavigate();
  return (
    <tr>
      <td>{props.si}</td>
      <td>{props.order.order_id}</td>
      <td>{props.order.name}</td>
      <td>{props.order.units}</td>
      <td>{props.order.selling_price}</td>
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
            var confirm = window.confirm("Do you want to delete this order? Delete method will affect for all the orders under this order id.");
            if (confirm) {
              var made = await deleteOrder(props.order.order_id);
              if (made["success"]) {
                props.dlt(props.order.order_id);
                alert("Discount was deleted");
              } else {
                alert('Error: '+made['message']);
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

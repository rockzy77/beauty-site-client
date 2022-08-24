import { Component } from "react";
import { GoLinkExternal } from "react-icons/go";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { deleteBlog, deleteDiscount, getAllBlogs, getAllDiscounts } from "../../../js/adminProduct";
import AdminProductDet from "../compo/AdminProductEdit";

class AllDiscounts extends Component {
  constructor(props) {
    super(props);
    this.discounts = [];
    this.discountsrow = [];
    this.backupDiscountsRow = [];
    this.searchMethod = "Name";
  }

  deleteRow(index) {
    this.discounts.splice(index, 1);
    this.discountsrow = [];
    this.backupDiscountsRow = [];
    for (var i = 0; i < this.discounts.length; i++) {
        var discount = this.discounts[i];
        var name = discount["name"];
        var is_percent = discount["is_percent"];
        var discount_am = is_percent == 1 ? discount["discount_percent"] : discount["discount_amount"];
        var condition = discount["condition_amount"];
        var limit = discount["limit"];
        var created = discount["createdAt"];
        this.discountsrow.push(
          <DiscountRow
            key={i}
            si={i + 1}
            name={name}
            is_percent={is_percent}
            discount_am={discount_am}
            condition={condition}
            limit={limit}
            created={created}
            dlt={this.deleteRow.bind(this)}
          />
        );
        this.backupDiscountsRow.push(
            <DiscountRow
            key={i}
            si={i + 1}
            name={name}
            is_percent={is_percent}
            discount_am={discount_am}
            condition={condition}
            limit={limit}
            created={created}
            dlt={this.deleteRow.bind(this)}
          />
        );
        this.setState({});
      }
  }

  async componentDidMount() {
    var d = await getAllDiscounts();
    if (d["success"]) {
      this.discounts = d["discounts"];
      this.setState({});
      for (var i = 0; i < this.discounts.length; i++) {
        var discount = this.discounts[i];
        var name = discount["name"];
        var is_percent = discount["is_percent"];
        var discount_am = is_percent == 1 ? discount["discount_percent"] : discount["discount_amount"];
        var condition = discount["condition_amount"];
        var limit = discount["limit"];
        var created = discount["createdAt"];
        this.discountsrow.push(
          <DiscountRow
            key={i}
            si={i + 1}
            name={name}
            is_percent={is_percent}
            discount_am={discount_am}
            condition={condition}
            limit={limit}
            created={created}
            dlt={this.deleteRow.bind(this)}
          />
        );
        this.backupDiscountsRow.push(
            <DiscountRow
            key={i}
            si={i + 1}
            name={name}
            is_percent={is_percent}
            discount_am={discount_am}
            condition={condition}
            limit={limit}
            created={created}
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
            var backupList = this.backupDiscountsRow;
            this.discountsrow = backupList;
            var tempList = [];
            var search = document.getElementById("alluserssearch").value;
            search = search.toLowerCase();

            if (search != "") {
              for (var i = 0; i < this.discounts.length; i++) {
                if (this.searchMethod == "Name") {
                  if (this.discounts[i]["name"].toLowerCase().includes(search)) {
                    tempList.push(this.discountsrow[i]);
                  }
                } else if (this.searchMethod == "Date Created") {
                  if (
                    this.discounts[i]["createdAt"].toLowerCase().includes(search)
                  ) {
                    tempList.push(this.discountsrow[i]);
                  }
                }
              }
              this.discountsrow = tempList;
              this.setState({});
            } else {
              var backupList = this.backupDiscountsRow;
              this.discountsrow = backupList;
              this.setState({});
            }
          }}
          type="text"
          name="searchContent"
          placeholder={`Search for discounts using ${this.searchMethod}`}
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
          <option value="Date Created">Date Created</option>
        </select>
        <br />
        <br />
        <div className="all-u-table">
          <table>
            <thead>
              <tr>
                <th>SI NO</th>
                <th>Name</th>
                <th>Discount</th>
                <th>Condition Amount</th>
                <th>Limit</th>
                <th>Created At</th>
                <th>Actions</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{this.discountsrow}</tbody>
          </table>
        </div>
      </section>
    );
  }
}

const DiscountRow = (props) => {
  var date = props.created.slice(0, 10);
  var time = props.created.slice(11, 16);
  var navigate = useNavigate();
  return (
    <tr>
      <td>{props.si}</td>
      <td>{props.name}</td>
      <td>{(props.is_percent == 0 ? 'Rs ': '') + props.discount_am + (props.is_percent == 1 ? '%': '')}</td>
      <td>{props.condition}</td>
      <td>{props.limit}</td>
      <td>{date + " " + time}</td>
      <td>
        <MdModeEdit
          className="allusersredirect"
          onClick={() => {
            navigate("/admin_panel/updateDiscount/" + props.name);
          }}
        />
        <MdDelete
          onClick={async function () {
            var confirm = window.confirm("Do you want to delete this discount?");
            if (confirm) {
              var made = await deleteDiscount(props.name);
              if (made["success"]) {
                props.dlt(props.si - 1);
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

export default AllDiscounts;

import { Component } from "react";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {
  deleteUser,
  getAlluser,
} from "../../../js/adminProduct";
import { toast } from 'react-toastify';


class AllUsers extends Component {
  constructor(props) {
    super(props);
    this.users = [];
    this.usersrow = [];
    this.backupUsersRow = [];
    this.searchMethod = "Name";
  }

  deleteRow(index){
    this.users.splice(index, 1);
    this.usersrow = [];
    this.backupUsersRow = [];
    for (var i = 0; i < this.users.length; i++) {
      var user = this.users[i];
      var id = user["id"];
      var name = user["name"];
      var email = user["email"];
      var role = user["role"];
      var created = user["createdAt"];
      this.usersrow.push(
        <UserRow
          key={i}
          si={i + 1}
          id={id}
          uname={name}
          email={email}
          role={role}
          created={created}
          dlt={this.deleteRow.bind(this)}
        />
      );
      this.backupUsersRow.push(
        <UserRow
          key={i}
          si={i + 1}
          id={id}
          uname={name}
          email={email}
          role={role}
          created={created}
          dlt={this.deleteRow.bind(this)}
        />
      );
      this.setState({});
    }
  }



  async componentDidMount() {
    var d = await getAlluser();
    if (d["success"]) {
      this.users = d["users"];
      this.setState({});
      for (var i = 0; i < this.users.length; i++) {
        var user = this.users[i];
        var id = user["id"];
        var name = user["name"];
        var email = user["email"];
        var role = user["role"];
        var created = user["createdAt"];
        this.usersrow.push(
          <UserRow
            key={i}
            si={i + 1}
            id={id}
            uname={name}
            email={email}
            role={role}
            created={created}
            dlt={this.deleteRow.bind(this)}
          />
        );
        this.backupUsersRow.push(
          <UserRow
            key={i}
            si={i + 1}
            id={id}
            uname={name}
            email={email}
            role={role}
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
            var backupList = this.backupUsersRow;
            this.usersrow = backupList;
            var tempList = [];
            var search = document.getElementById("alluserssearch").value;
            search = search.toLowerCase();

            if (search !== "") {
              for (var i = 0; i < this.users.length; i++) {
                if (this.searchMethod === "Name") {
                  if (this.users[i]["name"].toLowerCase().includes(search)) {
                    tempList.push(this.usersrow[i]);
                  }
                } else if (this.searchMethod === "Email") {
                  if (this.users[i]["email"].toLowerCase().includes(search)) {
                    tempList.push(this.usersrow[i]);
                  }
                } else if (this.searchMethod === "Role") {
                  if (this.users[i]["role"].toLowerCase().includes(search)) {
                    tempList.push(this.usersrow[i]);
                  }
                } else if (this.searchMethod === "Date Created") {
                  if (
                    this.users[i]["createdAt"].toLowerCase().includes(search)
                  ) {
                    tempList.push(this.usersrow[i]);
                  }
                }
              }
              this.usersrow = tempList;
              this.setState({});
            } else {
              var backupList = this.backupUsersRow;
              this.usersrow = backupList;
              this.setState({});
            }
          }}
          type="text"
          name="searchContent"
          placeholder={`Search for users using ${this.searchMethod}`}
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
          <option value="Email">Email</option>
          <option value="Role">Role</option>
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
                <th>Date Created</th>
                <th>Role</th>
                <th>Email</th>
                <th>Actions</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{this.usersrow}</tbody>
          </table>
        </div>
      </section>
    );
  }
}

const UserRow = (props) => {
  var date = props.created.slice(0, 10);
  var time = props.created.slice(11, 16);
  var navigate = useNavigate();
  return (
    <tr>
      <td>{props.si}</td>
      <td>{props.uname}</td>
      <td>{date + " " + time}</td>

      <td>{props.role}</td>
      <td>{props.email}</td>
      <td>
        <MdModeEdit
          className="allusersredirect"
          onClick={() => {
            navigate("/admin_panel/updateUser/" + props.id);
          }}
        />
        <MdDelete
          onClick={async function () {
            var confirm = window.confirm("Do you want to delete this user?");
            if (confirm) {
              var made = await deleteUser(props.pid);
              if (made["success"]) {
                props.dlt(props.si - 1);
                toast.success("User was deleted")
              } else {
                toast.error('Error: '+made.message)
              }
            }
          }}
          className="alluserdlt"
        />
      </td>
    </tr>
  );
};

export default AllUsers;

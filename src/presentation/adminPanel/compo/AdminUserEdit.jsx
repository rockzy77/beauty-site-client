import { Component } from "react";
import { getSingleuser, updateProduct, updateuserInfo } from "../../../js/adminProduct";
import public_url from "../../../js/publicurl";
import { useParams } from "react-router-dom"; 
import $ from 'jquery';

const AdminuserEdit = ()=>{
   const {uid} = useParams();
   return <AdminUserEditPanel uid={uid} />
}

class AdminUserEditPanel extends Component {
  constructor(props) {
    super(props);
    this.user = {};
  }

  async updateUserReady(name, email) {
    console.log(this.user.pid)
    var made = await updateuserInfo(this.user.pid,name, email);
    if(made['success']){
        alert('User info updated successfully.');
    }
    else{
        alert('Somethign went wrong!');
    }
  }

  async componentDidMount(){
    var det = await getSingleuser(this.props.uid);
    if(det['success']){
      var user = det['user'];
      this.user.pid = user['id'];
      this.user.name = user['name'];
      this.user.email = user['email'];
      this.user.role = user['role'];
      
    }
    this.setState({})
  }

  render() {
    return <div className="editUser">
        <div className="s_mini_nav">

<h6>Edit User</h6>

 </div>
        <div className="personalInfo">
      <form className="personalForm">
        <br />
        <label htmlFor="name">
          <span className="pformSpan">Name</span> <br />
          <input
            id="pfname"
            maxLength={15}
            defaultValue={this.user.name}
            type="text"
            name="name"
          />
        </label>
        <label htmlFor="email">
          <span className="pformSpan">Email</span> <br />
          <input
            type="email"
            defaultValue={this.user.email}
            name="email"
            id="pfemail"
          />
        </label>
        <br />
        <input
          id="pfbtn"
          type="button"
          value="Update"
          onClick={() => {
            var name = $("#pfname").val();
            var email = $("#pfemail").val();
            console.log(name, email)
            this.updateUserReady(name, email)
          }}
        />
      </form>
    </div>
    </div>
  }
}

export default AdminuserEdit;

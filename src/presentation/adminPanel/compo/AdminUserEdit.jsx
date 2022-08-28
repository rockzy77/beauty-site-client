import { Component } from "react";
import { getSingleuser, updateuserInfo } from "../../../js/adminProduct";
import { useParams } from "react-router-dom"; 
import { toast } from 'react-toastify';


const AdminuserEdit = ()=>{
   const {uid} = useParams();
   return <AdminUserEditPanel uid={uid} />
}

class AdminUserEditPanel extends Component {
  constructor(props) {
    super(props);
    this.user = {};
    this.thingsToUpdate = {};
  }

  async updateUserReady() {
    var made = await updateuserInfo(this.user.pid,this.thingsToUpdate.name,this.thingsToUpdate.email);
    if(made['success']){
        toast.success('User info updated successfully.');
    }
    else{
        toast.error('Error: '+made.message);
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
            onChange={(e) => {
              this.thingsToUpdate.name = document.getElementById("pfname").value;
            }}
            type="text"
            name="name"
          />
        </label>
        <label htmlFor="email">
          <span className="pformSpan">Email</span> <br />
          <input
            type="email"
            defaultValue={this.user.email}
            onChange={(e) => {
              this.thingsToUpdate.email = document.getElementById("pfemail").value;
            }}
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
            if (Object.keys(this.thingsToUpdate).length === 0) {
              alert("Nothing to update");
            }
            else{
              for (var key in this.thingsToUpdate) {
                if (this.thingsToUpdate[key] === "") {
                  alert("Please fill all fields");
                  return;
                }
              }
              this.updateUserReady()
            }
  
          }}
        />
      </form>
    </div>
    </div>
  }
}

export default AdminuserEdit;

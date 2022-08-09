import { Component } from "react";

class Dashboard extends Component{
    render(){
        return <div className="dashboard">
           <div className="dashboard-head-grid">
                <div className="d-grid-item">
                    <h6>Users</h6>
                    <p>4000</p>
                </div>
                <div className="d-grid-item">
                <h6>Total Products</h6>
                    <p>4000</p>
                </div>
                <div className="d-grid-item">

                <h6>Total Profit</h6>
                    <p>Rs 4000</p>
                </div>
                <div className="d-grid-item">
                <h6>Total Orders</h6>
                    <p>4000</p>
                </div>
           </div>
        </div>
    }
}

export default Dashboard;
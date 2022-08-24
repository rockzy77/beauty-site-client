import { Component } from "react";
import {ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts'
import { getAllOrders, getAllProductsAdmin, getAlluser } from "../../../js/adminProduct";
import { monthly, yearly } from "../../../js/chartData";

class Dashboard extends Component{
    constructor(props){
        super(props);
        this.isYearly = false;
        this.totalProducts = 0;
        this.totalProfit = 0;
        this.totalOrders = 0;
        this.totalUsers = 0;
    }
    async componentDidMount(){
        var det = await getAllProductsAdmin();
        this.totalProducts = det['products'].length;
        var det2 = await getAlluser();
        this.totalUsers = det2['users'].length;
        var det3 = await getAllOrders();
        this.totalOrders = det3['order_items'].length;
        this.setState({})
    }
    render(){
        return <div className="dashboard">
           <div className="dashboard-head-grid">
                <div className="d-grid-item">
                    <h6>Users</h6>
                    <p>{this.totalUsers}</p>
                </div>
                <div className="d-grid-item">
                <h6>Total Products</h6>
                    <p>{this.totalProducts}</p>
                </div>
                <div className="d-grid-item">

                <h6>Total Profit</h6>
                    <p>Rs 4000</p>
                </div>
                <div className="d-grid-item">
                <h6>Total Orders</h6>
                    <p>{this.totalOrders}</p>
                </div>
           </div>
           <br />
           <div className="checkbox-line">
           <input onChange={()=>{
            this.isYearly = document.getElementById('isYearly').checked;
            this.setState({})
           }} type="checkbox" name="isYearly" id="isYearly" />
           <span>Show yearly targets</span>
           </div>
           <br />
           {!this.isYearly ? <div>
            <h3 className="targettitle">Monthly Money Target</h3>
           <ResponsiveContainer width='95%' aspect={3}>
            <LineChart data={monthly}>
                <CartesianGrid strokeDasharray='3 3'/>
                <XAxis dataKey='name' interval={'preserveStartEnd'}/>
                <YAxis/>
                <Tooltip/>
                <Line dataKey='amount'/>
            </LineChart>
           </ResponsiveContainer>
           <br />
           <h3 className="targettitle">Monthly Product Target</h3>
           <ResponsiveContainer width='95%' aspect={3}>
            <LineChart data={monthly}>
                <CartesianGrid strokeDasharray='3 3'/>
                <XAxis dataKey='name' interval={'preserveStartEnd'}/>
                <YAxis/>
                <Tooltip/>
                <Line dataKey='products'/>
            </LineChart>
           </ResponsiveContainer>
           </div> : <div>
            <h3 className="targettitle">Yearly Money Target</h3>
           <ResponsiveContainer width='95%' aspect={3}>
            <LineChart data={yearly}>
                <CartesianGrid strokeDasharray='3 3'/>
                <XAxis dataKey='name' interval={'preserveStartEnd'}/>
                <YAxis/>
                <Tooltip/>
                <Line dataKey='amount'/>
            </LineChart>
           </ResponsiveContainer>
           <br />
           <h3 className="targettitle">Yearly Product Target</h3>
           <ResponsiveContainer width='95%' aspect={3}>
            <LineChart data={yearly}>
                <CartesianGrid strokeDasharray='3 3'/>
                <XAxis dataKey='name' interval={'preserveStartEnd'}/>
                <YAxis/>
                <Tooltip/>
                <Line dataKey='products'/>
            </LineChart>
           </ResponsiveContainer>
           </div>}
        </div>
    }
}

export default Dashboard;
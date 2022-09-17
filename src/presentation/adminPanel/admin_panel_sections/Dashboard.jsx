import { Component } from "react";
import {ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts'
import { getAllOrders, getAllProductsAdmin, getAlluser, getTotalOrderDetails } from "../../../js/adminProduct";


class Dashboard extends Component{
    constructor(props){
        super(props);
        this.totalProducts = 0;
        this.totalProfit = 0;
        this.totalOrders = 0;
        this.totalUsers = 0;
        this.monthlyExpense = [];
        this.monthlyProducts = [];
        this.yearlyExpense = 0;
        this.years = [];
    }
    async componentDidMount(){
        var det = await getAllProductsAdmin();
        this.totalProducts = det['products'].length;
        var det2 = await getAlluser();
        this.totalUsers = det2['users'].length;
        var det3 = await getAllOrders();
        this.totalOrders = det3['order_items'].length;
        for(var i = 2022; i <= new Date().getFullYear(); i++){
            this.years.push(i);
        }
        this.getYearTotal(new Date().getFullYear());
        this.setState({})
    }

    getMonthName(month){
        var monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
        ];
        return monthNames[month];
    }


    async getYearTotal(year){
        var det4 = await getTotalOrderDetails(year);
        var monthlye = [];
        var monthlyp = [];
        if(det4.success){
            for(var j =0;j<det4.expensePerMonth.length;j++){
                monthlye.push({
                    name: this.getMonthName(j),
                    amount: det4.expensePerMonth[j]
                })
            }

            for(var x =0;x<det4.numberOfProductsPerMonth.length;x++){
                monthlyp.push({
                    name: this.getMonthName(x),
                    products: det4.numberOfProductsPerMonth[x]
                })
            }
        }
        this.totalProfit = det4.grandTotalExpense;
        this.monthlyExpense = monthlye;
        this.monthlyProducts = monthlyp;
        console.log(monthlyp)
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
                    <p>Rs {parseFloat(this.totalProfit).toFixed(2)}</p>
                </div>
                <div className="d-grid-item">
                <h6>Total Orders</h6>
                    <p>{this.totalOrders}</p>
                </div>
           </div>
           <br />
           <br />
           <div>
            <select onChange={()=>{
                this.getYearTotal(document.getElementById('year').value);
            }} name="years" id="years">
                {this.years.map((year, index)=>{
                    return <option key={index} value={year}>{year}</option>
    })}
            </select>
            <h3 className="targettitle">Monthly Money Target</h3>
           <ResponsiveContainer width='95%' aspect={3}>
            <LineChart data={this.monthlyExpense}>
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
            <LineChart data={this.monthlyProducts}>
                <CartesianGrid strokeDasharray='3 3'/>
                <XAxis dataKey='name' interval={'preserveStartEnd'}/>
                <YAxis/>
                <Tooltip/>
                <Line dataKey='products'/>
            </LineChart>
           </ResponsiveContainer>
           </div>
        </div>
    }
}

export default Dashboard;
import { Component } from "react";
import { Outlet } from "react-router-dom";
import AllProducts from "./admin_panel_sections/AllProducts";
import Dashboard from "./admin_panel_sections/Dashboard";

class AdminPanel extends Component{
    constructor(props){
        super(props)
        this.section = 'Dashboard';
    }

    componentDidMount(){
        var admin_btns = document.getElementsByClassName('admin_panel_btn');
       for(var i=0;i<admin_btns.length;i++){
        admin_btns[i].addEventListener('click', function(){
            for(var j=0;j<admin_btns.length;j++){
                admin_btns[j].classList.remove('active');
            }
            this.classList.add('active');
            changeSection(this.innerText)
        })
       }
       const changeSection = (section)=>{
        this.section = section;
        this.setState({});
       }
    }
    render(){
        return(
            <section className="adminPanel">
                <div className="adminPanelSideNav">
                   <div className="admin-img-head">
                   <img src={process.env.PUBLIC_URL+'logo.png'} alt="" />
                   </div>
                    <div className="admin-btn-section">
                    <br />
                    <button className='active admin_panel_btn'>Dashboard</button>
                    <br />
                    <button className='admin_panel_btn'>All Products</button>
                    <br />
                    <button className='admin_panel_btn'>Create Product</button>
                    <br />
                    <button className='admin_panel_btn'>All Offer</button>
                    <br />
                    <button className='admin_panel_btn'>Create Offer</button>
                    <br />
                    <button className='admin_panel_btn'>Users</button>
                    <br />
                    <button className='admin_panel_btn'>Reviews</button>
                    <br />
                    </div>
                </div>
                <div className="adminPanelContent">
                    <br />
                    <h1 className="section-title">Admin Panel/ {this.section}</h1>
                    {this.section == 'Dashboard' ? <Dashboard/> : this.section == 'All Products' ? <AllProducts /> : <div></div>}
                </div>
            </section>
        )
    }
}

export default AdminPanel;
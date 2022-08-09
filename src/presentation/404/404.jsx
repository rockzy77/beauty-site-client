import { Component } from "react";
import NavBar from "../../components/NavBar";
import { getUserDetail } from "../../js/auth";

class ErrorScreen extends Component{
    constructor(props){
        super(props);
        this.isLoggedIn = false;
    }

    async componentDidMount() {
        var data = await getUserDetail();
        this.isLoggedIn = data["success"];
        this.setState({})
      }
    
    render(){
        return <div>
            <NavBar isLoggedIn={this.isLoggedIn}/>
            <br />
            <br />
            <br />
            <center><h1>404 Error: Page Not Found</h1></center>
        </div>
    }
}

export default ErrorScreen;
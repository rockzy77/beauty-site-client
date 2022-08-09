import React, {Component} from "react";
import $ from "jquery";
import Carousal from "../../components/Carousal";


class Testimonials extends Component{
   
    render(){
        return <section className="testimonials">
        <br />
        <h1>Testimonials</h1>
        <Carousal />
        <br />
      </section>
    }
}

export default Testimonials;
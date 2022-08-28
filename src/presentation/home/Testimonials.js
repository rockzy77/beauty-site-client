import React, {Component} from "react";
import Carousal from "../../components/Carousal";


class Testimonials extends Component{
   
    render(){
        return <section className="testimonials">
        <div data-aos='fade-up' id="testicont">
        <br />
        <h1 >Testimonials</h1>
        <Carousal />
        <br />
        </div>
      </section>
    }
}

export default Testimonials;
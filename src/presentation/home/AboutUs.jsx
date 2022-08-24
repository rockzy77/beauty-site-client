import React, {Component} from "react";

class AboutUs extends Component{
    render(){
        return <section className="about" id="about">
        <div id="about-row" className="about-row">
          <div data-aos='fade-up' className="acontainer">
            <div className="acontent">
              <img src={process.env.PUBLIC_URL+'products/about.jpg'} alt="About Image" />
            </div>
          </div>
         <div data-aos='fade-up' className="atextcon">
         <div className="about-texts">
            <h1>About Us</h1>
            <p>
              Reap skincare is for those who want to create a self-care habit
              but don't know where to start.
              <br />
              <br />
              We provide products that adapt to your specific skin needs and
              guide you through your skincare journey by simplifying your
              routine with our multi ingredient-focused products.
              <br />
              <br />
              Reap is a proud made in India brand specifically made for Indian
              skin and weather.
            </p>
          </div>
         </div>
        </div>
        <div data-aos='fade-up' id="conscious" className="conscious">
          <h1>What we're consious about</h1>
          <br />
          <div className="conscious-row">
            <div className="conscious-item">
              <div className="conscious-header">
                <div className="container">
                  <img src={process.env.PUBLIC_URL+'vegans.png'} alt="Vegan" />
                </div>
                <br />
                <span>Vegas</span>
              </div>
            </div>

            <div className="conscious-item">
              <div className="conscious-header">
                <div className="container">
                <img src={process.env.PUBLIC_URL+'crueltys.png'} alt="Cruelty Free" />
                </div>
                <br />
                <span>Cruelty Free</span>
              </div>
            </div>

            <div className="conscious-item">
              <div className="conscious-header">
                <div className="container">
                <img src={process.env.PUBLIC_URL+'fragrances.png'} alt="Fragrance Free" />
                </div>
                <br />
                <span>Fragrance Free</span>
              </div>
            </div>

            <div className="conscious-item">
              <div className="conscious-header">
                <div className="container">
                <img src={process.env.PUBLIC_URL+'fats.png'} alt="Essential Oil Free" />
                </div>
                <br />
                <span>Essential Oil Free</span>
              </div>
            </div>
          </div>
        </div>
        <br />
      </section>
    }
}

export default AboutUs;
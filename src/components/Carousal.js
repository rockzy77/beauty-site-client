import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

export default class Carousal extends Component {
  render() {
    return (
      <Carousel
        showArrows={true}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
        autoPlay={true}
        interval={6100}
      >
        <div>
          <img src={process.env.PUBLIC_URL + 'ts1.jpeg'} />
          <div className="myCarousel">
            <h3>Sukhdev </h3>
            <p>
              Skin plumping moisturizer: I'm so in love with this moisturizer,
              it always heals my skin whenever my skin barrier feels irritated
              and it also removes all the flaky dry patches present on my skin,
              making it look plump, healthy and dewy.
            </p>
          </div>
        </div>

        <div>
          <img src={process.env.PUBLIC_URL + 'ts2.jpeg'} />
          <div className="myCarousel">
            <h3>Saumya</h3>
            <p>
              Skin prep cleanser: Skin prep jelly cleanser is so gentle on my
              skin yet it removes all the dirt, grime and sunscreen on my skin
              after a long day, it even removes makeup on my light makeup days.
              Whenever I use this cleanser my skin feels hydrated.
            </p>
          </div>
        </div>

        <div>
          <img src={process.env.PUBLIC_URL + 'ts3.jpeg'} />
          <div className="myCarousel">
            <h3>Santhosh</h3>
            <p>
              Glow restore exfoliator: This exfoliator helped me in removing the
              tiny bumps, reducing the appearance of dark spots and acne marks
              present on my skin. It always feels very soothing on my skin and
              it never over-exfoliated my skin. Whenever I have any special
              event, I use this and it leaves my skin soft, smooth and glowy.
            </p>
          </div>
        </div>
      </Carousel>
    );
  }
}

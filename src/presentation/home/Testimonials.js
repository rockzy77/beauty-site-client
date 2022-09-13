import React, { Component } from "react";
import Carousal from "../../components/Carousal";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

class Testimonials extends Component {
  render() {
    return (
      <section className="testimonials">
        <div data-aos="fade-up" id="testicont">
          <br />
          <h1>Testimonials</h1>
          <br />
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={50}
            slidesPerView={1}
            loop
            navigation
            pagination={{ clickable: true }}
            className="mySwiper"
          >
            <SwiperSlide>
              <div className="swiper-container">
                <img src={process.env.PUBLIC_URL + "ts1.jpeg"} />
                <h3>Sukhdev</h3>
                <div className="quote-cont">
                  <br />
                  <br />
                  <br />
                  <br />
                <p>
                  Skin plumping moisturizer: I'm so in love with this
                  moisturizer, it always heals my skin whenever my skin barrier
                  feels irritated and it also removes all the flaky dry patches
                  present on my skin, making it look plump, healthy and dewy.
                </p>
                <br />
                <br />
                <br />
                <br />
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="swiper-container">
                <img src={process.env.PUBLIC_URL + "ts2.jpeg"} />
                <h3>Saumya</h3>
                <div className="quote-cont">
                  <br />
                  <br />
                  <br />
                  <br />
                <p>
                Skin prep cleanser: Skin prep jelly cleanser is so gentle on my
              skin yet it removes all the dirt, grime and sunscreen on my skin
              after a long day, it even removes makeup on my light makeup days.
              Whenever I use this cleanser my skin feels hydrated.
              
                </p>
                <br />
              <br />
              <br />
              <br />
                </div>
              </div>
            </SwiperSlide>
 
            <SwiperSlide>
              <div className="swiper-container">
                <img src={process.env.PUBLIC_URL + "ts3.jpeg"} />
                <h3>Santhosh</h3>
                <div className="quote-cont">
                  <br />
                  <br />
                  <br />
                  <br />
                <p>
                Glow restore exfoliator: This exfoliator helped me in removing the
              tiny bumps, reducing the appearance of dark spots and acne marks
              present on my skin. It always feels very soothing on my skin and
              it never over-exfoliated my skin. Whenever I have any special
              event, I use this and it leaves my skin soft, smooth and glowy.
                </p>
                <br />
                <br />
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
          <br />
        </div>
      </section>
    );
  }
}

export default Testimonials;

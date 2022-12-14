import { Component } from "react";
import { NavLink } from "react-router-dom";

class ProductBlurred extends Component{
    render(){
        return <section className="pblurred">
          <br />
        <h2 data-aos='fade-up' id="pbtitle">Reap the benefits @reap_skincare</h2>
        <div data-aos='fade-up' id="pbcards" className="pbcards">
          {/* product 1 */}
          <NavLink to='/filter_shop/cleanser'>
          <div className="pbcard card1">
            <div className="pbcard-header">
              <div className="pbcontainer">
                <span>Cleanser</span>
              <img src={process.env.PUBLIC_URL + "/products/cleanser.JPG"} alt="" />
              </div>
            </div>
          </div>
          </NavLink>

          {/* product 2 */}
          <NavLink to='/filter_shop/serum'>
          <div className="pbcard card2">
            <div className="pbcard-header">
              <div className="pbcontainer">
              <span>Serum</span>
              <img src={process.env.PUBLIC_URL + "/products/serum.JPG"} alt="" />
              </div>
            </div>
          </div>
          </NavLink>

          {/* product 3 */}
          <NavLink to='/filter_shop/moisturiser'>
          <div className="pbcard card3">
            <div className="pbcard-header">
              <div className="pbcontainer">
              <span>Moisturiser</span>
              <img src={process.env.PUBLIC_URL + "/products/moisturizer.JPG"} alt="" />
              </div>
            </div>
          </div>
          </NavLink>

          {/* product 4 */}
          <NavLink to='/filter_shop/exfoliator'>
          <div className="pbcard card4">
            <div className="pbcard-header">
              <div className="pbcontainer">
              <span>Exfoliator</span>
              <img src={process.env.PUBLIC_URL + "/products/exfoliator.JPG"} alt="" />
              </div>
            </div>
          </div>
          </NavLink>
        </div>
      </section>;
    }
}


export default ProductBlurred;
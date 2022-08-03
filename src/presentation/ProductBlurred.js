import { Component } from "react";

class ProductBlurred extends Component{
    render(){
        return <section className="pblurred">
          <br />
        <h2>Reap the benefits @reap_skincare</h2>
        <div className="pbcards">
          {/* product 1 */}
          <div className="pbcard card1">
            <div className="pbcard-header">
              <div className="pbcontainer">
                <img src={process.env.PUBLIC_URL + "bg.jpg"} alt="" />
              </div>
            </div>
          </div>

          {/* product 2 */}
          <div className="pbcard card2">
            <div className="pbcard-header">
              <div className="pbcontainer">
                <img src={process.env.PUBLIC_URL + "bg.jpg"} alt="" />
              </div>
            </div>
          </div>

          {/* product 3 */}
          <div className="pbcard card3">
            <div className="pbcard-header">
              <div className="pbcontainer">
                <img src={process.env.PUBLIC_URL + "bg.jpg"} alt="" />
              </div>
            </div>
          </div>

          {/* product 4 */}
          <div className="pbcard card4">
            <div className="pbcard-header">
              <div className="pbcontainer">
                <img src={process.env.PUBLIC_URL + "bg.jpg"} alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>;
    }
}


export default ProductBlurred;
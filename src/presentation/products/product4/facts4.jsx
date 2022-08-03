import { Component } from "react";

class Facts4 extends Component {
  render() {
    return (
      <div className="facts4 facts">
        <br />
        <h3>Why do we need a glow restore serum?</h3>
        <p>
          The job of three serums in one. <br />
          <ol>
            <li>Vitamin C derivative (Tetrahexyldecyl Ascorbate)</li>
            <li>Niacinamide </li>
            <li>Alpha Arbutin </li>
          </ol>
          A power packed formulation of plant extracts and science backed
          ingredients.
        </p>

        <h5 className="facts-title">Benefits</h5>
        <ol>
          <li>Regulate oil/sebum</li>
          <li>Skin Brightening</li>
          <li>
            Rich in antioxidants- protects from pollution and sun exposure
          </li>
          <li>Soothing</li>
        </ol>

        <h5 className="facts-title">Plant Extracts</h5>
        <div className="plant-ext-row">
          <div className="plant-ext-item">
            <div className="plant-ext-header">
              <div className="container">
                <img
                  src={process.env.PUBLIC_URL + "watermelon.png"}
                  alt="Vegan"
                />
              </div>
              <span className="plant-ext-title">Watermelon</span>
              <br />
              <span>Antioxidant</span>
            </div>
          </div>

          <div className="plant-ext-item">
            <div className="plant-ext-header">
              <div className="container">
                <img
                  src={process.env.PUBLIC_URL + "bamboowater.jpg"}
                  alt="Vegan"
                />
              </div>
              <span className="plant-ext-title">Bamboo Water</span>
              <br />
              <span>Soothing</span>
            </div>
          </div>

          <div className="plant-ext-item">
            <div className="plant-ext-header">
              <div className="container">
                <img src={process.env.PUBLIC_URL + "plum.png"} alt="Vegan" />
              </div>
              <span className="plant-ext-title">Kakadu Plum</span>
              <br />
              <span>Natural Vit C</span>
            </div>
          </div>

          <div className="plant-ext-item">
            <div className="plant-ext-header">
              <div className="container">
                <img
                  src={process.env.PUBLIC_URL + "licorice.jpg"}
                  alt="Vegan"
                />
              </div>
              <span className="plant-ext-title">Licorice root</span>
              <br />
              <span>Brightening</span>
            </div>
          </div>
        </div>

        <h5 className="facts-title">Science-backed ingredients:</h5>
        <br />
        <div className="scienceback-row">
          <div className="sb-image-cont">
            <img
              src={process.env.PUBLIC_URL + "serumback.jpg"}
              alt="Serum Science Back"
            />
          </div>
          <div className="sb-det-cont">
            <h5>Niacinamide:</h5>
            <span>Anti-acne and brightening</span>
            <br />
            <h5>Vitamin C derivative (Tetrahexyldecyl Ascorbate):</h5>
            <span>Antioxidant and brightening</span>
            <br />
            <h5>Alpha Arbutin:</h5>
            <span>Brightening</span>
            <br />
            <h5>Ceramide:</h5>
            <span>Skin-repairing</span>
            <br />
            <h5>Vitamin B5 (Panthenol):</h5>
            <span>Hydrating and soothing</span>
            <br />
            <h5>Beta-Glucan:</h5>
            <span>Intensive skin repair</span>
            <br />
          </div>
        </div>
      </div>
    );
  }
}

export default Facts4;

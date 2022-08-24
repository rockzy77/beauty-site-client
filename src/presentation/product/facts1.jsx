import { Component } from "react";
import public_url from "../../js/publicurl";

class Facts1 extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className="facts1 facts">
        <br />
        <h3>Why do we need a {this.props.name}?</h3>
        <p>
          {this.props.whydoweneed}
        </p>

        <h5 className="facts-title">Benefits</h5>
        <ol>
          {this.props.benefits != undefined ? this.props.benefits.split(',').map(function(item, i){
            return <li key={i}>{item}</li>
          }) : ''}
        </ol>

        <h5 className="facts-title">Plant Extracts</h5>
        <div className="plant-ext-row">
          

          {this.props.plantExtracts.map(function(item, i){
            return <div key={i} className="plant-ext-item">
            <div className="plant-ext-header">
              <div className="container">
                <img
                  src={item.plantExtractsImage}
                  alt="Vegan"
                />
              </div>
              <span className="plant-ext-title">{item.plantExtractsText}</span>
              <br />
              <span>{item.plantExtractsSubText}</span>
            </div>
          </div>
          })}
        </div>

        <h5 className="facts-title">Science-backed ingredients:</h5>
        <br />
        <div className="scienceback-row">
          <div className="sb-image-cont">
            <img
              src={this.props.scienceBacked.scienceBackedImage}
              alt="Serum Science Back"
            />
          </div>
          <div className="sb-det-cont">
            
            <p>
              {this.props.scienceBacked.scienceBackedText}
            </p>
            
            <br />
          </div>
        </div>
      </div>
    );
  }
}

export default Facts1;

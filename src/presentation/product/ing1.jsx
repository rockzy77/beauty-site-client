import { Component } from "react";

class Ing1 extends Component {

  constructor(props){
    super(props);
  }
  render() {
    return (
      <div className="ing1 ing">
        <br />
       <p>{this.props.ingredients}</p>
      </div>
    );
  }
}

export default Ing1;

import { Component } from "react";

class Ing1 extends Component {

  constructor(props){
    super(props);
  }
  render() {
    return (
      <div className="ing1 ing">
        <br />
        <table>
          {
            this.props.ingredients != undefined ? this.props.ingredients.split(',').map(function(object, i){
              return <tr>
                <td>{i+1}) {object}</td>
              </tr>
            }) : <tr>
              <td></td>
            </tr>
          }
         
        </table>
      </div>
    );
  }
}

export default Ing1;

import { Component } from "react";

class Ing2 extends Component {

  constructor(props){
    super(props);
    this.ingredients = 'Aqua, Niacinamide, Dicaprylyl Carbonate, Propylene glycol, Bambusa Vulgaris(Bamboo) Water, Tetrahexyldecyl Ascorbate(Vitamin-C), Alpha Arbutin, Zinc PCA, Polyglyceryl-4 Caprate, Polyglyceryl-6 Caprylate, Citrullus Lanatus(Watermelon) Fruit Extract, Glycyrrhiza Glabra(Licorice) Root Extract, Laminaria Algae Extract, Terminalia Ferdinandiana(Kakadu Plum) Fruit Extract, Glycerin, Beta Glucan, D-Panthenol, Sodium PCA, Ceramide NP, Ceramide AP, Ceramide EOP, Phytosphingosine, Cholesterol, Phenoxyethanol, Dehydroxanthan Gum, Sodium Lauroyl Lactylate, Carbomer, Xanthan Gum, Triethylene Glycol'.split(',');
  }
  render() {
    return (
      <div className="ing2 ing">
        <br />
        <table>
          {
            this.ingredients.map(function(object, i){
              return <tr>
                <td>{i+1}) {object}</td>
              </tr>
            })
          }
         
        </table>
      </div>
    );
  }
}

export default Ing2;

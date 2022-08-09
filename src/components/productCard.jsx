
import { Component } from "react";
import { NavLink } from "react-router-dom";
class ProductCard extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const to = '/product/'+this.props.id;
        return <div className='pcard'>
        <NavLink className="navlinks" to={to}>
        <div className="pcard-top">
        <div className="pcard-header">
          <img src={this.props.imageurl} alt="productImage" />
        </div>
        
        <div className="pcard-det">
          <h5>{this.props.title}</h5>
          <span>{this.props.price}</span>
        </div>
        </div>
        </NavLink>
       <div className="pcard-bottom">
         <div className="pcard-footer">
          <span>Add to Cart</span>
        </div>
       </div>
    </div>
    }
}

export default ProductCard;
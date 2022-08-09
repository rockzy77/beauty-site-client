import { Component } from "react";
import { GoLinkExternal } from "react-icons/go";
import {IoMdArrowRoundBack} from "react-icons/io";
import { createProduct, updateProduct } from "../../../js/adminAuth";
import AdminProductDet from "../compo/AdminProductEdit";

class AllProducts extends Component {
    constructor(props){
        super(props);
        this.sectionType = 'single';
        this.productId = '';
    }

  render() {
    return (
      <div className="all-products">
        
        {this.sectionType == 'all' ?
       <div>
         <input type="text" name="searchContent" placeholder="Search For Product" id="allproductssearch" />
        <br />
        <br />
        <table>
          <tr>
            <th>SI NO</th>
            <th>Product Id</th>
            <th>Product Name</th>
            <th>Product Image</th>
            <th>Product Price</th>
            <th>Product Stock</th>
            <th></th>
          </tr>
          <tr>
            <td>1</td>
            <td>34324543</td>
            <td>GLOW RESTORE SERUM</td>
            <td>
              <img src={process.env.PUBLIC_URL + "products/serum.JPG"} alt="" />
            </td>
            <td>Rs 550</td>
            <td>50</td>
            <td>
              <GoLinkExternal className="allproductredirect" onClick={()=>{
                this.sectionType = 'single';
                this.productId = 123;
                this.setState({});
              }} />
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>34324543</td>
            <td>GLOW RESTORE SERUM</td>
            <td>
              <img src={process.env.PUBLIC_URL + "products/moist.JPG"} alt="" />
            </td>
            <td>Rs 550</td>
            <td>50</td>
            <td>
              <GoLinkExternal className="allproductredirect"/>
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>34324543</td>
            <td>GLOW RESTORE SERUM</td>
            <td>
              <img src={process.env.PUBLIC_URL + "products/exfo.JPG"} alt="" />
            </td>
            <td>Rs 550</td>
            <td>50</td>
            <td>
              <GoLinkExternal className="allproductredirect"/>
            </td>
          </tr>
          <tr>
            <td>4</td>
            <td>34324543</td>
            <td>GLOW RESTORE SERUM</td>
            <td>
              <img
                src={process.env.PUBLIC_URL + "products/cleanser.JPG"}
                alt=""
              />
            </td>
            <td>Rs 550</td>
            <td>50</td>
            <td>
              <GoLinkExternal className="allproductredirect"/>
            </td>
          </tr>
        </table>
       </div> : 


       <div>
            {/* <input id='simg' type="file" name="ss" />
            <button onClick={()=>{
                var img = document.getElementById('simg');
                createProduct(img.files[0])
            }}>Upload</button>
         */}
        <div className="s_mini_nav">
        <IoMdArrowRoundBack className="s_back" onClick={()=>{
           this.sectionType = 'all';
           this.productId = '';
           this.setState({});
       }}/>

       <h6>Edit Product</h6>
       
        </div>
        <AdminProductDet productId='123'/>
   </div>}
      </div>
    );
  }

 
}

export default AllProducts;

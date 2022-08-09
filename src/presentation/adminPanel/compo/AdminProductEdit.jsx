import { Component } from "react";

class AdminProductEdit extends Component {
  render() {
    return (
      <div className="adminProductEdit">
       
        <br />
        <p>Product Image: </p>

        <input
          style={{ display: "none" }}
          onChange={() => {
            const input = document.getElementById("pimginput");
            var upload_image = "";

            const reader = new FileReader();
            reader.addEventListener("load", () => {
              upload_image = reader.result;
              document.getElementById("adminPimgEdit").src = upload_image;
              document.getElementById("adminPimgEditBtn").style.display =
                "block";
            });
            reader.readAsDataURL(input.files[0]);
          }}
          type="file"
          name="pimginput"
          id="pimginput"
        />

        <div
          onClick={() => {
            document.getElementById("pimginput").click();
          }}
          className="ad-edit-img-cont"
        >
          <img
            id="adminPimgEdit"
            src={process.env.PUBLIC_URL + "products/serum.JPG"}
            alt="product_image"
          />
        </div>
        <br />
        <center>
          <button id="adminPimgEditBtn">Update</button>
        </center>
        <br />
        <p>Product Name: </p>
        <input
          type="text"
          name="adpname"
          defaultValue="GLOW RESTORE SERUM"
          id="adpname"
        />
        <br />
        <br />
        <p>Product Label: </p>
       <textarea name="adplabel" id="adplabel" cols="30" rows="10" defaultValue={
        'Reduces Hyperpigmentation & Brightens Dull Skin. Protects skin barrier.'
       }/>
        <br />
        <br />
        <p>Product Description: </p>
        <textarea name="adpdes" id="adpdes" cols="30" rows="10" defaultValue={
          'A lightweight serum containing plant extracts ( watermelon, licorice root, Kakadu plum), ceramide, niacinamide, alpha arbutin, vitamin c derivative and acetyl glucosamine that helps to restore the skin\'s natural glow and reduces the appearance of hyperpigmentation, uneven skin tone, dark spots, fine lines and acne marks without irritating the skin\'s natural barrier.'
      } />
         <br />
        <br />
        <p>Product Price: </p>
        <input
          type="text"
          name="adpname"
          defaultValue="Rs 550"
          id="adpname"
        />
        <br />
        <br />
        <p>Product Category: </p>
        <input
          type="text"
          name="adpcat"
          defaultValue="Moisturizer"
          id="adpcat"
        />
        <br />
        <br />
        <p>Product Ingredients: </p>
        <textarea
          type="text"
          name="adping"
          cols="30" rows="10"
          defaultValue="Aqua, Niacinamide, Dicaprylyl Carbonate, Propylene glycol, Bambusa Vulgaris(Bamboo) Water, Tetrahexyldecyl Ascorbate(Vitamin-C), Alpha Arbutin, Zinc PCA, Polyglyceryl-4 Caprate, Polyglyceryl-6 Caprylate, Citrullus Lanatus(Watermelon) Fruit Extract, Glycyrrhiza Glabra(Licorice) Root Extract, Laminaria Algae Extract, Terminalia Ferdinandiana(Kakadu Plum) Fruit Extract, Glycerin, Beta Glucan, D-Panthenol, Sodium PCA, Ceramide NP, Ceramide AP, Ceramide EOP, Phytosphingosine, Cholesterol, Phenoxyethanol, Dehydroxanthan Gum, Sodium Lauroyl Lactylate, Carbomer, Xanthan Gum, Triethylene Glycol"
          id="adping"
        />
         <br />
        <br />
        <p>Product Tags: </p>
        <div className="product-tag-img-cont">
        <div className="product-tag-edit">
          <img src={process.env.PUBLIC_URL+'vegan.png'} alt="" /> <br />
          <input type="file" name="producttag1" id="producttag1" />
          <input type="text" name="producttagspan1" id="producttagspan1" defaultValue='Science Backed' />
           </div>

          <div className="product-tag-edit">
          <img src={process.env.PUBLIC_URL+'vegan.png'} alt="" /> <br />
          <input type="file" name="producttag2" id="producttag2" />
          <input type="text" name="producttagspan1" id="producttagspan1" defaultValue='Science Backed' />
          </div>

          <div className="product-tag-edit">
          <img src={process.env.PUBLIC_URL+'vegan.png'} alt="" /> <br />
          <input type="file" name="producttag3" id="producttag3" />
          <input type="text" name="producttagspan1" id="producttagspan1" defaultValue='Science Backed' />
          </div>

          <div className="product-tag-edit">
          <img src={process.env.PUBLIC_URL+'vegan.png'} alt="" /> <br />
          <input type="file" name="producttag4" id="producttag4" />
          <input type="text" name="producttagspan1" id="producttagspan1" defaultValue='Science Backed' />
          </div>
        </div>
        
        
        
         <button className="s_update_button">Upload</button>
      </div>
    );
  }
}

export default AdminProductEdit;

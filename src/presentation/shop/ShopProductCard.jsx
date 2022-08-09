const ShopProductCard = (props) => (
    <div className="shop-product">
      <div className="shop-product-image">
        <div className="shop-product-image-cont">
          <img src={process.env.PUBLIC_URL+props.imgurl} alt="" />
        </div>
      </div>
      <div className="shop-product-info">
        <h3>{props.title}</h3>
        <p>{props.price}</p>
        <center>
          <button>Add to Cart</button>
        </center>
      </div>
    </div>
  );

  export default ShopProductCard;
const MyOrders = (props) => {
  return (
    <div className="myorders">
      <div className="orderscont">
        <h1 className="website-font">
          My Orders
        </h1>
        <h6 className="website-font1">{props.ordItems.length === 0 ? 'No Orders' :props.ordItems.length +' Orders'}</h6>
        <div>
          {props.ordItems.map(function(item, i){
            var orderDetails = {};
            for(var j=0;j<props.ordDet.length;j++){
              if(props.ordDet[j].order_id === item.order_id){
                orderDetails = props.ordDet[j];
              }
            }
            return <div className="row" id="mainlayout">
            <h4
            className="order_status"
              style={{
                color: "rgba(0, 0, 0, 0.786)",
                margin: "10px"
              }}
            >
              <b>{orderDetails.current_status === 'NEW' ? 'Processing': orderDetails.current_status}</b>
            </h4>
            <div className="col-md-8">
              <section className="products">
                <div className="card cardz">
                  <div className="card mb-3" id="card1">
                    <div className="card-row">
                      <div className="col-2 card-image" id="cardbuttons">
                        <img
                          src={props.ordImages[i].url}
                          className="img-fluid rounded-start img"
                          alt="..."
                        />
                      </div>
                      <div className="col-8">
                        <div className="card-body">
                          <h5 className="card-title">{item.name}</h5>
                          <p className="card-text">RS {item.selling_price}</p>
                          <p className="card-text">Quantity: {item.units}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                  <p className="card-text">
                      Order Id : {orderDetails.order_id}
                    </p>
                    <p className="card-text">
                      Delivey address : {orderDetails.shipping_address !== null ? orderDetails.shipping_address : orderDetails.billing_address}
                    </p>
                  </div>
                </div>
              </section>
            </div>
            <div className="col-md-4" id="cardbuttons">
              <div className="container text-center">
                <div className="row row-cols-1">
                  <div className="col">
                    <div className="d-grid gap-2">
                      <br />
                      <button 
                        onClick={()=>{
                          window.location.href = 'https://reapofficial.shiprocket.co/'
                        }}
                        className="colored-btn btn btn-lg "
                        type="button"
                      >
                        Track order
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          }.bind(this))}
        </div>

      
      </div>
      <br />
    </div>
  );
};

export default MyOrders;

const MyOrders = (props) => {
  return (
    <div className="myorders">
      <div className="orderscont">
        <h1 className="website-font">
          My Orders
        </h1>
        <h6 className="website-font1">{props.ordItems.length} orders</h6>
        <div>
          {props.ordItems.map(function(item, i){
            var orderDetails = {};
            for(var i=0;i<props.ordDet.length;i++){
              if(props.ordDet[i].order_id == item.order_id){
                orderDetails = props.ordDet[i];
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
              <b>{orderDetails.current_status == 'NEW' ? 'Processing': orderDetails.current_status}</b>
            </h4>
            <div className="col-md-8">
              <section className="products">
                <div className="card cardz">
                  <div className="card mb-3" id="card1">
                    <div className="row g-0">
                      <div className="col-4 " id="cardbuttons">
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
                      Expected delivery date : 30/10/2025
                    </p>
                    <p className="card-text">
                      Delivey address : abcb abcd abcd
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
                      <button
                        className="colored-btn btn btn-lg "
                        type="button"
                      >
                        Track order
                      </button>
                    </div>
                  </div>

                  <div className="col">
                    <div className="d-grid gap-2">
                      <button
                        className="outline-btn btn btn-outline btn-lg"
                        type="button"
                      >
                        {" "}
                        <span style={{ color: "rgba(90,125,180,255)" }}>
                          view details
                        </span>
                      </button>
                    </div>
                    <div className="col">
                      <div className="d-grid gap-2">
                        <p
                          style={{
                            "margin-bottom": "0%",
                            "border-radius": "0%",
                          }}
                        >
                         <button className="orderbtn-nborder">Get Invoice</button> <br />
                         <button className="orderbtn-nborder">Cancel Order</button>
                        </p>
                        <a
                          href="http://127.0.0.1:5500/myorders.html"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                        </a>
                      </div>
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

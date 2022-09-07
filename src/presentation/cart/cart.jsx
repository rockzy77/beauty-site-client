import { Link } from "react-router-dom";
import Footer from "../home/Footer";
import NavBar from "../../components/NavBar";
import { Component } from "react";
import { MdDelete } from "react-icons/md";
import { addToCart, deleteCart, getCartItem, updateCart } from "../../js/products";
import { toast } from 'react-toastify';
import { deleteCookie, getCookie } from "../../js/cookies";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.amount = 0;
    this.cartItems = [];
    this.backupamount = 0;
    this.dimensions = [];
    this.stocks = [];
    this.totalAmount = 0;
    this.section = "cart";
    this.morethanthree = false;
    this.height = 0;
    this.length = 0;
    this.breadth = 0;
    this.weight = 0;
    this.map = {
      totalAmount: 100,
    };
  }
  async componentDidMount() {
    var det = await getCartItem();
    if (det["success"]) {
      this.cartItems = det["cartData"];
      this.dimensions = det["dimensions"];
      this.stocks = det["stock"];
    }
    this.calculateTotals();
    this.setState({});
  }


  calculateTotals() {
    this.amount = 0;
    this.totalAmount = 0;
    this.height = 0;
    this.length = 0;
    this.breadth = 0;
    this.weight = 0;
    var totalQuantity = 0;
    for (var i = 0; i < this.cartItems.length; i++) {
      this.amount =
        this.amount +
        this.cartItems[i].productPrice * this.cartItems[i].quantity;
      this.cartItems[i].stock = this.stocks[i];
      totalQuantity = totalQuantity + this.cartItems[i].quantity;
    }
    for (var j = 0; j < this.dimensions.length; j++) {
      console.log(this.dimensions);
      this.weight = parseFloat(
        (
          parseFloat(this.weight) +
          parseFloat(
            parseFloat(
              this.dimensions[j].weight * parseFloat(this.cartItems[j].quantity)
            )
          )
        ).toFixed(3)
      );
      this.length = parseFloat(
        (
          parseFloat(this.length) +
          parseFloat(
            parseFloat(
              this.dimensions[j].length * parseFloat(this.cartItems[j].quantity)
            )
          )
        ).toFixed(3)
      );
      this.breadth = parseFloat(
        (
          parseFloat(this.breadth) +
          parseFloat(
            parseFloat(
              this.dimensions[j].breadth *
                parseFloat(this.cartItems[j].quantity)
            )
          )
        ).toFixed(3)
      );
      this.height = parseFloat(
        (
          parseFloat(this.height) +
          parseFloat(
            parseFloat(
              this.dimensions[j].height * parseFloat(this.cartItems[j].quantity)
            )
          )
        ).toFixed(3)
      );
    }
    this.totalAmount = parseInt(this.amount);
    this.backupamount = this.totalAmount;
    console.log(this.cartItems);
    console.log(this.weight);


    if (totalQuantity > 3) {
      // 10% discount on cart items more than 3
      this.morethanthree = true;
      this.totalAmount = parseInt(this.totalAmount - this.totalAmount * 0.1);
    } else {
      this.morethanthree = false;
    }
    this.setState({});
  }

  deleteCartItem(cid) {
    for (var i = 0; i < this.cartItems.length; i++) {
      if (this.cartItems[i].productId === cid) {
        if (i == 0) {
          this.cartItems.shift();
          this.stocks.shift();
          this.dimensions.shift();
        } else {
          this.cartItems.splice(i, 1);
          this.stocks.splice(i, i);
          this.dimensions.splice(i, i);
        }
      }
    }
    this.calculateTotals();
    toast.success('Item removed from cart.');
    // this.setState({});
  }

  render() {
    return (
      <section className="cart">
        <NavBar />
        <br />
        <br />
        <br />
        <div className="wrapper">
          <h1>Cart</h1>
          <center>
            {this.cartItems.length !== 0 ? (
              <div className="project">
                <div className="shops">
                  {this.cartItems.length !== 0 ? (
                    this.cartItems.map(
                      function (item, i) {
                        return (
                          <div key={i} className="box">
                           <Link to={'/product/'+item.productId}>
                            <div className="box-img">
                           <img src={item.productImage} />
                           </div></Link>
                            <div className="content">
                              <h3>{item.productName}</h3>
                              <h4>Rs {item.productPrice}</h4>
                              <p className="unit">
                                Quantity:
                                <input
                                  min={1}
                                  max={item.stock}
                                  onChange={async function () {
                                    var q = document.getElementById(
                                      "cartquantity" + item.productId
                                    ).value;
                                    for (
                                      var i = 0;
                                      i < this.cartItems.length;
                                      i++
                                    ) {
                                      if (
                                        this.cartItems[i].productId ===
                                        item.productId
                                      ) {
                                        if (isNaN(parseFloat(q))) {
                                          document.getElementById(
                                            "cartquantity" + item.productId
                                          ).value = "1";
                                          this.cartItems[i].quantity = 1;
                                        } else {
                                          if (parseFloat(q) <= 0) {
                                            document.getElementById(
                                              "cartquantity" + item.productId
                                            ).value = "1";
                                            this.cartItems[i].quantity = 1;
                                          } else {
                                            if (parseFloat(q) > item.stock) {
                                              document.getElementById(
                                                "cartquantity" + item.productId
                                              ).value = item.stock.toString();
                                              this.cartItems[i].quantity =
                                                parseInt(item.stock);
                                            } else {
                                              this.cartItems[i].quantity =
                                                parseInt(q);
                                            }
                                          }
                                        }
                                      }
                                    }
                                    this.calculateTotals();
                                    this.setState({});
                                    var made = await updateCart(
                                      item.productId,
                                      q
                                    );
                                  }.bind(this)}
                                  type="number"
                                  id={"cartquantity" + item.productId}
                                  style={{ width: "70px" }}
                                  name="quantity"
                                  defaultValue={item.quantity}
                                />
                              </p>
                              <div className="qbox">
                                <button
                                  onClick={async function () {
                                    var q = document.getElementById('cartquantity' + item.productId);
                                    if(q.value < item.stock){
                                        for (
                                            var i = 0;
                                            i < this.cartItems.length;
                                            i++
                                          ) {
                                            if (
                                              this.cartItems[i].productId ===
                                              item.productId
                                            ) {
                                              this.cartItems[i].quantity++;
                                              q.value = this.cartItems[i].quantity;
                                            }
                                          }
                                    }
                                      this.calculateTotals();
                                      this.setState({});
                                  }.bind(this)}
                                  className="btn btn-primary"
                                  type="button"
                                  style={{ marginLeft: "10px" }}
                                >
                                  +
                                </button>
                                <button
                                  onClick={async function () {
                                    var q = document.getElementById('cartquantity' + item.productId);
                                    if(q.value > 1){
                                        for (
                                            var i = 0;
                                            i < this.cartItems.length;
                                            i++
                                          ) {
                                            if (
                                              this.cartItems[i].productId ===
                                              item.productId
                                            ) {
                                              this.cartItems[i].quantity--;
                                              q.value = this.cartItems[i].quantity;
                                            }
                                          }
                                    }
                                      this.calculateTotals();
                                      this.setState({});
                                  }.bind(this)}
                                  className="btn btn-primary"
                                  type="button"
                                  style={{ marginLeft: "10px" }}
                                >
                                  -
                                </button>
                              </div>

                              <p
                                onClick={async function () {
                                  var made = await deleteCart(item.productId);
                                  if (made["success"]) {
                                    this.deleteCartItem(item.productId);
                                  }
                                  else{
                                    toast.error('Something went wrong');
                                  }
                                }.bind(this)}
                                className="btn-area"
                              >
                                <MdDelete className="cartdlt" />{" "}
                                <span className="btn2">Remove</span>
                              </p>
                            </div>
                          </div>
                        );
                      }.bind(this)
                    )
                  ) : (
                    <div></div>
                  )}
                </div>
                <div className="right-bar">
                  <p>
                    <span>Items:</span> <span>{this.cartItems.length}</span>
                  </p>
                  <hr />
                  <p>
                    <span>Subtotal</span> <span>Rs {this.amount}</span>
                  </p>
                  <hr />
                  <p>
                    <span>Total</span>{" "}
                    <span>
                      Rs {this.totalAmount}{" "}
                      {this.morethanthree ? "(- 10%)" : ""}
                    </span>
                  </p>
                  <Link
                    to={"/checkout"}
                    state={{
                      amount: this.amount,
                      totalAmount: this.totalAmount,
                      cart_data: this.cartItems,
                      totalHeight: this.height,
                      totalLength: this.length,
                      totalBreadth: this.breadth,
                      totalWeight: this.weight,
                      morethanthree: this.morethanthree,
                      backupamount: this.backupamount,
                    }}
                    className="checkoutbtn"
                  >
                    <i className="fa fa-shopping-cart"></i>Checkout
                  </Link>
                </div>
              </div>
            ) : (
              <div>
                <h6>You havn't added anything to your cart</h6>
              </div>
            )}
          </center>
          <br />
        </div>
        <div className="cartFooter">
          <div style={{
           height: this.cartItems.length > 0 ? "100px" : "300px",
          }} className="spacerfooter"></div>
          <Footer />
        </div>
      </section>
    );
  }
}
export default Cart;

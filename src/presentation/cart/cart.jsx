import { getOrderId } from "../../js/payment";
import Checkout from "../checkout/checkout";
import { Link, NavLink } from "react-router-dom";
import public_url from "../../js/publicurl";
import Footer from "../home/Footer";
import NavBar from "../../components/NavBar";
import { Component } from "react";
import { MdDelete } from "react-icons/md";
import { deleteCart, getCartItem, updateCart } from "../../js/products";
import { parse } from "query-string";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.amount = 0;
    this.cartItems = [];
    this.dimensions = [];
    this.stocks = [];
    this.totalAmount = 0;
    this.shipping = 0;
    this.section = "cart";
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
    this.shipping = 0;
    this.totalAmount = 0;
    this.height = 0;
    this.length = 0;
    this.breadth = 0;
    this.weight = 0;
    for (var i = 0; i < this.cartItems.length; i++) {
      this.amount =
        this.amount +
        this.cartItems[i].productPrice * this.cartItems[i].quantity;
      this.cartItems[i].stock = this.stocks[i];
    }
    for (var j = 0; j < this.dimensions.length; j++) {
      console.log(this.dimensions)
      this.weight = parseFloat((
        parseFloat(this.weight) +
        parseFloat(
          parseFloat(
            this.dimensions[j].weight * parseFloat(this.cartItems[j].quantity)
          )
        )
      ).toFixed(3));
      this.length = parseFloat((
        parseFloat(this.length) +
        parseFloat(
          parseFloat(
            this.dimensions[j].length * parseFloat(this.cartItems[j].quantity)
          )
        )
      ).toFixed(3));
      this.breadth = parseFloat((
        parseFloat(this.breadth) +
        parseFloat(
          parseFloat(
            this.dimensions[j].breadth * parseFloat(this.cartItems[j].quantity)
          )
        )
      ).toFixed(3));
      this.height = parseFloat((
        parseFloat(this.height) +
        parseFloat(
          parseFloat(
            this.dimensions[j].height * parseFloat(this.cartItems[j].quantity)
          )
        )
      ).toFixed(3));
    }
    this.shipping =
      parseInt(this.weight * 52) > 90 ? parseInt(this.weight * 52) : 0;
    this.totalAmount = parseInt(this.amount + this.shipping);
    console.log(this.cartItems);
    console.log(this.weight);
    this.setState({});
  }

  deleteCartItem(cid) {
    for (var i = 0; i < this.cartItems.length; i++) {
      if (this.cartItems[i].productId == cid) {
        this.cartItems.splice(i, 1);
      }
    }
    this.setState({});
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
            {this.cartItems.length != 0 ? (
              <div className="project">
                <div className="shops">
                  {this.cartItems.length != 0 ? (
                    this.cartItems.map(
                      function (item, i) {
                        return (
                          <div key={i} className="box">
                            <img src={item.productImage} />
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
                                    if (parseFloat(q) > item.stock) {
                                      document.getElementById(
                                        "cartquantity" + item.productId
                                      ).value = item.stock.toString();
                                    } else {
                                      for (
                                        var i = 0;
                                        i < this.cartItems.length;
                                        i++
                                      ) {
                                        if (
                                          this.cartItems[i].productId ==
                                          item.productId
                                        ) {
                                          this.cartItems[i].quantity =
                                            parseInt(q);
                                        }
                                      }
                                      this.calculateTotals();
                                      this.setState({});
                                      var made = await updateCart(
                                        item.productId,
                                        q
                                      );
                                    }
                                  }.bind(this)}
                                  type="number"
                                  id={"cartquantity" + item.productId}
                                  style={{ width: "70px" }}
                                  name="quantity"
                                  defaultValue={item.quantity}
                                />
                              </p>
                              <p
                                onClick={async function () {
                                  var made = await deleteCart(item.productId);
                                  if (made["success"]) {
                                    this.deleteCartItem(item.productId);
                                    alert("Item removed from cart.");
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
                    <span>Shipping</span> <span>Rs {this.shipping}</span>
                  </p>
                  <hr />
                  <p>
                    <span>Total</span> <span>Rs {this.totalAmount}</span>
                  </p>
                  <Link
                    to={"/checkout"}
                    state={{
                      amount: this.amount,
                      shipping: this.shipping,
                      totalAmount: this.totalAmount,
                      cart_data: this.cartItems,
                      totalHeight: this.height,
                      totalLength: this.length,
                      totalBreadth: this.breadth,
                      totalWeight: this.weight,
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
          <Footer />
        </div>
      </section>
    );
  }
}
export default Cart;

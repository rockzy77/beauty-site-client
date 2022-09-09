import { Link, NavLink, useNavigate } from "react-router-dom";
import Footer from "../home/Footer";
import NavBar from "../../components/NavBar";
import { Component } from "react";
import { MdDelete } from "react-icons/md";
import { deleteCart, getCartItem, updateCart } from "../../js/products";
import { toast } from "react-toastify";
import { createCookie, getCookie } from "../../js/cookies";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../js/myStore";

const CartGuest = () =>{
  const navigate = useNavigate();
  function toLoginPage(){
    navigate('/login');
  }
  var dispatch = useDispatch();
  const data = useSelector((state) => state.theStore.value);
  function changeCartNumber(){
    if(parseInt(data) !== 0){
      dispatch(getData(parseInt(data)+1));
    }
  }
  return <CartGuestDiv toLogin={toLoginPage} changeCartNumber={changeCartNumber}/>;
}

class CartGuestDiv extends Component {
  constructor(props) {
    super(props);
    this.amount = 0;
    this.cartItems = [];
    this.dimensions = [];
    this.backupamount = 0;
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
    console.log("sssssssss");
    if (getCookie("cartList") !== "") {
      console.log("sssssssss");
      this.cartItems = JSON.parse(getCookie("cartList"));
      this.dimensions = JSON.parse(getCookie("dimensions"));
      this.stocks = JSON.parse(getCookie("stocks"));
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
    createCookie("cartList", JSON.stringify(this.cartItems), 1);
    createCookie("dimensions", JSON.stringify(this.dimensions), 1);
    createCookie("stocks", JSON.stringify(this.stocks), 1);
    this.props.changeCartNumber();
    this.calculateTotals();
    toast.success("Item removed from cart.");
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
                             <div className="box-img">
                           <img src={item.productImage} />
                           </div>
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
                                  this.deleteCartItem(item.productId);
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
                  <button
                  onClick={()=>{
                    alert('Please login to checkout.')
                    document.getElementById('toLogin').click();
                  }}
                    className="checkoutbtns"
                  >
                    <i className="fa fa-shopping-cart"></i>Checkout
                  </button>
                  <NavLink style={{'display': 'none'}} id="toLogin" to='/login' state={{
                      checkout_data: {
                          amount: this.amount,
                        totalAmount: this.totalAmount,
                        cart_data: this.cartItems,
                        totalHeight: this.height,
                        totalLength: this.length,
                        totalBreadth: this.breadth,
                        totalWeight: this.weight,
                        morethanthree: this.morethanthree,
                        backupamount: this.backupamount
                      }
                    }}>ss</NavLink>
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
          <div
            style={{
              height: this.cartItems.length > 0 ? "100px" : "300px",
            }}
            className="spacerfooter"
          ></div>
          <Footer />
        </div>
      </section>
    );
  }
}
export default CartGuest;

import React from 'react';
import { Link } from 'react-router-dom';
import "./cehckout.css";
import Navbar from '../../components/navbar/Navbar';
import Topbar from '../../components/topbar/Topbar';
import Footer from '../../components/footer/Footer';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const CheckOut = () => {
  const navigate = useNavigate();
  const cart = useSelector(state => state.cart);
  const [stripToken, setStripeToken] = useState(null);
  const [tokenId, setTokenId] = useState(null);
  //const key = process.env.REACT_STRIPE_KEY;
  const onToken = (token) => {
    setStripeToken(token);
    setTokenId(token.id);

    // console.log(token.id);
  }

  // console.log();
  // console.log(stripToken.id);

  useEffect(() => {
    const makePayment = async () => {

      try {
        if(stripToken===null){
          navigate("/checkout");
        }else{
          
         await axios.post("http://localhost:8000/api/orders/create", {
          userToken: stripToken,
          amount: cart.total * 100,
          products: cart.products
        });
          navigate("/success");
        }

      } catch (error) {
        console.log(error);
      }
    }
    makePayment();
  }, [stripToken, cart]);

  return (
    <>
      <Topbar />
      <Navbar />
      <div className="row">

        {/* <div className="col-75">
          <div className="container">


            <form >

              <div className="row">
                <div className="col-50">
                  <h3>Billing Address</h3>
                  <label className="fname"><i className="fa fa-user"></i> Full Name</label>
                  <input type="text" id="fname" name="firstname" placeholder="John M. Doe" />
                  <label className="email"><i className="fa fa-envelope"></i> Email</label>
                  <input type="text" id="email" name="email" placeholder="john@example.com" />
                  <label className="adr"><i className="fa fa-address-card-o"></i> Address</label>
                  <input type="text" id="adr" name="address" placeholder="542 W. 15th Street" />
                  <label className="city"><i className="fa fa-institution"></i> City</label>
                  <input type="text" id="city" name="city" placeholder="New York" />

                  <div className="row">
                    <div className="col-50">
                      <label className="state">State</label>
                      <input type="text" id="state" name="state" placeholder="NY" />
                    </div>
                    <div className="col-50">
                      <label className="zip">Zip</label>
                      <input type="text" id="zip" name="zip" placeholder="10001" />
                    </div>
                  </div>
                </div>

                <div className="col-50">
                  <h3>Payment</h3>
                  <label className="fname">Accepted Cards</label>
                  <div className="icon-container">
                    <i className="fa fa-cc-visa" style={{ color: "navy" }}></i>
                    <i className="fa fa-cc-amex" style={{ color: "blue" }}></i>
                    <i className="fa fa-cc-mastercard" style={{ color: "red" }}></i>
                    <i className="fa fa-cc-discover" style={{ color: "orange" }}></i>
                  </div>
                  <label className="cname">Name on Card</label>
                  <input type="text" id="cname" name="cardname" placeholder="John More Doe" />
                  <label className="ccnum">Credit card number</label>
                  <input type="text" id="ccnum" name="cardnumber" placeholder="1111-2222-3333-4444" />
                  <label className="expmonth">Exp Month</label>
                  <input type="text" id="expmonth" name="expmonth" placeholder="September" />

                  <div className="row">
                    <div className="col-50">
                      <label className="expyear">Exp Year</label>
                      <input type="text" id="expyear" name="expyear" placeholder="2018" />
                    </div>
                    <div className="col-50">
                      <label className="cvv">CVV</label>
                      <input type="text" id="cvv" name="cvv" placeholder="352" />
                    </div>
                  </div>
                </div>

              </div>
              <label>
                <input type="checkbox" name="sameadr" /> Shipping address same as billing
              </label>
              <input type="submit" value="Order" className="btn" />
            </form>
          </div>

        </div> */}
        <div className="col-25">
          <div className="container-div">
            <h4>Cart
              <span className="price" style={{ color: "black" }}>
                <i className="fa fa-shopping-cart"></i>
                <b>{cart.quantity}</b>
              </span>
            </h4>
            {cart.products.map((prdct) => {
              return (<>
                <p><Link to={`/productsdetails/${prdct._id}`}>{prdct.title}</Link> <span className="price">Rs/- {prdct.price}</span></p>
              </>)
            })}

            <hr />
            <p>Total <span className="price" style={{ color: "black" }}><b>Rs/-{cart.total}</b></span></p>
          </div>
          <div>
            {cart && cart.quantity > 0 ? <StripeCheckout
              name="Er. Manish Gupta"
              image=""
              billingAddress
              shippingAddress
              description={`Your Total is ${cart.total}`}
              currency="INR"
              amount={cart.total * 100}
              token={onToken}
              stripeKey="pk_test_51LAV5iSIlRKMsbTmUR3xRvIPUhd2WTE9qIXGgix5OUqU3yzFzTQQekVdbOIClFzujPccSzUagbUKD8dOcQjSGF8S004R85RPv7"
            /> : <span></span>}

          </div>
        </div>

      </div>
      <Footer />
    </>
  )
}

export default CheckOut;
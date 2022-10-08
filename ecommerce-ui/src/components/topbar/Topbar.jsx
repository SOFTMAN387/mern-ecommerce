import React from 'react'
import "./topbar.css";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Topbar = () => {
  const quantity=useSelector(state=>state.cart.quantity);
 // console.log(cart);
  return (
    <>

      <div className="topbar">
        <div className="topContainer">
    <Link to="/" style={{ color: "gray", textDecoration: "none", fontWeight: "bold" }}> <h3 className='top-logo'>Softman's Shop</h3></Link>
         

          <div className='log-reg-btn'>
          <Link to="/register"><button className="topButton">Register</button></Link>
          <Link to="/login"> <button className="topButton">Login</button></Link>
            
           
            <Link to="/cart">
            <button className="cart-btn">
            <i className="fa fa-light fa-shopping-cart cart-val-btn" ></i> <span className="cart-val">{quantity}</span>
            </button>
            </Link>
           
          </div>

        </div>

      </div>
      <div className='announcement'>Super Deal ! Free Shipping on Orders Over $1000</div>


    </>
  )
}

export default Topbar;
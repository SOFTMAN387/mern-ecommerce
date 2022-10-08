import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import Topbar from '../../components/topbar/Topbar';
import Footer from '../../components/footer/Footer';
import "./cart.css";
import { Link } from 'react-router-dom';
import { removeToCart,clearCart } from '../../redux/cartRedux';
import { useSelector, useDispatch } from 'react-redux';


const Cart = () => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);


    const handleCancel = (id) => {
       // console.log(id);
        dispatch(removeToCart(id));
    };

    // console.log(cartFilter);

    //    const handleqty = (type) => {
    //     if (type === "inc") {
    //         setQuantity(quantity + 1);
    //     } else {
    //         quantity > 1 && setQuantity(quantity - 1);
    //     }

    // }
    return (
        <>
            <Topbar />
            <Navbar />
            <div className='cart-container'>
                <h2 className='cart-title'>Your Cart !</h2>
                {cart.quantity === 0 ? <div className='empty-cart'>
                    <div className='empty-middle'>
                        <h3>Opps ! Your WishList is Empty...</h3>
                        <Link to="/">Shopping Continue</Link>
                    </div>
                </div> :
                    <div className='cart-top'>
                        <button>Continue Shopping</button>
                        <span>
                            <Link to=''> cart({cart.quantity})</Link><span>  </span>
                            <Link to=''>WishList(0)</Link>
                        </span>
                        <Link to="/checkout"> <button className='prcd-btn'>CheckOut</button></Link>


                    </div>}

                <hr></hr>
                {cart.products.map((prdct, index) => {
                    return (<>
                        <div className='cart-middle' key={index}>
                            <div className='img-fluid'>
                                <img src='https://images.pexels.com/photos/306763/pexels-photo-306763.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt='abc' />
                                <span className='cart-item-details'>
                                    <span>{prdct.title}</span>
                                    <span>Id:{prdct._id}</span>
                                    <span>{prdct.clr}</span>
                                    <span>{prdct.siz}</span>
                                    <span><b>Rs/- {prdct.price}</b></span>


                                </span>
                            </div>

                            <span className='inc-btn'>
                                <span className='qty'>Qty : </span>
                                {/* <button onClick={() => handleqty("dec")}><i class="fa-sharp fa-solid fa-minus"></i></button> */}
                                <span>{prdct.quantity}</span>
                                {/* <button onClick={() => handleqty("inc")}> <i class="fa-sharp fa-solid fa-plus"></i></button> */}

                            </span>


                            <i class="fa-sharp fa-2x fa-solid fa-xmark" onClick={() => handleCancel(prdct._id)}></i>
                        </div>

                    </>)
                })}




               
                <div>
               
                </div>
               {cart.quantity===0?<span></span>: <button onClick={()=>dispatch(clearCart())} style={{border:'none',backgroundColor:'brown',color:'white',marginTop:'20px',padding:'5px 25px'}}>Clear Items</button>}
                <br />
                <div className='prcd-btn-div'>
                    {cart.quantity === 0 ? <span></span> : <Link to="/checkout"> <button className='prcd-btn'>Proceed To Order!</button></Link>}


                </div>


            </div>
            <Footer />

        </>

    )
}

export default Cart;
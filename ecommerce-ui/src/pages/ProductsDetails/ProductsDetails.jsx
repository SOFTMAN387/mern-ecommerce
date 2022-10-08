import React from 'react';
import Topbar from '../../components/topbar/Topbar';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import "./productsdetails.css";
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { addProduct } from '../../redux/cartRedux';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const ProductsDetails = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const [getProducts, setGetProducts] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [clr, setClr] = useState("");
    const [siz, setSiz] = useState("");

    //console.log(id);

    const handleqty = (type) => {
        if (type === "inc") {
            setQuantity(quantity + 1);
        } else {
            quantity > 1 && setQuantity(quantity - 1);
        }

    }

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/api/products/getproduct/${id}`);
                // console.log(res.data);
                setGetProducts(res.data);

            } catch (error) {
                console.log(error);
            }

        }
        getData();
    }, [id])


    
    const addcart = () => {
        //update cart...........
        //console.log(clr,siz);
        dispatch(addProduct({ ...getProducts, quantity,clr,siz }));

    };
    return (
        <>
            <Topbar />
            <Navbar />
            <div className='detais-container'>
                <div className='img-div'>
                    <img className='img-url' src="https://images.pexels.com/photos/306763/pexels-photo-306763.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                </div>
                <div className='detais-div'>

                    <h1>{getProducts.title}</h1>
                    <h3>{getProducts.price}</h3>
                    <span>{getProducts.desc}</span>
                    <div className='options-menu'>
                        <h6>Colors</h6>
                        {getProducts.colors?.map((clr, index) => {
                            return (<>
                                <span key={index} className={clr} onClick={() => setClr(clr)}></span>
                            </>)
                        })}

                        {/* <span className="white"></span>
                        <span className='black'></span>
                        <span className='silver'></span>
                        <span className='golden'></span> */}




                        <h3 >Sort </h3>
                        <select className='filter' onClick={(e) => setSiz(e.target.value)}>
                        <option disabled>Size</option>
                            {getProducts.sizes?.map((sz, index) => {
                                return (<>
                                    
                                    <option key={index} >{sz} Inch</option>
                                </>)
                            })}

                            {/* <option>10</option>
                            <option>12</option>
                            <option>15</option> */}
                        </select>
                    </div>
                    <div className='inc-dec'>
                        <div>
                            <span className='inc-dec-btn' onClick={() => handleqty("dec")}> <i class="fa-sharp fa-solid fa-minus"></i></span>
                            <span><b>{quantity}</b></span>
                            <span className='inc-dec-btn' onClick={() => handleqty("inc")}> <i class="fa-sharp fa-solid fa-plus"></i></span>
                        </div>
                        <div> <button onClick={addcart} className="addtocart">Add To Cart</button></div>

                    </div>

                </div>

            </div>
            <Footer />
        </>
    );
};

export default ProductsDetails;
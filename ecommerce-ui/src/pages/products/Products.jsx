import React from 'react';
import "./products.css";
import axios from "axios";
//import { Products } from '../../components/data/ApiData';
//import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
// import { addProduct } from '../../redux/cartRedux';
// import { useDispatch } from 'react-redux';

const Categories = ({ cat, filters, sort }) => {
  //console.log(cat,filter,sort);
 // const dispatch=useDispatch();
  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);


  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(cat ? `http://localhost:8000/api/products/getproduct?category=${cat}` : "http://localhost:8000/api/products/getproduct");
        // console.log(res.data);
        setProducts(res.data);

      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, [cat])
  const navigate = useNavigate();
  const handleClick = async (id) => {
    try {
      navigate(`/productsdetails/${id}`);
      //console.log(id);
    } catch (error) {

    }
  }
  useEffect(() => {
    //  let size=filters.size;
    //  let color=filters.color;
    const fltr = cat && products.filter((item) => { return item.sizes == filters.size || item.colors === `"${filters.color}"` })
    setFilterProducts(fltr);
    // setProducts(fltr);

  }, [cat, filters, products]);
   console.log(filterProducts);
  //   console.log(products);
  // console.log(filters.color,filters.size);

  useEffect(()=>{
 if((sort==="Newest")){
  setFilterProducts([...products].sort((a,b)=>a.createdAt-b.createdAt));
 }else if((sort==="Price(asc)")){
  setFilterProducts([...products].sort((a,b)=>a.price-b.price));
 }else{
  setFilterProducts([...products].sort((a,b)=>b.price-a.price));
 }

  },[sort])
 // console.log(sort);
  return (
    <>
      <div className="container">
        <h1 className='prdct-title'>{cat}</h1>

        <ul className="image-gallery">
          {filterProducts && filterProducts.map((items) => {

            return (<>

              <li className='img-items' key={items._id} onClick={()=>handleClick(items._id)}>

                <img src="https://images.pexels.com/photos/11490067/pexels-photo-11490067.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className='img-item' />

                <h5>{items.title}</h5>
                <div className='title-info'>

                  
                 
                  <i className="fa fa-shopping-cart font-icon" aria-hidden="true"></i>
                  <i class="fa fa-search font-icon" aria-hidden="true"></i>
                  <i class="fa fa-heart font-icon" aria-hidden="true"></i>
                  {/* <button className='btn-item'>Buy Now</button> */}

                </div>

              </li>


            </>)
          })}

          {products && products.slice(0,4).map((items, index) => {
            return (<>

              <li className='img-items' key={index} onClick={()=>handleClick(items._id)}>

                <img src="https://images.pexels.com/photos/306763/pexels-photo-306763.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className='img-item' />

                <h5>{items.title}</h5>
                <div className='title-info'>

                 
                  <i className="fa fa-shopping-cart font-icon" aria-hidden="true"></i>
                  <i class="fa fa-search font-icon" aria-hidden="true"></i>
                  <i class="fa fa-heart font-icon" aria-hidden="true"></i>
                  {/* <button className='btn-item'>Buy Now</button> */}

                </div>

              </li>


            </>)
          })}


        </ul>

      </div>

    </>
  )
}

export default Categories
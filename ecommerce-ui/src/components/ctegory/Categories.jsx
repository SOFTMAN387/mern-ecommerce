import React from 'react';
import "./categories.css";
import { categories } from '../data/ApiData';
import { useNavigate } from 'react-router-dom';
//import { Link } from 'react-router-dom';

const Categories = () => {
  const navigate=useNavigate();

  const clickHandle=async(cat)=>{
    const catg=cat;
    navigate(`/productlist/${catg}`);
  }
  return (
   <>
 <div class="container">
 <h3 className='prdct-title'>Deals of The Day!.</h3>
 
  <ul class="image-gallery">
  
  {categories.map((items=>{
    return (<>
     
    <li className='img-items' key={items.id} onClick={()=>{clickHandle(items.cat)}}>
   
         <img src={items.img}  alt="" />
        <div className='title-info-item'>
        <h2>{items.title}</h2>
         <button className='btn-item' onClick={clickHandle}>Shop Now</button>

      </div>
    
    </li>
  
      
    </>)
  }))}
   
   

  </ul>
</div>
<hr></hr>

   </>
  )
}

export default Categories
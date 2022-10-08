import React from 'react';
import "./productslists.css";
import Navbar from '../../components/navbar/Navbar';
import Topbar from '../../components/topbar/Topbar';
import Footer from '../../components/footer/Footer';
import Products from '../products/Products';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';


const ProductsList = () => {
  const location = useLocation();
  const cat = location.pathname.split('/')[2];
  //console.log(location.pathname.split('/')[2]);
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState({});


  const handleFilters = (e) => {
    const value = e.target.value;
    setFilter({
      ...filter, [e.target.name]: value,
    })
  }

  //console.log(filter);
  return (
    <>
      <Topbar />
      <Navbar />
      <div className='filter-container'>
        <div>
          <span> Filter Products:</span>
          <select name="color" onChange={handleFilters} className='slct-optn'>
            <option disabled>color</option>
            <option>silver</option>
            <option>golden</option>
            <option>black</option>
            <option>white</option>
          </select>
          <select name="size" onChange={handleFilters} className='slct-optn'>
            <option disabled>Size</option>
            <option>8 </option>
            <option>12</option>
            <option>14</option>
            <option>15.6</option>
          </select>

        </div>
        <div>
          <span> Sort Products:</span>
          <select onChange={(e) => setSort(e.target.value)} className='slct-optn'>
            <option name="newest" >Newest</option>
            <option name="asc">Price(asc)</option>
            <option name="desc">Price(desc)</option>

          </select>
        </div>
      </div>
      <Products cat={cat} filters={filter} sort={sort} />
      <Footer />
    </>
  )
}

export default ProductsList
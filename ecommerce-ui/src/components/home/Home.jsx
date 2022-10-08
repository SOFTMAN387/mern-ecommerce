import React from 'react'
import Navbar from '../navbar/Navbar';
import Topbar from '../topbar/Topbar';
import Slider from '../slider/Slider';
import Categories from '../ctegory/Categories';
//import Categories from '../ctegory/Categories';
import Products from '../../pages/products/Products';
import Features from '../upcomin/Features';
import Footer from '../footer/Footer';
const Home = () => {
  return (
    <>
      <Topbar />
      <Navbar />
      <Slider />
      <Categories />
      <Products />
      <Features />
      <Footer />


    </>

  )
}

export default Home;
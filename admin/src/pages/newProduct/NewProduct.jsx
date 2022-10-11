import "./newProduct.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function NewProduct() {
  const navigate = useNavigate();
  //const [categories, setCat] = useState();
  // const [colors, setClr] = useState([]);
  // const [sizes, setSiz] = useState([]);
  const [Err, setErr] = useState(false);


  const [prdct, setPrdct] = useState({
    img: '',
    title: '',
    price: '',
    desc: '',
    inStock: '',
    categories: '',
    colors: '',
    sizes: '',
  });

  // const handleCat = (e) => {
  //   setCat(e.target.value.split(","));
  // }
  // const handleClr = (e) => {
  //   setClr(e.target.value.split(","));
  // }
  // const handleSiz = (e) => {
  //   setSiz(e.target.value.split(","));
  // }

  const handleChange = (e) => {
    setPrdct((prev) => ({
      ...prev, [e.target.name]: e.target.value
    }));
  };
  console.log(prdct)

  const handleClick = async (e) => {
    e.preventDefault();
    try {

      const res = await axios.post("http://localhost:8000/api/products/create", prdct);
      if (res) {
        navigate("/products");
      } else {

        navigate("/newproduct");
        setErr(true);

      }

    } catch (err) {
      console.log(err);
      setErr(true);

    }
  };


  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          {/* <input type="file" id="file" /> */}
          <input type="text" name="img" onChange={handleChange} placeholder="imgUrl" />
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input type="text" name="title" onChange={handleChange} placeholder="ProductName" />
        </div>
        <div className="addProductItem">
          <label>Categories</label>
          <input type="text" name="categories" onChange={handleChange} placeholder="laptop,desktop,mackbook" />
        </div>
        <div className="addProductItem">
          <label>Sizes</label>
          <input type="text" name="sizes" onChange={handleChange} placeholder="12,14,15" />
        </div>
        <div className="addProductItem">
          <label>Colors</label>
          <input type="text" name="colors" onChange={handleChange} placeholder="black,silver,golden" />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input type="number" name="price" onChange={handleChange} placeholder="Amount" />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input type="text" name="desc" onChange={handleChange} placeholder="Description" />
        </div>
        <div className="addProductItem">
          <label>inStock</label>
          <select name="inStock" onChange={handleChange} id="active">
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <button className="addProductButton" onClick={handleClick}>Create</button>
      </form>
      {Err === true ? <span style={{ color: 'red', textAlign: 'center' }}>Something Went Wrong !..</span> : <span></span>}
    </div>
  );
}

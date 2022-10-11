import { Link } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart"
//import {productData} from "../../dummyData"
import { Publish } from "@material-ui/icons";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Product() {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  console.log(id);
  const [products, setProducts] = useState([]);
  const [stocks, setStocks] = useState("");
  const [Err, setErr] = useState(false);

  const [updateData, setUpdateData] = useState({
    title: '',
    categories: '',
    sizes: '',
    colors: '',
    price: '',
    desc: '',
    img: '',
    inStock: '',
  });
  const handleChange = (e) => {
    setUpdateData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };



  const handleClick = async (e) => {
    e.preventDefault();
    try {

      const res = await axios.put(`http://localhost:8000/api/products/update/${id}`, updateData);
      if (res && updateData) {
        navigate("/products");

      } else {

        navigate(`/product/${id}`);
        setErr(true);

      }

    } catch (err) {
      console.log(err);
      setErr(true);

    }
  };





  useEffect(() => {

    const getData = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/products/getproduct/${id}`);
        if (res.data) {
          setProducts(res.data);
          setStocks(res.data.inStock);

        } else {
          console.log("Products are not available...");
        }
      } catch (error) {
        console.log("Products  not Found!...");

      }
    }
    getData();

  }, [id])






  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart data={products} dataKey="Sales" title="Sales Performance" />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src="https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="productInfoImg" />
            <span className="productName">{products.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{products._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Price:</span>
              <span className="productInfoValue">{products.price}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">in stock:</span>
              <span className="productInfoValue">{stocks.toString()}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Product Name</label>
            <input type="text" onChange={handleChange} name="title" placeholder={products.title} />
            <label>Category</label>
            <input type="text" onChange={handleChange} name="categories" placeholder={products.categories} />
            <label>Size</label>
            <input type="text" onChange={handleChange} name="sizes" placeholder={products.sizes} />
            <label>Color</label>
            <input type="text" onChange={handleChange} name="colors" placeholder={products.colors} />
            <label>Price</label>
            <input type="text" onChange={handleChange} name="price" placeholder={products.price} />
            <label>Description</label>
            <input type="text" onChange={handleChange} name="desc" placeholder={products.desc} />
            <label>ImgUrl</label>
            <input type="text" onChange={handleChange} name="img" placeholder={products.img} />
            <label>InStock</label>
            <input type="text" onChange={handleChange} name="inStock" placeholder={stocks.toString()} />

          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={products.img} alt="" className="productUploadImg" />
              <label for="file">
                <Publish />
              </label>
              <input type="file" id="file" style={{ display: "none" }} />
            </div>
            <button className="productButton" onClick={handleClick}>Update</button>
            {Err === true ? <span style={{ color: 'red', textAlign: 'center' }}>Something Went Wrong !..</span> : <span></span>}
          </div>

        </form>
      </div>
    </div>
  );
}

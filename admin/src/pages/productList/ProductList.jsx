import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
//import { productRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
//import { useDispatch } from "react-redux";
//import { getProductStart,getProductsSuccess,getProductFailure } from "../../redux/productRedux";
import axios from "axios";
export default function ProductList() {
  // const dispatch=useDispatch();
  // const navigate=useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    //dispatch(getProductStart());
    const getData = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/products/getproduct");
        if (res.data) {
          setData(res.data);
          //  dispatch(getProductsSuccess(res.data));
          // navigate("/products");
        } else {
          //  dispatch(getProductFailure());
          //  navigate("/products");
        }
      } catch (error) {
        // dispatch(getProductFailure());
      }
    }
    getData();

  }, [])


  const handleDelete = (id) => {
    setData(data.filter((item) => item._id !== id));
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "img",
      headerName: "Product",
      width: 50,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.name}
          </div>
        );
      },
    },
    { field: "title", headerName: "Title", width: 160 },
    {
      field: "desc",
      headerName: "Desc",
      width: 250,
    },
    {
      field: "price",
      headerName: "Price",
      width: 160,
    },
    {
      field: "categories",
      headerName: "Cat",
      width: 160,
    },
    {
      field: "sizes",
      headerName: "Size",
      width: 160,
    },
    {
      field: "colors",
      headerName: "Color",
      width: 160,
    },
    {
      field: "inStock",
      headerName: "Stock",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        getRowId={data => data._id}
      />
    </div>
  );
}

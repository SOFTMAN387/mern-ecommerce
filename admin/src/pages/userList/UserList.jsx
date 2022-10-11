import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
//import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
export default function UserList() {
 // const [data, setData] = useState(userRows);
  const [user, setUser] = useState([]);

  useEffect(() => {
    
    const getData = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/users/getuser");
        if (res.data) {
          setUser(res.data);
         
        } else {
          console.log("Products are not available...");
        }
      } catch (error) {
        console.log("Products Not Found!...");
      }
    }
    getData();

  }, [])



  const handleDelete = (id) => {
    setUser(user.filter((item) => item._id !== id));
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 200 },
    {
      field: "img",
      headerName: "User",
      width: 20,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.img} alt="" />
          </div>
        );
      },
    },
    { field: "username", headerName: "User", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "isAdmin",
      headerName: "Admin",
      width: 120,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={user}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        getRowId={user => user._id}
      />
    </div>
  );
}

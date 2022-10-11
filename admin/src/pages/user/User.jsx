import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import "./user.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function User() {

  const navigate = useNavigate();
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  //console.log(id);
  const [users, setUsers] = useState([]);
  const [admin, setAdmin] = useState("");
  const [Err, setErr] = useState(false);

  const [updateData, setUpdateData] = useState({
    username: '',
    email: '',
    password: '',
    img: '',
    isAdmin: '',
  });
  const handleChange = (e) => {
    setUpdateData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };


  const handleClick = async (e) => {
    e.preventDefault();
    try {

      const res = await axios.put(`http://localhost:8000/api/users/update/${id}`, updateData);
      if (res && updateData) {
        navigate("/users");

      } else {

        navigate(`/user/${id}`);
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
        const res = await axios.get(`http://localhost:8000/api/users/getuser/${id}`);
        if (res.data) {
          setUsers(res.data);
          setAdmin(res.data.isAdmin);
          //  console.log(res.data.isAdmin);

        } else {
          console.log("Users are not available...");
        }
      } catch (error) {
        console.log("Users  not Found!...");

      }
    }
    getData();

  }, [id])

  //console.log(users.isAdmin)
  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src={users.img}
              alt="userImg"
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{users.username}</span>
              <span className="userShowUserTitle">Software Engineer</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">annabeck99</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">10.12.1999</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">+1 123 456 67</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">annabeck99@gmail.com</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">India |Patna</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  placeholder={users.username} name="username" onChange={handleChange}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  placeholder={users.email}
                  className="userUpdateInput" name="email" onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Password</label>
                <input
                  type="password"
                  placeholder={users.password}
                  className="userUpdateInput" name="password" onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>ImageUrl</label>
                <input
                  type="text"
                  placeholder={users.img}
                  className="userUpdateInput" name="img" onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Admin :</label>
                <input
                  type="text"
                  placeholder={admin.toString()}
                  className="userUpdateInput" name="isAdmin" onChange={handleChange}
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src={users.img}
                  alt="userImg"
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
              <button className="userUpdateButton" onClick={handleClick}>Update</button>

            </div>
            {Err === true ? <span style={{ color: 'red', textAlign: 'center' }}>Something Went Wrong !..</span> : <span></span>}
          </form>

        </div>
      </div>
    </div>
  );
}

import "./newUser.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function NewUser() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    img: ''
  });
  const [Err, setErr] = useState(false);

  const handleChange = (e) => {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };


  const handleClick = async (e) => {
    e.preventDefault();
    try {

      const res = await axios.post("http://localhost:8000/api/auth/register", userData);
      if (res) {
        navigate("/users");
      } else {

        navigate("/newUser");
        setErr(true);

      }

    } catch (err) {
      console.log(err);
      setErr(true);

    }
  };



  //console.log(userData);
  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Username</label>
          <input type="text" placeholder="Name" name="username" onChange={handleChange} />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input type="email" placeholder="Email-Id" name="email" onChange={handleChange} />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input type="password" placeholder="Password" name="password" onChange={handleChange} />
        </div>
        <div className="newUserItem">
          <label>ImageUrl</label>
          <input type="password" placeholder="Image" name="img" onChange={handleChange} />
        </div>

        <button className="newUserButton" onClick={handleClick}>Create</button>
      </form>
      <div>
      <br></br>
       
          {Err === true ? <span style={{color:'red',textAlign:'center'}}>Something Went Wrong !..</span> : <span></span>}
      
      </div>
    </div>
  );
}

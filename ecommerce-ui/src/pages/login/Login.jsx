import axios from "axios";
 import { useState } from "react";
 import { Link } from "react-router-dom";
 import { useDispatch } from "react-redux";
 import { useNavigate } from "react-router-dom";
 import Navbar from "../../components/navbar/Navbar";
 import Topbar from "../../components/topbar/Topbar";
 import Footer from "../../components/footer/Footer";
 import { loginStart,loginSuccess,loginFailure } from "../../redux/userRedux";
import "./login.css";

const Login = () => {

  //  const user=useSelector(state=>state.user);
    const dispatch=useDispatch();
    const [credentials, setCredentials] = useState({
        email: undefined,
        password: undefined,
    });
    
    
    const [loginErr, setLoginErr] = useState(false);

    // const { loading, error, dispatch } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        dispatch(loginStart());
        try {

            const res = await axios.post("http://localhost:8000/api/auth/login", credentials);
            if (res.data === "User Not Found !!.." || res.data === "OOps ! Invalid Credentials...") {
                dispatch(loginFailure());
                setLoginErr(true);
                navigate("/login");

            } else {

                dispatch(loginSuccess(res.data));
                navigate("/");
                console.log(res.data);
            }

        } catch (err) {
            dispatch(loginFailure());
        }
    };

     // console.log(user.currentUser);

    return (

     <>
     <Topbar/>
     <Navbar />


     <div className="login-div">
            <div className="loginContainer">
                <input
                    type="email"
                    placeholder="username"
                    id="email"
                    onChange={handleChange}
                    className="loginInput"
                />
                <input
                    type="password"
                    placeholder="password"
                    id="password"
                    onChange={handleChange}
                    className="loginInput"
                />
                <button
                //  disabled={loading} 
                onClick={handleClick}
                 className="loginButton">
                    Login
                </button>
                {/* {loginErr && <span>loginErr</span>} */}
                {loginErr ? <span style={{ color: "red" }}>Wrong Credentials !!...</span> : <span></span>}
                <div>
                <br></br>
                <hr/>
                <h5>Don't have an account ?.</h5>
                <br/>
                <Link to="/register">Register here !.</Link>
                </div>
            </div>
        </div>
<Footer />
     </>
    );
};

export default Login;
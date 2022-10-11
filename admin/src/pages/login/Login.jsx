import { useState } from "react";
import "./login.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginStart, loginSuccess, loginFailure } from "../../redux/userRedux";

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        email: undefined,
        password: undefined,
    });

    const [loginErr, setLoginErr] = useState(false);

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };


    const handleClick = async (e) => {
        e.preventDefault();
        dispatch(loginStart());
        try {

            const res = await axios.post("http://localhost:8000/api/auth/login", credentials);
            if (res.data === "User Not Found !!.." || res.data === "OOps ! Invalid Credential...") {
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
    return (
        <div className="home">

            <div className="login-div">

                <div className="loginContainer">
                    <h2 className="login-title">Admin Login !</h2>
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
                    {loginErr ? <span style={{ color: "red" }}>Only Admin Can Login !!...</span> : <span></span>}
                    <div>

                    </div>
                </div>
            </div>


        </div>
    );
}

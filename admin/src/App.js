
import "./App.css";
import Home from "./pages/home/Home";
//import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import Topbar from "../../admin/src/components/topbar/Topbar";
import Sidebar from "../../admin/src/components/sidebar/Sidebar";
//import {useSelector} from "react-redux"

function App() {
  // const user = true;
  const admin = useSelector(state => state.user.currentUser);
  const isAdmin = admin && admin.isAdmin;
  //console.log(isAdmin);
  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Routes>
          <Route exact path="/" element={!isAdmin === true ? <Login /> : <Home />} />
          <Route exact path="/login" element={!isAdmin === true ? <Login /> : <Home />} />
          <Route exact path="/users" element={!isAdmin === true ? <Login /> : <UserList />} />
          <Route exact path="/user/:userId" element={!isAdmin === true ? <Login /> : <User />} />
          <Route exact path="/products" element={!isAdmin === true ? <Login /> : <ProductList />} />
          <Route exact path="/product/:productId" element={!isAdmin === true ? <Login /> : <Product />} />
          <Route exact path="/newproduct" element={!isAdmin === true ? <Login /> : <NewProduct />} />
          <Route exact path="/newUser" element={!isAdmin === true ? <Login /> : <NewUser />} />

        </Routes>
      </div>



    </>

    // <Router>
    //   <Topbar />
    //   <div className="container">
    //     <Sidebar />
    //     <Switch>
    //       <Route exact path="/">
    //       {user===true ?<Home/>:<Login/>}

    //       </Route>
    //       <Route path="/users">
    //         <UserList />
    //       </Route>
    //       <Route path="/user/:userId">
    //         <User />
    //       </Route>
    //       <Route path="/newUser">
    //         <NewUser />
    //       </Route>
    //       <Route path="/products">
    //         <ProductList />
    //       </Route>
    //       <Route path="/product/:productId">
    //         <Product />
    //       </Route>
    //       <Route path="/newproduct">
    //         <NewProduct />
    //       </Route>
    //       <Route path="/login">
    //         <Login />
    //       </Route>
    //     </Switch>
    //   </div>
    // </Router>
  );
}

export default App;

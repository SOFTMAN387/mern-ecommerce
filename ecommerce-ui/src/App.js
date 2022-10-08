import Home from "./components/home/Home";
import { Routes, Route } from "react-router-dom";
import ProductsList from "./pages/productsLists/ProductsList";
import ProductsDetails from "./pages/ProductsDetails/ProductsDetails";
import Cart from "./pages/cartbtn/Cart";
//import { Home } from "./components/home/Home";
import Login from "./pages/login/Login";
import { useSelector } from "react-redux";
import Register from "./pages/register/Register";
import CheckOut from "./pages/checkout/CheckOut";
function App() {
  const user = useSelector(state => state.user.currentUser);
  const cUser=user && user[0];
  console.log(user);
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={ cUser===null  ?  <Login />:<Home />} />
        <Route exact path="/register" element={ cUser===null  ?  <Register />:<Home />} />
        <Route exact path="/cart" element={ <Cart /> } />
        <Route exact path="/checkout" element={ cUser===null  ?  <Login />:<CheckOut />} />
        <Route exact path="/productlist/:cat" element={<ProductsList />} />
        <Route exact path="/productsdetails/:id" element={<ProductsDetails />} />

      </Routes>
    </>
  );
}

export default App;

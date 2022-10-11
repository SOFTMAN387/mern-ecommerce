import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import axios from "axios";
import { useState,useEffect } from "react";

export default function FeaturedInfo() {

  
  const [orders, setOrders] = useState(0);
  const [total, setTotal] = useState(0);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/users/getuser");
        setUsers(res.data.length);
        // console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getUsers();

  }, [])

 
  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/orders/getOrder");
        setOrders(res.data.length);
        setTotal(res.data[0].amount);

       // console.log(res.data.length);
       // console.log(res.data.amount);
      } catch (error) {
        console.log(error);
      }
    }
    getOrders();

  }, [])
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Revanue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">Rs/-{total}</span>
          <span className="featuredMoneyRate">
            -11.4 % <ArrowDownward  className="featuredIcon negative"/>
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Users</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{users}</span>
          <span className="featuredMoneyRate">
            +1.4 % <ArrowUpward className="featuredIcon"/>
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Orders</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{orders}</span>
          <span className="featuredMoneyRate">
            +2.4 <ArrowUpward className="featuredIcon"/>
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
    </div>
  );
}

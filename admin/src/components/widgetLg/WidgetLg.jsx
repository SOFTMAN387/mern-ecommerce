import "./widgetLg.css";
import { useState, useEffect } from "react";
import axios from "axios";

export default function WidgetLg() {

  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/orders/getOrder");
        setOrders(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getOrders();

  }, [])
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest transactions</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Customer</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Amount</th>
          <th className="widgetLgTh">Status</th>
        </tr>
        {orders.slice(0, 10).map((order, index) => {

          return (<>
            <tr className="widgetLgTr" key={index}>
              <td className="widgetLgUser">
                <img
                  src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                  alt=""
                  className="widgetLgImg"
                />
                <span className="widgetLgName">{order._id}</span>
              </td>
              <td className="widgetLgDate">{order.createdAt}</td>
              <td className="widgetLgAmount">${order.amount}</td>
             

              <td className="widgetLgStatus">
                <Button type={order.status} />
              </td>
            </tr>
          </>)
        })}


      </table>
    </div>
  );
}

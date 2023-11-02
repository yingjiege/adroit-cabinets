import React, { useState, useEffect } from "react";
import NavbarAfterLogin from "../navbar/NavbarAfterLogin";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Management() {
  const [order, setOrder] = useState([]); // Replace with your actual data source
  const [searchInput, setSearchInput] = useState("");
  const [sortedOrders, setSortedOrders] = useState([]);
  const [customer, setCustomer] = useState("");
  const navigate = useNavigate();

  // Fetch orders (you can use useEffect to fetch data)
  useEffect(() => {
    const user_id = localStorage.getItem('user');
  // Make the GET request to retrieve the order list
  axios.get(`https://us-east-1.aws.data.mongodb-api.com/app/application-0-hxfdv/endpoint/get_order_list`)  
  .then((response) => {
      // Handle the response data
      setOrder(response.data)
      // Perform further operations with the order list
    })
    .catch((error) => {
      // Handle any errors
      console.error(error);
    });
  axios.get('https://us-east-1.aws.data.mongodb-api.com/app/application-0-hxfdv/endpoint/get_all_users')
  .then((response) => {
    // Handle the response data
    setCustomer(response.data)
    // Perform further operations with the order list
  })
  .catch((error) => {
    // Handle any errors
    console.error(error);
  });
  }, []);

  // Handle search input change
  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  // Function to trigger search
  const searchOrders = () => {
    if (order && order.length > 0) {
      const filteredOrders = order.filter((order) =>
        order.order_id === searchInput
      );
      console.log(filteredOrders)
      const sortedByTime = filteredOrders.sort((a, b) => a.time - b.time);
      setSortedOrders(sortedByTime);
    } else {
      // Handle the case when there are no orders or when the data is not yet loaded
      setSortedOrders([]);
    }
  };

  const deleteOrder = (orderId) => {
    // Make an API request to delete the order based on its ID
    axios
      .delete(`https://us-east-1.aws.data.mongodb-api.com/app/application-0-hxfdv/endpoint/deleted_order?order_id=${sortedOrders[0].order_id}`)
      .then(() => {
        // After successful deletion, update the order state to reflect the changes
        const updatedOrders = order.filter(order => order._id !== orderId);
        setOrder(updatedOrders);
  
        // Display a success message to the user
        alert("Order has been successfully deleted.");
  
        // Refresh the page
        window.location.reload();
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
        // You can also show an error message to the user if needed
        alert("An error occurred while deleting the order.");
      });
  };

  return (
    <div>
      <NavbarAfterLogin />
      <div>
        <input
          type="text"
          placeholder="Search by Company Name or Order Number"
          value={searchInput}
          onChange={handleSearchInput}
        />

        <button onClick={searchOrders}>Search</button>
      </div>

      <div>
        <ul>
            {sortedOrders.map((order) => (
            <li key={order._id}>
                <p>Status: {order.status || 'N/A'}</p>
                <p>PO: {order.PO || 'N/A'}</p>
                <p>Date: {order.date || 'N/A'}</p>
                <p>Name: {order.name || 'N/A'}</p>
                <p>Box: {order.select.cabinetBox || 'N/A'}</p>
                <p>Hinge Type: {order.select.hingeType || 'N/A'}</p>
                <p>Slide: {order.select.slide || 'N/A'}</p>
                <p>Drawer: {order.select.drawer || 'N/A'}</p>
                <p>Cabinet Leg: {order.select.cabinetLeg || 'N/A'}</p>
                <p>Cabinet:</p>
                <ul>
                {order.cabinet.map((cabinet, index) => (
                    <li key={index}>
                    <p>{cabinet.qty}_{cabinet.doorColor}_{cabinet.cabinetSize}_{cabinet.height}_{cabinet.width}_
                    {cabinet.depth}_{cabinet.hinge}_{cabinet.finLOrR}_{cabinet.customizeAddOn}_{cabinet.memo}_{cabinet.price}
                    </p>
                    </li>
                ))}
                </ul>
                <p>Accessory:</p> 
                <ul>
                    {order.accessory.map((accessory) => (
                        <li key={accessory.id}>
                        <p> {accessory.accQty} _{accessory.acc }_{accessory.accColor }_{accessory.accHeight }_{accessory.accWidth } _{accessory.accDepth }
                        _{accessory.accPrice }</p>
                        </li>
                    ))}
                    </ul>
                    <p>Cabinet Door:</p> 
                    <ul>
                    {order.cabinetDoor.map((cabinetDoor) => (
                        <li key={cabinetDoor.id}>
                        <p> {cabinetDoor.qty} _{cabinetDoor.panelId }_{cabinetDoor.panelFinish }_{cabinetDoor.height }_{cabinetDoor.width }
                        _{cabinetDoor.matchGrain }_{cabinetDoor.miterCut }_{cabinetDoor.hingeHole }_{cabinetDoor.subtotal }</p>
                        </li>
                    ))}
                    </ul>
                    <button onClick={() => deleteOrder(order._id)}>Delete</button>
            </li>
            ))}
        </ul>
        </div>
    </div>
  );
}

export default Management;
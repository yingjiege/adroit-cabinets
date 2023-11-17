import React, { Fragment, useState, useRef, useEffect} from "react";
import NavbarAfterLogin from "../navbar/NavbarAfterLogin";
import axios from 'axios';
import { useReactToPrint } from "react-to-print";


function Management() {
  const [order, setOrder] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [sortedOrders, setSortedOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [customer, setCustomer] = useState("");
  

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
const searchOrders = (orderId) => {
  if (order && order.length > 0) {
    // Check if the search input is a company name
    const ordersByCompany = order.filter((order) =>
      order.companyName &&
      order.companyName.toLowerCase() === searchInput.toLowerCase()
    );

    // Check if the search input is an order number
    const ordersByOrderNumber = order.filter((order) =>
      order.order_id === searchInput
    );

    let matchingOrders = [];

    if (ordersByCompany.length > 0) {
      matchingOrders = ordersByCompany;
    } else if (ordersByOrderNumber.length > 0) {
      matchingOrders = ordersByOrderNumber;
    }

    if (matchingOrders.length > 0) {
      // Sort the matching orders by date in descending order (latest to oldest)
      const sortedByTime = matchingOrders.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB - dateA;
      });
      setSortedOrders(sortedByTime);
    } else {
      // Handle the case when no matching orders are found
      setSortedOrders([]);
    }
  } else {
    // Handle the case when there are no orders or when the data is not yet loaded
    setSortedOrders([]);
  }
};


  const deleteOrder = (orderId) => {
    // Make an API request to delete the order based on its ID
    const index = order.findIndex((order) => order.order_id === orderId);
    axios.delete(`https://us-east-1.aws.data.mongodb-api.com/app/application-0-hxfdv/endpoint/deleted_order?order_id=${order[index].order_id}`)
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

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();
  
    return `${hours}:${minutes} ${month}/${day}/${year}`;
  };

  const toggleOrderDetails = (orderId) => {

    setSelectedOrderId(orderId);
    const index = sortedOrders.findIndex((sortedOrders) => sortedOrders.order_id === orderId);
    setSortedOrders(sortedOrders[index])
    setShowOrderDetails(true);
    // Update selectedOrderDetails based on the selected order
  };

  // Function to go back to the order list
  const goBackToOrderList = () => {
    setSelectedOrderId(null);
    setShowOrderDetails(false);
    setSortedOrders([]);
  };

  const componentPDF = useRef();
  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTile: "UserData",
  });  

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
        {showOrderDetails ? null : <button onClick={searchOrders}>Search</button>}
      </div>

      {showOrderDetails ? (
        <div>
          {/* Display order details for the selected order */}
          <button onClick={goBackToOrderList}>Go Back to Order List</button>
          {selectedOrderId && sortedOrders && (
            // Render order details for the selected order
            // Modify this part to display detailed order information
            <div>
            <ul>
                <li key={sortedOrders._id}>
                    <p>Order Number: {sortedOrders.order_id}</p>
                    <p>
                      Status: {sortedOrders.status || 'N/A'} &nbsp; &nbsp; &nbsp; &nbsp; PO: {sortedOrders.PO || 'N/A'}
                    </p>
                    <p>Date: {formatDateTime(sortedOrders.date) || 'N/A'}</p>
                    <p>Company: {sortedOrders.companyName || 'N/A'}</p>
                    <p>Box: {sortedOrders.select.cabinetBox || 'N/A'} &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;
                    Hinge Type: {sortedOrders.select.hingeType || 'N/A'}</p>
                    <p>Slide: {sortedOrders.select.slide || 'N/A'}&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;
                    Drawer: {sortedOrders.select.drawer || 'N/A'}&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;
                    Cabinet Leg: {sortedOrders.select.cabinetLeg || 'N/A'}</p>
                    <p>Cabinet:</p>
                    <ul>
                    {sortedOrders.cabinet.map((cabinet, index) => (
                        <li key={index}>
                        <p>{cabinet.qty}_{cabinet.doorColor}_{cabinet.cabinetSize}_{cabinet.height}_{cabinet.width}_
                        {cabinet.depth}_{cabinet.hinge}_{cabinet.finLOrR}_{cabinet.customizeAddOn}_{cabinet.memo}_{cabinet.apt}___${cabinet.price}
                        </p>
                        </li>
                    ))}
                    </ul>
                    <p>Accessory:</p> 
                    <ul>
                        {sortedOrders.accessory.map((accessory) => (
                            <li key={accessory.id}>
                            <p> {accessory.accQty} _{accessory.acc }_{accessory.accColor }_{accessory.accHeight }_{accessory.accWidth } _{accessory.accDepth }
                            ___{accessory.accPrice }</p>
                            </li>
                        ))}
                        </ul>
                        <p>Cabinet Door:</p> 
                        <ul>
                        {sortedOrders.cabinetDoor.map((cabinetDoor) => (
                            <li key={cabinetDoor.id}>
                            <p> {cabinetDoor.qty} _{cabinetDoor.panelId }_{cabinetDoor.panelFinish }_{cabinetDoor.height }_{cabinetDoor.width }
                            _{cabinetDoor.matchGrain ? 'G': '' }_{cabinetDoor.miterCut }_{cabinetDoor.hingeHole ? 'H': ''}___{cabinetDoor.subtotal }</p>
                            </li>
                        ))}
                        </ul>
                        <button onClick={() => deleteOrder(sortedOrders.order_id)}>Delete</button>
                </li>
            </ul>
            </div>
          )}
        </div>
      ) : (
        <div>
          <ul>
            {sortedOrders.map((order) => (
              <li key={order._id}>
                <p>Order Number: <a href="#" onClick={() => toggleOrderDetails(order.order_id)}>{order.order_id}</a>
                &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; Status: {order.status || 'N/A'}
                &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; Date: {formatDateTime(order.date) || 'N/A'}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
                <i
            className="bi bi-file-earmark-pdf-fill btn btn-primary"
            onClick={generatePDF}
            style={{ color: "white", borderStyle: "solid",width: "auto",maxWidth: "150px" }}

          >
            PDF
          </i>
    </div>
    
  );
}

export default Management;

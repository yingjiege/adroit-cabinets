import React, { Fragment, useEffect, useState } from "react";
import axios from 'axios';
import NavbarAfterLogin from "../navbar/NavbarAfterLogin";
import { useNavigate  } from "react-router-dom";
import { Chart } from "react-google-charts";


export const data = [
  ["Year", "Sales", "Expenses"],
  ["2004", 1000, 400],
  ["2005", 1170, 460],
  ["2006", 660, 1120],
  ["2007", 1030, 540],
];

export const options = {
  title: "Company Performance",
  curveType: "function",
  legend: { position: "bottom" },
};

export default function Report() {  
  const [order,setOrder] = useState([{}])
  const user_id = localStorage.getItem('user');
  const navigate = useNavigate();
// Make the GET request to retrieve the order list
useEffect(() => {

  const user_id = localStorage.getItem('user');

// Make the GET request to retrieve the order list
axios.get(`https://us-east-1.aws.data.mongodb-api.com/app/application-0-hxfdv/endpoint/get_order_history?user_id=${user_id}`)  
.then((response) => {
    // Handle the response data
    setOrder(response.data)
    // Perform further operations with the order list
  })
  .catch((error) => {
    // Handle any errors
    console.error(error);
  });
}, [user_id]);

  const handleReorder = (_id) => {
    // Set the selected order in local storage
    const selectedOrder = order.find((o) => o._id === _id);
    localStorage.setItem('selectedOrder', selectedOrder._id);
    // Navigate to the "/shop" route
    navigate("/shop");
  };

  return (
    <Fragment>
      <NavbarAfterLogin/>
      <div className="container-fluid">
        <div className="row">
          <nav
            id="sidebarMenu"
            className="col-md-3 col-lg-2 d-md-block bg-body-tertiary sidebar collapse"
          >
            <div className="position-sticky pt-3 sidebar-sticky">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">
                    <span
                      data-feather="home"
                      className="align-text-bottom"
                    ></span>
                    Dashboard
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <span
                      data-feather="file"
                      className="align-text-bottom"
                    ></span>
                    Orders
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <span
                      data-feather="shopping-cart"
                      className="align-text-bottom"
                    ></span>
                    Products
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <span
                      data-feather="users"
                      className="align-text-bottom"
                    ></span>
                    Customers
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <span
                      data-feather="bar-chart-2"
                      className="align-text-bottom"
                    ></span>
                    Reports
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <span
                      data-feather="layers"
                      className="align-text-bottom"
                    ></span>
                    Integrations
                  </a>
                </li>
              </ul>

              <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-body-secondary text-uppercase">
                <span>Saved reports</span>
                <a
                  className="link-secondary"
                  href="#"
                  aria-label="Add a new report"
                >
                  <span
                    data-feather="plus-circle"
                    className="align-text-bottom"
                  ></span>
                </a>
              </h6>
              <ul className="nav flex-column mb-2">
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <span
                      data-feather="file-text"
                      className="align-text-bottom"
                    ></span>
                    Current month
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <span
                      data-feather="file-text"
                      className="align-text-bottom"
                    ></span>
                    Last quarter
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <span
                      data-feather="file-text"
                      className="align-text-bottom"
                    ></span>
                    Social engagement
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <span
                      data-feather="file-text"
                      className="align-text-bottom"
                    ></span>
                    Year-end sale
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            {/* <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h2">Dashboard</h1>
              <div className="btn-toolbar mb-2 mb-md-0">
                <div className="btn-group me-2">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                  >
                    Share
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                  >
                    Export
                  </button>
                </div>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary dropdown-toggle"
                >
                  <span
                    data-feather="calendar"
                    className="align-text-bottom"
                  ></span>
                  This week
                </button>
              </div>
            </div> */}
            {/* <Chart
              chartType="LineChart"
              width="100%"
              height="400px"
              data={data}
              options={options}
            /> */}
          <h2>Orders</h2>
                <div className="table-responsive">
                  <table className="table table-striped table-sm">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Order Number</th>
                        <th scope="col">PO#</th>
                        <th scope="col">Time</th>
                        <th scope="col">Name</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.map((order, index) => (
                        <tr key={order._id}>
                          <td>{index + 1}</td>
                          <td>{order.status}</td>
                          <td>{order._id}</td>
                          <td>{order.PO}</td>
                          <td>{order.date}</td>
                          <td>{order.name}</td>
                          <td>
                            <button onClick={() => handleReorder(order._id)}
                            className="form-control"
                            style={{ width: "auto", maxWidth: "150px" }}
                            >Reorder</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
    </Fragment>
  );
}

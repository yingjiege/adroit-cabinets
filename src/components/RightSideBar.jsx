import React from "react";
import { CSVLink } from "react-csv";

function RightSideBar({ setInfo }) {
  const handleInfoChange = (e) => {
    setInfo((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const table = [{
    cabinetSize: "",
    doorColor: "",
    qty: "",
    cabinetBox:""
  }]

  return (
    <nav className="navbar" id="sidenav">
      <ul className="navbar-nav">
      <li className="logo">
        <button className="nav-link">
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fad"
            data-icon="angle-double-right"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            className="svg-inline--fa fa-angle-double-right fa-w-14 fa-5x"
          >
            <g className="fa-group">
              <path
                fill="currentColor"
                d="M224 273L88.37 409a23.78 23.78 0 0 1-33.8 0L32 386.36a23.94 23.94 0 0 1 0-33.89l96.13-96.37L32 159.73a23.94 23.94 0 0 1 0-33.89l22.44-22.79a23.78 23.78 0 0 1 33.8 0L223.88 239a23.94 23.94 0 0 1 .1 34z"
                className="fa-secondary"
              ></path>
              <path
                fill="currentColor"
                d="M415.89 273L280.34 409a23.77 23.77 0 0 1-33.79 0L224 386.26a23.94 23.94 0 0 1 0-33.89L320.11 256l-96-96.47a23.94 23.94 0 0 1 0-33.89l22.52-22.59a23.77 23.77 0 0 1 33.79 0L416 239a24 24 0 0 1-.11 34z"
                className="fa-primary"
              ></path>
            </g>
          </svg>
        </button>
      </li>

      <li className="logo">
        <span className="link-text logo-text nav-link">Order Information</span>
          <div>
            {/* <input
              className="form-control logo-text"
              placeholder="Order Name"
              name="name"
              onChange={handleInfoChange}
            />
            <textarea
              className="form-control logo-text"
              placeholder="Description"
              name="description"
              onChange={handleInfoChange}
            ></textarea> */}
            <input
              className="form-control logo-text"
              type="date"
              placeholder="date"
              name="date"
              onChange={handleInfoChange}
            />
          </div>
      </li>
      <li className="logo">
        <span className="link-text logo-text nav-link" >Billing</span>
          <div>
            <textarea
              className="form-control link-text logo-text"
              placeholder="Billing Instructions"
              rows={6}
              name="billing"
              onChange={handleInfoChange}
            ></textarea>
          </div>
      </li>
      <li className="logo">
        <span className="link-text logo-text nav-link">Memo</span>
          <div>
            <textarea
              className="form-control link-text logo-text"
              placeholder="Memo"
              rows={6}
              name="memo"
              onChange={handleInfoChange}
            ></textarea>
          </div>
          </li>
          <li>
          <CSVLink data={table} filename={"my-file.csv"} target="_blank">
            <i
              className="bi bi-filetype-csv btn btn-primary link-text logo-text"
              style={{ color: "white", borderStyle: "solid" }}
            >
              Form Download
            </i>
          </CSVLink>
          </li>
      </ul>
    </nav>
  );
}

export default RightSideBar;
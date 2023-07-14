import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import NavbarBeforeLogin from "./navbar/NavbarBeforeLogin";

export default function HomePage() {
  return (
    <Fragment>
      <NavbarBeforeLogin />
      <div className="text-center">
        <h1 className="main-title home-page-title">
          We will contact you Soon for authentication
        </h1>
        <Link to="/login">
          <button className="primary-button">Log out</button>
        </Link>
      </div>
    </Fragment>
  );
}


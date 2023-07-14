import React from "react";
import { Link } from "react-router-dom";

export default function NavbarBeforeLogin() {
  return (
    <header className="d-flex justify-content-center py-3">
      <div className="col-md-3 mb-2 mb-md-0">
        <a
          href="/"
          className="d-inline-flex link-body-emphasis text-decoration-none"
        >
          <img
            src="https://adroitmanufacturing.allmoxy.com/data/header/Adroit_logo_3d-01-01.png"
            alt="adroit-manufacturing-logo"
            width={120}
            height={50}
          />
        </a>
      </div>

      <div className="col-md-3 text-end">
        <Link to="/login">
          <button type="button" className="btn btn-outline-primary me-2" style={{ width: "auto", maxWidth: "150px" }}>
            Login
          </button>{" "}
        </Link>
        <Link to="/register">
          <button type="button" className="btn btn-primary" style={{ width: "auto", maxWidth: "150px" }}>
            Sign up
          </button>
        </Link>
      </div>
    </header>
  );

}
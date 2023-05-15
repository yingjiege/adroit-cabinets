import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Topbar() {
  return (
    <header>
    <nav
    className="navbar navbar-expand-lg bg-body-tertiary rounded"
      aria-label="Thirteenth navbar example"
    >
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarsExample11"
          aria-controls="navbarsExample11"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse d-lg-flex" id="navbarsExample11">
          <a className="navbar-brand col-lg-3 me-0" href="nav">
            
            <img
        src="https://adroitmanufacturing.allmoxy.com/data/header/Adroit_logo_3d-01-01.png"
        alt="adroit-manufacturing-logo"
        width={120}
        height={50}
      />
          </a>
          <ul className="navbar-nav col-lg-6 justify-content-lg-center">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-star-fill"></i>
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="dropdown">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="dropdown">
                    Another action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="dropdown">
                    Something else here
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-cart-fill"></i>
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="dropdown">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="dropdown">
                    Another action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="dropdown">
                    Something else here
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-pie-chart-fill"></i>
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="dropdown">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="dropdown">
                    Another action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="dropdown">
                    Something else here
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-gear-fill"></i>
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="dropdown">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="dropdown">
                    Another action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="dropdown">
                    Something else here
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-bell-fill"></i>
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="dropdown">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="dropdown">
                    Another action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="dropdown">
                    Something else here
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          <div className="d-lg-flex col-lg-3 justify-content-lg-end">
            <i className="bi bi-person-circle btn" style={{"fontsize": "28px"}}></i>
          </div>
        </div>
      </div>
    </nav>
    </header>
  );
}
export default Topbar;

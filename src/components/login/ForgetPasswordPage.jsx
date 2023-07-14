import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import NavbarBeforeLogin from "../navbar/NavbarBeforeLogin";

import "../../App.css";
export default function ForgetPasswordPage() {
  return (
    <Fragment>
      <NavbarBeforeLogin/>
      <div className="col-md-10 mx-auto col-lg-5">
        <h2>Reset your password</h2>
        <h5>Enter your email address and we will send you a new password</h5>
        <form className="p-4 p-md-5 border rounded-3 bg-body-tertiary">
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
            />
            <label for="floatingInput">Email address</label>
          </div>
          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Send password reset email
          </button>
        </form>
        <footer>
          <p>
            <Link to="/">Back to Homepage</Link>.
          </p>
        </footer>
      </div>
    </Fragment>
  );
}
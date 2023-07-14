import React, { useState, Fragment } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import * as Realm from "realm-web";
import NavbarBeforeLogin from "../navbar/NavbarBeforeLogin";

const REALM_APP_ID = "application-0-hxfdv"; // e.g. myapp-abcde
const app = new Realm.App({ id: REALM_APP_ID });

export default function SignUpPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    companyName: '',
    phoneNumber: '',
    street: '',
    state: '',
    city: '',
    zipcode: '',
  });

  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  async function  handleSubmit(e){
    const email = formData.email;
    const password = formData.password;
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      try {
        await app.emailPasswordAuth.registerUser({email, password});
        console.log("User registered successfully!");
        await axios
        .post(
          "https://us-east-1.aws.data.mongodb-api.com/app/application-0-hxfdv/endpoint/register",
          formData
        )
        .then((response) => {
        console.log(response)
        navigate('/login')
        })
        .catch((e) => {
          console.log(e);
          setErrorMessage(e.error.toString());
        });
      } catch (error) {
        console.error("Failed to register user:", error);
        setErrorMessage(error.error.toString());
      }
    } else {
      // Form has errors, update state with validation errors
      setErrors(validationErrors);
    }
  };


  const validateForm = () => {
    const errors = {};
    if (!formData.email) {
      errors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid.';
    }
    if (!formData.password) {
      errors.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      errors.password = 'Password should be at least 6 characters.';
    }
    if (formData.confirmPassword !== formData.password) {
      errors.confirmPassword = 'Passwords do not match.';
    }
    if (!formData.firstName) {
      errors.firstName = 'First Name is required.';
    }
    if (!formData.lastName) {
      errors.lastName = 'Last Name is required.';
    }
    if (!formData.lastName) {
      errors.lastName = 'Last Name is required.';
    }
    if (!formData.companyName) {
      errors.companyName = 'Compnay Name is required.';
    }
    if (!formData.phoneNumber) {
      errors.phoneNumber = 'Phone Number is required.';
    }
    if (!formData.street) {
      errors.street = 'street is required.';
    }
    if (!formData.city) {
      errors.city = 'city is required.';
    }
    if (!formData.state) {
      errors.state = 'state is required.';
    }else if (formData.state.length !== 2) {
      errors.state = 'zipcode should be at 2 characters.';
    }
    if (!formData.zipcode) {
      errors.zipcode = 'zipcode is required.';
    }else if (formData.zipcode.length !== 5) {
      errors.zipcode = 'zipcode should be at 5 characters.';
    }
    return errors;
  };

  return (
    <Fragment>
      <NavbarBeforeLogin/>
      <div className="col-md-10 mx-auto col-lg-5">
        <h2>Join us</h2>
        <h5>Create your personal account</h5>
        <form className="p-4 p-md-5 border rounded-3 bg-body-tertiary needs-validation">
          <div className="form-floating mb-3 col-14">
            <input
              type="email"
              className="form-control"
              name="email"
              id="floatingInput"
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label className="">Email address</label>
            {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}
          </div>
          <div className="form-floating mb-3 col-14">
            <input
              type="password"
              className="form-control"
              name="password"
              id="floatingPassword"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <label>Password</label>
            {errors.password && <span style={{ color: "red" }}>{errors.password}</span>}
          </div>
          <div className="form-floating mb-3 col-14">
            <input
              type="password"
              className="form-control"
              name="confirmPassword"
              id="reEnterFloatingPassword"
              placeholder="Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <label>Comfirm Password</label>
            {errors.confirmPassword && <span style={{ color: "red" }}>{errors.confirmPassword}</span>}
          </div>
          <div className="form-floating mb-3 col-14">
              <input
              type="text"
              className="form-control"
              name="firstName"
              placeholder="first name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <label className="form-label">First name</label>
            {errors.firstName && <span style={{ color: "red" }}>{errors.firstName}</span>}
          </div>

          <div className="form-floating mb-3 col-14">
              <input
              type="text"
              className="form-control"
              name="lastName"
              placeholder="last name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            <label className="form-label">Last name</label>
            {errors.lastName && <span style={{ color: "red" }}>{errors.lastName}</span>}
          </div>

          <div className="form-floating mb-3 col-14">
              <input
              type="text"
              className="form-control"
              name="companyName"
              placeholder="company name"
              value={formData.companyName}
              onChange={handleChange}
              required
            />
            <label className="form-label">company name</label>
            {errors.companyName && <span style={{ color: "red" }}>{errors.companyName}</span>}
          </div>

          <div className="form-floating mb-3 col-14">
              <input
              type="text"
              className="form-control"
              name="phoneNumber"
              placeholder="phone number"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
            <label className="form-label">phone number</label>
            {errors.phoneNumber && <span style={{ color: "red" }}>{errors.phoneNumber}</span>}
          </div>

          <div className="form-floating mb-3 col-14">
              <input
              type="text"
              className="form-control"
              name="street"
              placeholder="street"
              value={formData.street}
              onChange={handleChange}
              required
            />
            <label className="form-label">street</label>
            {errors.street && <span style={{ color: "red" }}>{errors.street}</span>}
          </div>

          <div className="form-floating mb-3 col-14">
              <input
              type="text"
              className="form-control"
              name="city"
              placeholder="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
            <label className="form-label">city</label>
            {errors.city && <span style={{ color: "red" }}>{errors.city}</span>}
          </div>

          <div className="form-floating mb-3 col-14">
              <input
              type="text"
              className="form-control"
              name="state"
              placeholder="state"
              value={formData.state}
              onChange={handleChange}
              required
            />
            <label className="form-label">state</label>
            {errors.state && <span style={{ color: "red" }}>{errors.state}</span>}
          </div>

          <div className="form-floating mb-3 col-14">
              <input
              type="text"
              className="form-control"
              name="zipcode"
              placeholder="zipcode"
              value={formData.zipcode}
              onChange={handleChange}
              required
            />
            <label className="form-label">zipcode</label>
            {errors.zipcode && <span style={{ color: "red" }}>{errors.zipcode}</span>}
          </div>
          <div style={{ color: 'red' }}>{errorMessage}</div>
          <button
            className="w-100 btn btn-lg btn-primary"
            type="submit"
            onClick={handleSubmit}
          >
            Sign up
          </button>
          <hr className="my-4" />
          <small className="text-body-secondary">
            By clicking Sign up, you agree to the terms of use.
          </small>
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
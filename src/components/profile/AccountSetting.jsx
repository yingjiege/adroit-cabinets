import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Axios from "axios";
import NavbarAfterLogin from "../navbar/NavbarAfterLogin";
import "../../App.css";

export default function AccountSetting() {
  const [info, setInfo] = useState({})
  const user_id = localStorage.getItem('user');

  useEffect(() => {
    Axios.get(`https://us-east-1.aws.data.mongodb-api.com/app/application-0-hxfdv/endpoint/get_customer_information?user_id=${user_id}`)
    .then((res) => {
      const user = res.data[0];
      setInfo(user)
    })
    .catch((error) => {
      console.error(error);
    });
  }, []);

  return(<Fragment>
    <NavbarAfterLogin/>
    <div class="container">

    <main>
    <div class="py-5 text-center">
      <h2>Account Setting</h2>
      <p class="lead">Below is an example form built entirely with Bootstrap’s form controls. Each required form group has a validation state that can be triggered by attempting to submit the form without completing it.</p>
    </div>

    <div class="row g-5">
      {/* <div class="col-md-5 col-lg-4 order-md-last">
        <h4 class="d-flex justify-content-between align-items-center mb-3">
          <span class="text-primary">Your cart</span>
          <span class="badge bg-primary rounded-pill">3</span>
        </h4>
        <ul class="list-group mb-3">
          <li class="list-group-item d-flex justify-content-between lh-sm">
            <div>
              <h6 class="my-0">Product name</h6>
              <small class="text-body-secondary">Brief description</small>
            </div>
            <span class="text-body-secondary">$12</span>
          </li>
          <li class="list-group-item d-flex justify-content-between lh-sm">
            <div>
              <h6 class="my-0">Second product</h6>
              <small class="text-body-secondary">Brief description</small>
            </div>
            <span class="text-body-secondary">$8</span>
          </li>
          <li class="list-group-item d-flex justify-content-between lh-sm">
            <div>
              <h6 class="my-0">Third item</h6>
              <small class="text-body-secondary">Brief description</small>
            </div>
            <span class="text-body-secondary">$5</span>
          </li>
          <li class="list-group-item d-flex justify-content-between bg-body-tertiary">
            <div class="text-success">
              <h6 class="my-0">Promo code</h6>
              <small>EXAMPLECODE</small>
            </div>
            <span class="text-success">−$5</span>
          </li>
          <li class="list-group-item d-flex justify-content-between">
            <span>Total (USD)</span>
            <strong>$20</strong>
          </li>
        </ul>

        <form class="card p-2">
          <div class="input-group">
            <input type="text" class="form-control" placeholder="Promo code"/>
            <button type="submit" class="btn btn-secondary">Redeem</button>
          </div>
        </form>
      </div> */}
      <div class="col-md-7 col-lg-8">
        <h4 class="mb-3">Billing address</h4>
        <form class="needs-validation" noValidate>
        <div class="row g-3">
    <div class="col-sm-6">
      <label for="firstName" class="form-label">First name</label>
      <input 
        type="text" 
        class="form-control" 
        id="firstName" 
        placeholder="" 
        value={info.firstName} 
        onChange={(e) => setInfo({ ...info, firstName: e.target.value })}
        required
      />
      <div class="invalid-feedback">
        Valid first name is required.
      </div>
    </div>

    <div class="col-sm-6">
      <label for="lastName" class="form-label">Last name</label>
      <input 
        type="text" 
        class="form-control" 
        id="lastName" 
        placeholder=""
        value={info.lastName}
        onChange={(e) => setInfo({ ...info, lastName: e.target.value })}
        required
      />
      <div class="invalid-feedback">
        Valid last name is required.
      </div>
    </div>

    <div class="col-12">
      <label for="company" class="form-label">Company</label>
      <div class="input-group has-validation">
        <input 
          type="text" 
          class="form-control" 
          id="company" 
          placeholder="Company" 
          required
          value={info.companyName}
          onChange={(e) => setInfo({ ...info, companyName: e.target.value })}
        />
        <div class="invalid-feedback">
          Your company is required.
        </div>
      </div>
    </div>
    <div class="col-12">
      <label for="email" class="form-label">Email <span class="text-body-secondary">(Optional)</span></label>
      <input 
        type="email" 
        class="form-control" 
        id="email" 
        placeholder="you@example.com"
        value={info.email}
        onChange={(e) => setInfo({ ...info, email: e.target.value })}
      />
      <div class="invalid-feedback">
        Please enter a valid email address for shipping updates.
      </div>
    </div>

    <div class="col-12">
      <label for="address" class="form-label">Address</label>
      <input 
        type="text" 
        class="form-control" 
        id="address" 
        placeholder="1234 Main St" 
        required
        value={info.street}
        onChange={(e) => setInfo({ ...info, street: e.target.value })}
      />
      <div class="invalid-feedback">
        Please enter your shipping address.
      </div>
    </div>

    <div class="col-md-4">
      <label for="state" class="form-label">State</label>
      <input 
        type="text" 
        class="form-control" 
        id="state" 
        placeholder="State"
        value={info.state}
        onChange={(e) => setInfo({ ...info, state: e.target.value })}
      />

      <div class="invalid-feedback">
        Please provide a valid state.
      </div>
    </div>
    <div class="col-md-4">
      <label for="city" class="form-label">City</label>
      <input 
        type="text" 
        class="form-control" 
        id="city" 
        placeholder="City"
        value={info.city}
        onChange={(e) => setInfo({ ...info, city: e.target.value })}
      />
      <div class="invalid-feedback">
        Please provide a valid city.
      </div>
    </div>

    <div class="col-md-3">
      <label for="zipcode" class="form-label">Zip</label>
      <input 
        type="text" 
        class="form-control" 
        id="zipcode" 
        placeholder="" 
        required
        value={info.zipcode}
        onChange={(e) => setInfo({ ...info, zipcode: e.target.value })}
      />
      <div class="invalid-feedback">
        Zip code required.
      </div>
    </div>
  </div>

          {/* <hr class="my-4"/>

          <div class="form-check">
            <input type="checkbox" class="form-check-input" id="same-address"/>
            <label class="form-check-label" for="same-address">Shipping address is the same as my billing address</label>
          </div>

          <div class="form-check">
            <input type="checkbox" class="form-check-input" id="save-info"/>
            <label class="form-check-label" for="save-info">Save this information for next time</label>
          </div>

          <hr class="my-4"/>

          <h4 class="mb-3">Payment</h4>

          <div class="my-3">
            <div class="form-check">
              <input id="credit" name="paymentMethod" type="radio" class="form-check-input" checked required/>
              <label class="form-check-label" for="credit">Credit card</label>
            </div>
            <div class="form-check">
              <input id="debit" name="paymentMethod" type="radio" class="form-check-input" required/>
              <label class="form-check-label" for="debit">Debit card</label>
            </div>
            <div class="form-check">
              <input id="paypal" name="paymentMethod" type="radio" class="form-check-input" required/>
              <label class="form-check-label" for="paypal">PayPal</label>
            </div>
          </div>

          <div class="row gy-3">
            <div class="col-md-6">
              <label for="cc-name" class="form-label">Name on card</label>
              <input type="text" class="form-control" id="cc-name" placeholder="" required/>
              <small class="text-body-secondary">Full name as displayed on card</small>
              <div class="invalid-feedback">
                Name on card is required
              </div>
            </div>

            <div class="col-md-6">
              <label for="cc-number" class="form-label">Credit card number</label>
              <input type="text" class="form-control" id="cc-number" placeholder="" required/>
              <div class="invalid-feedback">
                Credit card number is required
              </div>
            </div>

            <div class="col-md-3">
              <label for="cc-expiration" class="form-label">Expiration</label>
              <input type="text" class="form-control" id="cc-expiration" placeholder="" required/>
              <div class="invalid-feedback">
                Expiration date required
              </div>
            </div>

            <div class="col-md-3">
              <label for="cc-cvv" class="form-label">CVV</label>
              <input type="text" class="form-control" id="cc-cvv" placeholder="" required/>
              <div class="invalid-feedback">
                Security code required
              </div>
            </div>
          </div>
          <hr class="my-4"/> */}
            <button className="btn btn-primary btn-lg" type="submit">
              Save Changes
            </button>
        </form>
      </div>
    </div>
  </main>
  </div>
  </Fragment>);
}

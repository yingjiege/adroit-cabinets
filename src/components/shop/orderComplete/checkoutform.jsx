import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Axios from "axios";
import NavbarAfterLogin from "../../navbar/NavbarAfterLogin";

export default function CheckoutForm() {
  const [searchedCabinet, setSearchedCabinet] = useState(null);
  const navigate = useNavigate();
  const [info, setInfo] = useState({})
  const user_id = localStorage.getItem('user');
  const storedInsertedId = localStorage.getItem('insertedId');

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

  useEffect(() => {
    Axios.get("https://us-east-1.aws.data.mongodb-api.com/app/application-0-hxfdv/endpoint/get_undetermined_order")
      .then((res) => {
        setSearchedCabinet(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const filteredData = searchedCabinet && searchedCabinet.find(item => item._id === storedInsertedId);
  const cabinet = filteredData && filteredData.cabinet;
  const select = filteredData && filteredData.select;
  const cabinetDoor = filteredData && filteredData.cabinetDoor;
  const accessory = filteredData && filteredData.accessory;
  const PO = filteredData && filteredData.PO;

  function generateRandomAlphanumericID(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
  
    return result;
  }
  const randomID = generateRandomAlphanumericID(12);
  const handleSubmit = (e) => {
    e.preventDefault();
    const currentDate = new Date();
    // Submit the order
    Axios.post(
      "https://us-east-1.aws.data.mongodb-api.com/app/application-0-hxfdv/endpoint/post_order",
      {
        user_id: user_id,
        cabinet: cabinet,
        cabinetDoor: cabinetDoor,
        accessory: accessory,
        PO: PO,
        select: select,
        date: currentDate,
        status: "unpaid",
        order_id: randomID
      }
    )
    .then((response) => {
      // Now delete the order based on storedInsertedId
      Axios.delete(
        `https://us-east-1.aws.data.mongodb-api.com/app/application-0-hxfdv/endpoint/delete_undetermined_order?_id=${filteredData._id}`
      )
      .then((deleteResponse) => {
        if (deleteResponse.status === 200) {
          // Handle successful deletion (e.g., show a message)
        }
        navigate("/ordercompleted");
      })
      .catch((deleteError) => {
        console.error("Error deleting order:", deleteError);
        // Handle the delete error (e.g., display an error message)
        navigate("/ordercompleted");
      });
    })
    .catch((error) => {
      console.error("Error uploading data:", error);
      // Handle the submit error (e.g., display an error message)
    });
  };
  
  return(<Fragment>
    <NavbarAfterLogin/>
    <div className="container">
    <main>
    <div className="py-5 text-center">
      <h2>Checkout form</h2>
      <p className="lead">Below is an example form built entirely with Bootstrap’s form controls. Each required form group has a validation state that can be triggered by attempting to submit the form without completing it.</p>
    </div>
    <div className="row g-5">
      <div className="col-md-5 col-lg-4 order-md-last">
        <h4 className="d-flex justify-content-between align-items-center mb-3">
          <span className="text-primary">Your cart</span>
          <span className="badge bg-primary rounded-pill">3</span>
        </h4>
        <ul className="list-group mb-3">
          <li className="list-group-item d-flex justify-content-between lh-sm">
            <div>
              <h6 className="my-0">Product name</h6>
              <small className="text-body-secondary">Brief description</small>
            </div>
            <span className="text-body-secondary">$12</span>
          </li>
          <li className="list-group-item d-flex justify-content-between lh-sm">
            <div>
              <h6 className="my-0">Second product</h6>
              <small className="text-body-secondary">Brief description</small>
            </div>
            <span className="text-body-secondary">$8</span>
          </li>
          <li className="list-group-item d-flex justify-content-between lh-sm">
            <div>
              <h6 className="my-0">Third item</h6>
              <small className="text-body-secondary">Brief description</small>
            </div>
            <span className="text-body-secondary">$5</span>
          </li>
          <li className="list-group-item d-flex justify-content-between bg-body-tertiary">
            <div className="text-success">
              <h6 className="my-0">Promo code</h6>
              <small>EXAMPLECODE</small>
            </div>
            <span className="text-success">−$5</span>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <span>Total (USD)</span>
            <strong>$20</strong>
          </li>
        </ul>

        <form className="card p-2">
          <div className="input-group">
            <input type="text" className="form-control" placeholder="Promo code"/>
            <button type="submit" className="btn btn-secondary">Redeem</button>
          </div>
        </form>
      </div>
      <div className="col-md-7 col-lg-8">
        <h4 className="mb-3">Billing address</h4>
        <form className="needs-validation" noValidate onSubmit={handleSubmit}>
        <div className="row g-3">
    <div className="col-sm-6">
      <label className="form-label">First name</label>
      <input 
        type="text" 
        className="form-control" 
        id="firstName" 
        placeholder="" 
        value={info.firstName} 
        onChange={(e) => setInfo({ ...info, firstName: e.target.value })}
        required
      />
      <div className="invalid-feedback">
        Valid first name is required.
      </div>
    </div>

    <div className="col-sm-6">
      <label className="form-label">Last name</label>
      <input 
        type="text" 
        className="form-control" 
        id="lastName" 
        placeholder=""
        value={info.lastName}
        onChange={(e) => setInfo({ ...info, lastName: e.target.value })}
        required
      />
      <div className="invalid-feedback">
        Valid last name is required.
      </div>
    </div>

    <div className="col-12">
      <label className="form-label">Company</label>
      <div className="input-group has-validation">
        <input 
          type="text" 
          className="form-control" 
          id="company" 
          placeholder="Company" 
          required
          value={info.companyName}
          onChange={(e) => setInfo({ ...info, companyName: e.target.value })}
        />
        <div className="invalid-feedback">
          Your company is required.
        </div>
      </div>
    </div>
    <div className="col-12">
      <label className="form-label">Email <span className="text-body-secondary">(Optional)</span></label>
      <input 
        type="email" 
        className="form-control" 
        id="email" 
        placeholder="you@example.com"
        value={info.email}
        onChange={(e) => setInfo({ ...info, email: e.target.value })}
      />
      <div className="invalid-feedback">
        Please enter a valid email address for shipping updates.
      </div>
    </div>
    <div className="col-12">
      <label className="form-label">Address</label>
      <input 
        type="text" 
        className="form-control" 
        id="address" 
        placeholder="1234 Main St" 
        required
        value={info.street}
        onChange={(e) => setInfo({ ...info, street: e.target.value })}
      />
      <div className="invalid-feedback">
        Please enter your shipping address.
      </div>
    </div>
    <div className="col-md-4">
      <label className="form-label">State</label>
      <input 
        type="text" 
        className="form-control" 
        id="state" 
        placeholder="State"
        value={info.state}
        onChange={(e) => setInfo({ ...info, state: e.target.value })}
      />

      <div className="invalid-feedback">
        Please provide a valid state.
      </div>
    </div>
    <div className="col-md-4">
      <label className="form-label">City</label>
      <input 
        type="text" 
        className="form-control" 
        id="city" 
        placeholder="City"
        value={info.city}
        onChange={(e) => setInfo({ ...info, city: e.target.value })}
      />
      <div className="invalid-feedback">
        Please provide a valid city.
      </div>
    </div>

    <div className="col-md-3">
      <label className="form-label">Zip</label>
      <input 
        type="text" 
        className="form-control" 
        id="zipcode" 
        placeholder="" 
        required
        value={info.zipcode}
        onChange={(e) => setInfo({ ...info, zipcode: e.target.value })}
      />
      <div className="invalid-feedback">
        Zip code required.
      </div>
    </div>
  </div>
          <hr className="my-4"/>
            {/* form fields */}
            <button
                className="w-100 btn btn-primary btn-lg"
                type="submit"
                onClick={handleSubmit}
            >
                Complete Order
            </button>
        </form>
      </div>
    </div>
  </main>
  </div>
  </Fragment>);
}

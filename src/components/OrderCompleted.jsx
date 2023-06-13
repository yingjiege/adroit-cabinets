import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function OrderCompleted() {
    return (
      <div className="order-completed-container">
        <header className="order-completed-header">
          <h1>Order completed!</h1>
        </header>
        <div className="order-details">
          <p>
            Thank you for placing your order. We have received your order
            information and sent you an email with the tracking number. 
          </p>
          <div className="order-info">
            <span className="info-label">Confirmation #:</span>
            <span className="info-value">{}</span>
          </div>
          <div className="order-info">
            <span className="info-label">Address:</span>
            <span className="info-value">{}</span>
          </div>
          <div className="order-info">
            <span className="info-label">EAT:</span>
            <span className="info-value">{}</span>
          </div>
        </div>
        <p className="contact-us">
          If you have any questions, please contact us.
        </p>
      </div>
    );
  }
  
  export default OrderCompleted;

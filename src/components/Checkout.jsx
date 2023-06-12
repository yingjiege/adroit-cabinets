import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Checkout() {
  return (
    <table className="table">
      <thead className="table-success">
        <tr>
          <th colSpan={5}>shopping cart &gt; checkout</th>
        </tr>
      </thead>
      <tbody>
        <tr>
            <td>Product</td>
            <td>Detail</td>
            <td>Price</td>
            <td>Qty</td>
            <td>Total</td>
        </tr>
      </tbody>
    </table>
  );
}

export default Checkout;

import React from "react";

function AccTableHead() {
  return (
    <thead className="table-success ">
      <tr>
        <th className="text-center" style={{ width: "100px" }}>Accessory</th>
        <th className="text-center" style={{ width: "60px" }}>Copy</th>
        <th className="text-center" style={{ width: "80px" }}>Item#</th>
        <th className="text-center" style={{ width: "200px" }}>ACC-NO</th>
        <th className="text-center" style={{ width: "100px" }}>COLOR</th>
        <th className="text-center" style={{ width: "100px" }}>Qty</th>
        <th >Width(inch)</th>

        <th colSpan="2">Height(inch)</th>

        <th colSpan="2">Depth</th>


        <th  colSpan="2" className="text-center">Price</th>
      </tr>
    </thead>
  );
}
export default AccTableHead;

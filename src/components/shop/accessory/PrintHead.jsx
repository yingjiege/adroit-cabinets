import React, {useState, useEffect } from "react";

function isEmpty(value) {
  return value === ''; // Modify this condition based on your definition of an empty value
}

function PrintHead({ select }) {

  return (
    <thead className="print-table-head">
      <tr>
        <th className="text-center">Item#</th>
        <th className="text-center" >Accessory Size</th>
        <th className="text-center" colSpan="4">Accessory Color</th>
        <th className="text-center">Qty</th>
        <th className="text-center">Width(inch)</th>
        <th className="text-center">Height(inch)</th>
        <th className="text-center">Depth</th>
        <th colSpan="3"className="text-center">Price</th>
      </tr>
    </thead>
  );
}
export default PrintHead;

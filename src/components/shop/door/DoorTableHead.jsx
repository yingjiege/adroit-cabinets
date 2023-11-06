import React from "react";

function TableHead() {
  return (
    <thead className="table-success">
      <tr>
        <th className="text-center">Door</th>
        <th className="text-center">Copy</th>
        <th className="text-center">Item#</th>
        <th className="text-center">Panel Finish</th>
        <th className="text-center">Panel ID</th>
        <th className="text-center">Qty</th>
        <th className="text-center">Width(inch)</th>
        <th className="text-center">Height(inch)</th>
        <th className="text-center">Hinge Hole</th>
        <th className="text-center">Match grain</th>
        <th className="text-center">Miter cut</th>
        <th className="text-center">Price</th>
        <th className="text-center">Subtotal</th>
      </tr>
    </thead>
  );
}
export default TableHead;

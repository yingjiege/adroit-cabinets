import React from "react";
import cabinetDoor from "../cabinetDoor";
import customer from "../CabinetDiscount";


function AccTableHead({item}) {

  return (
    <thead className="table-success">
      <tr>
      <th className="text-center"> Accessory</th>
      </tr>
      <tr>
        <th className="text-center"> </th>
        <th className="text-center"></th>
        <th className="text-center">Item#</th>
        <th className="text-center">Cabinet Size</th>
        <th className="text-center">Door Color</th>
        <th className="text-center">Qty</th>
        <th className="text-center">Width(inch)</th>
        <th className="text-center">Height(inch)</th>
        <th className="text-center">Depth</th>
        <th  colSpan="2" className="text-center">Price</th>
      </tr>
    </thead>
  );
}
export default AccTableHead;

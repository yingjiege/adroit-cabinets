import React from "react";

function TableFooter(props) {
  const items = props.items;
  const accessories = props.acc;
  let testTotal = 0;
  let totalQty = 0;
  for (let row in items) {
    testTotal += Number(items[row].price);
    totalQty += Number(items[row].qty);
  }
  for (let row in accessories) {
    testTotal += Number(accessories[row].accPrice);
    totalQty += Number(accessories[row].accQty);
  }
  
   testTotal = +(Math.round(testTotal + "e+2") + "e-2");

  return (
    <tfoot>
      <tr>
      <td colSpan="6" align="right">
        </td>
        <td align="center">total items {totalQty}</td>
        <td colSpan="15" align="right">
        ${testTotal}
        </td>
      </tr>
    </tfoot>
  );
}

export default TableFooter;

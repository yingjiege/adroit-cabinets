import React from "react";

function TableFooter(props) {
  const items = props.items;
  let testTotal = 0;
  let totalQty = 0;
  for (let row in items) {
    testTotal += Number(items[row].price);
    totalQty += Number(items[row].qty);
  }
  
   testTotal = +(Math.round(testTotal + "e+2") + "e-2");

  return (
    <tfoot>
      <tr>
      <td colSpan="6" align="right">
          total items
        </td>
        <td>{totalQty}</td>
        <td colSpan="4" align="right">
        ${testTotal}
        </td>
      </tr>
    </tfoot>
  );
}

export default TableFooter;

import React from "react";

function PrintFooter(props) {
  const items = props.items;
  const IsFreight = props.IsFreight;

  let testTotal = 0;
  let totalQty = 0;
  let packagingFee = 0;
  for (let row in items) {
    testTotal += Number(items[row].subtotal);
    totalQty += Number(items[row].qty);
    packagingFee += Number(
      items[row].width * items[row].height * items[row].qty
    );
  }
  packagingFee = +(Math.round(packagingFee / 144 + "e+2") + "e-2");

  testTotal = +(Math.round(testTotal + "e+2") + "e-2");
  if (IsFreight === true) {
    testTotal = +(Math.round(testTotal + packagingFee + "e+2") + "e-2");
  }

  return (
    <tfoot className="print-footer">
      <tr>
        <td colSpan="7" align="right">
          total items
        </td>
        <td>{totalQty}</td>
        {IsFreight && <td>Packaging Fee {packagingFee}</td>}
        <td colSpan="3" align="right">
          ${testTotal}
        </td>
      </tr>
    </tfoot>
  );
}

export default PrintFooter;

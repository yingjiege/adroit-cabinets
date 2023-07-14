import React, { Fragment} from "react";

function PrintAcc({ item, ItemNum}) {
  return (
    <Fragment>
      <tr className="ReadOnly">
        <td>{ItemNum + 1}</td>
        <td >{item.acc}</td>
        <td colSpan={4}>{item.accColor}</td>
        <td align="center">{item.accQty}</td>
        <td align="center">{item.accWidth}</td>
        <td align="center">{item.accHeight}</td>
        <td align="center">{item.accDepth}</td>
        <td align="right" >{item.accPrice}</td>

      </tr>
    </Fragment>
  );
}

export default PrintAcc;
import React, { Fragment } from "react";

function ReadOnly({ item, ItemNum}) {
  return (
    <Fragment>
    <tr className="ReadOnly">
      <td>{ItemNum + 1}</td>
      <td>{item.cabinetSize}</td>
      <td>{item.doorType}</td>
      <td>{item.doorColor}</td>
      <td align= "center">{item.width}</td>
      <td align= "center">{item.height}</td>
      <td align= "center">{item.depth}</td>
      <td align= "center">{item.hinge}</td>
      <td align= "center">{item.qty}</td>
      <td align= "center">{item.price}</td>
      <td align= "center">{item.DO}</td>
      <td align= "center">{item.BO}</td>
    </tr>
    </Fragment>
  );
}
export default ReadOnly;

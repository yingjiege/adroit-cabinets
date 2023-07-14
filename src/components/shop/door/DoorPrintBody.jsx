import React, { Fragment } from "react";

function ReadOnly({ item, ItemNum}) {
  let height = item.height;
  let description = item.panelFinish;
  if (item.hingeHole === true){
      if (height < 38.875) {
        description += " 'Hinge-2H' ";
      } else if (height < 64.375) {
        description += " 'Hinge-3H' ";
      } else if (height < 79.375) {
        description += " 'Hinge-4H' ";
      } else if (height < 96) {
        description += " 'Hinge-5H' ";
      }
  }
  if (item.matchGrain === true){
    description = description + " 'Match Grain ' ";
  }
  if(item.miterCut !== "None"){
  description = description + " '" +  item.miterCut+"'";
  }
  let discount = 0;
  discount = +(Math.round((item.subtotal - item.price * item.qty) + "e+2") + "e-2") ;

  return (
    <Fragment>
    <tr className="ReadOnly">
      <td>{ItemNum + 1}</td>
      <td>{item.panelId}</td>
      <td>{description}</td>
      <td></td>
      <td>{item.height}</td>
      <td>{item.width}</td>
      <td></td>
      <td align= "center">{item.qty}</td>
      <td>{item.price}</td>
      <td>{discount}</td>
      <td>{item.subtotal}</td>
      <td></td>
      <td></td>
    </tr>
    </Fragment>
  );
}
export default ReadOnly;

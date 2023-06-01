import React, { Fragment, useState, useEffect } from "react";

function PrintTable({ item, ItemNum }) {
  function isEmpty(value) {
    if(value === "")
    {
      return true;
    }
    else{
      return false;
    } // Modify this condition based on your definition of an empty value
  }
  const [ifFinLOrR, setIfFinLOrR] = useState(true);
  const [ifDoorH, setIfDoorH] = useState(true);
  const [ifPcTopDoor, setIfPcTopDoor] = useState(true);
  const [ifPcDoor, setIfPcDoor] = useState(true);
  const [ifBotDF, setIfBotDF] = useState(true);
  const [ifNotchOut, setIfNotchOut] = useState(true);

  useEffect(() => {
    setIfFinLOrR(!isEmpty(item.finLOrR));
    setIfDoorH(!isEmpty(item.doorH));
    setIfPcTopDoor(!isEmpty(item.pcTopDoor));
    setIfPcDoor(!isEmpty(item.pcDoor));
    setIfBotDF(!isEmpty(item.botDF));
    setIfNotchOut(!isEmpty(item.notchOut));
  }, [item]);

  return (
    <Fragment>
      <tr className="ReadOnly">
        <td>{ItemNum + 1}</td>
        <td >{item.cabinetSize}</td>
        <td colSpan={4}>{item.doorColor}</td>
        <td align="center">{item.qty}</td>
        <td align="center">{item.width}</td>
        <td align="center">{item.height}</td>
        <td align="center">{item.depth}</td>
        <td align="center">{item.hinge}</td>
        <td align="center" hidden = {!ifFinLOrR}>{item.finLOrR}</td>
        <td align="center" hidden = {ifFinLOrR}></td>
        <td align="center" hidden = {!ifDoorH}>{item.doorH}</td>
        <td align="center" hidden = {ifDoorH}></td>
        <td align="center" hidden = {!ifPcTopDoor}>{item.pcTopDoor}</td>
        <td align="center" hidden = {ifPcTopDoor}></td>
        <td align="center" hidden = {!ifPcDoor}>{item.pcDoor}</td>
        <td align="center" hidden = {ifPcDoor}></td>
        <td align="center" hidden = {!ifBotDF}>{item.botDF}</td>
        <td align="center" hidden = {ifBotDF}></td>
        <td align="center" hidden = {!ifNotchOut}>{item.notchOut}</td>
        <td align="center" hidden = {ifNotchOut}></td>
        <td align="center" colSpan={2}>{item.customizeAddOn}</td>
        <td align="center" >{item.memo}</td>
        <td align="center" >{item.price}</td>

      </tr>
    </Fragment>
  );
}

export default PrintTable;

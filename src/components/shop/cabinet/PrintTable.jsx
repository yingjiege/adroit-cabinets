import React, { Fragment, useState, useEffect } from "react";

function isEmpty(value) {
  return value === ''; // Modify this condition based on your definition of an empty value
}

function ExampleComponent(data) {
  if (!data || data.length === 0) {
    return false; // Return false if data is undefined or empty
  }

  const allValuesEmpty = data.every(item => isEmpty(item.finLOrR));
  return allValuesEmpty;
}

function PrintTable({ item, ItemNum }) {
  const [ifFinLOrR, setIfFinLOrR] = useState(true);
  const [ifDoorH, setIfDoorH] = useState(true);
  const [ifPcTopDoor, setIfPcTopDoor] = useState(true);
  const [ifPcDoor,setIfPcDoor] = useState(true);
  const [ifBotDF, setIfBotDF] = useState(true);
  const [ifNotchOut, setIfNotchOut] = useState(true);


  useEffect(() => {
    
    if (ExampleComponent(item.finLOrR) === false) {
      setIfFinLOrR(false);
    }
    if(ExampleComponent(item.doorH) === false){
      setIfDoorH(false);
    }
    if (ExampleComponent(item.pcTopDoor) === false) {
      setIfPcTopDoor(false);
    }
    if(ExampleComponent(item.pcDoor) === false){
      setIfPcDoor(false);
    }
    if (ExampleComponent(item.botDF) === false) {
      setIfBotDF(false);
    }
    if(ExampleComponent(item.notchOut) === false){
      setIfNotchOut(false);
    }
  }, [item.finLOrR, item.doorH,item.pcTopDoor, item.pcDoor,item.botDF, item.notchOut]);

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
        <td align="center" hidden = {!ifFinLOrR}>{item.finLorR}</td>
        <td align="center" hidden = {!ifDoorH}>{item.doorH}</td>
        <td align="center" hidden = {!ifPcTopDoor}>{item.pcTopDoor}</td>
        <td align="center" hidden = {!ifPcDoor}>{item.pcDoor}</td>
        <td align="center" hidden = {!ifBotDF}>{item.botDF}</td>
        <td align="center" hidden = {!ifNotchOut}>{item.notchOut}</td>
        <td align="center" colSpan={2}>{item.customizeAddOn}</td>
        <td align="center" >{item.memo}</td>
        <td align="center" colSpan={2}>{item.price}</td>

      </tr>
    </Fragment>
  );
}

export default PrintTable;

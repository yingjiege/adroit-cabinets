import React, { useState, useEffect } from "react";

function PrintHead({ item, select, info }) {
  function isEmpty(value) {
    if (value === "") {
      return true;
    } else {
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
    for (let i in item) {
      if (!isEmpty(item[i].finLOrR)) {
        setIfFinLOrR(false);
      }
      if (!isEmpty(item[i].doorH)) {
        setIfDoorH(false);
      }
      if (!isEmpty(item[i].pcTopDoor)) { 
        setIfPcTopDoor(false);
      }
      if (!isEmpty(item[i].pcDoor)) {
        setIfPcDoor(false);
      }
      if (!isEmpty(item[i].botDF)) {
        setIfBotDF(false);
      }
      if (!isEmpty(item[i].notchOut)) {
        setIfNotchOut(false);
      }
    }
  }, [item]);
  return (
    <thead className="print-table-head">
      <tr>
            <th colSpan={3} rowSpan={3}>
            <img
                src="https://adroitmanufacturing.allmoxy.com/data/header/Adroit_logo_3d-01-01.png"
                alt="adroit-manufacturing-logo"
                width={120}
                height={50}
              />
            </th>
            <th colSpan={3}>
              Adroit
            </th>
            <th className="listhead needBorder">CUSTERMER:</th>
            <th className="listhead needBorder" colSpan={2}>{select.company}</th>
            <th className="listhead needBorder"colSpan={2}>PO#:</th>
            <th className="listhead needBorder" colSpan={5}>{select.PO}</th>
            <th className="listhead needBorder"colSpan={3}>BILLING TO:</th>
            <th className="listhead needBorder"colSpan={3}>MEMO:</th>
          </tr>
          <tr>
            <th colSpan={3}>Adroit LOGISTICS</th>
            <th className="needBorder">CABINET BOX:</th>
            <th className="needBorder" colSpan={2}>{select.cabinetBox}</th>
            <th className="needBorder" colSpan={2}>HINGE:</th>
            <th className="needBorder" colSpan={5}>{select.hingeType}</th>
            <th colSpan={3} rowSpan={5} className="needBorder">{info.billing}</th>
            <th colSpan={3} rowSpan={5} className="needBorder">{info.memo}</th>
          </tr>
          <tr>
            <th colSpan={3}>859 39th St</th>
            <th className="needBorder">A DOOR COLOR:</th>
            <th className="needBorder" colSpan={2}>{select.ADoorColor}</th>
            <th className="needBorder" colSpan={2}>SLIDE:</th>
            <th className="needBorder" colSpan={5}>{select.slide}</th>
          </tr>
          <tr>
          <th colSpan={3}>www.adroitmanufactory.com</th>
            <th colSpan={3}>BROOKLYN</th>
            <th className="needBorder">B DOOR COLOR:</th>
            <th className="needBorder" colSpan={2}>{select.BDoorColor}</th>
            <th className="needBorder" colSpan={2}>DRAWER BOX:</th>
            <th className="needBorder" colSpan={5}>{select.drawer}</th>
          </tr>
          <tr>
          <th colSpan={3}>customer.service@adroit.com</th>
            <th colSpan={3}>Tel.(718)431-0089</th>
            <th className="needBorder">C DOOR COLOR:</th>
            <th className="needBorder" colSpan={2}>{select.CDoorColor}</th>
            <th className="needBorder" colSpan={2}>CABINET LEG:</th>
            <th className="needBorder" colSpan={5}>{select.cabinetLeg}</th>
          </tr>
          <tr>
          <th colSpan={3} rowSpan={2}>com.: 517 LUIS VAZQUEZ</th>
            <th colSpan={3}>Fax.(718)431-0060</th>
            <th className="needBorder">SP ORDER LEAD TIME:</th>
            <th colSpan={2}> </th>
            <th className="needBorder" colSpan={2}>Assemble Time (Min): </th>
            <th className="needBorder" colSpan={5}></th>
          </tr>
          <tr>
            <th colSpan={3}>-- Operation insured by MAPFRE</th>
            <th className="needBorder">Bulks</th>
            <th className="needBorder">9407</th>
            <th colSpan={1} className="needBorder">Tel:+11234567890</th>
          </tr>
      <tr>
        <th className="text-center">Item#</th>
        <th className="text-center" >Cabinet Size</th>
        <th className="text-center" colSpan="4">Door Color</th>
        <th className="text-center">Qty</th>
        <th className="text-center">Width(inch)</th>
        <th className="text-center">Height(inch)</th>
        <th className="text-center">Depth</th>
        <th className="text-center">Hinge L/R</th>
        <th className="text-center" hidden = {ifFinLOrR}>Finish L/R</th>
        <th align="center" hidden = {!ifFinLOrR}></th>
        <th className="text-center" hidden = {ifDoorH}>DOOR H</th>
        <th align="center" hidden = {!ifDoorH}></th>
        <th className="text-center" hidden = {ifPcTopDoor}>PC TOP DOOR</th>
        <th align="center" hidden = {!ifPcTopDoor}></th>
        <th className="text-center" hidden = {ifPcDoor}>BC DOOR</th>
        <th align="center" hidden = {!ifPcDoor}></th>
        <th className="text-center" hidden = {ifBotDF}>BOT DF</th>
        <th align="center" hidden = {!ifBotDF}></th>
        <th className="text-center" hidden = {ifNotchOut}>NOTCH OUT</th>
        <th align="center" hidden = {!ifNotchOut}></th>
        <th colSpan="2" className="text-center" >CUSTOMIZE ADD ON</th>
        <th  className="text-center" >MEMO</th>
        <th colSpan="3"className="text-center">Price</th>

      </tr>
    </thead>
  );
}
export default PrintHead;

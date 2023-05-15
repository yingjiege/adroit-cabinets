import React, { Fragment, useState, useRef } from "react";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import { nanoid } from "nanoid";
import cabinet from "../cabinet";
import cabinetDoor from "../cabinetDoor";
import PrintHead from "./PrintHead"
import PrintTable from "./PrintTable"
import PrintFooter from "./PrintFooter"
import { useReactToPrint } from "react-to-print";
import TableFooter from "./TableFooter";

function CreateArea({info}) {
  const [select, setSelect] = useState({
    customer: "",
    PO: "",
    cabinetBox: "",
    hingeType: "",
    ADoorColor: "",
    BDoorColor: "",
    CDoorColor: "",
    slide: "",
    drawer: "",
    cabinetLeg: "",
  });

  const [items, setItems] = useState([
    {
        id:0,
        cabinetSize: "",
        doorType: "",
        doorColor: "",
        qty: 0,
        width: 0,
        height: 0,
        depth: 0,
        hinge: "",
        finLOrR:"",
        doorH:"",
        pcTopDoor:"",
        pcDoor:"",
        botDF:"",
        notchOut:"",
        customizeAddOn:"",
        memo:"",
        price: 0,
        BO: 0,
        DO: 0
  }])

  const getCabinetById = (id) => {
    return cabinet.find(cab => cab.ID === id);
  }
  const getColor = (color) => {
    return cabinetDoor.find(cab =>cab.color === color);
  }
  function updateRow(event){
    const fieldName = event.target.getAttribute("name");
    let fieldValue = event.target.value;

    setSelect(prevState => ({
      ...prevState,
      [fieldName]: fieldValue
    }));
  }    

  function updateItem(event, itemId, item, select) {
    const fieldName = event.target.getAttribute("name");
    let fieldValue = event.target.value;
    const newData = { ...item };
  
    if (fieldName === "cabinetSize") {
      const cabinetInfo = getCabinetById(fieldValue);
      newData["cabinetSize"] = fieldValue;
      newData["width"] = cabinetInfo.W;
      newData["height"] = cabinetInfo.H;
      newData["depth"] = cabinetInfo.D;
    } else if (fieldName === "doorColor") {
      if (fieldValue) {
        const doorColorGet = getColor(fieldValue);
        if (doorColorGet) {
          newData["doorColor"] = fieldValue;
          newData["doorType"] = doorColorGet.category;
        }
      } else {
        newData["doorColor"] = "";
        newData["doorType"] = "";
      }
    } else {
      newData[fieldName] = fieldValue;
    }
  
    const newCabinetInfo = getCabinetById(newData.cabinetSize);
    const newDoorColor = getColor(newData.doorColor);
    if (newCabinetInfo && newDoorColor) {
      newData["DO"] = newCabinetInfo[newDoorColor.category];
      newData["BO"] = newCabinetInfo[select.cabinetBox];
      if (newData.qty !== 0) {
        newData["price"] = newData.qty * (parseFloat(newData["DO"]) + parseFloat(newData["BO"]));
      }
    }
  

    const editedItem = {
      id: itemId,
      cabinetSize: newData.cabinetSize,
        doorType: newData.doorType,
        doorColor: newData.doorColor,
        qty: newData.qty,
        width: newData.width,
        height: newData.height,
        depth: newData.depth,
        hinge: newData.hinge,
        finLOrR:newData.finLOrR,
        doorH:newData.doorH,
        pcTopDoor:newData.pcTopDoor,
        pcDoor:newData.pcDoor,
        botDF:newData.botDF,
        notchOut:newData.notchOut,
        customizeAddOn:newData.customizeAddOn,
        memo:newData.memo,
        price: newData.price,
        BO: newData.BO,
        DO: newData.DO,
    };
    const newItems = [...items];
    const index = items.findIndex((item) => item.id === itemId);
    newItems[index] = editedItem;
    setItems(newItems);
  }

  function copyRow(itemId) {
    const newItems = [...items];
    const index = items.findIndex((item) => item.id === itemId);
    const copyItem = newItems[index];
    const tempItem = {
      id: 0,
      cabinetSize: copyItem.cabinetSize,
        doorType: copyItem.doorType,
        doorColor: copyItem.doorColor,
        qty: copyItem.qty,
        width: copyItem.width,
        height: copyItem.height,
        depth: copyItem.depth,
        hinge: copyItem.hinge,
        finLOrR:copyItem.finLOrR,
        doorH:copyItem.doorH,
        pcTopDoor:copyItem.pcTopDoor,
        pcDoor:copyItem.pcDoor,
        botDF:copyItem.botDF,
        notchOut:copyItem.notchOut,
        customizeAddOn:copyItem.customizeAddOn,
        memo:copyItem.memo,
        price: copyItem.price,
        BO: copyItem.BO,
        DO: copyItem.DO,
    };
    tempItem.id = nanoid();
    newItems.splice(index, 0, tempItem);
    setItems(newItems);
  }

  function deleteRow(itemId) {
    const newItems = [...items];
    const index = items.findIndex((item) => item.id === itemId);
    newItems.splice(index, 1);
    setItems(newItems);
  }

  function addRow(n) {
    const newItems = [];
    for (let i = 0; i < n; i++) {
      const newItem = {
        cabinetSize: "",
        doorType: "",
        doorColor: "",
        qty: NaN,
        width: NaN,
        height: NaN,
        depth: NaN,
        hinge: "",
        finLOrR:"",
        doorH:"",
        pcTopDoor:"",
        pcDoor:"",
        botDF:"",
        notchOut:"",
        customizeAddOn:"",
        memo:"",
        price: NaN,
        BO: NaN,
        DO: NaN,
        id: nanoid(),
      };
      newItems.push(newItem);
    }
    const newItemsAdd = [...items, ...newItems];
    setItems(newItemsAdd);
  }

  const componentPDF = useRef();
  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTile: "UserData",
  });  

  return (
    <Fragment>
      <table
        className="table table-hover table-sm table-responsive-sm"
        id="my-table"
      >
        <TableHead
          item={select}
          handleEditAllInOne={updateRow}
        />
        <tbody>
          {items.map((rowItem, index) => {
            return (
              <TableBody
                key={index}
                itemNum ={index}
                handleDeleteClick={deleteRow}
                handleCopyClick={copyRow}
                handleEdited = {updateItem}
                item = {rowItem}
                newItem={select}
              />
            );
          })}
        </tbody>
        <TableFooter items = {items} onAdd={addRow} printPDF={generatePDF}/>
      </table>
      <div hidden>
      <table
        id="PrintTable"
        className="table table-hover table-sm table-responsive-sm"
        ref={componentPDF}
      >
        <PrintHead item={select}
          handleEditAllInOne={updateRow}/>
        <tbody>
        {items.map((rowItem, index) => {
            return (
              <PrintTable
              key ={index}
              ItemNum={index}
              item={rowItem}
              />
              );
          })}
        </tbody>
        <PrintFooter items={items}/>
        </table>
      </div>
    </Fragment>
  );
}

export default CreateArea;

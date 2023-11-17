import React, { Fragment, useState, useRef, useEffect } from "react";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import { nanoid } from "nanoid";
import { useReactToPrint } from "react-to-print";
import TableFooter from "./TableFooter";
import * as XLSX from "xlsx/xlsx.js";
import Axios from "axios";
import Addon from '../../../addon.js';

function CreateCabinet({ items, setItems, select, setSelect }) {
  const addon = Addon;
  const [cabinet, setCabinet] = useState([]);
  const [cabinetDoor, setCabinetDoor] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [cabinetFinish, setCabinetFinish] = useState([]);
  const [inf, setInf] = useState({})
  const user_id = localStorage.getItem('user');

  useEffect(() => {
    Axios.get(
      "https://us-east-1.aws.data.mongodb-api.com/app/application-0-hxfdv/endpoint/cabinet"
    )
      .then((res) => {
        const searchedCabinet = res.data;
        setCabinet(searchedCabinet);
      })
      .catch((error) => {
        console.error(error);
      }); 
      Axios.get(`https://us-east-1.aws.data.mongodb-api.com/app/application-0-hxfdv/endpoint/get_customer_information?user_id=${user_id}`)
      .then((res) => {
        const searchedCabinet = res.data[0];
        setInf(searchedCabinet)
      })
      .catch((error) => {
        console.error(error);
      });

    Axios.get(
      "https://us-east-1.aws.data.mongodb-api.com/app/application-0-hxfdv/endpoint/cabinet_door"
    )
      .then((res) => {
        const searchedCabinet = res.data;
        setCabinetDoor(searchedCabinet);
      })
      .catch((error) => {
        console.error(error);
      });

    Axios.get(
      "https://us-east-1.aws.data.mongodb-api.com/app/application-0-hxfdv/endpoint/get_cabinet_customer"
    )
      .then((res) => {
        const searchedCabinet = res.data;
        setCustomer(searchedCabinet);
      })
      .catch((error) => {
        console.error(error);
      });

    Axios.get(
      "https://us-east-1.aws.data.mongodb-api.com/app/application-0-hxfdv/endpoint/get_cabinet_finish"
    )
      .then((res) => {
        const searchedCabinet = res.data;
        setCabinetFinish(searchedCabinet);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const getCabinetById = (id) => {
    return cabinet.find((cab) => cab.ID === id);
  };

  const getColor = (color) => {
    return cabinetDoor.find(cab =>cab.color === color);
  }
  const getAddOnDoor = (custom) => {
    return addon.find(cab => cab.AddOnDoor === custom);
  }
  const getAddOnHardware = (custom) => {
    return addon.find(cab => cab.AddOnHardware === custom);
  }

  const componentPDF = useRef();
  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTile: "UserData",
  });  
  function updateRow(event) {
      const fieldName = event.target.getAttribute("name");
      const fieldValue = event.target.value;
          // Update the price for each item based on the new select values
      const updatedItems = items.map((item) => {
      const updatedItem = { ...item };
      const newSelect = { ...select };
  
      setSelect((prevState) => ({
        ...prevState,
        [fieldName]: fieldValue,
      }));

      // Update the relevant select value
      newSelect[fieldName] = fieldValue;
  
      // Calculate the new price for the item
      updatedItem.price = calculation(updatedItem, newSelect);
  
      return updatedItem;
    });
    setItems(updatedItems);
  }
  function calculation(obj, select){
    const finLorR = obj.finLOrR;
    const notchOut = obj.notchOut;
    let price = 0;
    let finalPrice = 0;
    const DO = parseFloat(obj.DO);
    let BO = 0;
    const qty = parseFloat(obj.qty);
    const cabInfo = getCabinetById(obj.cabinetSize);
    const newDoorColor = getColor(obj.doorColor);
    const newCabinetInfo = getCabinetById(obj.cabinetSize);

    let customizeAddOn = getAddOnDoor(obj.customizeAddOn);
    if (!customizeAddOn) {
      customizeAddOn = getAddOnHardware(obj.customizeAddOn);
    }
    if (newCabinetInfo && newDoorColor) {
      BO = newCabinetInfo[select.cabinetBox];
    }
    const doorType = newDoorColor ? newDoorColor.category : "";        
    let doorCount = 0;
    let hingeNum = 0;
    let hingeType = select.hingeType;
    let drawer = select.drawer;
    let slide = select.slide;
    let slideNum = 0;
    let discount = 1 ;
    const Sindex = customer.findIndex((item) => item.Company.toUpperCase() === inf.companyName.toUpperCase());
    if(Sindex !== -1){
      discount = customer[Sindex].MULTIPIER.toFixed(2)
    }

    if (cabInfo) {
      doorCount = cabInfo.DOOR_COUNT;
      hingeNum = cabInfo.HINGE_COUNT;
      slideNum = cabInfo.SLIDE_COUNT;
      if(obj.width > cabInfo.W){
        finalPrice = NaN
      }
    }
    
    price =  DO + BO;
    price = +(Math.round(price + "e+2") + "e-2");

    if (doorType !== "" && cabInfo ){
      const cabinet_finish = cabinetFinish[0]
      const newFinish = cabinet_finish[doorType];
      if (finLorR === "R" || finLorR === "L"){
        price += cabInfo[newFinish];
      }
      else if(finLorR === "LR"){
        price += cabInfo[newFinish] * 2;
      }
    }
    if(notchOut === "GOLA"){
      price += 25;
    }
    else if(notchOut === "MITER DOOR"){
      price += 25;
      price += doorCount * 15;
    }

    if(hingeType === "BLUM"){
      price += hingeNum * 4;
    }

    if(slide === "BLUM UM SLIDE" ||slide === "SALICE UM SLIDE"){
      price += slideNum * 35;
    }

    if(drawer === "METAL DRAWER SLIM GREY"){
      price += slideNum *17;
    }
    else if (drawer === "PLYWOOD DRAWER"){
      price += slideNum *5;
    }
    else if(drawer === "DOVETAIL DRAWER"){
      price += slideNum *32;
    }

    if(customizeAddOn){
      if (customizeAddOn.AddOnDoor){
        price += customizeAddOn.Price * doorCount;
      }
      else if(customizeAddOn.AddOnHardware){
        price += customizeAddOn.Price;
      }
    }
    
    if(qty !==0){
      finalPrice = price * qty;
      finalPrice *= discount;
      finalPrice = +(Math.round(finalPrice + "e+2") + "e-2");
    }

    if(obj.width < 0 ){
      finalPrice = NaN
    }
    if(obj.qty < 0 ){
      finalPrice = NaN
    }
    

    return finalPrice;
  }

  function updateItem(event, itemId, item, select) {
    const fieldName = event.target.getAttribute("name");
    let fieldValue = event.target.value.toUpperCase();
    const newData = { ...item };
    const newSelect = { ...select };
  
    const Newindex = cabinetDoor.findIndex((item) => item.color === fieldValue);
    const Sindex = cabinet.findIndex((item) => item.ID === fieldValue);

    if (fieldName === "cabinetSize") {
      if (Sindex !== -1) {
        newData["width"] = cabinet[Sindex].W;
        newData["height"] = cabinet[Sindex].H;
        newData["depth"] = cabinet[Sindex].D;
        if (newData["height"] === 93) {
          newData["pcTopDoor"] = "39";
        }
        if (cabinet[Sindex].HARDWARE !== 0) {
          newData["customizeAddOn"] = cabinet[Sindex].HARDWARE;
        }
      }
    } else if (fieldName === "doorColor") {
      if (Newindex !== -1) {
        newData["doorType"] = cabinetDoor[Newindex].category;
      }
    }
    newData[fieldName] = fieldValue;
    const newCabinetInfo = getCabinetById(newData.cabinetSize);
    const newDoorColor = getColor(newData.doorColor);
    if (newCabinetInfo && newDoorColor) {
      newData["DO"] = newCabinetInfo[newDoorColor.category];
      newData["BO"] = newCabinetInfo[select.cabinetBox];
    }
    if (newCabinetInfo) {
      newData["price"] = calculation(newData, newSelect); 
      console.log(newData)
    } else {
      newData["price"] = NaN;
      newData["width"] = NaN;
      newData["height"] = NaN;
      newData["depth"] = NaN;
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
      finLOrR: newData.finLOrR,
      doorH: newData.doorH,
      pcTopDoor: newData.pcTopDoor,
      pcDoor: newData.pcDoor,
      botDF: newData.botDF,
      notchOut: newData.notchOut,
      customizeAddOn: newData.customizeAddOn,
      memo: newData.memo,
      price: newData.price,
      BO: newData.BO,
      DO: newData.DO,
      apt: newData.apt
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
        apt: copyItem.apt
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
        qty: 1,
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
        DO: 0,
        apt: "",
        id: nanoid(),
      };
      newItems.push(newItem);
    }
    const newItemsAdd = [...items, ...newItems];
    setItems(newItemsAdd);
  }

  function uploadCal(item, discount){
    const cabinetSize = item.cabinetSize;
    const doorColor = item.doorColor;
    const cabinetBox = item.cabinetBox;
    const qty = item.qty;
    // Handle the response from the MongoDB function 
    const newCabinetInfo = getCabinetById(cabinetSize);
    const newDoorColor = getColor(doorColor);
    const doorType = newDoorColor.category;
    const width = newCabinetInfo.W;
    const height = newCabinetInfo.H;
    const depth = newCabinetInfo.D;
    const DO = newCabinetInfo[newDoorColor.category];
    const BO = newCabinetInfo[cabinetBox] ;
    const doorCount = newCabinetInfo.DOOR_COUNT;
    const hingeNum = newCabinetInfo.HINGE_COUNT;
    const hingeType = item.hingeType;
    const drawer = item.drawer;
    const slide = item.slide;
    const slideNum = newCabinetInfo.SLIDE_COUNT;
    const notchOut = item.notchOut;
    const finLOrR = item.finLOrR;
    const newFinish = cabinetFinish[doorType];
    let finalPrice = 0;
    let price = parseFloat(DO + BO);
    let newDiscount =parseFloat(discount) ;
    if(newDiscount !== 0 && newDiscount){
      price = price * (newDiscount / 100).toFixed(2);
    }
    let customizeAddOn = item.customizeAddOn;

        if(customizeAddOn !== undefined){
          customizeAddOn = getAddOnDoor(customizeAddOn);
          if (!customizeAddOn) {
          customizeAddOn = getAddOnHardware(item.customizeAddOn);
          }
        }
        
        if(customizeAddOn){
          if (customizeAddOn.AddOnDoor){
            price += customizeAddOn.Price * doorCount;
          }
          else if(customizeAddOn.AddOnHardware){
            price += customizeAddOn.Price;
          }
        }

      if (finLOrR === "R" || finLOrR === "L"){
        price += newCabinetInfo[newFinish];
      }
      else if(finLOrR === "LR"){
        price += newCabinetInfo[newFinish] * 2;
      }
      if(notchOut === "GOLA"){
        price += 25;
      }
      else if(notchOut === "MITER DOOR"){
        price += 25;
        price += doorCount * 15;
      }
  
      if(hingeType === "BLUM"){
        price += hingeNum * 4;
      }
  
      if(slide === "BLUM UM SLIDE" ||slide === "SALICE UM SLIDE"){
        price += slideNum * 35;
      }
  
      if(drawer === "METAL DRAWER SLIM GREY"){
        price += slideNum *17;
      }
      else if (drawer === "PLYWOOD DRAWER"){
        price += slideNum *5;
      }
      else if(drawer === "DOVETAIL DRAWER"){
        price += slideNum *32;
      }

      if(qty !==0){
        finalPrice = price * qty;
        finalPrice = +(Math.round(finalPrice + "e+2") + "e-2");
      }
    return [width, height, depth, finalPrice, doorType,DO,BO];
  }

const handleFileUpload = (e) => {
  const file = e.target.files[0];

  // Check if the file is an Excel file. If not, return alert.
  if (
    !file ||
    (!file.name.endsWith(".xlsx") && !file.name.endsWith(".csv")) ||
    !file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  ) {
    alert("Please select an Excel file (XLSX)");
    return;
  }

  // Read the file name
  const reader = new FileReader();
  reader.readAsBinaryString(file);

  // Load the file data
  reader.onload = (e) => {
    // Get the file
    const items = e.target.result;
    // Read the file
    const workbook = XLSX.read(items, { type: "binary" });
    // Read the first sheet only and get the sheet name
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    // Create the new variable to store the data from the sheet
    let parsedData = XLSX.utils.sheet_to_json(sheet);  
    if (parsedData.length >=1 ){
      if(parsedData[0].cabinetSize === ""){
        return;
      }
    }
    else{
      return;
    }

    let newItem = {
      cabinetSize: parsedData[0].cabinetSize,
      company: parsedData[0].company || "",
      PO: parsedData[0].PO || "",
      cabinetBox: parsedData[0].cabinetBox || "",
      hingeType: parsedData[0].hingeType || "",
      ADoorColor: parsedData[0].ADoorColor || "",
      BDoorColor: parsedData[0].BDoorColor || "",
      CDoorColor: parsedData[0].CDoorColor || "",
      slide: parsedData[0].slide || "",
      drawer: parsedData[0].drawer || "",
      cabinetLeg: parsedData[0].cabinetLeg || "None",
      discount: parsedData[0].discount || 100,
    };
  setSelect(newItem);  

    // Create a new array to store the objects in the data
    let newArray = [];

    for (let row in parsedData) {
      if(!parsedData[row].acc ){
        let newItem = {
          cabinetSize: parsedData[row].cabinetSize || "",
          doorType: parsedData[row].doorType || "",
          doorColor: parsedData[row].doorColor || "",
          qty: parsedData[row].qty || NaN,
          width: parsedData[row].width || NaN,
          height: parsedData[row].height || NaN,
          depth: parsedData[row].depth || NaN,
          hinge: parsedData[row].hinge || "",
          finLOrR: parsedData[row].finLOrR || "",
          doorH: parsedData[row].doorH || "",
          pcTopDoor: parsedData[row].pcTopDoor || "",
          pcDoor: parsedData[row].pcDoor || "",
          botDF: parsedData[row].botDF || "",
          notchOut: parsedData[row].notchOut || "",
          customizeAddOn: parsedData[row].customizeAddOn || "",
          memo: parsedData[row].memo || "",
          price: NaN,
          BO: NaN,
          DO: NaN,
          apt: parsedData[row].apt || "",
          id: nanoid()
        };
  
        const priceArr = uploadCal(parsedData[row], parsedData[0].discount);
        const widthField = "width";
        const heightField = "height";
        const depthField = "depth";
        const priceField = "price";
        const idField = "id";
        const doorTypeField = "doorType";
        const DOField = "DO";
        const BOField = "BO";
  
        // Re-Calculate the price and subtotal of the object, Re-set the id for the object
        newItem[widthField] = priceArr[0];
        newItem[heightField] = priceArr[1];
        newItem[depthField] = priceArr[2];
        newItem[priceField] = priceArr[3];
        newItem[doorTypeField] = priceArr[4];
        newItem[DOField] = priceArr[5];
        newItem[BOField]= priceArr[6];
        newItem[idField] = Number(row) + 1;
  
        // According to the Panel ID, Re-set the empty part of Panel Finish
  
        // Push the object into the array
        newArray.push(newItem);
      }      
    }
    // Set the new Array into the items
    setItems(newArray);
    }    
  };

  function updateTwo(event, item) {
    const newData = { ...item };
    const fieldName = event.target.getAttribute("name");
    let fieldValue = event.target.value;
    newData[fieldName] = fieldValue;
    setSelect(newData);
  
    // Update the price for each item based on the new select values
    const updatedItems = items.map((item1) => {
      const updatedItem = { ...item1 };
      const newSelect = { ...newData }; // Use the updated select values from newData
  
      // Calculate the new price for the item
      updatedItem.price = calculation(updatedItem, newSelect);
  
      return updatedItem;
    });
  
    setItems(updatedItems);
  }

  return (
    <Fragment>
      <div className="table-responsive">
      <table
        className="table table-hover table-sm table-responsive-sm"
        id="my-table"
      >
        <TableHead
          item={select}
          handleEditAllInOne={updateRow}
          handleUpdateTwo = {updateTwo}
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
        <TableFooter items = {items} newItem = {select} onAdd={addRow} printPDF={generatePDF}/>
      </table>
      </div>
      {/* <div hidden>
      <table
        id="PrintTable"
        className="table table-hover table-sm table-responsive-sm"
        ref={componentPDF}
      >
      <PrintHead 
        item = {items}
        select = {select}
        info = {info}
      />
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
        <PrintFooter items={items} />
        </table>
      </div> */}
      {/* <input
        type="file"
        accept=".xlsx, .xls, .csv"
        className="form-control bg-light rounded-pill"
        onChange={handleFileUpload}
      /> */}
    </Fragment>
  );
}

export default CreateCabinet;

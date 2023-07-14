import React, { Fragment, useState, useRef } from "react";
import { nanoid } from "nanoid";
import { useReactToPrint } from "react-to-print";
import panelFinishList from "../../../panelFinish.js";
import * as XLSX from "xlsx/xlsx.js";
import TableHead from "./DoorTableHead";
import TableFooter from "./DoorTableFooter";
import PrintHead from "./DoorPrintHead";
import PrintFooter from "./DoorPrintFooter";
import ReadOnly from "./DoorPrintBody";
import NewTableBody from "./DoorTableBody";

function CreateArea({ info, items, setItems }) {
  //Create the main array contains objects that user create or default object
  const [IsFreight, setIsFreight] = useState(false);
  //Read the files and import the data into Items
  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    // Check if the file is an Excel file. If not, return alert.
    if (
      !file ||
      (!file.name.endsWith(".xlsx") && !file.name.endsWith(".csv")) ||
      !file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      alert("Please select an Excel file (XLSX)");
      return;
    }
    //Read the file name
    const reader = new FileReader();
    reader.readAsBinaryString(file);

    //Load the file data
    reader.onload = (e) => {
      //Get the file
      const items = e.target.result;
      //Read the file
      const workbook = XLSX.read(items, { type: "binary" });
      //Read the first sheet only and get the sheet name
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      //Create the new variable to store the data from the sheet
      let parsedData = XLSX.utils.sheet_to_json(sheet);

      //Create a new array to store the objects in the data
      let newArray = [];

      for (let row in parsedData) {
        //Create a new object to store data from the file
        let newItem = {
          panelFinish: "",
          panelId: "",
          qty: NaN,
          width: NaN,
          height: NaN,
          hingeHole: false,
          matchGrain: false,
          miterCut: "None",
          price: NaN,
          subtotal: NaN,
          id: nanoid(),
        };

        const priceArr = mycal(panelFinishList, parsedData[row]);
        const priceField = "price";
        const sutotalField = "subtotal";
        const idField = "id";

        //Input all the edited data from the file into the new object
        Object.keys(newItem).forEach(function(key) {
          newItem[key] = parsedData[row][key];
        });

        //Check if the T/F state is string, then change the datatype from string into boolean
        if (parsedData[row]["hingeHole"] === "false") {
          newItem.hingeHole = false;
        } else if (parsedData[row]["hingeHole"] === "true") {
          newItem.hingeHole = true;
        }
        if (parsedData[row]["matchGrain"] === "false") {
          newItem.matchGrain = false;
        } else if (parsedData[row]["matchGrain"] === "true") {
          newItem.matchGrain = true;
        }

        //Re-Calculate the price and subtotal of the object, Re-set the id for the object
        newItem[priceField] = priceArr[0];
        newItem[sutotalField] = priceArr[1];
        newItem[idField] = Number(row) + 1;

        //According to the Panel ID, Re-set the empty part of Panel Finish
        setPanelFinish(newItem);

        //Push the object into the array
        newArray.push(newItem);
      }

      //Set the new Array into the items
      setItems(newArray);
    };
  };

  //The function matches the panel finish according to the panel ID
  const setPanelFinish = (newItem) => {
    if (isNaN(newItem.panelFinish) && newItem.panelId) {
      const matchingFinish = panelFinishList.find(
        (finish) => finish.id === newItem.panelId
      );
      if (matchingFinish) {
        newItem.panelFinish = matchingFinish.label;
      }
    }
  };

  function mycal(PL, obj) {
    const height = Number(obj.height);
    const width = Number(obj.width);
    const qty = Number(obj.qty);
    let panel_value = 0;
    let unit_price = 0;
    let discount = 1;
    let grain = "";
    const Sindex = PL.findIndex(
      (pitem) => pitem.label === obj.panelFinish || pitem.id === obj.panelId
    );
    if (Sindex !== -1) {
      panel_value = Number(PL[Sindex].value);
      grain = PL[Sindex].grain;
    }

    if (obj.hingeHole) {
      if (height < 38.875) {
        unit_price += 2;
      } else if (height < 64.375) {
        unit_price += 3;
      } else if (height < 79.375) {
        unit_price += 4;
      } else if (height <= 96) {
        unit_price += 5;
      }
    }

    if (obj.miterCut !== "None") unit_price += 15;

    if (grain === "Y") {
      if (obj.matchGrain) unit_price += 15;
    }
    let sizeOfDoor = (width * height) / 144;
    if (sizeOfDoor <= 1.5) sizeOfDoor = 1.5;

    unit_price += panel_value * sizeOfDoor;
    unit_price = +(Math.round(unit_price + "e+2") + "e-2");
    let subtotal = qty * unit_price;
    subtotal = +(Math.round(subtotal + "e+2") + "e-2");
    if (sizeOfDoor > 3.0 && sizeOfDoor <= 6.0) {
      discount = 0.9;
    } else if (sizeOfDoor > 6.0 && sizeOfDoor <= 9.0) {
      discount = 0.85;
    } else if (sizeOfDoor > 9.0 && sizeOfDoor <= 13.0) {
      discount = 0.8;
    } else if (sizeOfDoor > 13.0 && sizeOfDoor <= 30.0) {
      discount = 0.75;
    }
    if (width <= 0 || width > 48) {
      unit_price = NaN;
      subtotal = NaN;
    }
    if (height <= 0 || height > 965) {
      unit_price = NaN;
      subtotal = NaN;
    }
    if (qty <= 0) {
      unit_price = NaN;
      subtotal = NaN;
    }
    subtotal *= discount;
    subtotal = +(Math.round(subtotal + "e+2") + "e-2");
    return [unit_price, subtotal];
  }

  function updateRow(event, itemId, item) {
    const fieldName = event.target.getAttribute("name");
    let fieldValue;
    if (fieldName === "hingeHole" || fieldName === "matchGrain") {
      fieldValue = event.target.checked;
    } else {
      fieldValue = event.target.value;
    }
    const newData = { ...item };
    newData[fieldName] = fieldValue;
    const priceArr = mycal(panelFinishList, newData);
    const priceField = "price";
    const sutotalField = "subtotal";
    newData[priceField] = priceArr[0];
    newData[sutotalField] = priceArr[1];

    const editedItem = {
      id: itemId,
      panelFinish: newData.panelFinish,
      panelId: newData.panelId,
      qty: newData.qty,
      width: newData.width,
      height: newData.height,
      hingeHole: newData.hingeHole,
      matchGrain: newData.matchGrain,
      miterCut: newData.miterCut,
      price: newData.price,
      subtotal: newData.subtotal,
    };

    const newItems = [...items];
    const index = items.findIndex((item) => item.id === itemId);
    newItems[index] = editedItem;
    setItems(newItems);
  }

  function updateTwo(event, itemId, item) {
    const newData = { ...item };
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    const Sindex = panelFinishList.findIndex(
      (item) => item.label === fieldValue || item.id === fieldValue
    );
    if (fieldName === "panelFinish") {
      const fieldName1 = "panelFinish";
      const fieldName2 = "panelId";
      newData[fieldName1] = fieldValue;
      if (Sindex !== -1) {
        newData[fieldName2] = panelFinishList[Sindex].id;
      }
    } else if (fieldName === "panelId") {
      const fieldName1 = "panelId";
      const fieldName2 = "panelFinish";
      newData[fieldName1] = fieldValue;
      if (Sindex !== -1) {
        newData[fieldName2] = panelFinishList[Sindex].label;
      }
    }
    const priceArr = mycal(panelFinishList, newData);
    const priceField = "price";
    const sutotalField = "subtotal";
    newData[priceField] = priceArr[0];
    newData[sutotalField] = priceArr[1];

    const editedItem = {
      id: itemId,
      panelFinish: newData.panelFinish,
      panelId: newData.panelId,
      qty: newData.qty,
      width: newData.width,
      height: newData.height,
      hingeHole: newData.hingeHole,
      matchGrain: newData.matchGrain,
      miterCut: newData.miterCut,
      price: newData.price,
      subtotal: newData.subtotal,
    };
    const newItems = [...items];
    const index = items.findIndex((item) => item.id === itemId);
    newItems[index] = editedItem;
    setItems(newItems);
  }

  function deleteRow(itemId) {
    const newItems = [...items];
    const index = items.findIndex((item) => item.id === itemId);
    newItems.splice(index, 1);
    setItems(newItems);
  }

  function copyRow(itemId) {
    const newItems = [...items];
    const index = items.findIndex((item) => item.id === itemId);
    const copyItem = newItems[index];
    const tempItem = {
      id: 0,
      panelFinish: copyItem.panelFinish,
      panelId: copyItem.panelId,
      qty: copyItem.qty,
      width: copyItem.width,
      height: copyItem.height,
      hingeHole: copyItem.hingeHole,
      matchGrain: copyItem.matchGrain,
      miterCut: copyItem.miterCut,
      price: copyItem.price,
      subtotal: copyItem.subtotal,
    };
    tempItem.id = nanoid();
    newItems.splice(index, 0, tempItem);
    setItems(newItems);
  }

  function addRow(n) {
    const newItems = [];
    for (let i = 0; i < n; i++) {
      const newItem = {
        panelFinish: "",
        panelId: "",
        qty: NaN,
        width: NaN,
        height: NaN,
        hingeHole: false,
        matchGrain: false,
        miterCut: "None",
        price: NaN,
        subtotal: NaN,
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
        <TableHead />
        <tbody>
          {items.map((rowItem, index) => {
            return (
              <NewTableBody
                key={index}
                ItemNum={index}
                item={rowItem}
                handleDeleteClick={deleteRow}
                handleCopyClick={copyRow}
                handleEditAllInOne={updateRow}
                handleEditTwo={updateTwo}
              />
            );
          })}
        </tbody>
        <TableFooter
          items={items}
          onAdd={addRow}
          printPDF={generatePDF}
          setIsFreight={setIsFreight}
        />
      </table>
      <div hidden>
        <table
          id="PrintTable"
          className="table table-hover table-sm table-responsive-sm"
          ref={componentPDF}
        >
          <PrintHead info={info} />
          <tbody>
            {items.map((rowItem, index) => {
              return <ReadOnly key={index} ItemNum={index} item={rowItem} />;
            })}
          </tbody>
          <PrintFooter items={items} IsFreight={IsFreight} />
        </table>
      </div>
      <input
        type="file"
        accept=".xlsx, .xls, .csv"
        className="form-control bg-light rounded-pill"
        onChange={handleFileUpload}
      />
    </Fragment>
  );
}
export default CreateArea;

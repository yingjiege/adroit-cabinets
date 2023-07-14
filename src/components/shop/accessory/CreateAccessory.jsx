import React, { Fragment, useState, useRef, useEffect} from "react";
import { nanoid } from "nanoid";
import { useReactToPrint } from "react-to-print";
import AccTableHead from "./AccTableHead";
import AccTableBody from "./AccTableBody";
import AccTableFooter from "./AccTableFooter";
import PrintHead from "./PrintHead";
import PrintAcc from "./PrintAcc";
import PrintFooter from "./PrintFooter";
import Axios from "axios";


function CreateAccessory({ info, accessories, setAccessories }) {
  const [cabinetDoor, setCabinetDoor] = useState([]);
  const [Acc, setAcc] = useState([]);
  const [inf, setInf] = useState({});
  const [customer, setCustomer] = useState([]);
  const user_id = localStorage.getItem('user');

  useEffect(() => {

    Axios.get(`https://us-east-1.aws.data.mongodb-api.com/app/application-0-hxfdv/endpoint/accessory`)
          .then((res) => {
            const searchedCabinet = res.data;
            setAcc(searchedCabinet);
          })
          .catch((error) => {
            console.error(error);
          });
    Axios.get(`https://us-east-1.aws.data.mongodb-api.com/app/application-0-hxfdv/endpoint/cabinet_door`)
      .then((res) => {
        const searchedCabinet = res.data;
        setCabinetDoor(searchedCabinet);
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
        "https://us-east-1.aws.data.mongodb-api.com/app/application-0-hxfdv/endpoint/get_cabinet_customer"
      )
        .then((res) => {
          const searchedCabinet = res.data;
          setCustomer(searchedCabinet);
        })
        .catch((error) => {
          console.error(error);
        });
  }, []);
  const getColor = (color) => {
    return cabinetDoor.find(cab =>cab.color === color);
  }

  const getAcc = (id) => {
    return Acc.find(cab => cab.ACC === id);
  }

  const componentPDF = useRef();
  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTile: "UserData",
  });  

  function updateAcc(event, itemId, item) {
    const fieldName = event.target.getAttribute("name");
    let fieldValue = event.target.value.toUpperCase();
    const newData = { ...item };
    const Sindex = Acc.findIndex((item) => item.ACC === fieldValue);
    const newItems = [...accessories];
    const index = accessories.findIndex((item) => item.id === itemId);
    let discount = 1
    const Nindex = customer.findIndex((item) => item.Company.toUpperCase() === inf.companyName.toUpperCase());
    console.log(Nindex)
    if(Nindex !== -1){
      discount = customer[Nindex].MULTIPIER.toFixed(2)
    }
    if (fieldName === "acc") {
      newData["acc"] = fieldValue;
      if (Sindex !== -1) {
        newData["accWidth"] = Acc[Sindex].W;
        newData["accHeight"] = Acc[Sindex].H;
        newData["accDepth"] = Acc[Sindex].D;
      }
    } else if (fieldName === "accColor") {
      newData["accColor"] = fieldValue;
    } else if (fieldName === "accQty") {
      newData["accQty"] = fieldValue;
    }
    const newAccInfo = getAcc(newData.acc);
    const newAccColor = getColor(newData.accColor);
    if (newAccInfo && newAccColor) {
      newData["accCategory"] = newAccColor.category;
      newData["accPrice"] = newAccInfo[newAccColor.category];
      newData["accPrice"] *= discount * newData["accQty"];
      newData["accPrice"] = +(Math.round(newData["accPrice"] + "e+2") + "e-2");
    }
  
    const editedItem = {
      id: itemId,
      acc: newData.acc,
      accColor: newData.accColor,
      accCategory: newData.accCategory,
      accWidth: newData.accWidth,
      accHeight: newData.accHeight,
      accDepth: newData.accDepth,
      accType: newData.accType,
      accQty: newData.accQty,
      accPrice: newData.accPrice
    };
    newItems[index] = editedItem;
    setAccessories(newItems);
  }

  function addAcc(n) {
    const newItems = [];
    for (let i = 0; i < n; i++) {
      const newItem = {
        id: nanoid(),
        acc:"",
        accColor:"",
        accCategory:"",
        accWidth:0,
        accHeight:0,
        accDepth:0,
        accType:"",
        accQty:1,
        accPrice: 0
      };
      newItems.push(newItem);
    }
    const newItemsAdd = [...accessories, ...newItems];
    setAccessories(newItemsAdd);
  }

  function copyAcc(itemId) {
    const newItems = [...accessories];
    const index = accessories.findIndex((item) => item.id === itemId);    const copyItem = newItems[index];
    const tempItem = {
      id: 0,
      acc:copyItem.acc,
      accColor:copyItem.accColor,
      accCategory:copyItem.accCategory,
      accWidth:copyItem.width,
      accHeight:copyItem.height,
      accDepth:copyItem.depth,
      accType:copyItem.accType,
      accQty:copyItem.accQty,
      accPrice:copyItem.accPrice
    };
    tempItem.id = nanoid();
    newItems.splice(index, 0, tempItem);
    setAccessories(newItems);
  }

  function deleteAcc(itemId) {
    const newItems = [...accessories];
    const index = accessories.findIndex((item) => item.id === itemId);
    newItems.splice(index, 1);
    setAccessories(newItems);
  }

  return (
    <Fragment>
      <table className="table table-hover table-sm table-responsive-sm"
        id="my-table">
      <AccTableHead/>
        <tbody>
          {accessories.map((rowItem, index) => {
            return (
              <AccTableBody
                key={index}
                accNum ={index}
                handleDeleteAcc={deleteAcc}
                handleCopyAcc={copyAcc}
                handleEditedAcc = {updateAcc}
                Accitem = {rowItem}
              />
            );
          })}
        </tbody>
        <AccTableFooter acc = {accessories} onAdd={addAcc} printPDF={generatePDF}/>
      </table>
            <div hidden>
      <table
        id="PrintTable"
        className="table table-hover table-sm table-responsive-sm"
        ref={componentPDF}
      >
      <PrintHead 
        info = {info}
      />
        <tbody>
          {accessories.map((rowItem, index) => {
            return (
              <PrintAcc
                key={index}
                ItemNum ={index}
                item = {rowItem}
              />
            );
          })}
        </tbody>
        <PrintFooter  acc={accessories}/>
        </table>
      </div>
    </Fragment>
  );
}

export default CreateAccessory;
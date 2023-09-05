import React, { useState, useEffect } from "react";
//import panelFinishList from "../../../panelFinish.js";
import axios from "axios";
import Cookies from "js-cookie";

function NewTableBody({
  item,
  ItemNum,
  handleDeleteClick,
  handleCopyClick,
  handleEditAllInOne,
  handleEditTwo,
}) {
  const [panelFinishList,setPanelFinishList] = useState([]);
  const [widthValue, setWidthValue] = useState(true);
  const [heightValue, setHeightValue] = useState(true);
  const [widthDecimal, setWidthDecimal] = useState(true);
  const [heightDecimal, setHeightDecimal] = useState(true);
  const [qtyInteger, setQtyInteger] = useState(true);
  const [oversize, setOversize] = useState(true);

  function isValidNumber(number) {
    const regex = /^\d+(\.\d{1,3})?$/;
    return regex.test(number);
  }
  function isPositiveInteger(input) {
    return /^[1-9]\d*$/.test(input);
  }

  useEffect(() => {
    retrieveDoor();
    //if is in range
    if ((item.width < 3 && item.height <3) || item.width > 48){
      setWidthValue(false);
      console.log(item.width)
      console.log(item.height)
    }
    else if (item.width <3 && item.height > 3){
      setWidthValue(true);
    } else {
      setWidthValue(true);
    }
    if ((item.height < 3 && item.width < 3) || item.height > 96) {
      setHeightValue(false);
    } 
    else if (item.height <3 && item.width > 3){
      setHeightValue(true);
    } else {
      setHeightValue(true);
    }
    //if is in three decimal
    if (!isValidNumber(item.width)) {
      if (isNaN(item.width)) {
        setWidthDecimal(true);
      } else setWidthDecimal(false);
    } else setWidthDecimal(true);

    if (!isValidNumber(item.height)) {
      if (isNaN(item.height)) {
        setHeightDecimal(true);
      } else setHeightDecimal(false);
    } else setHeightDecimal(true);
    // if qty is integer

    if (!isPositiveInteger(item.qty)) {
      if (isNaN(item.qty)) {
        setQtyInteger(true);
      } else setQtyInteger(false);
    } else setQtyInteger(true);
    //if qty is bigger than 0

    const size = (item.width * item.height) / 144;

    if (size > 30 || size < 0) {
      setOversize(false);
      item.price = NaN;
      item.subtotal = NaN;
    } else setOversize(true); 
  }, [item.width, item.height, item.qty, item.price, item.subtotal, item]);

  useEffect(() => {
    Cookies.set("cabinetDoor", JSON.stringify(item));
  }, [item]);

  const retrieveDoor = () =>{
    axios.get("https://us-east-1.aws.data.mongodb-api.com/app/application-0-hxfdv/endpoint/door")
    .then(response=>{
        setPanelFinishList(response.data);
    })
    .catch(e=>{
        console.log(e);
    })
  };

  return (
    <tr>
      <td style={{ width: "2em" }}>
        <i
          className="bi bi-x-circle-fill btn"
          onClick={() => handleDeleteClick(item.id)}
        ></i>
      </td>
      <td style={{ width: "2em" }}>
        <i
          className="bi bi-files btn"
          onClick={() => handleCopyClick(item.id)}
        ></i>
      </td>
      <td className="text-center" style={{ width: "2em" }}>{ItemNum + 1}</td>
      <td>
        <input
          type="text"
          list="data"
          className="form-control"
          style={{ width: "12em" }}
          placeholder="select panel"
          name="panelFinish"
          value={item.panelFinish}
          onChange={(event) => handleEditTwo(event, item.id, item)}
        />
        <datalist id="data">
          {panelFinishList.map((item, key) => (
            <option key={key} value={item.label} />
          ))}
        </datalist>
      </td>
      <td>
        <input
          type="text"
          list="data2"
          className="form-control"
          placeholder="select panel ID"
          name="panelId"
          style={{ width: "12em" }}
          value={item.panelId}
          onChange={(event) => handleEditTwo(event, item.id, item)}
        />
        <datalist id="data2">
          {panelFinishList.map((item, key) => (
            <option key={key} value={item.id} />
          ))}
        </datalist>
      </td>
      <td>
        <input
          type="number"
          name="qty"
          className={
            qtyInteger === false ? "form-control is-invalid" : "form-control"
          }
          value={item.qty}
          onChange={(event) => handleEditAllInOne(event, item.id, item)}
          style={{ width: "5em" }}
        />
        {qtyInteger === false && (
          <div className="invalid-feedback">
            Please enter non zero hole number
          </div>
        )}
      </td>
      <td>
        <input
          type="number"
          name="width"
          className={
            widthValue === false ? "form-control is-invalid" : "form-control"
          }
          value={item.width}
          style={{ width: "6em" }}
          onChange={(event) => handleEditAllInOne(event, item.id, item)}
        />
        {oversize === false && (
          <div className="oversize">
            The Door Panel is oversized. Please contact sales to place order
          </div>
        )}
        {widthValue === false && (
          <div className="invalid-feedback">
            Please enter value not less than 3 or more than 48
          </div>
        )}
        {widthDecimal === false && (
          <div className="invalid-feedback">
            Please enter less than 4 decimal place
          </div>
        )}
      </td>
      <td>
        <input
          type="number"
          name="height"
          className={
            heightValue === false ? "form-control is-invalid" : "form-control"
          }
          value={item.height}
          style={{ width: "6em" }}
          onChange={(event) => handleEditAllInOne(event, item.id, item)}
        />
        {heightValue === false && (
          <div className="invalid-feedback">
            Please enter value not less than 3 or more than 96
          </div>
        )}
        {heightDecimal === false && (
          <div className="invalid-feedback">
            Please enter less than 4 decimal place
          </div>
        )}
      </td>
      <td style={{ paddingLeft: '50px' }}>
        <input
          type="checkbox"
          className="form-check-input form-control"
          id="defaultCheck1"
          name="hingeHole"
          checked={item.hingeHole}
          onChange={(event) => handleEditAllInOne(event, item.id, item)}
        />
      </td>
      <td style={{ paddingLeft: '50px' }}>
        <input
          type="checkbox"
          className="form-check-input"
          id="defaultCheck2"
          name="matchGrain"
          checked={item.matchGrain}
          onChange={(event) => handleEditAllInOne(event, item.id, item)}
        />
      </td>
      <td>
        <select
          id="inlineFormCustomSelectPref"
          className="form-select w-auto"
          name="miterCut"
          value={item.miterCut}
          onChange={(event) => handleEditAllInOne(event, item.id, item)}
        >
          <option defaultValue="None">None</option>
          <option value="Top">Top</option>
          <option value="1H">1H</option>
          <option value="Bot">Bot</option>
        </select>
      </td>
      <td>
        <input
          name="price"
          type="number"
          className="form-control bg-light rounded-pill"
          value={item.price}
          style={{ width: "6em" }}
          readOnly
          disabled
        />
      </td>
      <td>
        <input
          name="Subtotal"
          className="form-control bg-light rounded-pill"
          type="number"
          value={item.subtotal}
          style={{ width: "6em" }}
          readOnly
          disabled
        />
      </td>
    </tr>
  );
}

export default NewTableBody;

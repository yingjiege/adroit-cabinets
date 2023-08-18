import React, {useState, useEffect } from "react";
import Axios from "axios";
import 'bootstrap-icons/font/bootstrap-icons.css';
import Addon from '../../../addon.js';


function TableBody({
  newItem, 
  item,
  itemNum,
  handleDeleteClick,
  handleCopyClick,
  handleEdited,
}) {

  const [cabinet, setCabinet] = useState([]);
  const addon = Addon;
  useEffect(() => {
    Axios.get(`https://us-east-1.aws.data.mongodb-api.com/app/application-0-hxfdv/endpoint/cabinet`)
      .then((res) => {
        const searchedCabinet = res.data;
        setCabinet(searchedCabinet);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const getCabinetById = (id) => {
    return cabinet.find(cab => cab.ID === id);
  }

  const cabInfo = getCabinetById(item.cabinetSize);

  const colorSelected = [
    newItem.ADoorColor,
    newItem.BDoorColor,
    newItem.CDoorColor
  ]
  
  const [additionalShown, setAdditionalShown] = useState(false);
  const handleToggleAdditional = () => {
    setAdditionalShown(!additionalShown);
  };

  const [widthValue, setWidthValue] = useState(true);
  const [qtyInteger, setQtyInteger] = useState(true);
  const [widthPositive, setWidthPositive] = useState(true);
  const [hingeReq, setHingeReq] = useState(true);
  function isPositiveInteger(input) {
    return /^[0-9]\d*$/.test(input);
  }

  useEffect(() => {
    if (cabInfo && item.width > cabInfo.W) {
      setWidthValue(false);
    } else {
      setWidthValue(true);
    }

    if (!isPositiveInteger(item.width)) {
      if (isNaN(item.width)) {
        setWidthPositive(true);
      } else {
        setWidthPositive(false);
      }
    } else {
      setWidthPositive(true);
    }

    if (!isPositiveInteger(item.qty)) {
      if (isNaN(item.qty)) {
        setQtyInteger(true);
      } else {
        setQtyInteger(false);
      }
    } else {
      setQtyInteger(true);
    }

    if(cabInfo){
      if(cabInfo.DOOR_COUNT === 1 && item.hinge === "")
        setHingeReq(false);
      else 
        setHingeReq(true);
    }
    
  }, [item.width, item.qty, item.hinge, cabInfo]);

  return (

    <><tr>
      <td style={{ width: "2em" }}>
        <i className="bi bi-x-circle-fill btn"
          onClick={() => handleDeleteClick(item.id)}
        ></i>
      </td>
      <td>
        <i className="bi bi-files btn"
        onClick={() => handleCopyClick(item.id)}
        ></i>
      </td>
      <td className="text-center"> {itemNum + 1}</td>
      <td>
        <input
          type="text"
          list="cabinetSize"
          className="form-control"
          placeholder="Select Cabinet Size"
          name="cabinetSize"
          style={{ width: "12em" }}
          value={item.cabinetSize}
          onChange={(event) => handleEdited(event, item.id, item, newItem)} 
          />
          <datalist id="cabinetSize">
            {cabinet.map((item, key) => (
              <option key={key} value={item.ID} />
            ))}
          </datalist>
      </td>
      <td>
        <input
          type="text"
          list="data3"
          className="form-control"
          placeholder="Select Door Color"
          name="doorColor"
          style={{ width: "12em" }}
          value={item.doorColor} // use the doorColor value from newItem
          onChange={(event) => handleEdited(event, item.id, item, newItem)}
          readOnly={colorSelected.every(color => color === "")}
          disabled={colorSelected.every(color => color === "")}
        />
        <datalist id="data3">
          {colorSelected.map((item, key) => (
            <option key={key} value={item} />
          ))}
        </datalist>
      </td>
      <td style={{ textAlign: "center" }}>
        <input
          type="number"
          name="qty"
          className={qtyInteger === false ? "form-control is-invalid" : "form-control"}
          style={{ width: "5em", margin: "0 auto" }}
          value={item.qty}
          min="1"
          onChange={(event) => handleEdited(event, item.id, item, newItem)}
        />
        {!qtyInteger && (
          <div className="invalid-feedback">Please enter more than 0</div>
        )}
      </td>
      <td  style={{ textAlign: "center",  justifyContent: "center" }}>
          <input
            type="number"
            name="width"
            className={widthValue === false || widthPositive === false ? 
              "form-control is-invalid" : "form-control"} 
              style={{ width: "5em", margin: "0 auto" }}
              value={item.width}
            max={cabInfo && cabInfo.W}
            min="0"
            onChange={(event) => handleEdited(event, item.id, item, newItem)}
          />
          {widthValue === false && (
            <div className="invalid-feedback">Please enter value not oversized</div>
          )}
          {widthPositive === false && (
            <div className="invalid-feedback">Please enter width more than 0 and integer only</div>
          )}
        </td>
        <td className="text-center">
          <input
            type="number"
            name="height"
            className="form-control"
            style={{ width: "5em", margin: "0 auto" }}
            value={item.height}
            readOnly
            disabled
          />
        </td>
        <td className="text-center">
          <input
            type="number"
            name="depth"
            className="form-control"
            style={{ width: "5em", margin: "0 auto" }}
            value={item.depth}
            readOnly
            disabled
          />
        </td>
      <td className="text-center">
        <select
          type="text"
          name="hinge"
          className={hingeReq === false  ? "form-control is-invalid" : "form-control"}
          style={{ width: "8em" }}
          value = {item.hinge}
          onChange={(event) => handleEdited(event, item.id, item, newItem)}
        >
          <option value="">-- Select --</option>
          <option value="L">Left</option>
          <option value="R">Right</option>
        </select>
        {!hingeReq && (
          <div className="invalid-feedback">Hinge is required</div>
        )}
      </td>
      <td className="text-center">
        <select
            type="text"
            name="finLOrR"
            className="form-control"
            style={{ width: "6em" }}
            value={item.finLOrR}
            onChange={(event) => handleEdited(event, item.id, item, newItem)}
          >
          <option value="">-- None --</option>
          <option value="L">Left</option>
          <option value="R">Right</option>
          <option value="LR">LR</option>
        </select>
      </td>
      <td>
        <input
          name="price"
          className="form-control bg-light rounded-pill"
          type="number"
          value={item.price}
          style={{ width: "8em" }}
          readOnly
          disabled />
      </td>
      </tr>
 
      <tr>
      <td>
        <button onClick={handleToggleAdditional}
        className="form-control">
          {additionalShown ? "Hide " : "Additional"}
        </button>
      </td>
      <th colSpan="1" className="text-center" ></th>
          {/* <th className="text-center" hidden={!additionalShown}>DOOR H</th>
          <th className="text-center" hidden={!additionalShown}>PC TOP DOOR</th>
          <th className="text-center" hidden={!additionalShown}>BC DOOR</th>
          <th className="text-center" hidden={!additionalShown}>BOT DF</th>
          <th className="text-center" hidden={!additionalShown}>NOTCH OUT</th> */}
          <th colSpan="2" className="text-center" hidden={!additionalShown}>CUSTOMIZE ADD ON</th>
          <th colSpan="2" className="text-center" hidden={!additionalShown}>MEMO</th>
          <th className="text-center" hidden={!additionalShown}>APT</th>

      </tr>
      <tr hidden={!additionalShown}>
        <td></td>
        <td></td>
        
      {/* <td className="text-center">
        <input 
          type="text"
          name="doorH"
          style={{ width: "6em", margin: "0 auto" }}
          className="form-control"
          value = {item.doorH}
          onChange={(event) => handleEdited(event, item.id, item, newItem)}
          />
      </td>
      <td className="text-center">
        <input
          type="text"
          name="pcTopDoor"
          className="form-control"
          style={{ width: "6em", margin: "0 auto" }}
          value = {item.pcTopDoor}
          onChange={(event) => handleEdited(event, item.id, item, newItem)}
           />
      </td>
      <td className="text-center">
        <input
          type="text"
          name="pcDoor"
          className="form-control"
          style={{ width: "6em", margin: "0 auto" }}
          value = {item.pcDoor}
          onChange={(event) => handleEdited(event, item.id, item, newItem)}
           />
      </td>
      <td className="text-center">
        <input
          type="text"
          name="botDF"
          className="form-control"
          style={{ width: "6em", margin: "0 auto" }}
          value = {item.botDF}
          onChange={(event) => handleEdited(event, item.id, item, newItem)}
           />
      </td>
      <td className="text-center">
        <select
          type="text"
          name="notchOut"
          className="form-control"
          style={{ width: "8em", margin: "0 auto" }}
          value = {item.notchOut}
          onChange={(event) => handleEdited(event, item.id, item, newItem)}
           >
            <option value="">-- Select --</option>
            <option value="GOLA">GOLA</option>
            <option value="MITER DOOR">MITER DOOR</option>
          </select>

      </td> */}
      <td colSpan="2" className="text-center">
        <input
          type="text"
          list="customizeAddOn"
          className="form-control"
          name="customizeAddOn"
          value={item.customizeAddOn}
          onChange={(event) => handleEdited(event, item.id, item, newItem)}
          style={{ width: "20em" }}
        />
        <datalist id="customizeAddOn">
          {addon.map((item, key) => (
            <option key={key} value={item.AddOnDoor || item.AddOnHardware} />
          ))}
        </datalist>
      </td>
      <td colSpan="2" className="text-center">
        <input
          type="text"
          name="memo"
          className="form-control"
          style={{ width: "16em" }}
          value = {item.memo}
          onChange={(event) => handleEdited(event, item.id, item, newItem)}
            />
      </td>
      <td className="text-center">
        <input
          type="text"
          name="apt"
          className="form-control "
          style={{ width: "8em" }}
          value = {item.apt}
          onChange={(event) => handleEdited(event, item.id, item, newItem)}
            />
      </td>
    </tr>

    </>
  );
}

export default TableBody;

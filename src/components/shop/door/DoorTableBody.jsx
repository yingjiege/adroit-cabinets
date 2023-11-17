import React, { useState, useEffect } from "react";
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
    axios.get("https://us-east-1.aws.data.mongodb-api.com/app/application-0-hxfdv/endpoint/get_cabinetFinish")
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
          <option defaultValue="">None</option>
          <option value="Top">Top</option>
          <option value="1H">1H</option>
          <option value="Bot">Bot</option>
        </select>
      </td>
      <td>
      <select
        id="inlineFormCustomSelectPref"
        className="form-select w-auto"
        name="edge"
        value={item.edge}
        onChange={(event) => handleEditAllInOne(event, item.id, item)}
      >
        <option value="">None</option>
        <option value="1L">1L</option>
        <option value="1W">1W</option>
        <option value="1L1W">1L1W</option>
        <option value="2W">2W</option>
        <option value="2L">2L</option>
        <option value="2L1W">2L1W</option>
        <option value="1L2W">1L2W</option>
        <option value="4S">4S</option>
        <option value="EDGE_SP1">EDGE_SP1</option>
        <option value="EDGE_SP2">EDGE_SP2</option>
        <option value="EDGE_SP3">EDGE_SP3</option>
        <option value="EDGE_SP4">EDGE_SP4</option>
        <option value="EDGE_ANGLE">EDGE_ANGLE</option>
      </select>
      </td>
      <td>
      <select
        id="inlineFormCustomSelectPref"
        className="form-select w-auto"
        name="drill"
        value={item.drill}
        onChange={(event) => handleEditAllInOne(event, item.id, item)}
      >
        <option value="">None</option>
        <option value="2L">2L</option>
        <option value="2R">2R</option>
        <option value="2L_T23">2L_T23</option>
        <option value="2R_T23">2R_T23</option>
        <option value="2R_2L">2R_2L</option>
        <option value="2R_2L_T23">2R_2L_T23</option>
        <option value="3L">3L</option>
        <option value="3R">3R</option>
        <option value="3L_T23">3L_T23</option>
        <option value="3R_T23">3R_T23</option>
        <option value="2R_3L">2R_3L</option>
        <option value="3R_2L">3R_2L</option>
        <option value="2R_3L_T23">2R_3L_T23</option>
        <option value="3R_2L_T23">3R_2L_T23</option>
        <option value="3R_3L">3R_3L</option>
        <option value="3R_3L_T23">3R_3L_T23</option>
        <option value="4L">4L</option>
        <option value="4R">4R</option>
        <option value="4R_4L">4R_4L</option>
        <option value="4R_2L">4R_2L</option>
        <option value="4R_3L">4R_3L</option>
        <option value="3R_4L">3R_4L</option>
        <option value="4R_4L_T23">4R_4L_T23</option>
        <option value="4R_2L_T23">4R_2L_T23</option>
        <option value="4R_3L_T23">4R_3L_T23</option>
        <option value="2R_4L_T23">2R_4L_T23</option>
        <option value="3R_4L_T23">3R_4L_T23</option>
        <option value="CAM">CAM</option>
        <option value="CAM_15">CAM_15</option>
        <option value="CAM_TK">CAM_TK</option>
        <option value="CAM4">CAM4</option>
        <option value="HINGE_2H">HINGE_2H</option>
        <option value="HINGE_3H">HINGE_3H</option>
        <option value="HINGE_4H">HINGE_4H</option>
        <option value="HINGE_5H">HINGE_5H</option>
        <option value="HINGE_6H">HINGE_6H</option>
        <option value="HINGE_2W">HINGE_2W</option>
        <option value="DOOR_SLID">DOOR_SLID</option>
        <option value="ANGLE_CUT">ANGLE_CUT</option>
      </select>
            </td>      
            <td>
            <select
        id="inlineFormCustomSelectPref"
        className="form-select w-auto"
        name="custom"
        value={item.custom}
        onChange={(event) => handleEditAllInOne(event, item.id, item)}
      >
        <option value="">None</option>
        <option value="SP_REQUEST">SP_REQUEST</option>
        <option value="LB_SP1">LB_SP1</option>
        <option value="LB_SP2">LB_SP2</option>
        <option value="CAM_SP1">CAM_SP1</option>
        <option value="CAM_SP2">CAM_SP2</option>
        <option value="MITER_CUT">MITER_CUT</option>
        <option value="MATCH_GRAIN">MATCH_GRAIN</option>
        <option value="POCKET_HOLE1">POCKET_HOLE1</option>
        <option value="POCKET_HOLE2">POCKET_HOLE2</option>
        <option value="DOW+SRW_HOLE">DOW+SRW_HOLE</option>
        <option value="DOWEL_HOLE">DOWEL_HOLE</option>
        <option value="SCREW_HOLE">SCREW_HOLE</option>
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

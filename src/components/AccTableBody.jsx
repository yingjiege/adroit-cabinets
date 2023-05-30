import React, {useState, useEffect } from "react";
import Acc from "../Acc";

function AccTableBody({newItem, 
    Accitem,
    accNum,
    handleDeleteAcc,
    handleCopyAcc,
    handleEditedAcc,
  }) {
    const colorSelected = [
      newItem.ADoorColor,
      newItem.BDoorColor,
      newItem.CDoorColor
    ]
    console.log(Accitem );
  
    return (
      <tr>
        <td>
          <i className="bi bi-x-circle-fill btn"
            onClick={() => handleDeleteAcc(Accitem.id)}
          ></i>
        </td>
        <td>
          <i className="bi bi-files btn"
          onClick={() => handleCopyAcc(Accitem.id)}
          ></i>
        </td>
        <td className="text-center"> {accNum + 1}</td>
        <td>
          <input
            type="text"
            list="acc"
            className="form-control"
            placeholder="Select Accessories"
            name="acc"
            style={{ width: "12em" }}
            value={Accitem.acc}
            onChange={(event) => handleEditedAcc(event, Accitem.id, Accitem, newItem)} 
            />
            <datalist id="acc">
              {Acc.map((item, key) => (
                <option key={key} value={item.ACC} />
              ))}
            </datalist>
        </td>
        <td>
          <input
            type="text"
            list="accColor"
            className="form-control"
            placeholder="select Door Color"
            name="accColor"
            style={{ width: "12em" }}
            value={Accitem.accColor} // use the doorColor value from newItem
            onChange={(event) => handleEditedAcc(event, Accitem.id, Accitem, newItem)}
                       />
          <datalist id="accColor">
            {colorSelected.map((item, key) => (
              <option key={key} value={item} />
            ))}
          </datalist>
        </td>
        <td style={{ textAlign: "center" }}>
          <input
            type="number"
            name="accQty"
            className="form-control"
            style={{ width: "5em" }}
            value={Accitem.accQty}
            min="0"
            onChange={(event) => handleEditedAcc(event, Accitem.id, Accitem, newItem)}
          />
        </td>
          <td className="text-center" style={{ textAlign: "center" }}>
            <input
              type="number"
              name="width"
              className="form-control"
              style={{ width: "5em" }}
              value={Accitem.width}
              min="0"
              readOnly
              disabled
            />
          </td>
        <td className="text-center">
          <input
            type="number"
            name="height"
            className="form-control"
            style={{ width: "5em" }}
            value={Accitem.height}
            readOnly
            disabled />
        </td>
        <td className="text-center">
          <input
            type="number"
            name="depth"
            className="form-control"
            style={{ width: "5em" }}
            value={Accitem.depth}
            readOnly
            disabled />
        </td>
        <td>
          <input
            name="price"
            className="form-control bg-light rounded-pill"
            type="number"
            value={Accitem.price}
            style={{ width: "8em" }}
            readOnly
            disabled />
        </td>
        </tr>        
        );
  
  }

export default AccTableBody;



import React, {useState } from "react";
import cabinet from "../cabinet";
import cabinetDoor from "../cabinetDoor";

function TableBody({
  newItem, 
  item,
  itemNum,
  handleDeleteClick,
  handleCopyClick,
  handleEdited
}) {

  const colorSelected = [
    newItem.ADoorColor,
    newItem.BDoorColor,
    newItem.CDoorColor
  ]

  const [additionalShown, setAdditionalShown] = useState(false);

  const handleToggleAdditional = () => {
    setAdditionalShown(!additionalShown);
  };

  return (
    <><tr>
      <td>
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
          list="data"
          className="form-control"
          placeholder="select Cabinet Size"
          name="cabinetSize"
          value={item.cabinetSize}
          onChange={(event) => handleEdited(event, item.id, item, newItem)} />
        <datalist id="data">
          {cabinet.map((item, key) => (
            <option key={key} value={item.ID} />
          ))}
        </datalist>
      </td>
      <td>
        <input
          type="text"
          list="data2"
          className="form-control"
          placeholder="Door Type"
          name="doorType"
          value={item.doorType}
          onChange={(event) => handleEdited(event, item.id, item, newItem)} 
          readOnly
          disabled />
        <datalist id="data2">
          {cabinetDoor.map((item, key) => (
            <option key={key} value={item.category} />
          ))}
        </datalist>
      </td>
      <td>
        <input
          type="text"
          list="data3"
          className="form-control"
          placeholder="select Door Color"
          name="doorColor"
          value={item.doorColor} // use the doorColor value from newItem
          onChange={(event) => handleEdited(event, item.id, item, newItem)}
                     />
        <datalist id="data3">
          {colorSelected.map((item, key) => (
            <option key={key} value={item} />
          ))}
        </datalist>
      </td>

      <td className="text-center">
        <input
          type="number"
          name="width"
          style={{ width: "6em" }}
          value={item.width}
          onChange={(event) => handleEdited(event, item.id, item, newItem)}
                    />
      </td>
      <td className="text-center">
        <input
          type="number"
          name="height"
          style={{ width: "6em" }}
          value={item.height}
          readOnly
          disabled />
      </td>

      <td className="text-center">
        <input
          type="number"
          name="depth"
          style={{ width: "6em" }}
          value={item.depth}
          readOnly
          disabled />
      </td>
      <td className="text-center">
        <select
          type="text"
          name="hinge"
          style={{ width: "6em" }}
          value = {item.hinge}
          onChange={(event) => handleEdited(event, item.id, item, newItem)}
        >
          <option value="">-- Select --</option>
          <option value="L">Left</option>
          <option value="R">Right</option>
        </select>
      </td>

      <td>
        <input
          type="number"
          name="qty"
          style={{ width: "5em" }}
          value = {item.qty}
          onChange={(event) => handleEdited(event, item.id, item, newItem)}
          />
      </td>

      <td>
        <input
          name="price"
          className="form-control bg-light rounded-pill"
          type="number"
          value={item.price}
          style={{ width: "6em" }}
          readOnly
          disabled />
      </td>
      <td>
        <input
          name="door_only"
          className="form-control bg-light rounded-pill"
          type="number"
          value={item.DO}
          style={{ width: "6em" }}
          readOnly
          disabled />
      </td>

      <td>
        <input
          name="box_only"
          className="form-control bg-light rounded-pill"
          type="number"
          value={item.BO}
          style={{ width: "6em" }}
          readOnly
          disabled />
      </td>

      </tr>
      
      <tr>
      <td>
        <button onClick={handleToggleAdditional}>
          {additionalShown ? "Hide " : "Additional"}
        </button>
      </td>
      <th colSpan="1" className="text-center" ></th>
          <th className="text-center" hidden={!additionalShown}>FIN L/R</th>
          <th className="text-center" hidden={!additionalShown}>DOOR H</th>
          <th className="text-center" hidden={!additionalShown}>PC TOP DOOR</th>
          <th className="text-center" hidden={!additionalShown}>BC DOOR</th>
          <th className="text-center" hidden={!additionalShown}>BOT DF</th>
          <th className="text-center" hidden={!additionalShown}>NOTCH OUT</th>
          <th colSpan="2" className="text-center" hidden={!additionalShown}>CUSTOMIZE ADD ON</th>
          <th colSpan="4" className="text-center" hidden={!additionalShown}>MEMO</th>
      </tr>
      <tr hidden={!additionalShown}>
        <td></td>
        <td></td>
        <td className="text-center">
        <select
            type="text"
            name="fin"
            style={{ width: "6em" }}
            value={item.hinge}
            onChange={(event) => handleEdited(event, item.id, item, newItem)}
          >
          <option value="">-- None --</option>
          <option value="L">Left</option>
          <option value="R">Right</option>
          <option value="LR">LR</option>
        </select>
      </td>
      <td className="text-center">
        <input
          type="text"
          name="doorH"
          style={{ width: "6em" }}
          value = {item.doorH}
          onChange={(event) => handleEdited(event, item.id, item, newItem)}
          />
      </td>
      <td className="text-center">
        <input
          type="text"
          name="pcTopDoor"
          style={{ width: "6em" }}
          value = {item.pcTopDoor}
          onChange={(event) => handleEdited(event, item.id, item, newItem)}
           />
      </td>
      <td className="text-center">
        <input
          type="text"
          name="pcDoor"
          style={{ width: "6em" }}
          value = {item.pcDoor}
          onChange={(event) => handleEdited(event, item.id, item, newItem)}
           />
      </td>
      <td className="text-center">
        <input
          type="text"
          name="botDF"
          style={{ width: "6em" }}
          value = {item.botDF}
          onChange={(event) => handleEdited(event, item.id, item, newItem)}
           />
      </td>
      <td className="text-center">
        <input
          type="number"
          name="notchOut"
          style={{ width: "6em" }}
          value = {item.notchOut}
          onChange={(event) => handleEdited(event, item.id, item, newItem)}
           />
      </td>
      <td colSpan="2" className="text-center">
        <input
          type="text"
          name="customizeAddOn"
          value = {item.customizeAddOn}
          onChange={(event) => handleEdited(event, item.id, item, newItem)}
           style={{ width: "15em" }}/>
      </td>
      <td colSpan="4" className="text-center">
        <input
          type="text"
          name="memo"
          style={{ width: "24em" }}
          value = {item.memo}
          onChange={(event) => handleEdited(event, item.id, item, newItem)}
            />
      </td>
    </tr>
    </>
        
        
      );

}

export default TableBody;
import React,  {useState} from "react";
import { CSVLink } from "react-csv";

function AccTableFooter(props) {
  const items = props.items;
  const newItem = props.newItem;
  const [addNumberOfRow, setAddNumberOfRow] = useState(1);

  let testTotal = 0;
  let totalQty = 0;
  for (let row in items) {
    testTotal += Number(items[row].price);
    totalQty += Number(items[row].accQty);
  }
  
   testTotal = +(Math.round(testTotal + "e+2") + "e-2");
   
  function handleClick(n) {
    props.onAdd(n);
  }

  function handleAddRowNumber(event) {
    const needRow = event.target.value;
    setAddNumberOfRow(needRow);
  }

  const itemsWithNewData = items.map((item) => ({
    ...newItem, // Spread the properties of the newItem object
    ...item // Spread the properties of the original object
  }));


  return (
    <tfoot>
      <tr>
      <td colSpan="5" align="right">
          total items
        </td>
        <td>{totalQty}</td>
        <td colSpan="7" align="right">
        ${testTotal}
        </td>
      </tr>
      <tr>
        <td colSpan="3">
          <div className="input-group">
            <i
              className="bi bi-plus-circle-fill btn btn-secondary"
              onClick={() => handleClick(addNumberOfRow)}
            >
              add row
            </i>
            <input
              type="number"
              name="NumOfRow"
              className="form-control"
              value={addNumberOfRow}
              onChange={(event) => handleAddRowNumber(event)}
              style={{ width: "5em" }}
            />
          </div>
        </td>
      </tr>
    </tfoot>
  );
}

export default AccTableFooter;

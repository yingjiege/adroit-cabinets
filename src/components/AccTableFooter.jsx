import React,  {useState} from "react";
import { CSVLink } from "react-csv";

function AccTableFooter(props) {
  const acc = props.acc
  const items = props.items;
  const newItem = props.newItem;
  const [addNumberOfRow, setAddNumberOfRow] = useState(1);

  let testTotal = 0;
  let totalQty = 0;
  for (let row in acc) {
    testTotal += Number(acc[row].accPrice);
    totalQty += Number(acc[row].accQty);
  }
  
   testTotal = +(Math.round(testTotal + "e+2") + "e-2");
   
  function handleClick(n) {
    props.onAdd(n);
  }

  function handleAddRowNumber(event) {
    const needRow = event.target.value;
    setAddNumberOfRow(needRow);
  }

  let itemsWithNewData = [];

  if (Array.isArray(items)) {
    itemsWithNewData = itemsWithNewData.concat(items);
  }
  
  if (Array.isArray(acc)) {
    for(let i in acc){
      if(acc[i].accQty !== 0)
      itemsWithNewData = itemsWithNewData.concat(acc[i]);
    }
  }
  
  itemsWithNewData = itemsWithNewData.map((item) => ({
    ...newItem,
    ...item
  }));

  return (
    <tfoot>
      <tr>
      <td colSpan="12" align="center">
          total items {totalQty}
        </td>
        <td colSpan="1" align="center">
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
              Add Accessory
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
        <td colSpan="4">
          <i
            className="bi bi-file-earmark-pdf-fill btn btn-primary"
            onClick={props.printPDF}
            style={{ color: "white", borderStyle: "solid" }}
          >
            PDF
          </i>
          <CSVLink data={itemsWithNewData} filename={"my-file.csv"} target="_blank"   
>
            <i
              className="bi bi-filetype-csv btn btn-primary"
              style={{ color: "white", borderStyle: "solid" }}
            >
              CSV
            </i>
          </CSVLink>
        </td>
      </tr>
    </tfoot>
  );
}

export default AccTableFooter;

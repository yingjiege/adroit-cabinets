import React,  {useState} from "react";
import { CSVLink } from "react-csv";

function TableFooter(props) {
  const items = props.items;
  const [addNumberOfRow, setAddNumberOfRow] = useState(1);

  let testTotal = 0;
  let totalQty = 0;
  let packagingFee = 0;
  const [IsFreight, setIsFreight] = useState(false);
  for (let row in items) {
    testTotal += Number(items[row].subtotal);
    totalQty += Number(items[row].qty);
    packagingFee += Number(items[row].width * items[row].height* items[row].qty);
  }
  packagingFee =  +(Math.round((packagingFee / 144) + "e+2") + "e-2")
  
  testTotal = +(Math.round(testTotal + "e+2") + "e-2");
  if (IsFreight ===true){
    testTotal = +(Math.round((testTotal + packagingFee) + "e+2") + "e-2");
  }
  
  function handleClick(n) {
    props.onAdd(n);
  }
  
  function handleAddRowNumber(event) {
    const needRow = event.target.value;
    setAddNumberOfRow(needRow);
  }

  function handleFreight(event){
    props.setIsFreight(event.target.checked);
    setIsFreight(event.target.checked);
  }

  const data = [
    ["ORDER NO:", "CT01917", "EST NO:", "17182"],
    ["COORDINATOR:", "YOJI", "DOC DATE:", "6/19/2023"],
    ["CUSTOMER:", "Instyle Kitchen", "PO:", "1558"],
    ["INVOICE NO:", "12678", "数据录入", "YC"],
    ["CABINET LEG:", "PLASTIC LEG", "PLASTIC LEG 胶脚 QTY", "32"],
    ["CABINET MATERIAL"],
    ["ITEM NAME", "MODEL NO", "QT", "DESCRIPTION", "SPECIAL ORDER"],
    ["BOX MATERIAL", "PLME0411-192S36", "", "19mm (3/4\") New White TFL with 2.5mm MR MDF X-band V/C 4'X8'..TSCA Title IV Compliant"],
    ["BOX EDGE", "EB1-WD354HG-P", "", "1mm Designer White High Gloss PVC edge-banding 15/16\" x 500'"],
    ["BACKING", "PLME0411-192S36", "", "19mm (3/4\") New White TFL with 2.5mm MR MDF X-band V/C 4'X8'..TSCA Title IV Compliant"],
    ["DOOR COLOR", "MDPE3004-181S90", "", "3/4\" (18mm) Pearl White High Gloss PET MDF Core 4x8"],
    ["DOOR EDGE", "EB1.3-3004-90P", "", "1.3mm Solid White HG ABS Edge-Banding 328'..Matching MDPE3004 / WQ63004"],
    ["HARDWARE MATERIAL", "", "", ""],
    ["ITEM NAME", "MODEL NO", "QT", "DESCRIPTION", "SPECIAL ORDER"],
    ["DOOR HINGE", "CNG"],
    ["DRAWER SLIDE"],
    ["DRAWER BOX", "", "WHITE METAL DRAWER BOX"],
  ];
  return (
    <tfoot>
      <tr>
        <td colSpan="5" align="right">
          total items
        </td>
        <td  colSpan="2">{totalQty}</td>
        {/* <input
          colSpan="2"
          type="checkbox"
          className="form-check-input form-conctrol"
          id="defaultCheck2"
          name="freight"
          checked={IsFreight}
          onChange={handleFreight}
        />
        Packaging
        {IsFreight && (
          <td>{packagingFee}</td>
        )}        
        <td colSpan="6" align="right">
        {testTotal}
        </td> */}
      </tr>

      <tr>
        <td colSpan="9">
          <div className="input-group">
            <i
              className="bi bi-plus-circle-fill btn btn-secondary"
              onClick={() => handleClick(addNumberOfRow)}
              style={{ width: "auto", maxWidth: "300px" }}
            >
              Add Cabinet Door
            </i>
            <input
              type="number"
              name="NumOfRow"
              className="form-control"
              value={addNumberOfRow}
              onChange={(event) => handleAddRowNumber(event)}
              style={{ width: "auto", maxWidth: "200px" }}
              />
          </div>
        </td>
        <td colSpan="4">
          {/* <i
            className="bi bi-file-earmark-pdf-fill btn btn-primary"
            onClick={props.printPDF}
            style={{ color: "white", borderStyle: "solid" ,width: "auto", maxWidth: "150px" }}
          >
            PDF
          </i> */}
          {/* <CSVLink data={data} filename={"my-file.csv"} target="_blank">
            <i
              className="bi bi-filetype-csv btn btn-primary"
              style={{ color: "white", borderStyle: "solid",width: "auto", maxWidth: "150px" }}
            >
              CSV
            </i>
          </CSVLink> */}
        </td>
      </tr>
    </tfoot>
  );
}

export default TableFooter;

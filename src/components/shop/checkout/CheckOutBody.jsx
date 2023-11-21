import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Axios from "axios";
import NavbarAfterLogin from "../../navbar/NavbarAfterLogin";
import { CSVLink } from 'react-csv'; // Import CSVLink

function CheckOutBody() {
  const [searchedCabinet, setSearchedCabinet] = useState(null);
  const storedInsertedId = localStorage.getItem('insertedId');
  const [doorID, setDoorID] = useState([]);
  const [Acc, setAcc] = useState([]);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/checkoutform');
  };
  const handleClick2 = () => {
    navigate('/shop');
  };

  const getColor = (color) => {
    return doorID.find(cab =>cab.color === color);
  }
  const getAcc = (id) => {
    return Acc.find(cab => cab.ACC === id);
  }

  useEffect(() => {
    Axios.get("https://us-east-1.aws.data.mongodb-api.com/app/application-0-hxfdv/endpoint/get_undetermined_order")
      .then((res) => {
        setSearchedCabinet(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
      Axios.get(
        "https://us-east-1.aws.data.mongodb-api.com/app/application-0-hxfdv/endpoint/cabinet_door"
      )
        .then((res) => {
          const searchedCabinet = res.data;
          setDoorID(searchedCabinet);
        })
        .catch((error) => {
          console.error(error);
        });
        Axios.get(`https://us-east-1.aws.data.mongodb-api.com/app/application-0-hxfdv/endpoint/accessory`)
        .then((res) => {
          const searchedCabinet = res.data;
          setAcc(searchedCabinet);
        })
        .catch((error) => {
          console.error(error);
        });
  }, []);

  // const csvData = [
  //   // ["ORDER NO:", "CT01917", "", "EST NO:", "17182"],
  //   // ["COORDINATOR:", "YOJI", "DOC DATE:", "6/19/2023"],
  //   // ["CUSTOMER:", "Instyle Kitchen", "PO:", "1558"],
  //   // ["INVOICE NO:", "12678", "数据录入", "YC"],
  //   // ["CABINET LEG:", "PLASTIC LEG 4.5“", "PLASTIC LEG 胶脚 QTY", "32"],
  //   // ["CABINET MATERIAL"],
  //   // ["ITEM NAME", "MODEL NO", "QT", "DESCRIPTION", "SPECIAL ORDER"],
  //   // ["BOX MATERIAL", "PLME0411-192S36", "", "19mm (3/4\") New White TFL with 2.5mm MR MDF X-band V/C 4'X8'..TSCA Title IV Compliant"],
  //   // ["BOX EDGE", "EB1-WD354HG-P", "", "1mm Designer White High Gloss PVC edge-banding 15/16\" x 500'"],
  //   // ["BACKING", "PLME0411-192S36", "", "19mm (3/4\") New White TFL with 2.5mm MR MDF X-band V/C 4'X8'..TSCA Title IV Compliant"],
  //   // ["DOOR COLOR", "MDPE3004-181S90", "", "3/4\" (18mm) Pearl White High Gloss PET MDF Core 4x8"],
  //   // ["DOOR EDGE", "EB1.3-3004-90P", "", "1.3mm Solid White HG ABS Edge-Banding 328'..Matching MDPE3004 / WQ63004"],
  //   // ["MITER EDGE"],
  //   // ["OTHER"],
  //   // ["OTHER"],
  //   // ["OTHER"],
  //   // ["OTHER"],
  //   // ["HARDWARE MATERIAL"],
  //   // ["ITEM NAME", "MODEL NO", "QT", "DESCRIPTION", "SPECIAL ORDER"],
  //   // ["DOOR HINGE", "CNG"],
  //   // ["DRAWER SLIDE"],
  //   // ["DRAWER BOX", "", "", "WHITE METAL DRAWER BOX\n白色铁盒"],

  
  const filteredData = searchedCabinet && searchedCabinet.find(item => item._id === storedInsertedId);
  const cabinet = filteredData && filteredData.cabinet;
  const select = filteredData && filteredData.select;
  const cabinetDoor = filteredData && filteredData.cabinetDoor;
  const accessory = filteredData && filteredData.accessory;
  const PO = filteredData && filteredData.PO;
  console.log(filteredData)
  let totalQty = 0;
  let totalPrice = 0;

  for (let i in cabinet) {
    totalQty += parseInt(cabinet[i].qty)
    const qty = cabinet[i].qty
    totalPrice += parseFloat(cabinet[i].price) * qty;
  }
  for (let i in cabinetDoor) {
    const qty = cabinetDoor[i].qty
    totalQty += parseInt(cabinetDoor[i].qty)
    totalPrice += parseFloat(cabinetDoor[i].price) * qty;
  }
  for (let i in accessory) {
    const qty = accessory[i].accQty
    totalQty += parseInt(accessory[i].accQty)
    totalPrice += parseFloat(accessory[i].accPrice) * qty;
  }
  totalPrice = +(Math.round(totalPrice + "e+2") + "e-2");

  const csvData = []

  console.log(select)

  if (cabinetDoor && cabinetDoor.length !== 0) {
    csvData.push(["MATERIAL ITEM",
      "EDGEBAND",
      "QTY",
      "W",
      "L",
      "HINGEHOLE",
      "MATCHGRAIN",
      "MITERCUT",
      "EDGE",
      "DRILLING",
      "CUSTOM"]);
  
    for (let i in cabinetDoor) {
      csvData.push([
        cabinetDoor[i].panelId,
        cabinetDoor[i].panelFinish,
        cabinetDoor[i].qty,
        cabinetDoor[i].width,
        cabinetDoor[i].height,
        cabinetDoor[i].hingeHole,
        cabinetDoor[i].matchGrain,
        cabinetDoor[i].miterCut,
        cabinetDoor[i].edge,
        cabinetDoor[i].drill,
        cabinetDoor[i].custom
      ]);
    }
  } 
  else if (cabinet !==0 || accessory !==0){
    if(select){
    csvData.push([select.cabinetBox],
      [select.ADoorColor],
      [select.BDoorColor],
      [select.CDoorColor],
      [select.hingeType],
      [select.slide],
      [select.drawer],
      [select.cabinetLeg])
    }
    csvData.push(["",
    "QT",
    "DOOR-COLOR",
    "CAB TYPE",
    "W",
    "H",
    "D",
    "H-SIDE",
    "F-SIDE",
    "MEMO (中文注释)",
    "MEMO (英文注释)",
    "APT",
  ],
  ["编号", "数量", "门颜色", "柜体型号", "宽", "高", "深", "门较", "见光", "注意", "注意", "房间号"],
)

  for (let i in cabinet) {
    const newDoorColor = getColor(cabinet[i].doorColor);
    const doorID = newDoorColor ? newDoorColor.productID : "";
    csvData.push([
      `${parseInt(i) + 1}`,
      cabinet[i].qty,
      doorID,
      cabinet[i].cabinetSize,
      cabinet[i].width,
      cabinet[i].height,
      cabinet[i].depth,
      cabinet[i].hinge, 
      cabinet[i].finLOrR, 
      "", 
      cabinet[i].memo,
      cabinet[i].apt
    ]);
  }
  csvData.push(
    ["", "QT", "ITEM-COLOR","ACC-NO","W","H","D","MEMO (中文注释)","MEMO (英文注释)","APT",],
    ["编号", "数量", "配件颜色", "配价型号", "宽", "高", "深", "注意", "注意", "房间号"
  ])

  for (let i in accessory) {
    const newAccType = getAcc(accessory[i].acc);
    const AccID = newAccType ? newAccType.ACC_TYPE : "";
    const newDoorColor = getColor(accessory[i].accColor);
    const doorID = newDoorColor ? newDoorColor.productID : "";
    csvData.push([
      `${parseInt(i) + 1}`,
      accessory[i].accQty,
      doorID,
      AccID,
      accessory[i].accHeight,
      accessory[i].accWidth,
      accessory[i].accDepth,
      "",
      "",
      "", 
      accessory[i].memo,
      accessory[i].apt
    ]);
  }

  csvData.push(
    [],
    ["ORDER NO:", "", "", "EST NO:", "17182"],
    ["COORDINATOR:", "", "DOC DATE:", "6/19/2023"],
    ["CUSTOMER:", "", "PO:", ""],
    ["INVOICE NO:", "", "数据录入", "YC"],
    ["CABINET LEG:", "PLASTIC LEG 4.5“", "PLASTIC LEG 胶脚 QTY", "32"],
    ["CABINET MATERIAL"],
    ["ITEM NAME", "MODEL NO", "QT", "DESCRIPTION", "SPECIAL ORDER"],
    ["BOX MATERIAL", "PLME0411-192S36", "", "19mm (3/4\") New White TFL with 2.5mm MR MDF X-band V/C 4'X8'..TSCA Title IV Compliant"],
    ["BOX EDGE", "EB1-WD354HG-P", "", "1mm Designer White High Gloss PVC edge-banding 15/16\" x 500'"],
    ["BACKING", "PLME0411-192S36", "", "19mm (3/4\") New White TFL with 2.5mm MR MDF X-band V/C 4'X8'..TSCA Title IV Compliant"],
    ["DOOR COLOR", "MDPE3004-181S90", "", "3/4\" (18mm) Pearl White High Gloss PET MDF Core 4x8"],
    ["DOOR EDGE", "EB1.3-3004-90P", "", "1.3mm Solid White HG ABS Edge-Banding 328'..Matching MDPE3004 / WQ63004"],
    ["MITER EDGE"],
    ["OTHER"],
    ["OTHER"],
    ["OTHER"],
    ["OTHER"],
    ["HARDWARE MATERIAL"],
    ["ITEM NAME", "MODEL NO", "QT", "DESCRIPTION", "SPECIAL ORDER"],
    ["DOOR HINGE", "CNG"],
    ["DRAWER SLIDE"],
    ["DRAWER BOX", "", "", "WHITE METAL DRAWER BOX\n白色铁盒"])
  }

  return (
    <div>
    <NavbarAfterLogin/>
      <div className="container mt-2" style={{ width: '1500px' }}>
        <div className="row">
          <div className="col-12">
            <div className="jumbotron">
              <h1 className="text-left"><strong>Place Order</strong>&nbsp;&nbsp;</h1>
              <h3 className="text-left">
                <strong>Shopping Cart -- Placing Order</strong>
                &nbsp;&nbsp; PO#:{PO}</h3>
              {select && ( // Check if select is not null
              <form className="order-form"
                style={{ border: '1px solid black', padding: '20px' }}>
                <h5 className="text-left"
                  style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <table>
                  <thead>
                    <tr>
                    <th scope="col" colSpan="5" style={{ width: '1700px' }}>
                      {select.cabinetBox === 'WHITE_BOX' ? (
                        <>1. WHITE MELAMINE PLYWOOD CABINET BOX (BOX EDGE MATCH DOOR)</>
                      ) : select.cabinetBox === 'COMODO_BOX' ? (
                        <>1. STOCK WHITE PLYWOOD CABINET BOX WITH WHITE MATTE EDGE (COMODO BOX)</>
                      ) : select.cabinetBox === 'MAPLE_BOX' ? (
                        <>1. MODERN MAPLE MELAMINE PLYWOOD CABINET BOX (BOX EDGE MATCH DOOR)</>
                      ) : select.cabinetBox === 'BIRCH_BOX' ? (
                        <>1. NATURE BIRCH PLYWOOD CABINET BOX (BOX EDGE MATCH DOOR)</>
                      ) : select.cabinetBox === 'DOMESTIC_MAPLE_BOX' ? (
                        <>1. DOMESTIC MAPLE PLYWOOD CABINET BOX (BOX EDGE MATCH DOOR)</>
                      ) : select.cabinetBox === 'GREY_BOX' ? (
                        <>1. GREY MELAMINE PLYWOOD CABINET BOX (BOX EDGE MATCH DOOR)</>
                      ) : (
                        <>Unknown cabinet box option</>
                      )}
                    </th>
                    </tr>
                    <tr>
                      <th scope="col" colSpan="5" style={{ width: '1700px' }}>2. {select.ADoorColor}</th>
                    </tr>
                    <tr>
                      <th scope="col" colSpan="5" style={{ width: '1700px' }}>3. {select.BDoorColor}</th>
                    </tr>
                    <tr>
                      <th scope="col" colSpan="5" style={{ width: '1700px' }}>4. {select.CDoorColor}</th>
                    </tr>
                    <tr>
                      <th scope="col" colSpan="5" style={{ width: '1700px' }}>5. {select.hingeType} Hinge</th>
                    </tr>
                    <tr>
                      <th scope="col" colSpan="5" style={{ width: '1700px' }}>6. {select.slide}</th>
                    </tr>
                    <tr>
                      <th scope="col" colSpan="5" style={{ width: '1700px' }}>7. {select.drawer}</th>
                    </tr>
                    <tr>
                      <th scope="col" colSpan="5" style={{ width: '1700px' }}>8. {select.cabinetLeg}</th>
                    </tr>
                    <tr>
                      <th scope="col" colSpan="5" style={{ width: '1700px' }}>Item</th>
                    </tr>
                  </thead>
                    <tbody>
                      <tr>
                        <td>
                        <table>
                        <tbody>
                          {cabinet && cabinet.map((item, index) => (
                            <tr key={index}>
                              <td colspan="1" style={{ width: '1200px' }}>
                                {item.qty}PC_{item.doorColor}_{item.width}*{item.height}*{item.depth}_{item.hinge}_{item.finLOrR}_{item.customizeAddOn}_{item.memo}_{item.apt}___${(item.qty * item.price).toFixed(2)}
                              </td>
                            </tr>
                          ))}
                          {cabinetDoor && cabinetDoor.map((item, index) => (
                            <tr key={index}>
                              <td colspan="1" style={{ width: '1200px' }}>
                                {item.qty} PC_{item.panelId}_{item.width}*{item.height} _
                                {item.matchGrain ? 'G' : ''}_{item.miterCut}_{item.hingeHole ? 'H': ''}_{item.edge}_{item.drill}_{item.custom}_${item.subtotal}
                              </td>
                            </tr>
                          ))}

                          {accessory && accessory.map((item, index) => (
                            <tr key={index}>
                            <td colspan="1" style={{ width: '1200px' }}>
                              {item.accQty} PC_{item.accColor}_{item.acc}_{item.accWidth}*{item.accHeight}*{item.accDepth}_${(item.accPrice).toFixed(2)}
                            </td>
                          </tr>
                          ))}
                          <tr>
                            <td colSpan="6">Total qty: {totalQty}</td>
                            <td colSpan="1">Total: {totalPrice}</td>

                          </tr>
                          <tr>
                          </tr>
                        </tbody>
                      </table>
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
                    </tfoot>
                  </table>
                </h5>
              </form>
              )}
            </div>
          </div>
        </div>
        <CSVLink data={csvData} filename={`order_${PO}.csv`}>
          <button onClick={handleClick} 
          className="form-control"
          style={{ width: "auto", maxWidth: "150px" }}
          >CHECK OUT</button>
        </CSVLink>
          {/* <button onClick={handleClick} 
          className="form-control"
          style={{ width: "auto", maxWidth: "150px" }}
          >CHECK OUT</button> */}
        <button onClick={handleClick2} 
        className="form-control"
        style={{ width: "auto", maxWidth: "150px" }}
        >GO BACK</button>
      </div>
    </div>
  );
}

export default CheckOutBody;

import React, { useState,  useEffect} from "react";
import Axios from "axios";


function TableHead({item,handleEditAllInOne}) {
  const [cabinetDoor, setCabinetDoor] = useState([]);
  useEffect(() => {
    Axios.get(`https://us-east-1.aws.data.mongodb-api.com/app/application-0-hxfdv/endpoint/cabinet_door`)
      .then((res) => {
        setCabinetDoor(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <thead className="table-success">
          <tr>
            <th colSpan = {2} className="needBorder" style={{ textAlign: 'right' }}>*CABINET BOX:</th>
            <th colSpan = {2}>
            <select
                list="dataBox"
                className="form-control"
                name="cabinetBox"
                value={item.cabinetBox}
                onChange={(event) => handleEditAllInOne(event,  item)}
                >
                <option value="">-- Select --</option>
                <option value="COMODO_BOX">COMODO_BOX</option>
                <option value="WHITE_BOX">WHITE_BOX</option>
                <option value="MAPLE_BOX">MAPLE_BOX</option>
                <option value="BIRCH_BOX">BIRCH_BOX</option>
                <option value="DOMESTIC_MAPLE_BOX">DOMESTIC_MAPLE_BOX</option>
                <option value="GREY_BOX">GREY_BOX</option>
                </select>
            </th>
            <th className="needBorder" style={{ textAlign: 'right' }}>B DOOR COLOR:</th>
            <th colSpan = {2}><input
                  type="text"
                  list="dataBdoor"
                  className="form-control"
                  name="BDoorColor"
                  value={item.BDoorColor}
                  style={{ margin: "0 auto"  }}
                  onChange={(event) => handleEditAllInOne(event,  item)}
                  />
            <datalist id="dataBdoor">
              {cabinetDoor.map((item, key) => (
                <option key={key} value={item.color} />
              ))}
            </datalist></th>
            <th className="needBorder">HINGE:</th>
            <th style={{ width: "25em" }}>
              <select
                list="dataHinge"
                className="form-control"
                name="hingeType"
                value={item.hingeType}
                onChange={(event) => handleEditAllInOne(event, item)}
              >
                <option value="">-- Select --</option>
                <option value="STANDARD">STANDARD</option>
                <option value="BLUM">BLUM</option>
              </select>
            </th>
            <th className="needBorder">DRAWER BOX:</th>
            <th colSpan = {2}>
            <select
                type="text"
                list="dataDrawer"
                className="form-control"
                name="drawer"
                value={item.drawer}
                style={{ margin: "0 auto"  }}
                onChange={(event) => handleEditAllInOne(event,  item)}
                >
                  <option value="">-- Select --</option>
                  <option value="METAL DRAWER WHITE">METAL DRAWER WHITE</option>
                  <option value="METAL DRAWER SLIM GREY">METAL DRAWER SLIM GREY</option>
                  <option value="PLYWOOD DRAWER">PLYWOOD DRAWER</option>
                  <option value="DOVETAIL DRAWER">DOVETAIL DRAWER</option>  
             </select>     
            </th>

          </tr>
          <tr>
            <th colSpan = {2} className="needBorder" style={{ textAlign: 'right' }}>*A DOOR COLOR:</th>
            <th colSpan = {2}>
                <input
                    type="text"
                    list="dataAdoor"
                    className="form-control"
                    name="ADoorColor"
                    value={item.ADoorColor}
                    style={{ margin: "0 auto"  }}
                    onChange={(event) => handleEditAllInOne(event,  item)}
                    />
                <datalist id="dataAdoor">
                  {cabinetDoor.map((item, key) => (
                    <option key={key} value={item.color} />
                  ))}
                </datalist>
            </th>
            <th className="needBorder" style={{ textAlign: 'right' }}>C DOOR COLOR:</th>
            <th colSpan = {2}>
                <input
                type="text"
                list="dataCdoor"
                className="form-control"
                name="CDoorColor"
                style={{ margin: "0 auto", width: "15em"   }}
                value={item.CDoorColor}
                onChange={(event) => handleEditAllInOne(event,  item)}
                />
            <datalist id="dataCdoor">
              {cabinetDoor.map((item, key) => (
                <option key={key} value={item.color} />
              ))}
            </datalist>
            </th>
            <th className="needBorder">SLIDE:</th>
            <th>
            <select
                type="text"
                list="dataSlide"
                className="form-control"
                name="slide"
                value={item.slide}
                style={{ margin: "0 auto", width: "15em"   }}
                onChange={(event) => handleEditAllInOne(event,  item)}
                >
                  <option value="">-- Select --</option>
                  <option value="STANDARD UM SLIDE">STANDARD UM SLIDE</option>
                  <option value="STANDARD METAL SLIDE">STANDARD METAL SLIDE</option>
                  <option value="BLUM UM SLIDE">BLUM UM SLIDE</option>
                  <option value="SALICE UM SLIDE">SALICE UM SLIDE</option>
            </select>
            </th>
            <th className="needBorder">CABINET LEG:</th>
            <th colSpan = {2}>
              <select
              type="text"
              list ="dataCabinetLeg"
              name ="cabinetLeg"
              className="form-control"
              value={item.cabinetLeg}
              onChange={(event) => handleEditAllInOne(event,  item)}
              >
                  <option value="None">None</option>
                  <option value="PLASTIC">PLASTIC</option>
                  <option value="WOOD">WOOD</option> 
              </select>
            </th>
          </tr>
      <tr>
        <th className="text-center">Cabinet</th>
        <th className="text-center">Copy</th>
        <th className="text-center">Item#</th>
        <th className="text-center">Cabinet Size</th>
        <th className="text-center">Door Color</th>
        <th className="text-center">Qty</th>
        <th className="text-center">Width(inch)</th>
        <th className="text-center">Height(inch)</th>
        <th className="text-center">Depth</th>
        <th className="text-center">Hinge L/R(optional)</th>
        <th className="text-center">Finish L/R(optional)</th>
        <th  colSpan="2" className="text-center">Price</th>
      </tr>
    </thead>
  );
}

export default TableHead;
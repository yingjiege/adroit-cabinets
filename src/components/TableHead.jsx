import React from "react";
import cabinetDoor from "../cabinetDoor";
import customer from "../CabinetDiscount";


function TableHead({item,handleEditAllInOne, handleUpdateTwo}) {

  return (
    <thead className="table-success">
      <tr>
            <th colSpan={3} rowSpan={3}>
              <img
                src="https://adroitmanufacturing.allmoxy.com/data/header/Adroit_logo_3d-01-01.png"
                alt="adroit-manufacturing-logo"
                width={120}
                height={50}
              />
            </th>
            <th colSpan={2}>
              Adroit
            </th>
            <th className="listhead">*CUSTERMER:</th>
            <th>
            <input
                type="text"
                list="dataCompany"
                className="form-control"
                name="company"
                value={item.company}
                onChange={(event) => handleUpdateTwo(event, item)}
              />
              <datalist id="dataCompany">
                {customer.map((item, key) => (
                  <option key={key} value={item.Company} />
                ))}
              </datalist>
            </th>
            <th className="listhead">PO#:</th>
            <th>
                <input
                type="text"
                list="dataPO"
                className="form-control"
                name="PO"
                value={item.PO}
                onChange={(event) => handleEditAllInOne(event,  item)}
                />
                </th>
            <th colSpan={2}>BILLING TO:</th>
            <th colSpan={3}>MEMO:</th>
          </tr>
          <tr>
            <th colSpan={2}>Adroit LOGISTICS</th>
            <th className="needBorder">*CABINET BOX:</th>
            <th>
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
            <th className="needBorder">HINGE:</th>
            <th>
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
            <th colSpan={3} rowSpan={5} className="needBorder"></th>
            <th colSpan={3} rowSpan={5} className="needBorder"></th>
          </tr>
          <tr>
            <th colSpan={2}>859 39th St</th>
            <th className="needBorder">*A DOOR COLOR:</th>
            <th>
                <input
                    type="text"
                    list="dataAdoor"
                    className="form-control"
                    name="ADoorColor"
                    value={item.ADoorColor}
                    onChange={(event) => handleEditAllInOne(event,  item)}
                    />
                <datalist id="dataAdoor">
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
                onChange={(event) => handleEditAllInOne(event,  item)}
                >
                  <option value="">-- Select --</option>
                  <option value="STANDARD UM SLIDE">STANDARD UM SLIDE</option>
                  <option value="STANDARD METAL SLIDE">STANDARD METAL SLIDE</option>
                  <option value="BLUM UM SLIDE">BLUM UM SLIDE</option>
                  <option value="SALICE UM SLIDE">SALICE UM SLIDE</option>
            </select>
            </th>
          </tr>
          <tr>
          <th colSpan={3}>www.adroit.com</th>
            <th colSpan={2}>BROOKLYN</th>
            <th className="needBorder">B DOOR COLOR:</th>
            <th><input
                  type="text"
                  list="dataBdoor"
                  className="form-control"
                  name="BDoorColor"
                  value={item.BDoorColor}
                  onChange={(event) => handleEditAllInOne(event,  item)}
                  />
            <datalist id="dataBdoor">
              {cabinetDoor.map((item, key) => (
                <option key={key} value={item.color} />
              ))}
            </datalist></th>
            <th className="needBorder">DRAWER BOX:</th>
            <th>
            <select
                type="text"
                list="dataDrawer"
                className="form-control"
                name="drawer"
                value={item.drawer}
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
          <th colSpan={3}>customer.service@adroit.com</th>
            <th colSpan={2}>Tel.(718)431-0089</th>
            <th className="needBorder">C DOOR COLOR:</th>
            <th>
                <input
                type="text"
                list="dataCdoor"
                className="form-control"
                name="CDoorColor"
                value={item.CDoorColor}
                onChange={(event) => handleEditAllInOne(event,  item)}
                />
            <datalist id="dataCdoor">
              {cabinetDoor.map((item, key) => (
                <option key={key} value={item.color} />
              ))}
            </datalist></th>

            <th className="needBorder">CABINET LEG:</th>
            <th>
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
          <th colSpan={3} rowSpan={2}>com.: 517 LUIS VAZQUEZ</th>
            <th colSpan={2}>Fax.(718)431-0060</th>
            <th className="needBorder">SP ORDER LEAD TIME:</th>
            <th></th>
            <th className="needBorder">Assemble Time (Min): </th>
            <th></th>
          </tr>
          <tr>
            <th colSpan={2}>-- Operation insured by MAPFRE</th>
            <th className="needBorder">9407</th>
            <th colSpan={1}>Tel:+11234567890</th>
            <th className="needBorder">Customer Multi</th>
            <th className="needBorder">
              <input
                list="dataDiscount"
                className="form-control"
                name="discount"
                value={isNaN(item.discount) ? item.discount : item.discount + "%"}
                onChange={(event) => handleUpdateTwo(event, item)}
                readOnly
                disabled
              />
            </th>
            <th colSpan={4}></th>
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
        <th className="text-center">Hinge L/R</th>
        <th className="text-center">Finish L/R</th>
        <th  colSpan="2" className="text-center">Price</th>
      </tr>
    </thead>
  );
}
export default TableHead;

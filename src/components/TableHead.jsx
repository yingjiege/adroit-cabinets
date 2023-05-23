import React from "react";
import cabinetDoor from "../cabinetDoor";
import cabinetBox from "../cabinetBox";
import hinge from "../hinge";
import slide from "../slide";
import drawer from "../drawer";

function TableHead({item,handleEditAllInOne}) {
  return (
    <thead className="table-success">
      <tr>
            <th colSpan={3} rowSpan={3}>

            </th>
            <th colSpan={3}>
              Adroit
            </th>
            <th className="listhead">CUSTERMER:</th>
            <th>
            <input
                type="text"
                list="dataCustomer"
                className="form-control"
                name="customer"
                value={item.customer}
                onChange={(event) => handleEditAllInOne(event,  item)}
                />
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
            <th colSpan={3}>Adroit LOGISTICS</th>
            <th className="needBorder">CABINET BOX:</th>
            <th>
            <input
                type="text"
                list="dataBox"
                className="form-control"
                name="cabinetBox"
                value={item.cabinetBox}
                onChange={(event) => handleEditAllInOne(event,  item)}
                />
                <datalist id="dataBox">
              {cabinetBox.map((item, key) => (
                <option key={key} value={item} />
              ))}
            </datalist>
            </th>
            <th className="needBorder">HINGE:</th>
            <th>
            <input
                type="text"
                list="dataHinge"
                className="form-control"
                name="hingeType"
                value={item.hinge}
                onChange={(event) => handleEditAllInOne(event,  item)}
                />
                <datalist id="dataHinge">
              {hinge.map((item, key) => (
                <option key={key} value={item} />
              ))}
            </datalist>


            </th>
            <th colSpan={3} rowSpan={5} className="needBorder"></th>
            <th colSpan={3} rowSpan={5} className="needBorder"></th>
          </tr>
          <tr>
            <th colSpan={3}>859 39th St</th>
            <th className="needBorder">A DOOR COLOR:</th>
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
            <input
                type="text"
                list="dataSlide"
                className="form-control"
                name="slide"
                value={item.slide}
                onChange={(event) => handleEditAllInOne(event,  item)}
                />
                <datalist id="dataSlide">
              {slide.map((item, key) => (
                <option key={key} value={item} />
              ))}
            </datalist>
            </th>
          </tr>
          <tr>
          <th colSpan={3}>www.adroit.com</th>
            <th colSpan={3}>BROOKLYN</th>
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
            <input
                type="text"
                list="dataDrawer"
                className="form-control"
                name="drawer"
                value={item.drawer}
                onChange={(event) => handleEditAllInOne(event,  item)}
                />
                <datalist id="dataDrawer">
              {drawer.map((item, key) => (
                <option key={key} value={item} />
              ))}
            </datalist>
            </th>
          </tr>
          <tr>
          <th colSpan={3}>customer.service@adroit.com</th>
            <th colSpan={3}>Tel.(718)431-0089</th>
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
              <input
              type="text"
              className="form-control"

              />
            </th>
          </tr>
          <tr>
          <th colSpan={3} rowSpan={2}>com.: 517 LUIS VAZQUEZ</th>
            <th colSpan={3}>Fax.(718)431-0060</th>
            <th className="needBorder">SP ORDER LEAD TIME:</th>
            <th></th>
            <th className="needBorder">Assemble Time (Min): </th>
            <th></th>
          </tr>
          <tr>
            <th colSpan={3}>-- Operation insured by MAPFRE</th>
            <th className="needBorder">Bulks</th>
            <th className="needBorder">9407</th>
            <th colSpan={6}>Tel:+11234567890</th>
          </tr>
      <tr>
        <th colSpan="2" className="text-center"></th>
        <th className="text-center">Item#</th>
        <th className="text-center">Cabinet Size</th>
        <th className="text-center">Door Type</th>
        <th className="text-center">Door Color</th>
        <th className="text-center">Width(inch)</th>
        <th className="text-center">Height(inch)</th>
        <th className="text-center">Depth</th>
        <th className="text-center">Hinge L/R</th>
        <th className="text-center">Qty</th>
        <th className="text-center">Price</th>
        <th className="text-center">Door Only</th>
        <th className="text-center">Box Only</th>
      </tr>
    </thead>
  );
}
export default TableHead;

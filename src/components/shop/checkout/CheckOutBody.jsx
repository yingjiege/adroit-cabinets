import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Axios from "axios";
import NavbarAfterLogin from "../../navbar/NavbarAfterLogin";

function CheckOutBody() {
  const [searchedCabinet, setSearchedCabinet] = useState(null);
  const storedInsertedId = localStorage.getItem('insertedId');

  useEffect(() => {
    Axios.get("https://us-east-1.aws.data.mongodb-api.com/app/application-0-hxfdv/endpoint/get_order_list")
      .then((res) => {
        setSearchedCabinet(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/checkoutform');
  };
  const handleClick2 = () => {
    navigate('/shop');
  };

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
  console.log(select)
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
                              <td colspan="1" style={{ width: '500px' }}>
                                {item.qty} {item.doorColor}_{item.width}*{item.height}*{item.depth}_{item.memo}_${(item.qty * item.price).toFixed(2)}
                              </td>
                            </tr>
                          ))}
                          {cabinetDoor && cabinetDoor.map((item, index) => (
                            <tr key={index}>
                              <td colspan="1">
                                Cabinet Door : {item.panelFinish}
                              </td>
                              <td colspan="1">
                                Color: {item.panelId}
                              </td>
                              <td style={{ width: '100px' }}>
                                W: {item.width} 
                              </td>
                              <td style={{ width: '90px' }}>
                                H: {item.height}
                              </td>
                              <td style={{ width: '80px' }}>
                                D: {item.depth}
                              </td>
                              <td style={{ width: '60px' }} >
                                Qty: <span className="quantity" style={{ fontSize: "18px" }}>{item.qty}</span>
                              </td>
                              <td>
                                Subtotal: <span className="subtotal" style={{ fontSize: "18px" }}>${item.subtotal}</span>
                              </td>
                              <td colspan=""></td> {/* Empty cells to align with the previous row */}
                            </tr>
                          ))}

                          {accessory && accessory.map((item, index) => (
                            <tr key={index}>
                              <td colspan="1">
                                Accessory: {item.acc}
                              </td>
                              <td colspan="1">
                                Color: {item.accColor}
                              </td>
                              <td style={{ width: '100px' }}>
                                W: {item.accWidth} 
                              </td>
                              <td style={{ width: '90px' }}>
                                H: {item.accHeight}
                              </td>
                              <td style={{ width: '80px' }}>
                                D: {item.accDepth}
                              </td>
                              <td style={{ width: '60px' }} >
                                Qty: <span className="quantity" style={{ fontSize: "18px" }}>{item.accQty}</span>
                              </td>
                              <td>
                                Subtotal: <span className="subtotal" style={{ fontSize: "18px" }}>${item.accPrice}</span>
                              </td>
                              <td colspan="1"></td> {/* Empty cells to align with the previous row */}
                            </tr>
                          ))}
                          <tr>
                            <td colSpan="6">Total qty: {totalQty}</td>
                            <td colSpan="1">Total: {totalPrice}</td>
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
        <button onClick={handleClick} 
        className="form-control"
        style={{ width: "auto", maxWidth: "150px" }}
        >CHECK OUT</button>
        <button onClick={handleClick2} 
        className="form-control"
        style={{ width: "auto", maxWidth: "150px" }}
        >GO BACK</button>
      </div>
    </div>
  );
}

export default CheckOutBody;

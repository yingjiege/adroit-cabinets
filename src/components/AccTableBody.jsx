import React, { useState , useEffect} from "react";
import Axios from "axios";

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
    const [Acc, setAcc] = useState([]);
  useEffect(() => {
    Axios.get(`https://us-east-1.aws.data.mongodb-api.com/app/application-0-hxfdv/endpoint/accessory`)
      .then((res) => {
        const searchedCabinet = res.data;
        setAcc(searchedCabinet);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

    
  
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
        <td >
          <input
            type="text"
            list="acc"
            className="form-control"
            placeholder="Select Accessories"
            name="acc"
            style={{ width: "14em" }}
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
            placeholder="Select ACC Color"
            name="accColor"
            style={{ width: "12em" }}
            value={Accitem.accColor} 
            onChange={(event) => handleEditedAcc(event, Accitem.id, Accitem, newItem)}
                       />
          <datalist id="accColor">
            {colorSelected.map((item, key) => (
              <option key={key} value={item} />
            ))}
          </datalist>
        </td>
        <td style={{ textAlign: "center" }} >
          <input
            type="number"
            name="accQty"
            className="form-control"
            style={{ width: "5em", margin: "0 auto"  }}
            value={Accitem.accQty}
            min="0"
            onChange={(event) => handleEditedAcc(event, Accitem.id, Accitem, newItem)}
          />
        </td>
          <td className="text-center" style={{ textAlign: "center" }} colSpan={2}>
            <input
              type="number"
              name="accWidth"
              className="form-control"
              style={{ width: "5em"  }}
              value={Accitem.accWidth}
              min="0"
              readOnly
              disabled
            />
          </td>
        <td className="text-center">
          <input
            type="number"
            name="accHeight"
            className="form-control"
            style={{ width: "5em"  }}
            value={Accitem.accHeight}
            readOnly
            disabled />
        </td>
        <td className="text-center">
          <input
            type="number"
            name="accDepth"
            className="form-control"
            style={{ width: "5em"}}
            value={Accitem.accDepth}
            readOnly
            disabled />
        </td>
        <td colSpan="10">
          <input
            name="accPrice"
            className="form-control bg-light rounded-pill"
            type="number"
            value={Accitem.accPrice}
            style={{ width: "8em", margin: "0 auto"  }}
            readOnly
            disabled />
        </td>
        </tr>        
        );
  
  }

export default AccTableBody;
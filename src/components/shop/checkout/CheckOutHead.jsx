import React, { useState, useEffect } from "react";
import Axios from "axios";

function CheckOutHead(){
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
  const filteredData = searchedCabinet && searchedCabinet.find(item => item._id === storedInsertedId);
  const PO = filteredData && filteredData.PO;

    return (
        <thead>
      <div className="container mt-2" style={{ width: '1500px' }}>
        <div className="row">
          <div className="col-12">
            <div className="jumbotron">
              <h1 className="text-left"><strong>Place Order</strong>&nbsp;&nbsp;</h1>
              <h3 className="text-left">
                <strong>Shopping Cart -- Placing Order</strong>
                &nbsp;&nbsp; PO#:{PO}</h3>
                </div>
          </div>
        </div>
        </div>
      </thead>
    )
}

export default CheckOutHead;
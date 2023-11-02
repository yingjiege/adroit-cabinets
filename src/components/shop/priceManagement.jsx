import React, { useState, useEffect } from "react";
import Axios from "axios";
import NavbarAfterLogin from "../navbar/NavbarAfterLogin";

function PriceManagement() {
  const [cabinet, setCabinet] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [searchedProduct, setSearchedProduct] = useState(null);

  useEffect(() => {
    Axios.get(
      "https://us-east-1.aws.data.mongodb-api.com/app/application-0-hxfdv/endpoint/cabinet"
    )
      .then((res) => {
        const cabinetData = res.data;
        setCabinet(cabinetData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSearch = () => {
    // Find the product with the entered ID in the cabinet data
    const product = cabinet.find((item) => item.ID === searchId);
    if (product) {
      setSearchedProduct(product);
    } else {
      setSearchedProduct(null);
    }
  };

  return (
    <div>
      <NavbarAfterLogin />
      <h1>Price Management</h1>
      <input
        type="text"
        placeholder="Enter Product ID"
        value={searchId}
        onChange={(e) => setSearchId(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      {searchedProduct ? (
        <div>
          <h2>Product Found:</h2>
          <pre>{JSON.stringify(searchedProduct, null, 2)}</pre>
          {/* Include other product details */}
        </div>
      ) : (
        <p>No product found with the entered ID.</p>
      )}
    </div>
  );
  
}

export default PriceManagement;

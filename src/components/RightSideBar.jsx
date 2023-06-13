import React from "react";

function RightSideBar({setInfo}) {
  const handleInfoChange = (e) => {
    setInfo((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div id="mySidenav" className="sidenav">
      <a href="a">SEND TO</a>
      <div>
        <i className="bi bi-printer-fill" style={{ color: "white" }}></i>
        <span style={{ color: "white"}}>print</span>
      </div>
      <a href="b">ORDER INFO</a>
      <div>
        <input  
          className="form-control" 
          placeholder="Order Name" 
          name = "name"
          onChange={handleInfoChange}
          ></input>
        <textarea className="form-control" placeholder="Description" name = "description" onChange={handleInfoChange}></textarea>
        <input className="form-control" type="date" placeholder="date" name = "date"  onChange={handleInfoChange}></input>
      </div>
      <a href="d">BILLING</a>
      <div >
      <textarea className="form-control" placeholder="Billing Instructions" rows={6} name = "billing"  onChange={handleInfoChange}></textarea>


      </div>
      <a href="d">MEMO</a>
      <div>
        <textarea className="form-control" placeholder="Memo" rows = {6} name = "memo"  onChange={handleInfoChange}></textarea>
      </div>
      <div>
        
        <i
          className="bi bi-save-fill btn btn-primary"
          style={{ color: "white", borderStyle: "solid" }}
        >
          Save Changes
        </i>
        <br></br>
        <i className="bi bi-send btn btn-primary" style={{ color: "white", borderStyle: "solid" }}>
          Submite Order
        </i>
        <br></br>
        <span style={{ color: "white"}}>By submitting this order you agree to our terms and conditions</span>
      </div>
    </div>
  );
}

export default RightSideBar;

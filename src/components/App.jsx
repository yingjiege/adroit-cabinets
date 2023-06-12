import React, { useState } from "react";
import CreateArea from "./CreateArea";
import Topbar from "./Topbar";
import RightSideBar from "./RightSideBar";

function App() {
  const [info, setInfo] = useState({
    name: "",
    description: "",
    date: "",
    billing: "",
    memo: ""
  });


  return (
    <div className="App">
      <Topbar/>
      <div className="main-container" id="main">
      <RightSideBar setInfo={setInfo} />
        <div id="main">
          <CreateArea info={info} />
        </div >
      </div>
      </div>
  );
}

export default App;
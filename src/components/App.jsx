import React, { useState } from "react";
import Topbar from "./Topbar";
import CreateArea from "./CreateArea";
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
      <div className="main-container" id="main">
        <div id="main">
          <CreateArea info={info} />
        </div>
        <RightSideBar setInfo={setInfo} />
      </div>
  );
}

export default App;

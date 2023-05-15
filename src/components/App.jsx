// App.js
import React, { useState} from "react";
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
    <div className="App">
      <Topbar />
      <RightSideBar setInfo={setInfo} />
      <div id="main">
        <CreateArea info={info} />
      </div>
    </div>
  );
}

export default App;

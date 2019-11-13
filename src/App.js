import React from "react";
import "./App.css";

import Mapbox from "./components/Mapbox";

function App() {
  return (
    <div className="App">
      <div id="inputWrapper">
        <input />
      </div>
      <br />
      <Mapbox />
    </div>
  );
}

export default App;

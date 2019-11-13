import React from "react";
import "./App.css";

// import Mapbox from "./components/Mapbox";
// import InputLocation1 from "./components/InputLocation1";
// import InputLocation2 from "./components/InputLocation2";

function App() {
  const [location1, setLocation1] = React.useState(
    "Singel 258, Amsterdam 1016AB"
  );
  const [location2, setLocation2] = React.useState(
    "Mercatorplein 72, Amsterdam 1056CL"
  );

  const handleClick = async () => {
    const location1Response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        location1
      )}.json?access_token=pk.eyJ1IjoiYWRkaXNvbnNjaHVsdHoiLCJhIjoiY2p1YXpsMWxxMDBvejQ0cGRqNm5yZDh4aSJ9.-nkTtj1EUib3G4L1oqMaTQ`
    );
    const location1Data = await location1Response.json();
    const location1Coords = location1Data.features[0].center;

    const location2Response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        location2
      )}.json?access_token=pk.eyJ1IjoiYWRkaXNvbnNjaHVsdHoiLCJhIjoiY2p1YXpsMWxxMDBvejQ0cGRqNm5yZDh4aSJ9.-nkTtj1EUib3G4L1oqMaTQ`
    );
    const location2Data = await location2Response.json();
    const location2Coords = location2Data.features[0].center;

    console.log("LOC1", location1Coords);
    console.log("LOC2", location2Coords);

    const directions = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${location1Coords[0]},${location1Coords[1]};${location2Coords[0]},${location2Coords[1]}\\?access_token=pk.eyJ1IjoiYWRkaXNvbnNjaHVsdHoiLCJhIjoiY2p1YXpsMWxxMDBvejQ0cGRqNm5yZDh4aSJ9.-nkTtj1EUib3G4L1oqMaTQ
      `
    );
    const routes = await directions.json();
    console.log("FINAL ROUTE", routes);
  };

  return (
    <div className="App">
      <div id="inputWrapper" style={{ zIndex: 200 }}>
        <input
          placeholder={location1}
          onChange={e => {
            setLocation1(e.target.value);
          }}
        />
        <hr />
        <input
          placeholder={location2}
          onChange={e => {
            setLocation2(e.target.value);
          }}
        />
        <hr />

        <button onClick={handleClick}>Submit</button>
      </div>
      {/* <div>
        <Mapbox />
      </div> */}
    </div>
  );
}

export default App;

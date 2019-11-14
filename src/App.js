import React from "react";
import "./App.css";

import Mapbox from "./components/Mapbox";
// import InputLocation1 from "./components/InputLocation1";
// import InputLocation2 from "./components/InputLocation2";

import * as GeoData from "./data/directions.json";

function App() {
  const [location1, setLocation1] = React.useState(
    "Albert Cuypstraat, 1073 BD Amsterdam"
  );
  const [location2, setLocation2] = React.useState(
    "Mercatorplein 72, Amsterdam 1056CL"
  );

  const [points, setPoints] = React.useState([]);

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

    console.log("LOC1 Coordinates", location1Coords);
    console.log("LOC2 Coordinates", location2Coords);

    const directions = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/walking/${location1Coords[0]},${location1Coords[1]};${location2Coords[0]},${location2Coords[1]}\\?geometries=geojson&access_token=pk.eyJ1IjoiYWRkaXNvbnNjaHVsdHoiLCJhIjoiY2p1YXpsMWxxMDBvejQ0cGRqNm5yZDh4aSJ9.-nkTtj1EUib3G4L1oqMaTQ
      `
    );
    const response = await directions.json();

    const points = response.routes[0].geometry.coordinates;
    console.log("POINTS", points);

    setPoints([...points]);
  };

  function Animate() {}

  return (
    <div className="App">
      <div id="inputWrapper" style={{ zIndex: 1000, paddingTop: 50 }}>
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
      {/* <div
        style={{ position: "absolute", top: 150 }}
        className={"mapContainer"}
      >
        <Mapbox points={points} />
      </div> */}
      <div
        style={{ position: "absolute", top: 150 }}
        className={"mapContainer"}
      >
        <Mapbox
          points={GeoData.default[0].legs[0].steps[2].intersections.map(
            x => x.location
          )}
        />
      </div>
    </div>
  );
}

export default App;

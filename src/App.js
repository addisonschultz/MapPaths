import React from "react";
import "./App.css";

import Mapbox from "./components/Mapbox";

// import * as GeoData from "./data/directions.json";

function App() {
  // First location state
  const [location1, setLocation1] = React.useState(
    "Mercatorplein 72, Amsterdam 1056CL"
  );
  // Second location state
  const [location2, setLocation2] = React.useState(
    "Albert Cuypstraat, 1073BD Amsterdam"
  );
  // Route state
  const [route, setRoute] = React.useState([]);
  // Visible route state. This is what gets updated and rendered
  const [visiblePoints, setVisiblePoints] = React.useState([]);

  // Click function that searches for data
  const handleClick = React.useCallback(async () => {
    /**
     * Fetch the first location
     */
    const location1Response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        location1
      )}.json?access_token=pk.eyJ1IjoiYWRkaXNvbnNjaHVsdHoiLCJhIjoiY2p1YXpsMWxxMDBvejQ0cGRqNm5yZDh4aSJ9.-nkTtj1EUib3G4L1oqMaTQ`
    );
    const location1Data = await location1Response.json();
    const location1Coords = location1Data.features[0].center;

    /**
     * Fetch the second location
     */
    const location2Response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        location2
      )}.json?access_token=pk.eyJ1IjoiYWRkaXNvbnNjaHVsdHoiLCJhIjoiY2p1YXpsMWxxMDBvejQ0cGRqNm5yZDh4aSJ9.-nkTtj1EUib3G4L1oqMaTQ`
    );
    const location2Data = await location2Response.json();
    const location2Coords = location2Data.features[0].center;

    /**
     * Fetch the directions between the two
     */
    const directions = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/walking/${location1Coords[0]},${location1Coords[1]};${location2Coords[0]},${location2Coords[1]}\\?geometries=geojson&access_token=pk.eyJ1IjoiYWRkaXNvbnNjaHVsdHoiLCJhIjoiY2p1YXpsMWxxMDBvejQ0cGRqNm5yZDh4aSJ9.-nkTtj1EUib3G4L1oqMaTQ
      `
    );
    const response = await directions.json();
    setRoute(response.routes[0].geometry.coordinates);
  }, [location1, location2]);

  // Animation to update the visible points until full
  React.useEffect(() => {
    if (route.length > 0 && visiblePoints.length < route.length) {
      setTimeout(() => {
        const index = visiblePoints.length === 0 ? 0 : visiblePoints.length - 1;
        setVisiblePoints([...visiblePoints, ...route.slice(index, index + 1)]);
      }, 100);
    }
  }, [route, visiblePoints]);

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
      <div
        style={{ position: "absolute", top: 150 }}
        className={"mapContainer"}
      >
        <Mapbox points={visiblePoints} />
      </div>
    </div>
  );
}

export default App;

import * as React from "react";
import { Frame, Stack } from "framer";

export function Input() {
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

  return (
    <Stack background={null}>
      <Frame>
        <input
          placeholder={location1}
          onChange={e => {
            setLocation1(e.target.value);
          }}
        />
        {location1}
      </Frame>

      <Frame>
        <input
          placeholder={location2}
          onChange={e => {
            setLocation2(e.target.value);
          }}
        />
        {location2}
      </Frame>
    </Stack>
  );
}

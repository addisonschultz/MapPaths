import * as React from "react";
import { Override, Data } from "framer";

const data = Data({
  location1: "",
  location2: "",
  route: []
});

// const handleClick = React.useCallback(async () => {
//   /**
//    * Fetch the first location
//    */
//   const location1Response = await fetch(
//     `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
//       data.location1
//     )}.json?access_token=pk.eyJ1IjoiYWRkaXNvbnNjaHVsdHoiLCJhIjoiY2p1YXpsMWxxMDBvejQ0cGRqNm5yZDh4aSJ9.-nkTtj1EUib3G4L1oqMaTQ`
//   );
//   const location1Data = await location1Response.json();
//   const location1Coords = location1Data.features[0].center;

//   /**
//    * Fetch the second location
//    */
//   const location2Response = await fetch(
//     `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
//       data.location2
//     )}.json?access_token=pk.eyJ1IjoiYWRkaXNvbnNjaHVsdHoiLCJhIjoiY2p1YXpsMWxxMDBvejQ0cGRqNm5yZDh4aSJ9.-nkTtj1EUib3G4L1oqMaTQ`
//   );
//   const location2Data = await location2Response.json();
//   const location2Coords = location2Data.features[0].center;

//   /**
//    * Fetch the directions between the two
//    */
//   const directions = await fetch(
//     `https://api.mapbox.com/directions/v5/mapbox/walking/${location1Coords[0]},${location1Coords[1]};${location2Coords[0]},${location2Coords[1]}\\?geometries=geojson&access_token=pk.eyJ1IjoiYWRkaXNvbnNjaHVsdHoiLCJhIjoiY2p1YXpsMWxxMDBvejQ0cGRqNm5yZDh4aSJ9.-nkTtj1EUib3G4L1oqMaTQ
//     `
//   );
//   const response = await directions.json();
//   // For using inside a component
//   // setRoute(response.routes[0].geometry.coordinates);
//   data.route = response.routes[0].geometry.coordinates;
// }, [data.location1, data.location2]);

// For the first input
export function Input1(props): Override {
  return {
    onValueChange: value => {
      data.location1 = value;
      console.log(data.location1);
    }
  };
}

// For the second input
export function Input2(): Override {
  return {
    onValueChange: value => {
      data.location2 = value;
    }
  };
}

export function Button(): Override {
  return {
    onClick: () => {
      // handleClick();
      console.log(data.route);
    }
  };
}

import * as React from "react";
import { Override, Data } from "framer";

let mapboxApiAccessToken =
  "pk.eyJ1IjoiYWRkaXNvbnNjaHVsdHoiLCJhIjoiY2p1YXpsMWxxMDBvejQ0cGRqNm5yZDh4aSJ9.-nkTtj1EUib3G4L1oqMaTQ";

const data = Data({
  location1: "Stationsplein, 1012 AB Amsterdam",
  location2: "Singel 258, Amsterdam 1016AB",
  route: [[4.899268, 52.377964]]
});

// Input 1
export function From(props): Override {
  return {
    onValueChange: value => {
      data.location1 = value;
    }
  };
}

// Input 2
export function To(): Override {
  return {
    onValueChange: value => {
      data.location2 = value;
    }
  };
}

export function SearchButton(): Override {
  return {
    onClick: async () => {
      /**
       * Fetch location 1 coordinates, and store them in data.location1
       */
      const location1Response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          data.location1
        )}.json?access_token=${mapboxApiAccessToken}`
      );
      const location1Data = await location1Response.json();
      data.location1 = location1Data.features[0].center;

      /**
       * Fetch location 2 coordinates, and store them in data.location2
       */
      const location2Response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          data.location2
        )}.json?access_token=${mapboxApiAccessToken}`
      );
      const location2Data = await location2Response.json();
      data.location2 = location2Data.features[0].center;

      /**
       * Fetch directions between the two points, store that in the route
       */
      const directions = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/walking/${data.location1[0]},${data.location1[1]};${data.location2[0]},${data.location2[1]}\\?geometries=geojson&access_token=${mapboxApiAccessToken}
        `
      );
      const response = await directions.json();
      data.route = response.routes[0].geometry.coordinates;
    },
    whileTap: { scale: 0.98 }
  };
}

export function ClearButton(): Override {
  return {
    onClick: () => {
      data.route = [[4.899268, 52.377964]];
    },
    whileTap: { scale: 0.98 }
  };
}

export function Directions(): Override {
  return {
    route: data.route
  };
}

import * as React from "react";
import ReactMapGL from "react-map-gl";

import DeckGL from "@deck.gl/react";
import { PathLayer } from "@deck.gl/layers";

import * as GeoData from "../data/directions.json";

function Mapbox(props) {
  // console.log(
  //   GeoData.default[0].legs[0].steps.map(step =>
  //     console.log(step.intersections)
  //   )
  // );

  console.log(
    GeoData.default[0].legs[0].steps[2].intersections.map(x => x.location)
  );

  const data = [
    {
      // path: [
      //   [-74.00578, 40.713067],
      //   [-74.004577, 40.712425],
      //   [-74.003626, 40.71365],
      //   [-74.002666, 40.714243],
      //   [-74.002136, 40.715177],
      //   [-73.998493, 40.713452],
      //   [-73.997981, 40.713673],
      //   [-73.997586, 40.713448],
      //   [-73.99256, 40.713863]
      // ],
      path: GeoData.default[0].legs[0].steps[2].intersections.map(
        x => x.location
      ),
      name: "Test Data",
      color: [0, 153, 255]
    }
  ];

  const [state, setState] = React.useState({
    viewport: {
      width: 600,
      height: 400,
      latitude: 52.3667,
      longitude: 4.8945,
      zoom: 13
    }
  });

  const layer = new PathLayer({
    id: "path-layer",
    data,
    pickable: true,
    widthScale: 20,
    widthMinPixels: 2,
    getPath: d => d.path,
    getColor: d => d.color,
    getWidth: d => 0.01
  });

  return (
    <DeckGL
      initialViewState={state.viewport}
      controller={true}
      layers={[layer]}
    >
      <ReactMapGL
        {...state.viewport}
        onViewportChange={viewport => setState({ viewport })}
        mapboxApiAccessToken={
          "pk.eyJ1IjoiYWRkaXNvbnNjaHVsdHoiLCJhIjoiY2p1YXpsMWxxMDBvejQ0cGRqNm5yZDh4aSJ9.-nkTtj1EUib3G4L1oqMaTQ"
        }
      />
    </DeckGL>
  );
}

export default Mapbox;

import * as React from "react";
import ReactMapGL from "react-map-gl";

import DeckGL from "@deck.gl/react";
import { PathLayer } from "@deck.gl/layers";

import * as GeoData from "../data/directions.json";

function Mapbox(props) {
  const data = [
    {
      path: props.points,
      name: "Test Data",
      color: [0, 153, 255]
    }
  ];

  const [state, setState] = React.useState({
    viewport: {
      width: "100%",
      height: 700,
      latitude: 52.3667,
      longitude: 4.8945,
      zoom: 12
    }
  });

  // Path
  const layer = new PathLayer({
    id: "path-layer",
    data,
    pickable: true,
    widthScale: 20,
    widthMinPixels: 2,
    rounded: true,
    getPath: d => d.path,
    getColor: d => d.color,
    getWidth: d => 0.05
  });

  return (
    <DeckGL
      initialViewState={state.viewport}
      controller={true}
      layers={[layer]}
    >
      <ReactMapGL
        width={400}
        height={400}
        {...state.viewport}
        onViewportChange={viewport => setState({ viewport })}
        mapboxApiAccessToken={
          "pk.eyJ1IjoiYWRkaXNvbnNjaHVsdHoiLCJhIjoiY2p1YXpsMWxxMDBvejQ0cGRqNm5yZDh4aSJ9.-nkTtj1EUib3G4L1oqMaTQ"
        }
      />
    </DeckGL>
  );
}

Mapbox.defaultProps = {
  points: GeoData.default[0].legs[0].steps[2].intersections.map(x => x.location)
};

export default Mapbox;

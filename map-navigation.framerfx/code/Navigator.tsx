import * as React from "react";

// Map imports
import ReactMapGL from "react-map-gl";
import DeckGL from "@deck.gl/react";
import { PathLayer } from "@deck.gl/layers";

// Default Props data import
import * as GeoData from "./directions.json";

export function NavigatorMap(props) {
  const data = [
    {
      path: props.route,
      name: "Default Routes",
      color: [41, 209, 100]
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
    getWidth: d => 0.1
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

NavigatorMap.defaultProps = {
  // @ts-ignore
  // route: GeoData[0].legs[0].steps[2].intersections.map(x => x.location),
  route: [
    [4.899268, 52.377964],
    [4.89936, 52.377918],
    [4.898583, 52.377415],
    [4.898157, 52.377113],
    [4.894193, 52.374088],
    [4.893311, 52.374229],
    [4.892764, 52.374283],
    [4.891353, 52.374172],
    [4.8912, 52.374153],
    [4.890993, 52.374153],
    [4.89039, 52.373222],
    [4.889012, 52.373299],
    [4.888535, 52.373272],
    [4.888406, 52.372932]
  ]
};

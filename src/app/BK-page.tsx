"use client";
import React from "react";
import { GoogleMap, useJsApiLoader, PolygonF, PolylineF, MarkerF } from "@react-google-maps/api";
import pinIcon from './assets/pin.svg'

const containerStyle = {
  width: "1000px",
  height: "600px",
};

const center = {
  lat: 22.310696,
  lng: 73.192635,
};

// const SAN_FRANCISCO_COORDS = [
//   { lat: 37.772, lng: -122.214 },
//   { lat: 39.772, lng: -121.214 },
//   { lat: 35.772, lng: -120.214 },
//   { lat: 37.772, lng: -122.214 },
// ];

const SAN_FRANCISCO_COORDS = [
  { lat: 22.423041, lng: 73.088624},
  { lat: 22.410663, lng: 73.077638},
  { lat: 22.400823, lng: 73.083131},
  { lat: 22.392570, lng: 73.083818},
  { lat: 22.380825, lng: 73.093431},
  { lat: 22.365903, lng: 73.092744},
  { lat: 22.331609, lng: 73.097894},
  { lat: 22.273481, lng: 73.077981},
  { lat: 22.264268, lng: 73.073518},
  { lat: 22.262043, lng: 73.104417},
  { lat: 22.236305, lng: 73.097894},
  { lat: 22.229631, lng: 73.169305},
  { lat: 22.223593, lng: 73.182695},
  { lat: 22.242343, lng: 73.220117},
  { lat: 22.242660, lng: 73.231103},
  { lat: 22.250922, lng: 73.230417},
  { lat: 22.321447, lng: 73.259943},
  { lat: 22.359236, lng: 73.235567},
  { lat: 22.376698, lng: 73.163812},
  { lat: 22.412884, lng: 73.117120},
  { lat: 22.421136, lng: 73.090341}
]

const BRISBANE_COORDS = [
  { lat: -27.467, lng: 153.027 },
  { lat: -23.467, lng: 152.027 },
  { lat: -28.567, lng: 149.627 },
  { lat: -27.467, lng: 153.027 },
];

const sfPolygonOptions = {
  fillColor: "#FF5500",
  fillOpacity: 0,
  strokeColor: "#FF7700",
  strokeOpacity: 0,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  geodesic: false,
  paths: SAN_FRANCISCO_COORDS,
  zIndex: 1,
};

const brisbanePolygonOptions = {
  fillColor: "#00FF00",
  fillOpacity: 1,
  strokeColor: "#22FF22",
  strokeOpacity: 1,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  geodesic: false,
  paths: BRISBANE_COORDS,
  zIndex: 1,
};

let lineSymbol = {
  path: 'M 0,-1 0,1',
  strokeOpacity: 1,
  scale: 4
};

const POLYLINE_OPTIONS = {
  strokeColor: '#000000',
  strokeOpacity: 0,
  icons: [{
    icon: lineSymbol,
    offset: '0',
    repeat: '15px'
  }]
}

const MARKER_POSITION_1 = {
  lat: 22.368126, 
  lng: 73.143213,
}

const MARKER_POSITION_2 = {
  lat: 22.299848, 
  lng: 73.133943,
}

const MARKER_POSITION_3 = {
  lat: 22.305566, 
  lng: 73.218744,
}

// const POLYLINE_OPTIONS = {
//   strokeColor: '#FF0000',
//   strokeOpacity: 1.0,
//   strokeWeight: 2,
// }

function MyComponent() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: `${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`,
  });

  const [map, setMap] = React.useState(null);
  //@ts-ignore
  // const onLoad = React.useCallback(function callback(map) {
  //   // This is just an example of getting and using the map instance!!! don't just blindly copy!
  //   const bounds = new window.google.maps.LatLngBounds(center);
  //   map.fitBounds(bounds);

  //   setMap(map);
  // }, []);
  //@ts-ignore
  // const onUnmount = React.useCallback(function callback(map) {
  //   setMap(null);
  // }, []);

  const [polylineOptions, setPolylineOptions] = React.useState(
    JSON.stringify(POLYLINE_OPTIONS)
  )

  const po = React.useMemo(() => {
    try {
      return JSON.parse(polylineOptions)
    } catch (e) {
      return POLYLINE_OPTIONS
    }
  }, [polylineOptions])

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={11}
      // onLoad={onLoad}
      // onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <>
        {/* <PolygonF path={BRISBANE_COORDS} options={brisbanePolygonOptions} /> */}
        <PolylineF path={SAN_FRANCISCO_COORDS} options={po} />
        <MarkerF position={MARKER_POSITION_1} icon={pinIcon} />
        <MarkerF position={MARKER_POSITION_2} icon={pinIcon} />
        <MarkerF position={MARKER_POSITION_3} icon={pinIcon} />
        {/* <PolygonF path={SAN_FRANCISCO_COORDS} options={sfPolygonOptions} /> */}
      </>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(MyComponent);

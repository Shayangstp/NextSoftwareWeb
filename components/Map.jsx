import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  Circle,
} from "react-leaflet";
import { icon } from "leaflet";
import "leaflet/dist/leaflet.css";

const Map = ({ coordinates }) => {
  const ICON = icon({
    iconUrl: "/marker.png",
    iconSize: [100, 60],
  });

  return (
    <MapContainer
      center={[35.80778041668323, 51.49822059629601]}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker icon={ICON} position={[35.80778041668323, 51.49822059629601]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";

const MyMap = (props) => {
  
  const position = {
    lat:localStorage.getItem('latitude'),
    lng:localStorage.getItem('longitude')
  }

  const [eventsMarkers, setEventsMarkers] = useState([]);

  const icon = L.icon({
    iconUrl: "./mappin.png",
    iconSize: [30, 30],
  });

  useEffect(() => {
    const modifiedArray = props.events.map((event) => ({
      geocode: [event.location.coordinates[1], event.location.coordinates[0]],
      popUp: event.name,
    }));

    console.log(modifiedArray);
    setEventsMarkers(modifiedArray);
  }, [props.events]);

  return (
    <MapContainer center={position} zoom={13}>
      <TileLayer
        url="https://api.maptiler.com/maps/openstreetmap/{z}/{x}/{y}.jpg?key=awq6SDa4yLKXcaB5TCLa"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      <MarkerClusterGroup>
        {eventsMarkers.map((marker) => (
          <Marker position={marker.geocode} icon={icon} key={marker.geocode.join("-")}>
            <Popup>{marker.popUp}</Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
};

export default MyMap;

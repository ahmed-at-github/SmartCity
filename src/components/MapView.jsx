import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export const MapView = () => {
  useEffect(() => {
    // Create the map
    const map = L.map("map").setView([51.505, -0.09], 13);

    // Add the base tile layer (from OpenStreetMap)
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    // Add a marker
    L.marker([51.505, -0.09])
      .addTo(map)
      .bindPopup("Hello from Leaflet!")
      .openPopup();

    // Cleanup on unmount
    return () => {
      map.remove();
    };
  }, []);

  return (
    <div
      id="map"
      style={{
        height: "500px",
        width: "100%",
      }}
    ></div>
  );
};

export default MapView;

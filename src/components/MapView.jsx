import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export const MapView = () => {
  useEffect(() => {
    // Create the map
    const map = L.map("map").setView([22.3752, 91.8349], 13);

    // Add the base tile layer (from OpenStreetMap)
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    // Add a marker
    L.marker([22.3752, 91.8349])
      .addTo(map)
      .bindPopup("Hello!")
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
        height: "300px",
        width: "100%",
      }}
    ></div>
  );
};

export default MapView;

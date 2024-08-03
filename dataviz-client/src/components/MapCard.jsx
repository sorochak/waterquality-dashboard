import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

// MapCard component to display water quality data on a map
const MapCard = ({ isFetchingMapData, markerPoints, showMap }) => {
  const center = [49.25, -126.7]; // Initial center

  // Nested MapContent component to render the markers on the map
  const MapContent = ({ markerPoints }) => {
    // Access the map instance using the useMap hook
    const map = useMap();
    const markerRefs = useRef([]);

    useEffect(() => {
      // Fit the map bounds to the markers when markerPoints change
      if (markerPoints.length > 0) {
        const bounds = markerPoints.map((point) => [point.lat, point.lon]);
        map.fitBounds(bounds, { padding: [50, 50] });
      }
    }, [markerPoints, map]);

    return (
      <>
        {/* Render a Marker and Popup for each point in markerPoints */}
        {markerPoints.map((point, index) => (
          <Marker
            key={index}
            position={[point.lat, point.lon]}
            ref={(el) => (markerRefs.current[index] = el)}
          >
            <Popup>
              <Typography>
                Site: {point.site}
                <br />
                Date: {new Date(point.collected).toLocaleDateString()}
                <br />
                pH: {point.ph}
                <br />
                Turbidity: {point.turbidity}
                <br />
                Dissolved Oxygen: {point.dissolvedoxygen}
                <br />
                Nitrate: {point.nitrate}
                <br />
                Phosphate: {point.phosphate}
              </Typography>
            </Popup>
          </Marker>
        ))}
      </>
    );
  };

  return (
    <Card>
      <CardContent>
        {/* Container for the map with specified height and width */}
        <Box style={{ height: "600px", width: "100%", position: "relative" }}>
          {/* Show a loading spinner if data is being fetched */}
          {isFetchingMapData ? (
            <CircularProgress
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          ) : (
            // Render the map if showMap is true
            showMap && (
              <MapContainer
                style={{ width: "100%", height: "100%" }}
                center={center}
                zoom={7}
                scrollWheelZoom
              >
                {/* TileLayer for the map background */}
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {/* Render the MapContent component with the markerPoints */}
                <MapContent markerPoints={markerPoints} />
              </MapContainer>
            )
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

// PropTypes to enforce the type of props passed to the component
MapCard.propTypes = {
  isFetchingMapData: PropTypes.bool.isRequired,
  markerPoints: PropTypes.arrayOf(PropTypes.object).isRequired,
  showMap: PropTypes.bool.isRequired,
};

export default MapCard;

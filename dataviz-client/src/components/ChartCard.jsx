import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader } from "@mui/material";
import * as Plot from "@observablehq/plot";

// Function to determine the scale type for a given key in the data
const determineScaleType = (data, key) => {
  if (data.some((d) => d[key] instanceof Date)) return "time";
  if (typeof data[0][key] === "number") return "linear";
  return "ordinal";
};

// ChartCard component to display water quality data in a chart format
const ChartCard = ({ data }) => {
  // Reference to the plot container
  const plotRef = useRef(null);
  // State to manage the selected fields for the X, Y, and Z axes
  const [selectedX, setSelectedX] = useState("collected");
  const [selectedY, setSelectedY] = useState("pH");
  const [selectedZ, setSelectedZ] = useState("");

  // Extract keys from the data for dropdown options
  const keys = data.length > 0 ? Object.keys(data[0]) : [];

  // Filter out invalid keys for X and Y fields
  const validKeys = keys.filter((key) => key !== "lat" && key !== "lon");

  const validYkeys = validKeys.filter(
    (key) => typeof data[0][key] === "number" || data[0][key] instanceof Date
  );

  // Parse data to convert date strings to Date objects
  const parsedData = data.map((dataEntry) => {
    const parsedEntry = {};
    Object.entries(dataEntry).forEach(([key, value]) => {
      parsedEntry[key] =
        typeof value === "string" && !isNaN(Date.parse(value))
          ? new Date(value)
          : value;
    });
    return parsedEntry;
  });

  useEffect(() => {
    // Do nothing if plotRef, selectedX, or selectedY are not set or data is empty
    if (!plotRef.current || !selectedX || !selectedY || data.length === 0)
      return;

    // Determine the scale types for the selected X and Y fields
    const xScaleType = determineScaleType(parsedData, selectedX);
    const yScaleType = determineScaleType(parsedData, selectedY);

    let chart;

    // Create the chart based on the selected fields
    if (selectedZ) {
      // If a Z field is selected, create a grouped chart
      chart = Plot.plot({
        width: plotRef.current.offsetWidth,
        color: { legend: true },
        style: { fontSize: 16 },
        marginBottom: xScaleType === "ordinal" ? 200 : 90,
        marginLeft: 60,
        x: {
          scale: xScaleType,
          grid: true,
          label: selectedX,
          tickRotate: xScaleType === "ordinal" ? 90 : 0,
        },
        y: { scale: yScaleType, grid: true, label: selectedY },
        marks: [
          Plot.line(parsedData, {
            x: selectedX,
            y: selectedY,
            z: selectedZ,
            tip: true,
            stroke: selectedZ,
          }),
          Plot.dot(parsedData, {
            x: selectedX,
            y: selectedY,
            stroke: selectedZ,
          }),
          Plot.tip(
            parsedData,
            Plot.pointer({ x: selectedX, y: selectedY, stroke: selectedZ })
          ),
        ],
      });
    } else {
      // If no Z field is selected, create a simple chart
      chart = Plot.plot({
        width: plotRef.current.offsetWidth,
        style: { fontSize: 16 },
        marginBottom: xScaleType === "ordinal" ? 200 : 60,
        marginLeft: 60,
        marks: [
          Plot.line(parsedData, {
            x: selectedX,
            y: selectedY,
            tip: true,
            stroke: "orange",
          }),
          Plot.dot(parsedData, { x: selectedX, y: selectedY }),
        ],
        x: {
          scale: xScaleType,
          grid: true,
          label: selectedX,
          tickRotate: xScaleType === "ordinal" ? 90 : 0,
        },
        y: { scale: yScaleType, grid: true, label: selectedY },
      });
    }

    // Append the created chart to the plot container
    plotRef.current.appendChild(chart);

    // Cleanup function to remove the chart when the component is unmounted or updated
    return () => {
      if (chart) {
        chart.remove();
      }
    };
  }, [parsedData, selectedX, selectedY, selectedZ, data.length]);

  return (
    <Card style={{ overflow: "visible" }}>
      {/* CardHeader to display the title of the card */}
      <CardHeader title="Water Quality Chart" />
      <CardContent>
        {/* Container for the plot with a margin at the bottom */}
        <div ref={plotRef} style={{ marginBottom: "35px" }}></div>
        {/* Controls for selecting fields for the X, Y, and Z axes */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "16px",
          }}
        >
          {/* Dropdown to select the X field */}
          <label>
            X Field:
            <select
              value={selectedX}
              onChange={(e) => setSelectedX(e.target.value)}
            >
              {/* Generate options for the X field dropdown from validKeys */}
              {validKeys.map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
          </label>
          {/* Dropdown to select the Y field */}
          <label>
            Y Field:
            <select
              value={selectedY}
              onChange={(e) => setSelectedY(e.target.value)}
            >
              {/* Generate options for the Y field dropdown from validYkeys */}
              {validYkeys.map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
          </label>
          {/* Dropdown to select the Group By field */}
          <label>
            Group By:
            <select
              value={selectedZ}
              onChange={(e) => setSelectedZ(e.target.value)}
            >
              <option value="">None</option>
              <option value="site">Site</option>
              <option value="project">Project</option>
            </select>
          </label>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChartCard;

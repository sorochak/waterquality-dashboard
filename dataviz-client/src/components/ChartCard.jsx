import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader } from "@mui/material";
import * as Plot from "@observablehq/plot";

const determineScaleType = (data, key) => {
  if (data.some((d) => d[key] instanceof Date)) return "time";
  if (typeof data[0][key] === "number") return "linear";
  return "ordinal";
};

const ChartCard = ({ data }) => {
  const plotRef = useRef(null);
  const [selectedX, setSelectedX] = useState("collected");
  const [selectedY, setSelectedY] = useState("pH");
  const [selectedZ, setSelectedZ] = useState("");

  const keys = data.length > 0 ? Object.keys(data[0]) : [];

  const validKeys = keys.filter((key) => key !== "lat" && key !== "lon");

  const validYkeys = validKeys.filter(
    (key) => typeof data[0][key] === "number" || data[0][key] instanceof Date
  );

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
    if (!plotRef.current || !selectedX || !selectedY || data.length === 0)
      return;

    const xScaleType = determineScaleType(parsedData, selectedX);
    const yScaleType = determineScaleType(parsedData, selectedY);

    let chart;

    if (selectedZ) {
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

    plotRef.current.appendChild(chart);

    return () => {
      if (chart) {
        chart.remove();
      }
    };
  }, [parsedData, selectedX, selectedY, selectedZ, data.length]);

  return (
    <Card style={{ overflow: "visible" }}>
      <CardHeader title="Water Quality Chart" />
      <CardContent>
        <div ref={plotRef} style={{ marginBottom: "35px" }}></div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "16px",
          }}
        >
          <label>
            X Field:
            <select
              value={selectedX}
              onChange={(e) => setSelectedX(e.target.value)}
            >
              {validKeys.map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
          </label>
          <label>
            Y Field:
            <select
              value={selectedY}
              onChange={(e) => setSelectedY(e.target.value)}
            >
              {validYkeys.map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
          </label>
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

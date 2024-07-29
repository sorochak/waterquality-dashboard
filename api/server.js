const express = require("express");
const cors = require("cors");
const { generateFakeWaterQualityData } = require("./dataGenerator");

// Initialize the express application
const app = express();
const port = 5001;

// Middleware to enable CORS
app.use(cors());
// Middleware to parse incoming JSON requests
app.use(express.json());

// Generate initial set of fake water quality data
let data = generateFakeWaterQualityData();

// Define the route to get filtered water quality data
app.get("/api/data", (req, res) => {
  // Start with the full dataset
  let filteredData = data;

  // Filter data by site if the query parameter is provided
  if (req.query.site) {
    filteredData = filteredData.filter((item) => item.site === req.query.site);
  }
  // Filter data by project if the query parameter is provided
  if (req.query.project) {
    filteredData = filteredData.filter(
      (item) => item.project === req.query.project
    );
  }
  // Filter data by sample type if the query parameter is provided
  if (req.query.sampleType) {
    filteredData = filteredData.filter((item) => item[req.query.sampleType]);
  }
  // Filter data by work area if the query parameter is provided
  if (req.query.workArea) {
    filteredData = filteredData.filter(
      (item) => item.workArea === req.query.workArea
    );
  }
  // Filter data by dateFrom if the query parameter is provided
  if (req.query.dateFrom) {
    const dateFrom = new Date(req.query.dateFrom);
    filteredData = filteredData.filter(
      (item) => new Date(item.collected) >= dateFrom
    );
  }
  // Filter data by dateTo if the query parameter is provided
  if (req.query.dateTo) {
    const dateTo = new Date(req.query.dateTo);
    filteredData = filteredData.filter(
      (item) => new Date(item.collected) <= dateTo
    );
  }

  // Send the filtered data as a JSON response
  res.json(filteredData);
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

require("dotenv").config({
  path: "/Users/austensorochak/Documents/Jobs/2024/earthSoft/interview4/data-vis/.env",
});
const express = require("express");
const cors = require("cors");
const pool = require("../db/db");

// Initialize the express application
const app = express();
const port = 5001;

// Middleware to enable CORS
app.use(cors());
// Middleware to parse incoming JSON requests
app.use(express.json());

// Define the route to get filtered water quality data
app.get("/api/data", async (req, res) => {
  try {
    let query = "SELECT * FROM water_quality_data WHERE 1=1";
    const queryParams = [];

    if (req.query.site) {
      queryParams.push(req.query.site);
      query += ` AND site = $${queryParams.length}`;
    }
    if (req.query.project) {
      queryParams.push(req.query.project);
      query += ` AND project = $${queryParams.length}`;
    }
    if (req.query.sampleType) {
      query += ` AND ${req.query.sampleType} IS NOT NULL`;
    }
    if (req.query.workArea) {
      queryParams.push(req.query.workArea);
      query += ` AND workArea = $${queryParams.length}`;
    }
    if (req.query.dateFrom) {
      queryParams.push(new Date(req.query.dateFrom));
      query += ` AND collected >= $${queryParams.length}`;
    }
    if (req.query.dateTo) {
      queryParams.push(new Date(req.query.dateTo));
      query += ` AND collected <= $${queryParams.length}`;
    }

    const result = await pool.query(query, queryParams);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching data from database:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

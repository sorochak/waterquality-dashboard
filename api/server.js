const express = require("express");
const cors = require("cors");
const { generateFakeWaterQualityData } = require("./dataGenerator");

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

let data = generateFakeWaterQualityData();

app.get("/api/data", (req, res) => {
  let filteredData = data;

  if (req.query.site) {
    filteredData = filteredData.filter((item) => item.site === req.query.site);
  }
  if (req.query.project) {
    filteredData = filteredData.filter(
      (item) => item.project === req.query.project
    );
  }
  if (req.query.sampleType) {
    filteredData = filteredData.filter((item) => item[req.query.sampleType]);
  }
  if (req.query.workArea) {
    filteredData = filteredData.filter(
      (item) => item.workArea === req.query.workArea
    );
  }
  if (req.query.siteID) {
    filteredData = filteredData.filter((item) =>
      item.siteID.includes(req.query.siteID)
    );
  }
  if (req.query.dateFrom) {
    const dateFrom = new Date(req.query.dateFrom);
    filteredData = filteredData.filter(
      (item) => new Date(item.collected) >= dateFrom
    );
  }
  if (req.query.dateTo) {
    const dateTo = new Date(req.query.dateTo);
    filteredData = filteredData.filter(
      (item) => new Date(item.collected) <= dateTo
    );
  }

  res.json(filteredData);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

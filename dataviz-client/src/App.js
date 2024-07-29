import React, { useState } from "react";
import { Container, Typography, Box } from "@mui/material";
import ChartCard from "./components/ChartCard";
import FilterBox from "./components/FilterBox";

const App = () => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    site: "",
    project: "",
    sampleType: "",
    workArea: "",
    siteID: "",
    dateFrom: "",
    dateTo: "",
  });

  const fetchData = async (filters) => {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const response = await fetch(
        `http://localhost:5001/api/data?${queryParams}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const fetchedData = await response.json();
      setData(fetchedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleFilterChange = (filterName, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [filterName]: value }));
  };

  const handleSearch = () => {
    fetchData(filters);
  };

  return (
    <Box sx={{ my: 4 }}>
      <Container>
        <Typography variant="h4" gutterBottom align="center">
          Water Quality Dashboard
        </Typography>
        <Box sx={{ my: 4 }}>
          <FilterBox
            filters={filters}
            onFilterChange={handleFilterChange}
            onSearch={handleSearch}
          />
          {data.length > 0 && <ChartCard data={data} />}
        </Box>
      </Container>
    </Box>
  );
};

export default App;

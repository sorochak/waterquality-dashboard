import React, { useState } from "react";
import { Container, Typography, Box, Tabs, Tab } from "@mui/material";
import ChartCard from "./components/ChartCard";
import FilterCard from "./components/FilterCard";
import MapCard from "./components/MapCard";
import TableCard from "./components/TableCard";

// Main component of the application
const App = () => {
  // State to hold the fetched data
  const [data, setData] = useState([]);
  // State to hold the filter values
  const [filters, setFilters] = useState({
    site: "",
    project: "",
    sampleType: "",
    workArea: "",
    dateFrom: "",
    dateTo: "",
  });
  // State to control which tab is currently selected
  const [tabValue, setTabValue] = useState(0); // Default to Table tab
  // State to indicate if the map data is being fetched
  const [isFetchingMapData, setIsFetchingMapData] = useState(false);
  // State to control the display of the map
  const [showMap, setShowMap] = useState(false);

  // Function to fetch data from the backend API
  const fetchData = async (filters) => {
    try {
      // Convert filters object to query string
      const queryParams = new URLSearchParams(filters).toString();
      // Make a request to the backend API with the filters as query parameters
      const response = await fetch(
        `http://localhost:5001/api/data?${queryParams}`
      );
      // Check if the response is successful
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Parse the JSON data from the response
      const fetchedData = await response.json();
      // Update the state with the fetched data
      setData(fetchedData);

      // Indicate that the map should be shown
      setShowMap(true);
    } catch (error) {
      // Log any errors that occur during the fetch
      console.error("Error fetching data:", error);
    } finally {
      setIsFetchingMapData(false);
    }
  };

  // Function to handle changes in filter values
  const handleFilterChange = (filterName, value) => {
    // Update the filter values in the state
    setFilters((prevFilters) => ({ ...prevFilters, [filterName]: value }));
  };

  const handleSearch = () => {
    setIsFetchingMapData(true);
    fetchData(filters);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ my: 4 }}>
      <Container>
        <Typography variant="h4" gutterBottom align="center">
          Water Quality Dashboard
        </Typography>
        <Box sx={{ my: 4 }}>
          <FilterCard
            filters={filters}
            onFilterChange={handleFilterChange}
            onSearch={handleSearch}
          />
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="Dashboard Tabs"
          >
            <Tab label="Table" />
            <Tab label="Map" />
            <Tab label="Chart" />
          </Tabs>
          {tabValue === 0 && <TableCard data={data} />}
          {tabValue === 1 && (
            <MapCard
              isFetchingMapData={isFetchingMapData}
              markerPoints={data}
              tabValue={tabValue}
              handleTabChange={handleTabChange}
              showMap={showMap}
            />
          )}
          {tabValue === 2 && data.length > 0 && <ChartCard data={data} />}
        </Box>
      </Container>
    </Box>
  );
};

export default App;

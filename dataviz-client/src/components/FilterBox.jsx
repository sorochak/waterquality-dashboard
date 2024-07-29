import React from "react";
import { Grid, Box, TextField, MenuItem, Button } from "@mui/material";

// FilterBox component to provide filtering options for the water quality data
const FilterBox = ({ filters, onFilterChange, onSearch }) => {
  return (
    <Box sx={{ p: 2 }}>
      {/* Grid container to organize filter fields */}
      <Grid container spacing={2}>
        {/* Dropdown for selecting the site */}
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            select
            label="Site"
            value={filters.site}
            onChange={(e) => onFilterChange("site", e.target.value)}
            fullWidth
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Site A">Site A</MenuItem>
            <MenuItem value="Site B">Site B</MenuItem>
            <MenuItem value="Site C">Site C</MenuItem>
            <MenuItem value="Site D">Site D</MenuItem>
          </TextField>
        </Grid>
        {/* Dropdown for selecting the project */}
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            select
            label="Project"
            value={filters.project}
            onChange={(e) => onFilterChange("project", e.target.value)}
            fullWidth
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Project X">Project X</MenuItem>
            <MenuItem value="Project Y">Project Y</MenuItem>
            <MenuItem value="Project Z">Project Z</MenuItem>
          </TextField>
        </Grid>
        {/* Dropdown for selecting the sample type */}
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            select
            label="Sample Type"
            value={filters.sampleType}
            onChange={(e) => onFilterChange("sampleType", e.target.value)}
            fullWidth
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="pH">pH</MenuItem>
            <MenuItem value="turbidity">Turbidity</MenuItem>
            <MenuItem value="dissolvedOxygen">Dissolved Oxygen</MenuItem>
            <MenuItem value="nitrate">Nitrate</MenuItem>
            <MenuItem value="phosphate">Phosphate</MenuItem>
          </TextField>
        </Grid>
        {/* Dropdown for selecting the work area */}
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            select
            label="Work Area"
            value={filters.workArea}
            onChange={(e) => onFilterChange("workArea", e.target.value)}
            fullWidth
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Area 1">Area 1</MenuItem>
            <MenuItem value="Area 2">Area 2</MenuItem>
            <MenuItem value="Area 3">Area 3</MenuItem>
          </TextField>
        </Grid>
        {/* Date picker for the start date */}
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Date From"
            type="date"
            value={filters.dateFrom}
            onChange={(e) => onFilterChange("dateFrom", e.target.value)}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        {/* Date picker for the end date */}
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Date To"
            type="date"
            value={filters.dateTo}
            onChange={(e) => onFilterChange("dateTo", e.target.value)}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        {/* Button to trigger the search action */}
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={onSearch}
            fullWidth
          >
            Search
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FilterBox;

import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

// TableCard component to display water quality data in a table format
const TableCard = ({ data }) => {
  // Determine the columns from the keys of the first data object, if data is available
  const columns = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <Card>
      <CardHeader title="Water Quality Data Table" />
      <CardContent>
        {data.length === 0 ? (
          <Typography variant="h6" align="center">
            No data available. Please perform a search.
          </Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column}>{column}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row, index) => (
                  <TableRow key={index}>
                    {columns.map((column) => (
                      <TableCell key={column}>{row[column]}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </CardContent>
    </Card>
  );
};

// PropTypes to enforce the type of props passed to the component
TableCard.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TableCard;

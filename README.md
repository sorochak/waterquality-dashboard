# Water Quality Dashboard

The Water Quality Dashboard is a web application designed to display water quality data visually and spatially. Users can filter data based on various parameters, view the data in a table format, display it on a map, or visualize it in a chart. The application uses a mock data generator to simulate water quality measurements collected from different sites and projects in the waters around Vancouver Island, British Columbia.

## Technologies and Libraries Used

- **Frontend:**

  - React
  - Material-UI
  - React-Leaflet
  - Leaflet
  - Observable Plot

- **Backend:**
  - Node.js
  - Express
  - CORS

## Directory Structure

```bash
water-quality-dashboard/
├── api/
│ ├── dataGenerator.js
│ ├── server.js
│ ├── package.json
│ ├── package-lock.json
├── dataviz-client/
│ ├── src/
│ │ ├── components/
│ │ │ ├── ChartCard.jsx
│ │ │ ├── FilterCard.jsx
│ │ │ ├── MapCard.jsx
│ │ │ ├── TableCard.jsx
│ │ ├── App.jsx
│ │ ├── index.css
│ │ ├── index.js
│ ├── public/
│ │ ├── index.html
│ ├── package.json
│ ├── package-lock.json
├── README.md
```

## Installation and Running Instructions

### Backend Setup

1. **Navigate to the `api` directory:**

```bash
cd water-quality-dashboard/api
```

2. **Install the dependencies:**

```bash
npm install
```

3. **Start the Express server:**

```bash
npm start
```

The backend server will start running on http://localhost:5001.

### Frontend Setup

1. **Navigate to the `dataviz-client` directory:**

```bash
cd water-quality-dashboard/dataviz-client
```

2. **Install the dependencies:**

```bash
npm install
```

3. **Start the React app:**

```bash
npm start
```

The React app will start running on http://localhost:3000.

## Application Usage

### Filter Data:

- Use the filter options provided in the dashboard to narrow down the data based on site, project, sample type, work area, and date range.
- Click the "Search" button to fetch and display the filtered data.

### View Data:

- **Table:** View the data in a tabular format.
- **Map:** Visualize the data on a map with markers indicating the locations of the sample sites.
- **Chart:** Display the data in a chart format for visual analysis.

## Notes

- The mock data generator simulates water quality measurements collected from various sites and projects in the waters around Vancouver Island, British Columbia.
- The map view will automatically center and adjust the zoom level to fit all markers within the view.

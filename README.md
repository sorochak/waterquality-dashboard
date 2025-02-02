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
  - PostgreSQL
  - CORS

## Directory Structure

```bash
water-quality-dashboard/
├── api/
│ ├── server.js
│ ├── package.json
│ ├── package-lock.json
├── db/
│ ├── seeds/
│ │ ├── seed_water_quality_data.js
│ ├── migrations/
│ │ ├── 001_create_water_quality_data_table.sql
│ ├── schema.sql
│ ├── dataGenerator.js
│ ├── db.js
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

### Using Docker and Docker Compose

This application is containerized using Docker. Docker Compose manages the services and orchestrates the containers.

### Prerequisites

- Docker

### Environment Variables Setup

1. **Copy the sample.env file to .env:**

```bash
cp sample.env .env
```

2. **Update the .env file with your specific environment variables:**

- Replace the placeholder values with your actual database credentials and other configurations.

### Docker Compose Instructions

1. **Build and run the containers:**

From the root directory of the project, run:

```bash
docker compose up --build
```

This command will build the Docker images and start the containers.

2. **Access the application:**

- The backend API will be running on http://localhost:5001
- The frontend will be accessible at http://localhost:3000

3. **Stop the containers:**

To stop the containers, press Ctrl + C in the terminal where the Docker Compose process is running.

To stop and remove all containers, networks, and volumes associated with the services, run:

```bash
docker-compose down
```

### Traditional Setup (Without Docker)

If you prefer to run the project without Docker, follow these steps:

#### Backend Setup

1. **Set up the PostgreSQL Database:**

- **Ensure PostgreSQL is installed on your machine.**
  if not, you can install it using Homebrew (for macOS)

```bash
brew install postgresql
```

- Start the PostgreSQL service:

```bash
brew services start postgresql
```

- Create a new database named 'water_quality':

```bash
createdb water_quality
```

- Navigate to the db directory where the schema.sql file is located:

```bash
cd water-quality-dashboard/db
```

- Install dependencies in the db directory:

```bash
npm install
```

- Run the schema.sql script to set up the database schema:

```bash
psql -d water_quality -f db/migrations/schema.sql
```

- Run the seed script to populate the database with mock data (note you'll need to install the bad):

```bash
node seeds/seed_water_quality_data.js
```

2. **API Server Setup:**

- Navigate to the api directory:

```bash
cd ../api
```

- Install the required Node.js dependencies:

```bash
npm install
```

- Start the Express server

```bash
npm start
```

The backend server will start running on http://localhost:5001.

#### Frontend Setup

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

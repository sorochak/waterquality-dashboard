require("dotenv").config({
  path: "/Users/austensorochak/Documents/Jobs/2024/earthSoft/interview4/data-vis/.env",
});
const { Pool } = require("pg");
const generateFakeWaterQualityData =
  require("../dataGenerator").generateFakeWaterQualityData;

// Set up the PostgreSQL connection using environment variables
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const seedData = async () => {
  const data = generateFakeWaterQualityData();
  for (let item of data) {
    await pool.query(
      `INSERT INTO water_quality_data (collected, site, project, lat, lon, workArea, ph, turbidity, dissolvedoxygen, nitrate, phosphate)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
      [
        item.collected,
        item.site,
        item.project,
        parseFloat(item.lat), // Ensure lat is a float
        parseFloat(item.lon), // Ensure lon is a float
        item.workArea,
        parseFloat(item.ph), // Ensure pH is a float
        parseFloat(item.turbidity), // Ensure turbidity is a float
        parseFloat(item.dissolvedoxygen), // Ensure dissolvedOxygen is a float
        parseFloat(item.nitrate), // Ensure nitrate is a float
        parseFloat(item.phosphate), // Ensure phosphate is a float
      ]
    );
  }
  pool.end(); // Close the connection after seeding is done
};

seedData()
  .then(() => {
    console.log("Seeding completed successfully.");
  })
  .catch((err) => {
    console.error("Error seeding data:", err);
  });

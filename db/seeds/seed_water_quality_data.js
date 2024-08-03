require("dotenv").config({
  path: "/Users/austensorochak/Documents/Jobs/2024/earthSoft/interview4/data-vis/.env",
});
const { Pool } = require("pg");
const generateFakeWaterQualityData =
  require("../dataGenerator").generateFakeWaterQualityData;

// Log the environment variables to ensure they are loaded correctly
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_NAME:", process.env.DB_NAME);

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
      `INSERT INTO water_quality_data (collected, site, project, lat, lon, workArea, pH, turbidity, dissolvedOxygen, nitrate, phosphate)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
      [
        item.collected,
        item.site,
        item.project,
        item.lat,
        item.lon,
        item.workArea,
        item.pH,
        item.turbidity,
        item.dissolvedOxygen,
        item.nitrate,
        item.phosphate,
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

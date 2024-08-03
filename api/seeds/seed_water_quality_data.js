require("dotenv").config({
  path: "../../.env",
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
  const maxRetries = 5;
  let attempts = 0;

  while (attempts < maxRetries) {
    try {
      const data = generateFakeWaterQualityData();
      for (let item of data) {
        await pool.query(
          `INSERT INTO water_quality_data (collected, site, project, lat, lon, workArea, ph, turbidity, dissolvedoxygen, nitrate, phosphate)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
          [
            item.collected,
            item.site,
            item.project,
            parseFloat(item.lat),
            parseFloat(item.lon),
            item.workArea,
            parseFloat(item.ph),
            parseFloat(item.turbidity),
            parseFloat(item.dissolvedoxygen),
            parseFloat(item.nitrate),
            parseFloat(item.phosphate),
          ]
        );
      }
      console.log("Seeding completed successfully.");
      break; // Exit loop on success
    } catch (err) {
      attempts++;
      console.error(`Error seeding data, attempt ${attempts}:`, err);
      if (attempts >= maxRetries) {
        throw err;
      }
      console.log(`Retrying in 5 seconds...`);
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }
  pool.end();
};

seedData()
  .then(() => {
    console.log("Seeding completed successfully.");
  })
  .catch((err) => {
    console.error("Error seeding data:", err);
  });

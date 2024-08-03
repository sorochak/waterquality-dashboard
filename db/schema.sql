CREATE TABLE water_quality_data (
  id SERIAL PRIMARY KEY,
  collected TIMESTAMP,
  site VARCHAR(255),
  project VARCHAR(255),
  lat DECIMAL,
  lon DECIMAL,
  workArea VARCHAR(255),
  pH DECIMAL,
  turbidity DECIMAL,
  dissolvedOxygen DECIMAL,
  nitrate DECIMAL,
  phosphate DECIMAL
);

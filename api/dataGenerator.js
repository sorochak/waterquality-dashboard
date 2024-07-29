// This code was generated using AI.
// This code generates fake water quality data for use Water Quality Dashboard.
// The data includes various water quality parameters collected from different sample sites
// in the waters around Vancouver Island, British Columbia. The coordinates are generated to
// be roughly in the ocean to the west of Vancouver Island.

const generateBCGPSCoordinates = () => {
  const latMin = 48.3;
  const latMax = 50.1;
  const lonMin = -128.0;
  const lonMax = -126.5;

  const lat = (Math.random() * (latMax - latMin) + latMin).toFixed(6);
  const lon = (Math.random() * (lonMax - lonMin) + lonMin).toFixed(6);
  return { lat, lon };
};

const generateFakeWaterQualityData = () => {
  const sampleSites = ["A", "B", "C", "D"];
  const projects = ["Project X", "Project Y", "Project Z"];
  const workAreas = ["Area 1", "Area 2", "Area 3"];
  const fakeData = [];
  const now = new Date();

  const siteCoordinates = sampleSites.reduce((acc, site) => {
    acc[site] = generateBCGPSCoordinates();
    return acc;
  }, {});

  for (let i = 0; i < 100; i++) {
    const site = sampleSites[i % sampleSites.length];
    const project = projects[i % projects.length];
    const workArea = workAreas[i % workAreas.length];
    const collectedDate = new Date(now.getTime() - i * 86400000).toISOString();
    fakeData.push({
      collected: collectedDate,
      site,
      project,
      lat: parseFloat(siteCoordinates[site].lat),
      lon: parseFloat(siteCoordinates[site].lon),
      workArea,
      pH: parseFloat((Math.random() * 2 + 6).toFixed(2)),
      turbidity: parseFloat((Math.random() * 100).toFixed(2)),
      dissolvedOxygen: parseFloat((Math.random() * 14).toFixed(2)),
      nitrate: parseFloat((Math.random() * 10).toFixed(2)),
      phosphate: parseFloat((Math.random() * 5).toFixed(2)),
    });
  }

  return fakeData;
};

module.exports = { generateFakeWaterQualityData };

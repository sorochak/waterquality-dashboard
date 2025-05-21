// This code generates fake water quality data for use Water Quality Dashboard.
// The data includes various water quality parameters collected from different sample sites
// in the waters around Vancouver Island, British Columbia. The coordinates are generated to
// be roughly in the ocean to the west of Vancouver Island.

const generateBCGPSCoordinates = () => {
  const latMin = 48.3;
  const latMax = 50.1;
  const lonMin = -129.0;
  const lonMax = -127.0;

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
      ph: parseFloat((Math.random() * 0.2 + 7.9).toFixed(2)), // 7.9–8.1
      turbidity: parseFloat((Math.random() * 0.5 + 0.05).toFixed(2)), // 0.05–0.55 NTU
      dissolvedoxygen: parseFloat((Math.random() * 1.5 + 6.5).toFixed(2)), // 6.5–8.0 mg/L
      nitrate: parseFloat((Math.random() * 0.3 + 0.2).toFixed(2)), // 0.2–0.5 mg/L
      phosphate: parseFloat((Math.random() * 0.05 + 0.01).toFixed(3)), // 0.01–0.06 mg/L
    });
  }

  return fakeData;
};

module.exports = { generateFakeWaterQualityData };

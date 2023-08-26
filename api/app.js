const express = require("express");
const axios = require("axios");

const cors = require("cors");

const app = express();
const PORT = 4000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET");
  app.use(cors());
  next();
});

app.get("/universities", async (req, res) => {
  try {
    const country = req.query.country;
    const apiURL = `http://universities.hipolabs.com/search?country=${country}&limit=50`;

    const response = await axios.get(apiURL);
    const data = response.data;

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching" });
  }
});

app.listen(PORT, () => {
  console.log("listening on port 4000");
});

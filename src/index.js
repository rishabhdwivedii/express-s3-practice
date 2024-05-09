const express = require("express");
const path = require("path");

const app = express();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "videos", "coke.mp4"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`connected to port ${port}`));

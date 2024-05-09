const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("hello friendo!");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`connected to port ${port}`));

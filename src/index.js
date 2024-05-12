const express = require("express");
const path = require("path");
const cors = require("cors");
const multer = require("multer");

const app = express();
app.use(cors());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "videos/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "videos", "coke.mp4"));
});

app.post("/upload", upload.single("video"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  res.status(200).send("File uploaded successfully");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`connected to port ${port}`));

const express = require("express");
const path = require("path");
const cors = require("cors");
const multer = require("multer");
const { exec } = require("child_process");

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

app.get("/feed", (req, res) => {
  const directoryPath = path.join(__dirname, "..", "videos");
  const command = `ls ${directoryPath}`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing command: ${error}`);
      return res.status(500).send(`Error executing command: ${error.message}`);
    }

    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return res.status(500).send(`stderr: ${stderr}`);
    }

    const files = stdout.split("\n").filter((file) => file);
    res.json(files);
  });
});

app.get("/:id", (req, res) => {
  const videoName = req.params.id;
  res.sendFile(path.join(__dirname, "..", "videos", videoName));
});

app.post("/upload", upload.single("video"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  res.status(200).send("File uploaded successfully");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`connected to port ${port}`));

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const URLs = require("./models/Urls");
require("dotenv").config();

const app = express();

const PORT = 5000 || process.env.PORT;

app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200,
  })
);
app.use(express.json());

app.post("/createShortUrl", (req, res) => {
  const { generatedKey, preferredAlias, shortUrl, longUrl } = req.body;
  if (preferredAlias.length > 0) {
    URLs.findOne({ generatedKey: preferredAlias })
      .then((data) => {
        if (data) {
          res
            .status(409)
            .json({ message: `Alias "${preferredAlias}" already exists!` });
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(400).json({ message: "failed", error: err });
      });
  }
  URLs.insertMany({
    generatedKey,
    preferredAlias,
    shortUrl,
    longUrl,
  })
    .then(() => res.status(200).json({ message: "success", shortUrl }))
    .catch((err) => {
      console.error(err);
      res.status(400).json({ message: "failed", error: err });
    });
});

app.get("/:path", (req, res) => {
  URLs.findOne({ generatedKey: req.params.path })
    .then((data) => {
      res.redirect(data.longUrl);
    })
    .catch((err) => console.error(err));
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => console.log("Server running on port: ", PORT));
  })
  .catch((err) => console.error(err));

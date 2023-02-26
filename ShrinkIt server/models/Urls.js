const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const URLs = new Schema(
  {
    generatedKey: Schema.Types.String,
    shortUrl: Schema.Types.String,
    longUrl: Schema.Types.String,
    preferredAlias: Schema.Types.String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("URLs", URLs);

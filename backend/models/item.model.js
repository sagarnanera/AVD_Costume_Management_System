const mongoose = require("mongoose");

const itemSchema = mongoose.Schema({}, { timestamps: true });

const itemModel = mongoose.model("items", itemSchema);
module.exports = itemModel;

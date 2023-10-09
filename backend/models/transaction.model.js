const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema({}, { timestamps: true });

const transactionModel = mongoose.model("transactions", transactionSchema);
module.exports = transactionModel;

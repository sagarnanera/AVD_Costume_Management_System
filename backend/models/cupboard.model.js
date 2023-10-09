const mongoose = require("mongoose");

const cupBoardSchema = mongoose.Schema({}, { timestamps: true });

const cupBoardModel = mongoose.model("cupBoards", cupBoardSchema);

module.exports = cupBoardModel;

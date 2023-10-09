const mongoose = require("mongoose");

const guestSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    mobile: {
      type: String,
      required: true,
      index: true
    },
    password: {
      type: String,
      required: true
    },
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users", // Reference to the user who approved guest
      required: false
    },
    isExpired: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

const guestModel = mongoose.model("guestUsers", guestSchema);
module.exports = guestModel;

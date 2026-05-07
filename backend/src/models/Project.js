const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true, // required
      trim: true,
    },
    // description is not required
    description: {
      type: String,
      trim: true,
    },
    owner: {
      // Who creates the project
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // User as reference
      required: true,
    },
    members: [
      // Optional collaborators on the created project
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // User as reference
      },
    ],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Project", projectSchema);

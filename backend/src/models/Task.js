const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
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
    status: {
      type: String,
      enum: ["todo", "in-progress", "done"], // enum for status
      default: "todo", // default is 'todo'
    },
    // Task related to which project
    project: {
      type: mongoose.Schema.Types.ObjectId, // ObjectId inside mongoose
      ref: "Project", // Project as reference
      required: true, // required
    },
    // Optional task assigned to a User
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // User as reference
    },
  },
  {
    timestamps: true, // We also the timestamps here in this model as well
  },
);

module.exports = mongoose.model("Task", taskSchema);

// Task is related to a specific project,
// cannot be not related to a specific project by its ObjectId
//
// Attribute assignedTo is a mongoose ObjectId created in the schema,
// Task can be not assigned to any User, so it is optional here

const Project = require("../models/Project");

// Create a project
exports.createProject = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({
        message: "Title is required",
      });
    }

    const project = await Project.create({
      title: title.trim(),
      description: description?.trim(),
      owner: req.user.id,
    });

    const io = req.app.get("io");

    io.emit("workspace:created", {
      message: "A new workspace was created",
      project,
    });

    res.status(201).json({
      message: "Project created successfully",
      data: project,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating project",
      error: error.message,
    });
  }
};

// Get all existing projects (only for logged-in user)
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ owner: req.user.id });

    res.status(200).json({
      message: "Projects fetched successfully",
      data: projects,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching projects",
      error: error.message,
    });
  }
};

// Get a specific existing project
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Authorization
    if (project.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.status(200).json({
      message: "Project fetched successfully",
      data: project,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching project",
      error: error.message,
    });
  }
};

// Update an existing project
exports.updateProject = async (req, res) => {
  try {
    const { title, description } = req.body;

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Authorization
    if (project.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    project.title = title ? title.trim() : project.title;
    project.description = description
      ? description.trim()
      : project.description;

    const updatedProject = await project.save();

    res.status(200).json({
      message: "Project updated successfully",
      data: updatedProject,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating project",
      error: error.message,
    });
  }
};

// Delete an existing project
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Authorization
    if (project.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const io = req.app.get("io");

    io.emit("workspace:deleted", {
      message: "A workspace was deleted",
      projectId: project._id,
    });

    await project.deleteOne();

    res.status(200).json({
      message: "Project deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting project",
      error: error.message,
    });
  }
};
// const mongoose = require("mongoose");

// const projectSchema = new mongoose.Schema(
//   {
//     title: {
//      type: String,
//      required: true, // required
//      trim: true,
//    },
//    // description is not required
//    description: {
//      type: String,
//      trim: true,
//    },
//    owner: {
//      // Who creates the project
//      type: mongoose.Schema.Types.ObjectId,
//      ref: "User", // User as reference
//      required: true,
//    },
//    members: [
//      // Optional collaborators on the created project
//      {
//        type: mongoose.Schema.Types.ObjectId,
//        ref: "User", // User as reference
//      },
//    ],
//  },
//  {
//    timestamps: true,
//  },
//);

// module.exportds = mongoose.model("Project", projectSchema);

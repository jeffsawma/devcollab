const Task = require("../models/Task");
const Project = require("../models/Project");

// Create a task
exports.createTask = async (req, res) => {
  try {
    const { title, description, status, project } = req.body;

    // Validating both 'title' and 'project' because they're required
    if (!title || !project) {
      return res.status(400).json({
        message: "Title and Project are required",
      });
    }

    // Checking if project exists
    const existingProject = await Project.findById(project); // Using findById

    if (!existingProject) {
      return res.status(400).json({
        message: "Project not found",
      });
    }

    // Authorization
    if (existingProject.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const task = await Task.create({
      title: title.trim(), // Title is required
      description: description?.trim(), // Description can be empty
      status, // Optional and by default it is "todo"
      project, // Project ObjectId // Task is always related to a project
      assignedTo: req.user.id, // User ObjectId // Task can be assigned to a User id
    });

    const io = req.app.get("io");

    io.emit("milestone:created", {
      message: "A milestone was created",
      task,
    });

    res.status(201).json({
      message: "Task created successfully",
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating task",
      error: error.message,
    });
  }
};

// Get all existing tasks
exports.getTasks = async (req, res) => {
  try {
    const { projectId } = req.query;

    // Finding all the tasks related to a specific existing project
    const tasks = await Task.find({ project: projectId }); // We use the const here for the id of project

    res.status(200).json({
      message: "Tasks fetched successfully",
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching tasks",
      error: error.message,
    });
  }
};

// Get a specific existing task
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Trying to find related project
    const project = await Project.findById(task.project);

    if (!project) {
      return res.status(400).json({ message: "Project not found" });
    }

    // Authorization
    if (project.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.status(200).json({
      message: "Task fetched successfully",
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching task",
      error: error.message,
    });
  }
};

// Update an existing task
exports.updateTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(403).json({ message: "Task not found" });
    }

    const project = await Project.findById(task.project);

    if (!project) {
      return res.status(400).json({ message: "project not found" });
    }

    // Authorization
    if (project.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    task.title = title ? title.trim() : task.title;
    task.description = description ? description.trim() : task.description;
    task.status = status || task.status; // task.status has a default value of "todo"

    const updatedTask = await task.save();

    res.status(200).json({
      message: "Task updated successfully",
      data: updatedTask,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating task",
      error: error.message,
    });
  }
};

// Deleting an existing task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const project = await Project.findById(task.project);

    if (!project) {
      return re.status(400).json({ message: "project not found" });
    }

    if (project.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const io = req.app.get("io");

    io.emit("milestone:deleted", {
      message: "A milestone was deleted",
      taskId: task._id,
    });

    await task.deleteOne();

    res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting task",
      error: error.message,
    });
  }
};

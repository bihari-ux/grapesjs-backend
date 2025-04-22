const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  projectName: { type: String, required: true },
  pageName: { type: String, required: true },
  html: { type: String, required: true },
  css: { type: String, required: true },
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;

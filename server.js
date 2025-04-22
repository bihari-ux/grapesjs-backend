// const express = require("express");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const cors = require("cors");

// const app = express();
// const PORT = 5000;

// // Middleware
// app.use(cors());
// app.use(bodyParser.json({ limit: "10mb" }));

// // MongoDB Connection
// mongoose
//   .connect("mongodb://127.0.0.1:27017/grapesjs_projects")
//   .then(() => console.log("✅ Connected to MongoDB"))
//   .catch((err) => console.error("❌ MongoDB connection error:", err));

// // Mongoose Schema & Model
// const projectSchema = new mongoose.Schema({
//   html: String,
//   css: String,
//   project: Object,
//   timestamp: { type: Date, default: Date.now },
// });

// const Project = mongoose.model("Project", projectSchema);

// // Save project endpoint
// app.post("/save-html", async (req, res) => {
//   try {
//     const { html, css, project } = req.body;

//     console.log("📥 Received data:");
//     console.log("HTML:", html?.slice(0, 100));
//     console.log("CSS:", css?.slice(0, 100));
//     console.log("Project:", project);

//     if (!html || !project) {
//       return res.status(400).json({ message: "Missing required fields" });
//     }

//     const newProject = new Project({ html, css, project });
//     await newProject.save();

//     console.log("✅ Project saved to MongoDB");
//     res.json({ message: "Project saved successfully to MongoDB" });
//   } catch (err) {
//     console.error("❌ Error saving to MongoDB:", err);
//     res.status(500).json({ message: "Error saving project" });
//   }
// });

// // Get all saved projects
// app.get("/projects", async (req, res) => {
//   try {
//     const projects = await Project.find().sort({ timestamp: -1 });
//     res.json(projects);
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching projects" });
//   }
// });

// // Delete project by ID
// app.delete("/projects/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     await Project.findByIdAndDelete(id);
//     console.log(`🗑️ Deleted project with ID: ${id}`);
//     res.json({ message: "Deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ message: "Error deleting project" });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`🚀 Server started on http://localhost:${PORT}`);
// });

// // server.js
// const express = require("express");
// const mongoose = require("mongoose")
// const cors = require("cors");
// const fs = require("fs");
// const path = require("path");
// const Project = require("./models/Project");

// const app = express();
// const port = 5000;

// app.use(cors());

// app.use(express.json());

// app.post("/save-html", (req, res) => {
//   const { html, css, project } = req.body;

//   if (!html || !css || !project) {
//     return res.status(400).json({
//       success: false,
//       message: "Missing required data. Please provide html, css and project."
//     });
//   }

//   const dataToSave = {
//     html,
//     css,
//     project,
//     timestamp: new Date().toISOString()
//   };

//   const filePath = path.join(__dirname, "projectData.json");

//   fs.writeFile(filePath, JSON.stringify(dataToSave, null, 2), (err) => {
//     if (err) {
//       console.error("Error saving file:", err);
//       return res.status(500).json({
//         success: false,
//         message: "Error saving data"
//       });
//     }
//     res.json({
//       success: true,
//       message: "Data saved successfully",
//       data: dataToSave
//     });
//   });
// });

// app.get("/projects", (req, res) => {
//   const filePath = path.join(__dirname, "projectData.json");

//   if (!fs.existsSync(filePath)) {
//     return res.json({
//       success: true,
//       data: [],
//     });
//   }

//   app.delete("/delete-project/:id", async (req, res) => {
//     try {
//       const { id } = req.params;
//       await Project.findByIdAndDelete(id);
//       return res.json({ success: true, message: "Project deleted" });
//     } catch (error) {
//       console.error("Error deleting project:", error);
//       return res
//         .status(500)
//         .json({ success: false, message: "Error deleting project" });
//     }
//   });

//   fs.readFile(filePath, "utf8", (err, data) => {
//     if (err) {
//       return res.status(500).json({
//         success: false,
//         message: "Error reading project data",
//       });
//     }

//     try {
//       const jsonData = JSON.parse(data);

//       res.json({
//         success: true,
//         data: Array.isArray(jsonData) ? jsonData : [jsonData],
//       });
//     } catch (error) {
//       return res.status(500).json({
//         success: false,
//         message: "Error parsing project data",
//       });
//     }
//   });
// });

//   mongoose
//     .connect("mongodb://127.0.0.1:27017/grapesjs_projects")
//     .then(() => console.log("Connected Successfully to MongoDB"))
//     .catch((err) => console.error(" MongoDB connection error:", err));

// const postApi = async (req, res) => {
//   try {
//     const { html, css, project } = req.body;

//     if (!html || !css || !project) {
//       return res.status(400).json({
//         success: false,
//         message: "Missing required fields",
//       });
//     }

//     const newProject = new Project({ html, css, project });
//     await newProject.save();

//     return res.status(201).json({
//       success: true,
//       message: "Project saved to MongoDB successfully",
//       data: newProject,
//     });
//   } catch (error) {
//     console.error("Error saving to MongoDB:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Error saving to MongoDB",
//     });
//   }
// };

// app.post('/postApi',postApi)

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });





const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: ["http://localhost:5173"], // frontend origin
    credentials: true,
  })
);
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
  mongoose
    .connect("mongodb://127.0.0.1:27017/grapesjs_project_db")
    .then(() => console.log("Connected Successfully to MongoDB"))
    .catch((err) => console.error(" MongoDB connection error:", err));

// Schemas & Models
const pageSchema = new mongoose.Schema({
  name: String,
  html: String,
  css: String,
});


const fullProjectSchema = new mongoose.Schema({
  pages: [pageSchema],
  projectData: { type: Object, default: {} },
  createdAt: { type: Date, default: Date.now },
});

const FullProject = mongoose.model("FullProject", fullProjectSchema);

// Routes
app.get("/", (req, res) => {
  res.send("🚀 Backend is running");
});

app.post("/save-project", async (req, res) => {
  try {
    const { pages, projectData, pageName, html, css } = req.body;

    // Full project save
    if (Array.isArray(pages) && projectData) {
      const newProject = new FullProject({ pages, projectData });
      await newProject.save();
      return res.json({
        success: true,
        message: "Project saved",
        data: newProject,
      });
    }

    // Single page upsert
    if (pageName && typeof html === "string" && typeof css === "string") {
      let project = await FullProject.findOne().sort({ createdAt: -1 });
      if (!project) project = new FullProject({ pages: [], projectData: {} });

      const idx = project.pages.findIndex((p) => p.name === pageName);
      if (idx === -1) {
        project.pages.push({ name: pageName, html, css });
      } else {
        project.pages[idx].html = html;
        project.pages[idx].css = css;
      }

      await project.save();
      return res.json({
        success: true,
        message: `Page "${pageName}" saved`,
        data: project,
      });
    }

    res.status(400).json({ success: false, message: "Invalid payload" });
  } catch (err) {
    console.error("Save error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Fetch all projects
app.get("/get-projects", async (req, res) => {
  try {
    const projects = await FullProject.find().sort({ createdAt: -1 });
    res.json({ success: true, data: projects });
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Fetch single project by ID
app.get("/get-project/:id", async (req, res) => {
  try {
    const project = await FullProject.findById(req.params.id);
    if (!project)
      return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: project });
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Preview pages by project ID
app.get("/preview-project/:id", async (req, res) => {
  try {
    const project = await FullProject.findById(req.params.id);
    if (!project)
      return res.status(404).json({ success: false, message: "Not found" });

    const pages = project.pages.reduce((acc, p) => {
      acc[p.name.toLowerCase()] = { html: p.html, css: p.css };
      return acc;
    }, {});

    res.json({ success: true, data: pages });
  } catch (err) {
    console.error("Preview error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Start server
app.listen(PORT, () =>
  console.log(`🚀 Server running at http://localhost:${PORT}`)
);


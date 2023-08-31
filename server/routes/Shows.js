const express = require("express");
const router = express.Router();
const Shows = require("../models/shows");
//const requireLogin = require("../../middlewares/auth")
//const signupMail = require('@sendgrid/mail');
//signupMail.setApiKey(process.env.SENDGRID_KEY);

router.post("/add-shows", async (req, res) => {
  try {
    // Extract the array of show objects from the request body
    const showDataArray = req.body;

    // Check if showDataArray is an array
    if (!Array.isArray(showDataArray)) {
      return res
        .status(400)
        .json({
          error: "Invalid request body. Expected an array of show objects.",
        });
    }

    // Create an array to store new show documents
    const newShows = [];

    // Iterate through the show data and create new show documents
    for (const showData of showDataArray) {
      const existingShow = await Shows.findOne({ id: showData.id });
      if (existingShow) {
        return res
          .status(409)
          .json({ error: `Show with ID ${showData.id} already exists` });
      }

      const newShow = new Shows(showData);
      await newShow.save();
      newShows.push(newShow);
    }

    res.status(200).json({
      success: true,
      message: "Shows added successfully",
      newShows,
    });
  } catch (error) {
    console.error("Error adding shows:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/get-all-shows", async (req, res) => {
  try {
    // Retrieve all shows from the database
    const allShows = await Shows.find();

    res.status(200).json({
      success: true,
      message: "Shows retrieved successfully",
      shows: allShows,
    });
  } catch (error) {
    console.error("Error fetching shows:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/editprojects/:id", async (req, res) => {
  try {
    const projectId = req.params.id;
    const {
      project_name,
      project_description,
      hours_spent,
      started_date,
      end_date,
    } = req.body;

    // Find the project by ID and update its details
    const updatedProject = await Projects.findByIdAndUpdate(
      projectId,
      {
        project_name,
        project_description,
        hours_spent,
        started_date,
        end_date,
      },
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ error: "Project not found" });
    }

    res
      .status(200)
      .json({
        message: "Project updated successfully",
        project: updatedProject,
      });
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/deleteprojects/:id", async (req, res) => {
  try {
    const projectId = req.params.id;

    // Find the project by ID and delete it
    const deletedProject = await Projects.findByIdAndDelete(projectId);

    if (!deletedProject) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;

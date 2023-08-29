const express = require("express");
const router = express.Router();
const Shows = require("../models/shows");
//const requireLogin = require("../../middlewares/auth")
//const signupMail = require('@sendgrid/mail');
//signupMail.setApiKey(process.env.SENDGRID_KEY);


router.post("/add-shows", async (req, res) => {
  try {
    const { id, backdrop_path, poster_path, language, title, overview, release_date, imdb_id, imdb_vote, status, category, tags, is_popular, is_featured, is_movie } = req.body;

    // Check if the project is already taken
    const existingShow = await Shows.findOne({ id });
    if (existingShow) {
      return res.status(409).json({ error: "Show already exists" });
    }

    // Create a new user with the encrypted password
    const newShows = new Shows({ id, backdrop_path, poster_path, language, title, overview, release_date, imdb_id, imdb_vote, status, category, tags, is_popular, is_featured, is_movie });
    await newShows.save();

    res
      .status(200)
      .json({
        success: "true",
        message: "Show Added successfully",
        //mail: "Account created Mail Has Been Sent Via SendGrid",
        newShows
      });
  } catch (error) {
    console.error("Error adding a Show:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


router.put('/editprojects/:id', async (req, res) => {
  try {
    const projectId = req.params.id;
    const { project_name, project_description, hours_spent, started_date, end_date } = req.body;

    // Find the project by ID and update its details
    const updatedProject = await Projects.findByIdAndUpdate(projectId, { project_name, project_description, hours_spent, started_date, end_date }, { new: true });

    if (!updatedProject) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.status(200).json({ message: 'Project updated successfully', project: updatedProject });
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.delete('/deleteprojects/:id', async (req, res) => {
  try {
    const projectId = req.params.id;

    // Find the project by ID and delete it
    const deletedProject = await Projects.findByIdAndDelete(projectId);

    if (!deletedProject) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
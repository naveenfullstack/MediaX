const express = require("express");
const router = express.Router();
const User = require("../../models/user"); // Adjust the path as needed

// Define a route to add IDs to the user's mylist
router.post("/add-to-mylist", async (req, res) => {
  try {
    const { email, idsToAdd } = req.body;

    // Find the user based on their email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Add the new IDs to the user's mylist
    user.mylist.push(...idsToAdd);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Shows added to mylist successfully",
    });
  } catch (error) {
    console.error("Error adding shows to mylist:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Define a route to delete an ID from the user's mylist
router.delete("/delete-from-mylist", async (req, res) => {
    try {
      const { email, itemToDelete } = req.body;
  
      // Find the user based on their email
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      // Check if the itemToDelete exists in the user's mylist
      const indexToRemove = user.mylist.indexOf(itemToDelete);
  
      if (indexToRemove !== -1) {
        // Remove the item from the user's mylist
        user.mylist.splice(indexToRemove, 1);
        await user.save();
  
        res.status(200).json({
          success: true,
          message: "Item deleted from mylist successfully",
        });
      } else {
        return res.status(404).json({ error: "Item not found in mylist" });
      }
    } catch (error) {
      console.error("Error deleting item from mylist:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

module.exports = router;

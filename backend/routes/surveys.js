// routes/surveys.js
const express = require('express');
const router = express.Router();
const Survey = require('../models/Survey');

// Route to fetch all surveys
router.get('/', async (req, res) => {
  try {
    const surveys = await Survey.find(); // Fetch all surveys
    res.status(200).json(surveys); // Send the surveys as response
  } catch (error) {
    console.error("Error fetching surveys:", error);
    res.status(500).json({ message: "Error fetching surveys." });
  }
});

// Route to create a new survey
router.post('/create', async (req, res) => {
  const { title, questions, createdBy } = req.body;

  try {
    const newSurvey = new Survey({ title, questions, createdBy });
    const savedSurvey = await newSurvey.save();
    res.status(201).json({ message: "Survey created successfully!", survey: savedSurvey });
  } catch (error) {
    res.status(500).json({ message: "Error creating survey." });
  }
});

module.exports = router;

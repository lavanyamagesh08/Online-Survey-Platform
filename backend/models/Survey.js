const mongoose = require('mongoose');

const SurveySchema = new mongoose.Schema({
  title: String,
  questions: [String],
  createdBy: String
});

module.exports = mongoose.model('Survey', SurveySchema);
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());  
app.use(express.json());  

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/survey-platform', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Only survey routes now
const surveyRoutes = require('./routes/surveys');  

// Mount Routes
app.use('/api/surveys', surveyRoutes);  

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

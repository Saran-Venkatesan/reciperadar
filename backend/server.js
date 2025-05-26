const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env
dotenv.config();

const recipeRoutes = require('./routes/recipes');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // for parsing application/json

// API Routes
app.use('/api/recipes', recipeRoutes);
app.use('/api/auth', authRoutes);

// MongoDB connection
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  console.error('❌ MONGODB_URI is not defined in .env file.');
  process.exit(1); // Stop server if no DB URI
}

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB connected');
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});
console.log('✅ Express loaded');
console.log('✅ Mongoose loaded');
console.log('✅ Cors loaded');
console.log('✅ Dotenv loaded');
console.log('✅ Recipe routes loaded');
console.log('✅ Auth routes loaded');
console.log(`✅ Server listening on port ${PORT}`);
console.log('✅ Middleware loaded');
console.log('✅ API routes loaded');


const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./userModel');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/userdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Endpoint to store user data
app.post('/api/store-user', async (req, res) => {
  try {
    const userData = new User(req.body);
    await userData.save();
    res.status(201).json({
      message: 'User created successfully',
      data: userData
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error creating user',
      error: error.message
    });
  }
});

// Endpoint to read user data
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      message: 'Users retrieved successfully',
      data: users
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error retrieving users',
      error: error.message
    });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

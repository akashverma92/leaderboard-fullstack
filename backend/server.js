require('dotenv').config(); 

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
const mongoURI = process.env.MONGODB_URI;

app.use(cors());
app.use(express.json());


mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(' MongoDB connection error:', err));

// ====== Mongoose Models ======
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  totalPoints: { type: Number, default: 0 }
});

const historySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  points: Number,
  claimedAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
const History = mongoose.model('History', historySchema);


app.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Add new user
app.post('/users', async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: 'Name is required' });

  const newUser = new User({ name });
  await newUser.save();
  res.status(201).json(newUser);
});


app.post('/claim/:id', async (req, res) => {
  const userId = req.params.id;
  const points = Math.floor(Math.random() * 10) + 1;

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: 'User not found' });

  user.totalPoints += points;
  await user.save();

  const history = new History({ userId, points });
  await history.save();

  res.json({ name: user.name, points });
});


app.get('/leaderboard', async (req, res) => {
  const users = await User.find().sort({ totalPoints: -1 });
  res.json(users);
});


app.get('/history', async (req, res) => {
  const history = await History.find().populate('userId', 'name');
  res.json(history);
});

// ====== Start Server ======
app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});

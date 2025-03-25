import express from 'express';
import User from '../models/User.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, username, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ error: 'Username already exists' });

    // Create and save user
    const newUser = new User({ firstName, lastName, username, password });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

router.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Check if user exists
      const user = await User.findOne({ username });
      if (!user) return res.status(400).json({ error: 'User not found' });
  
      // Check password (plaintext for now)
      if (user.password !== password) {
        return res.status(400).json({ error: 'Invalid password' });
      }
  
      res.status(200).json({ message: 'Login successful', user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });

  router.get('/dashboard/:userId', async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
  
      if (!user) return res.status(404).json({ error: 'User not found' });
  
      const currentMonth = new Date().getMonth();
      const totalThisMonth = user.expenses
        .filter(e => new Date(e.date).getMonth() === currentMonth)
        .reduce((sum, e) => sum + e.amount, 0);
  
      const last5 = [...user.expenses].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);
  
      res.json({
        name: user.firstName,
        totalThisMonth,
        recentExpenses: last5
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Something went wrong' });
    }
  });
  
  

export default router;

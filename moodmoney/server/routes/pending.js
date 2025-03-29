import express from 'express';
import User from '../models/User.js';

const router = express.Router();


router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const now = new Date();

    

// Filter expenses made in the last 24 hours (0-24 hours old)
const last24Hours = user.expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    const diffHours = (now - expenseDate) / (1000 * 60 * 60);
    return diffHours <= 24; // Only include expenses that are 0-24 hours old
});

// Filter expenses made between 24 hours and 1 week old (24 hours - 7 days old)
const lastWeek = user.expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    const diffHours = (now - expenseDate) / (1000 * 60 * 60);
    const diffDays = diffHours / 24;
    return diffHours > 24 && diffDays <= 7; // Include expenses that are between 24 hours and 7 days old
});

// Filter expenses older than 1 week (more than 7 days old)
const olderThanWeek = user.expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    const diffDays = (now - expenseDate) / (1000 * 60 * 60 * 24);
    return diffDays > 7; // Include expenses that are older than 7 days
});


    return res.json({
      last24Hours,
      lastWeek,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to fetch pending reflections' });
  }
});

export default router;
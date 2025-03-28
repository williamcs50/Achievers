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

    // Filter expenses made in the last 24 hours
    const last24Hours = user.expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    const diffHours = (now - expenseDate) / (1000 * 60 * 60);
    return diffHours <= 24;
    });

    // Filter expenses made in the last week 
    const lastWeek = user.expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    const diffHours = (now - expenseDate) / (1000 * 60 * 60);
    const diffDays = diffHours / 24;
    return diffHours > 24 && diffDays <= 7;
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
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

    
    // Filter expenses made in the last week (0 to 7 days old)
     const last24Hours = user.expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    const diffDays = (now - expenseDate) / (1000 * 60 * 60 * 24); // Difference in days
      return diffDays > 1 && diffDays <= 7; // Include expenses that are up to 7 days old
    });

    // Filter expenses older than a week (more than 7 days old)
    const lastWeek = user.expenses.filter((expense) => {
      const expenseDate = new Date(expense.date);
      const diffDays = (now - expenseDate) / (1000 * 60 * 60 * 24); // Difference in days
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

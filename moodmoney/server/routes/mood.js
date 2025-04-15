import express from 'express';
import User from '../models/User.js';

const router = express.Router();


router.put('/:userId/:expenseId', async (req, res) => {
  try {
    const { userId, expenseId } = req.params;
    const { mood } = req.body;

    if (!mood) {
      return res.status(400).json({ error: 'Need Mood' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'No User' });
    }

    const expense = user.expenses.id(expenseId);
    if (!expense) {
      return res.status(404).json({ error: 'No Expense' });
    }

    expense.mood = mood;

    await user.save();

    return res.json({ message: 'Success', expense });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Fail' });
  }
});

export default router;
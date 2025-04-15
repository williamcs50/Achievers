import express from 'express';
import User from '../models/User.js';

const router = express.Router();

router.post('/add', async (req, res) => {
  const { userId, amount, category, mood, date } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const expense = {
      amount,
      category,
      date,
      mood
    };

    user.expenses.unshift(expense);
    await user.save();

    res.status(201).json({ message: 'Expense added', expense });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add expense' });
  }
});

router.put('/:userId/:expenseId', async (req, res) => {
  const { userId, expenseId } = req.params;
  const { amount, category, mood, date } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const expense = user.expenses.id(expenseId);
    if (!expense) return res.status(404).json({ error: 'Expense not found' });

    expense.amount = amount;
    expense.category = category;
    expense.mood = mood;
    expense.date = date;

    await user.save();
    res.json({ message: 'Expense updated', expense });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update expense' });
  }
});

router.delete('/:userId/:expenseId', async (req, res) => {
  const { userId, expenseId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.expenses = user.expenses.filter(exp => exp._id.toString() !== expenseId);
    await user.save();

    res.json({ message: 'Expense deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete expense' });
  }
});

router.get('/:userId/:expenseId', async (req, res) => {
  const { userId, expenseId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const expense = user.expenses.id(expenseId);
    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

  
    return res.json(expense);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to get expense' });
  }
});


export default router;
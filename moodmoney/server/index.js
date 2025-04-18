import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import expenseRoutes from './routes/expense.js';
import pendingRoutes from './routes/pending.js';
import moodRoutes from './routes/mood.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/expenses', expenseRoutes);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/mood', moodRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.log('MongoDB connection error:', err));


app.use('/api/pending', pendingRoutes);


import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    expenses: [
      {
        amount: Number,
        category: String,
        date: Date,
        mood: String
      }
    ]
  }, { timestamps: true });
  
export default mongoose.model('User', userSchema);

import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';

import authRouter from './authRouter.js';

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());

app.use(express.json());
app.use('/auth', authRouter);

const start = async () => {
  try {
    await mongoose.connect('mongodb+srv://Schweppes:asd761326@cluster0.1tdrgh7.mongodb.net/psy-free?retryWrites=true&w=majority');
    app.listen(PORT, () => console.log(`server started on ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();

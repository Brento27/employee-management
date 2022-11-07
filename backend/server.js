import connectDB from './config/db.js';
import express from 'express';
import userRoutes from './routes/userRoutes.js';
import departmentRoutes from './routes/departmentRoutes.js';
import dotenv from 'dotenv';
import cors from 'cors';
import { errorHandler, notFound } from './middleware/errorMiddleWare1.js';

dotenv.config();

connectDB();

const app = express();
app.use(cors());

app.use(express.json());

app.use('/api/departments', departmentRoutes);
app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

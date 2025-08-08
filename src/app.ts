import express from 'express';
import cors from 'cors';
import { connectDB } from '../config/database';
import authRoutes from '../routes/auth';
import dotenv from 'dotenv';  
dotenv.config();





const app = express();

const PORT =  process.env.PORT! || 5000;


// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: 'https://kanban-frontend-azure.vercel.app', // Frontend URL
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running' });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

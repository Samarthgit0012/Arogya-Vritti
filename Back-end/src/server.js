import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import paymentRoutes from './routes/payment.js';
import medicalRoutes from './routes/medicalRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import geoapifyRoutes from './routes/geoapifyRoute.js';
// Load environment variables
dotenv.config();

const app = express();

// Middleware
// app.use(cors());


// app.use(cors({
//   origin: 'https://arogya-vritti-front-end.onrender.com',
//   credentials: true
// }));



const allowedOrigins = [
  'http://localhost:8081',
  'https://arogya-vritti-front-end.onrender.com',
  'https://arogya-vritti.life',
  'https://www.arogya-vritti.life'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));




app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/arogya-vritti')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/medical', medicalRoutes);
app.use("/api/geoapify", geoapifyRoutes);
app.use('/api', aiRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
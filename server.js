import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

// Configure env
dotenv.config();

// Database config
connectDB();

// ESM module fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// REST object
const app = express();

// Middlewares
app.use(cors({ origin: 'https://wide-eyed-pantyhose-wasp.cyclic.app/' }));
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'client/build')));

// REST API
app.use('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/product', productRoutes);

// Port
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});

import Express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';


//configure env
dotenv.config();

//db config
connectDB();

//esmodule fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//rest object
const app = Express();

//middlewares
app.use(cors());
app.use(Express.json());
app.use(morgan('dev'));
app.use(Express.static(path.join(__dirname, './client/build')))

//rest api
app.use('*', function (req, res) {
    res.sendFile(path.join(__dirname, './client/build/index.html'))
})

//routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/product', productRoutes);

//port
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
})
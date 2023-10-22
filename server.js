import Express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js"
import cors from 'cors';

//configure env
dotenv.config();

//db config
connectDB();

//rest object
const app = Express();

//middlewares
app.use(cors()); 
app.use(Express.json());
app.use(morgan('dev'));

//routes
app.use('/api/v1/auth' , authRoutes);
app.use('/api/v1/category', categoryRoutes);

//rest api
app.get('/', (req, res) => {
    res.send(
        "<h1>Welcome to bookstore</h1>"
    )
})

//port
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
})
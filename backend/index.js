import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from  './routes/product.route.js';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.ORIGIN_URL })); // Allow requests from this origin

app.use(express.json()); // To allow accept json data in the req.body

app.get("/", (req, res) => {
	res.send("API is running");
});

app.use("/api/products", productRoutes)

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});

export default app;
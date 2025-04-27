import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { connectDB } from './config/db.js';
import productRoutes from  './routes/product.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // To allow accept json data in the req.body

app.get("/", (req,res) => {
    res.send("Hello World!");
});

app.use("/api/products", productRoutes)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/dist')));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname,'frontend', 'dist', 'index.html'));
    });
}

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});

export default app;
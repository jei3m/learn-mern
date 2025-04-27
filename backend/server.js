import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './config/db.js';
import productRoutes from  './routes/product.route.js';
import cors from 'cors';

dotenv.config();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.ORIGIN_URL })); // Allow requests from this origin

app.use(express.json()); // To allow accept json data in the req.body

app.use("/api/products", productRoutes)

// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname, '../frontend/dist')));

//     app.get("*", (req, res) => {
//         res.sendFile(path.resolve(__dirname, '../frontend', 'dist', 'index.html'));
//     });
// }

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});

export default app;
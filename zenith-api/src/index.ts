import express, { type Request, type Response } from 'express';
import cors from 'express';
import dotenv from 'dotenv';
import { router } from './routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
// Allow only the frontend local server for this MVP
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use('/api/v1', router);

app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'ok', service: 'zenith-api' });
});

app.listen(port, () => {
    console.log(`Zenith API is running on http://localhost:${port}`);
});

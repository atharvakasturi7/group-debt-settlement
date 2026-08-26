import express from 'express'
import authRoutes from './routes/authRoutes.js';

const app = express()

app.use(express.json())
app.use('/api/auth', authRoutes);


app.get('/api/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is running"
    })
})

export default app;

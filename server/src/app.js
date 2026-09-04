import express from 'express'
import authRoutes from './routes/authRoutes.js';
import testRoutes from './routes/testRoutes.js';

const app = express()

app.use(express.json())
app.use('/api/auth', authRoutes);


app.get('/api/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is running"
    })
})

app.use('/api/test', testRoutes);

export default app;

import express from 'express';
import cors from 'cors';
import 'dotenv/config';

//initialize Express
const app = express()

//middleware
app.use(cors());
app.use(express.json());

//routes
app.get('/', (req, res) => {
    res.send('API Working');
})

//Port
const PORT = process.env.PORT || 5000;

//Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
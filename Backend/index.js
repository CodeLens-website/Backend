require('dotenv').config();
const bodyParser = require('body-parser');
const connectToMongo = require('./db');
const cors = require('cors');
const express = require('express');

connectToMongo();

const app = express();
const PORT = process.env.PORT;

app.use(cors({
    origin: "http://localhost:3000", // Allow frontend
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow necessary HTTP methods
    credentials: true // Allow credentials like cookies, authorization headers
}));
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/webhook', require('./routes/webhook'));

app.get('/', (req, res) => {
    res.send('CodeLens');
});

app.listen(PORT, () => {
    console.log(`CodeLens backend listening on http://localhost:${PORT}`);
});

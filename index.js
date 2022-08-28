const express = require('express');
const blog = require('./routers/blog')
const mongoose = require('mongoose');

const app = express();

const port = process.env.PORT || 5000

mongoose.connect('mongodb://localhost:27017/personalblog', () => {
    console.log("Connected to db");
});

app.use(express.json());

app.use('/api/blog', blog);

app.get('/', (req, res) => {
    res.send("Home");
})

app.listen(PORT, () => console.log(`Running on port ${port}`))
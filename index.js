const express = require('express');
const blog = require('./routers/blog')
const mongoose = require('mongoose');

const app = express();

const port = process.env.PORT || 5000

const uri = 'mongodb+srv://athukarad109:ihatemobilegames@cluster0.srm92jo.mongodb.net/Personal-blog?retryWrites=true&w=majority'

mongoose.connect(uri, () => {
    console.log("Connected to db");
});

app.use(express.json());

app.use('/api/blog', blog);

app.get('/', (req, res) => {
    res.send("Home");
})

app.listen(port, () => console.log(`Running on port ${port}`))
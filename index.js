const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const blog = require('./routers/blog')

const app = express();

const port = process.env.PORT || 5000

const uri = 'mongodb+srv://athukarad109:ihatemobilegames@cluster0.srm92jo.mongodb.net/Personal-blog?retryWrites=true&w=majority'

mongoose.connect(uri, () => {
    console.log("Connected to db");
});

const corsOptions = {
    origin: '*',
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}

app.use(bodyparser.urlencoded({ extended: true }));

app.use(cors(corsOptions))

app.use(express.json());

app.use('/api/blog', blog);

app.get('/', (req, res) => {
    res.send("Home");
})

app.listen(port, () => console.log(`Running on port ${port}`))
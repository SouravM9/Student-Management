const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect Mongodb Database Local
// var mongoDatabase = 'mongodb://localhost:27017/studentdb';

// mongoose.connect(mongoDatabase, { useNewUrlParser: true }).then(
//     () => { console.log('Database is connected') },
//     err => { console.log('There is problem while connecting database ' + err) }
//     );
    
// Connecting  to MongoDB Atlas
const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {   
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log("Connected to Mongo");
});

mongoose.connection.on('error', (err) => {
    console.log("Error", err);
})

const studentsRouter = require('./Routes/students');

app.use('/students', studentsRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const match_routes = require('./MatchingService/routes/matches.js');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/pratap');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/matches', match_routes);

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Header','origin');
});

app.use((req,res,next) =>
{
const error = new Error('Not found');
error.status = 404;
next(error);
});

app.use((error,req,res,next) => {
    res.status(error.status || 500);
    res.json({
        message: error.message
    });
});
module.exports = app;
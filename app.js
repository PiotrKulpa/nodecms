//TODO: handle errors
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const fileUpload = require('express-fileupload');
const graphqlHTTP = require('express-graphql');

const schema = require('./graphql/schema')
const root = require('./graphql/resolvers')

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());

app.use('/graphql',  
  graphqlHTTP((req, res) =>({
    schema: schema,
    rootValue: root,
    graphiql: true,
    context: {req, res},
  }))
);

// mongoose
mongoose.connect('mongodb://localhost/nodecms');

module.exports = app;

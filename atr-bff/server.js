
require('dotenv').config();

const userData = require('./user.json');

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const graphql =  require('graphql')
const {GraphQLObjectType,GraphQLSchema,GraphQLInt,GraphQLString, GraphQLList, GraphQLID} = graphql;
const {graphqlHTTP} = require('express-graphql');

const generalController = require('./controllers/general');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')));

app.use('/atr-bff/',generalController);

app.get('/checkBFFServer',(req,res,next)=>{
    res.json({serverStatus:true});
});

app.get('/test',(req,res)=>{
    res.status(404).json({res:'result is OK'});
});

app.listen(process.env.PORT,()=>{console.log('Connect to server on port 5000');});

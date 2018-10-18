const express = require('express');
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema');
const cors = require('cors');
const app = express();
app.use(cors());

//Conection to MongoLAB
const mongoose = require('mongoose');
mongoose.connect('mongodb://nikola:rootmaster11981@ds147497.mlab.com:47497/gql-ninja')
mongoose.connection.once('open', ()=>{
    console.log('connected to database');
})



app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:true // We want  to use cms

})) // Mildware when you come on this location they call method who know what todo, also you need schema. 
app.listen(4000, ()=>{
    console.log('Now liseting request on port 4000');
    
})
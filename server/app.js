const express = require('express');
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema');
const app = express();


app.use('/graphql',graphqlHTTP({
    schema

})) // Mildware when you come on this location they call method who know what todo, also you need schema. 
app.listen(4000, ()=>{
    console.log('Now liseting request on port 4000');
    
})
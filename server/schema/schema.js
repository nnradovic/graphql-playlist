const graphql = require('graphql');
const _=require('lodash');
const { GraphQLObjectType, GraphQLString } = graphql;

//dummy data
var books = [
    {name:'Name of the wind', genre:'Fantasy',id:'1'},
    {name:'Galactica', genre:'SC-Fi',id:'2'},
    {name:'Police Academy', genre:'Comedy',id:'3'},
]
                                                                                                                                                                                                                                         
const BookType = new GraphQLObjectType({
    name:'Book',
    fields:()=>({
        id:{type: GraphQLString},
        name:{type:GraphQLString},
        genre:{type:GraphQLString}
    })
})//We define book schema

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fileds:{
        book:{
            type:BookType,
            args:{id:{type:GraphQLString}},
            resolve(parent,args){
                return _find(books, {id:args.id})
                //code to get data from db/other source
            }
        }
    }
})//We here define query which expect id args and this is for BookType.


module.exports = new GraphQLSchema({
    query:RootQuery
})// Now export this RootQuery for import in app and with we allow front end to make query.

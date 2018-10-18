const graphql = require('graphql');
const _ =require('lodash');
const { 
    GraphQLObjectType, 
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
     } = graphql;

//dummy data
var books = [
    {name:'Name of the wind', genre:'Fantasy',id:'1', authorId:'1'},
    {name:'Galactica', genre:'SC-Fi',id:'2', authorId:'2'},
    {name:'Police Academy', genre:'Comedy',id:'3', authorId:'3'},
    {name:'The hero og age', genre:'Fantasy',id:'2', authorId:'1'},
    {name:'Space', genre:'SC-Fi',id:'2', authorId:'2'},
    {name:'Goonies', genre:'Comedy',id:'3', authorId:'3'},

]

var author = [
    {name:'Marko Nikolic', age:'44',id:'1'},
    {name:'Jovan Memedovic', age:'55',id:'2'},
    {name:'Srdja Popovic', age:'3',id:'3'},
]
                                                                                                                                                                                                                                         
const BookType = new GraphQLObjectType({
    name:'Book',
    fields:()=>({
        id:{type: GraphQLID},
        name:{type:GraphQLString},
        genre:{type:GraphQLString},
        author:{
            type:AuthorType,
            resolve(parent,args){
                console.log(parent)
                return _.find(author, {id:parent.authorId})
            }
        }
    })
})//We define book schema

const AuthorType = new GraphQLObjectType({
    name:'Author',
    fields:()=>({
        id:{type: GraphQLID},
        name:{type:GraphQLString},
        age:{type:GraphQLInt},
        books:{
            type:new GraphQLList(BookType),
            resolve(parent,args){
              return _.filter(books, {authorId:parent.id})  
            }
        }
    })
})//We define book schema

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        book:{
            type:BookType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                console.log(args.id);
                
                return _.find(books, {id:args.id})
                //code to get data from db/other source
            }
        },
        author:{
            type:AuthorType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return _.find(author,{id : args.id})
            }
        },
        books:{
            type: new GraphQLList(BookType),
            resolve(parent,args){
                return books
            }
        },
        authors:{
            type: new GraphQLList(AuthorType),
            resolve(parent,args){
                return authors
            }
        }


    }
})//We here define query which expect id args and this is for BookType.


module.exports = new GraphQLSchema({
    query:RootQuery
})// Now export this RootQuery for import in app and with we allow front end to make query.
